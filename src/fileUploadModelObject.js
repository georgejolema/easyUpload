const { isNull, extractExtensions } = require('./utils');
const { statusList } = require('./constants');
const fileChunks = require('./fileChunks');
const $ = window.jQuery;

function fileUploadModelObject(fileUploader, options) {
    const files = [];

    validateOptions(options);

    fileUploader.on('change', (e) => {
        const files = e.target.files;
        const selectedFiles = [];
        for (let i = 0; i < files.length; i++) {
            if (options.maxNumFiles !== 0 && options.maxNumFiles <= files.length) break;
            if (!validateFile(files[i])) continue;
            buildFileChunkUploader(files[i]);
            selectedFiles.push(files[i]);
        }
        options.onfilesSelected(selectedFiles);
    });

    function find(name, fn)
    {
        for (let i = 0; i < files.length; i++) {
            if (files[i].file.name == name) {
                fn(i);
                break;
            }
        }
    }

    function validateFile(file)
    {
        if (options.maxFileSize != 0 && options.maxFileSize < file.size)
            return false;

        if (options.allowedExtensions.length > 0) {
            const extension = extractExtensions(file.name);
            let i = 0;
            for (; i < options.allowedExtensions.length; i++) {
                if (extension === options.allowedExtensions[i])
                    break;
            }
            if (i == options.allowedExtensions.length) return false;
        }
        else if (options.disallowedExtensions.length > 0) {
            const extension = extractExtensions(file.name);
            for (let i = 0; i < options.disallowedExtensions.length; i++) {
                if (extension === options.disallowedExtensions[i])
                    return false;
            }
        }
        return true;
    }

    function validateOptions(options)
    {
        if (isNull(options.chunkSize)) options.chunkSize = 50;
        if (isNull(options.disallowedExtensions)) options.disallowedExtensions = [];
        if (isNull(options.allowedExtensions)) options.allowedExtensions = [];
        if (isNull(options.maxNumFiles)) options.maxNumFiles = 0;
        if (isNull(options.maxFileSize)) options.maxFileSize = 0;
        if (isNull(options.modestring64)) options.modestring64 = false;
        if (isNull(options.autoUpload)) options.autoUpload = false;
        if (isNull(options.onStartedUploading)) options.onStartedUploading = function () { };
        if (isNull(options.onFinishedUploadingFile)) options.onFinishedUploadingFile = function () { };
        if (isNull(options.onFinishedUploadingFiles)) options.onFinishedUploadingFiles = function () { };
        if (isNull(options.onError)) options.onError = function () { };
        if (isNull(options.onChunkUploaded)) options.onChunkUploaded = function () { };
        if (isNull(options.onfilesSelected)) options.onfilesSelected = function () { };
        if (isNull(options.additional)) options.additional = {};
    }


    function buildFileChunkUploader(file)
    {
        const uploader = fileChunks(file, options.chunkSize, options.modestring64);
        uploader
            .on('upload', function (blob, chunkNo, isLast)
            {
                if (!options.modestring64) {
                    blob.append('isLast', isLast);
                    blob.append('additional', JSON.stringify(options.additional));
                }
                const def = $.Deferred();
                $.ajax({
                    url: options.url,
                    method: 'POST',
                    data: options.modestring64 ? {
                        fileData: blob,
                        fileName: file.name,
                        chunk: chunkNo,
                        isLast:isLast,
                        additional: options.additional
                    } : blob,
                    processData: options.modestring64,
                    contentType: options.modestring64 ? 'application/x-www-form-urlencoded; charset=UTF-8' : options.modestring64,
                    success: function ()
                    {
                        def.resolve();
                    },
                    error: function (data)
                    {
                        def.reject(data);
                    }
                });
                return def.promise();
            })
            .on('filestartuploading', options.onStartedUploading)
            .on('fileuploaded', function (file)
            {
                options.onFinishedUploadingFile(file);
                const errorList = [];
                const successfulList = [];
                for (let i = 0; i < files.length; i++) {
                    const item = files[i];
                    if (item.status == statusList.uploading || item.status == statusList.inserted || item.status == statusList.paused)
                        return;
                    if (item.status == statusList.error)
                        errorList.push(file);
                    else
                        successfulList.push(file);
                }
                options.onFinishedUploadingFiles(successfulList, errorList);
            })
            .on('fileerror', options.onError)
            .on('chunkuploaded', options.onChunkUploaded)
            .on('deletefile', function (file)
            {
                $.ajax({
                    url: options.url,
                    method: 'DELETE',
                    data: {
                        fileName: file.name,
                        additional: options.additional
                    }
                });
            });
        files.push(uploader);
        if (options.autoUpload)
            uploader.upload();
        return uploader;
    }


    return {
        config(data) {
            if(typeof data === 'string'){
                return options[data];
            }

            for (let i in data) {
                options[i] = data[i];
            }
        },

        status() {
            return statusList;
        },

        stop(fileName) {
            find(fileName, (i) => { files[i].stop(); });
        },

        pause(fileName) {
            find(fileName, function (i) { files[i].pause(); });
        },

        resume(fileName) {
            find(fileName, function (i) { files[i].resume(); });
        },

        retry(fileName) {
            find(fileName, function (i) { files[i].retry(); });
        },

        deleteFile(fileName) {
            find(fileName, function (i) { files.splice(i, 1); });
            return this.getFilesList();
        },

        getFilesList() {
            const arr = [];
            for (let i = 0; i < files.length; i++) {
                arr.push(this.getFile(i));
            }
            return arr;
        },

        getFile(index) {
            if (index >= files.length) {
                alert('Error, index file does not exist');
                return null;
            }
            else {
                const file = files[index].file;
                let uploaded = files[index].chunkNo * 1024 * options.chunkSize;
                const status = files[index].status;
                if (uploaded > file.size) {
                    uploaded = file.size;
                }
                return {
                    fileName: file.name,
                    size: file.size,
                    uploaded: uploaded,
                    dataFile: file,
                    status: status
                };
            }
        },

        upload() {
            for (let i = 0; i < files.length; i++) {
                if (files[i].status === statusList.inserted)
                    files[i].upload();
            }
        }
    };
}

module.exports = fileUploadModelObject;
