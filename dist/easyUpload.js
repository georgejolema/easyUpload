/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/easyUpload.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const statusList = {\r\n    inserted: 0,\r\n    uploading: 1,\r\n    uploaded: 2,\r\n    paused: 3,\r\n    stopped: 4,\r\n    error: -1\r\n};\r\n\r\nmodule.exports = {\r\n    statusList,\r\n};\r\n\n\n//# sourceURL=webpack:///./src/constants.js?");

/***/ }),

/***/ "./src/easyUpload.js":
/*!***************************!*\
  !*** ./src/easyUpload.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const $ = window.jQuery;\r\nconst fileUploadModelObject = __webpack_require__(/*! ./fileUploadModelObject */ \"./src/fileUploadModelObject.js\");\r\n\r\n$.fn.upload = upload;\r\n\r\nfunction upload(options, params) {\r\n    if (typeof options === 'string') {\r\n        const fileUploadModel = this[0].fileUploadModel;\r\n        if (typeof fileUploadModel[options] === 'function')\r\n            return fileUploadModel[options](params);\r\n    }\r\n    else {\r\n        this[0].fileUploadModel = fileUploadModelObject(this, options);\r\n    }\r\n    return this;\r\n}\r\n\n\n//# sourceURL=webpack:///./src/easyUpload.js?");

/***/ }),

/***/ "./src/fileChunks.js":
/*!***************************!*\
  !*** ./src/fileChunks.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const{ statusList } = __webpack_require__(/*! ./constants */ \"./src/constants.js\");\r\n\r\nfunction fileChunks(file, chunksize, mode64) {\r\n    const fileChunkSize = chunksize * 1024;\r\n    const events = [];\r\n    let startChunk = -1;\r\n    let endChunk = 0;\r\n    let slice_method; \r\n    let endOfFile = false;\r\n    let pstart = -1;\r\n    let pend = 0;\r\n    let chunkNo = 0;\r\n    if ('mozSlice' in file) slice_method = 'mozSlice';\r\n    else if ('webkitSlice' in file) slice_method = 'webkitSlice';\r\n    else slice_method = 'slice';\r\n    let status = statusList.inserted;\r\n\r\n    \r\n\r\n    return {\r\n        file,\r\n        _upload() {\r\n            const chunk = file[slice_method](startChunk, endChunk);\r\n            if (mode64) {\r\n                const reader = new window.FileReader();\r\n                reader.readAsDataURL(chunk);\r\n                reader.onloadend = function () {\r\n                    const base64data = reader.result;\r\n                    this.excecutePromise(base64data);\r\n                };\r\n            }\r\n            else {\r\n                const data = new FormData();\r\n                data.append('file', chunk, 'file');\r\n                data.append('fileName', file.name);\r\n                data.append('chunkNo', chunkNo + 1);\r\n                this.excecutePromise(data);\r\n            }\r\n    \r\n        },    \r\n        excecutePromise(data) {\r\n            events['upload'](data, ++chunkNo, endOfFile).then(() => {\r\n                const uploaded = chunkNo * fileChunkSize;\r\n                events['chunkuploaded'](file, chunkNo, uploaded > file.size ? file.size : uploaded);\r\n                this.upload();\r\n            }, () => {\r\n                status = statusList.error;\r\n                events['fileerror']({ file: file, error: data });\r\n            });\r\n        },\r\n    \r\n        moveNext() {\r\n            pstart = startChunk;\r\n            pend = endChunk;\r\n            if (endChunk == file.size)\r\n                return false;\r\n            if (startChunk == -1) startChunk = 0;\r\n            else startChunk = endChunk;\r\n            endChunk = endChunk + fileChunkSize;\r\n            if (endChunk > file.size) endChunk = file.size;\r\n            endOfFile = endChunk == file.size;\r\n            return true;\r\n        },\r\n        on(name, fn) {\r\n            events[name] = fn;\r\n            return this;\r\n        },\r\n        upload () {\r\n            if (status == statusList.stopped)\r\n                events['deletefile'](file);\r\n            if (status != statusList.inserted && status != statusList.uploading) return;\r\n            if (chunkNo == statusList.inserted) {\r\n                status = statusList.uploading;\r\n                events['filestartuploading'](file);\r\n            }\r\n            if (this.moveNext()) {\r\n                const _upload = this._upload.bind(this);\r\n                setTimeout(_upload, 200);\r\n            }\r\n            else {\r\n                status = statusList.uploaded;\r\n                events['fileuploaded'](file);\r\n            }\r\n        },\r\n        pause() {\r\n            status = statusList.paused;\r\n        },\r\n        resume() {\r\n            if (status !== statusList.paused) return;\r\n            status = statusList.uploading;\r\n            this.upload();\r\n        },\r\n        retry() {\r\n            startChunk = pstart;\r\n            endChunk = pend;\r\n            if (status !== statusList.error) return;\r\n            status = statusList.uploading;\r\n            this.upload();\r\n        },\r\n\r\n        stop() {\r\n            if (status == statusList.paused)\r\n                events['deletefile'](file);\r\n            status = statusList.stopped;\r\n            events['fileuploaded'](file);\r\n        }\r\n\r\n    };\r\n}\r\n\r\nmodule.exports = fileChunks;\r\n\n\n//# sourceURL=webpack:///./src/fileChunks.js?");

