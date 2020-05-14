const{ statusList } = require('./constants');

function fileChunks(file, chunksize, mode64) {
    const fileChunkSize = chunksize * 1024;
    const events = [];
    let startChunk = -1;
    let endChunk = 0;
    let slice_method; 
    let endOfFile = false;
    let pstart = -1;
    let pend = 0;
    let chunkNo = 0;
    if ('mozSlice' in file) slice_method = 'mozSlice';
    else if ('webkitSlice' in file) slice_method = 'webkitSlice';
    else slice_method = 'slice';
    let status = statusList.inserted;

    

    return {
        file,
        _upload() {
            const chunk = file[slice_method](startChunk, endChunk);
            if (mode64) {
                const reader = new window.FileReader();
                reader.readAsDataURL(chunk);
                reader.onloadend = function () {
                    const base64data = reader.result;
                    this.excecutePromise(base64data);
                };
            }
            else {
                const data = new FormData();
                data.append('file', chunk, 'file');
                data.append('fileName', file.name);
                data.append('chunkNo', chunkNo + 1);
                this.excecutePromise(data);
            }
    
        },    
        excecutePromise(data) {
            events['upload'](data, ++chunkNo, endOfFile).then(() => {
                const uploaded = chunkNo * fileChunkSize;
                events['chunkuploaded'](file, chunkNo, uploaded > file.size ? file.size : uploaded);
                this.upload();
            }, () => {
                status = statusList.error;
                events['fileerror']({ file: file, error: data });
            });
        },
    
        moveNext() {
            pstart = startChunk;
            pend = endChunk;
            if (endChunk == file.size)
                return false;
            if (startChunk == -1) startChunk = 0;
            else startChunk = endChunk;
            endChunk = endChunk + fileChunkSize;
            if (endChunk > file.size) endChunk = file.size;
            endOfFile = endChunk == file.size;
            return true;
        },
        on(name, fn) {
            events[name] = fn;
            return this;
        },
        upload () {
            if (status == statusList.stopped)
                events['deletefile'](file);
            if (status != statusList.inserted && status != statusList.uploading) return;
            if (chunkNo == statusList.inserted) {
                status = statusList.uploading;
                events['filestartuploading'](file);
            }
            if (this.moveNext()) {
                const _upload = this._upload.bind(this);
                setTimeout(_upload, 200);
            }
            else {
                status = statusList.uploaded;
                events['fileuploaded'](file);
            }
        },
        pause() {
            status = statusList.paused;
        },
        resume() {
            if (status !== statusList.paused) return;
            status = statusList.uploading;
            this.upload();
        },
        retry() {
            startChunk = pstart;
            endChunk = pend;
            if (status !== statusList.error) return;
            status = statusList.uploading;
            this.upload();
        },

        stop() {
            if (status == statusList.paused)
                events['deletefile'](file);
            status = statusList.stopped;
            events['fileuploaded'](file);
        }

    };
}

module.exports = fileChunks;