/***/ }),

/***/ "./src/fileUploadModelObject.js":
/*!**************************************!*\
  !*** ./src/fileUploadModelObject.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { isNull, extractExtensions } = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\r\nconst { statusList } = __webpack_require__(/*! ./constants */ \"./src/constants.js\");\r\nconst fileChunks = __webpack_require__(/*! ./fileChunks */ \"./src/fileChunks.js\");\r\nconst $ = window.jQuery;\r\n\r\nfunction fileUploadModelObject(fileUploader, options) {\r\n    const files = [];\r\n\r\n    validateOptions(options);\r\n\r\n    fileUploader.on('change', (e) => {\r\n        const files = e.target.files;\r\n        const selectedFiles = [];\r\n        for (let i = 0; i < files.length; i++) {\r\n            if (options.maxNumFiles !== 0 && options.maxNumFiles <= files.length) break;\r\n            if (!validateFile(files[i])) continue;\r\n            buildFileChunkUploader(files[i]);\r\n            selectedFiles.push(files[i]);\r\n        }\r\n        options.onfilesSelected(selectedFiles);\r\n    });\r\n\r\n    function find(name, fn)\r\n    {\r\n        for (let i = 0; i < files.length; i++) {\r\n            if (files[i].file.name == name) {\r\n                fn(i);\r\n                break;\r\n            }\r\n        }\r\n    }\r\n\r\n    function validateFile(file)\r\n    {\r\n        if (options.maxFileSize != 0 && options.maxFileSize < file.size)\r\n            return false;\r\n\r\n        if (options.allowedExtensions.length > 0) {\r\n            const extension = extractExtensions(file.name);\r\n            let i = 0;\r\n            for (; i < options.allowedExtensions.length; i++) {\r\n                if (extension === options.allowedExtensions[i])\r\n                    break;\r\n            }\r\n            if (i == options.allowedExtensions.length) return false;\r\n        }\r\n        else if (options.disallowedExtensions.length > 0) {\r\n            const extension = extractExtensions(file.name);\r\n            for (let i = 0; i < options.disallowedExtensions.length; i++) {\r\n                if (extension === options.disallowedExtensions[i])\r\n                    return false;\r\n            }\r\n        }\r\n        return true;\r\n    }\r\n\r\n    function validateOptions(options)\r\n    {\r\n        if (isNull(options.chunkSize)) options.chunkSize = 50;\r\n        if (isNull(options.disallowedExtensions)) options.disallowedExtensions = [];\r\n        if (isNull(options.allowedExtensions)) options.allowedExtensions = [];\r\n        if (isNull(options.maxNumFiles)) options.maxNumFiles = 0;\r\n        if (isNull(options.maxFileSize)) options.maxFileSize = 0;\r\n        if (isNull(options.modestring64)) options.modestring64 = false;\r\n        if (isNull(options.autoUpload)) options.autoUpload = false;\r\n        if (isNull(options.onStartedUploading)) options.onStartedUploading = function () { };\r\n        if (isNull(options.onFinishedUploadingFile)) options.onFinishedUploadingFile = function () { };\r\n        if (isNull(options.onFinishedUploadingFiles)) options.onFinishedUploadingFiles = function () { };\r\n        if (isNull(options.onError)) options.onError = function () { };\r\n        if (isNull(options.onChunkUploaded)) options.onChunkUploaded = function () { };\r\n        if (isNull(options.onfilesSelected)) options.onfilesSelected = function () { };\r\n        if (isNull(options.additional)) options.additional = {};\r\n    }\r\n\r\n\r\n    function buildFileChunkUploader(file)\r\n    {\r\n        const uploader = fileChunks(file, options.chunkSize, options.modestring64);\r\n        uploader\r\n            .on('upload', function (blob, chunkNo, isLast)\r\n            {\r\n                if (!options.modestring64) {\r\n                    blob.append('isLast', isLast);\r\n                    blob.append('additional', JSON.stringify(options.additional));\r\n                }\r\n                const def = $.Deferred();\r\n                $.ajax({\r\n                    url: options.url,\r\n                    method: 'POST',\r\n                    data: options.modestring64 ? {\r\n                        fileData: blob,\r\n                        fileName: file.name,\r\n                        chunk: chunkNo,\r\n                        isLast:isLast,\r\n                        additional: options.additional\r\n                    } : blob,\r\n                    processData: options.modestring64,\r\n                    contentType: options.modestring64 ? 'application/x-www-form-urlencoded; charset=UTF-8' : options.modestring64,\r\n                    success: function ()\r\n                    {\r\n                        def.resolve();\r\n                    },\r\n                    error: function (data)\r\n                    {\r\n                        def.reject(data);\r\n                    }\r\n                });\r\n                return def.promise();\r\n            })\r\n            .on('filestartuploading', options.onStartedUploading)\r\n            .on('fileuploaded', function (file)\r\n            {\r\n                options.onFinishedUploadingFile(file);\r\n                const errorList = [];\r\n                const successfulList = [];\r\n                for (let i = 0; i < files.length; i++) {\r\n                    const item = files[i];\r\n                    if (item.status == statusList.uploading || item.status == statusList.inserted || item.status == statusList.paused)\r\n                        return;\r\n                    if (item.status == statusList.error)\r\n                        errorList.push(file);\r\n                    else\r\n                        successfulList.push(file);\r\n                }\r\n                options.onFinishedUploadingFiles(successfulList, errorList);\r\n            })\r\n            .on('fileerror', options.onError)\r\n            .on('chunkuploaded', options.onChunkUploaded)\r\n            .on('deletefile', function (file)\r\n            {\r\n                $.ajax({\r\n                    url: options.url,\r\n                    method: 'DELETE',\r\n                    data: {\r\n                        fileName: file.name,\r\n                        additional: options.additional\r\n                    }\r\n                });\r\n            });\r\n        files.push(uploader);\r\n        if (options.autoUpload)\r\n            uploader.upload();\r\n        return uploader;\r\n    }\r\n\r\n\r\n    return {\r\n        config(data) {\r\n            if(typeof data === 'string'){\r\n                return options[data];\r\n            }\r\n\r\n            for (let i in data) {\r\n                options[i] = data[i];\r\n            }\r\n        },\r\n\r\n        status() {\r\n            return statusList;\r\n        },\r\n\r\n        stop(fileName) {\r\n            find(fileName, (i) => { files[i].stop(); });\r\n        },\r\n\r\n        pause(fileName) {\r\n            find(fileName, function (i) { files[i].pause(); });\r\n        },\r\n\r\n        resume(fileName) {\r\n            find(fileName, function (i) { files[i].resume(); });\r\n        },\r\n\r\n        retry(fileName) {\r\n            find(fileName, function (i) { files[i].retry(); });\r\n        },\r\n\r\n        deleteFile(fileName) {\r\n            find(fileName, function (i) { files.splice(i, 1); });\r\n            return this.getFilesList();\r\n        },\r\n\r\n        getFilesList() {\r\n            const arr = [];\r\n            for (let i = 0; i < files.length; i++) {\r\n                arr.push(this.getFile(i));\r\n            }\r\n            return arr;\r\n        },\r\n\r\n        getFile(index) {\r\n            if (index >= files.length) {\r\n                alert('Error, index file does not exist');\r\n                return null;\r\n            }\r\n            else {\r\n                const file = files[index].file;\r\n                let uploaded = files[index].chunkNo * 1024 * options.chunkSize;\r\n                const status = files[index].status;\r\n                if (uploaded > file.size) {\r\n                    uploaded = file.size;\r\n                }\r\n                return {\r\n                    fileName: file.name,\r\n                    size: file.size,\r\n                    uploaded: uploaded,\r\n                    dataFile: file,\r\n                    status: status\r\n                };\r\n            }\r\n        },\r\n\r\n        upload() {\r\n            for (let i = 0; i < files.length; i++) {\r\n                if (files[i].status == statusList.inserted)\r\n                    files[i].upload();\r\n            }\r\n        }\r\n    };\r\n}\r\n\r\nmodule.exports = fileUploadModelObject;\r\n\n\n//# sourceURL=webpack:///./src/fileUploadModelObject.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function isNull(value) {\r\n    return typeof value === 'undefined';\r\n}\r\n\r\nfunction extractExtensions(name) {\r\n    const regex = /\\.[a-zA-Z0-9]+/g;\r\n    let cond = null; \r\n    let result = null;\r\n    do {\r\n        result = cond;\r\n        cond = regex.exec(name);\r\n    } while (cond !== null);\r\n    return result !== null ? result[0].substring(1) : null;\r\n}\r\n\r\nmodule.exports = {\r\n    isNull,\r\n    extractExtensions,\r\n};\r\n\n\n//# sourceURL=webpack:///./src/utils.js?");

/***/ })

/******/ });