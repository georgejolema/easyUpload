const $ = window.jQuery;
const fileUploadModelObject = require('./fileUploadModelObject');

$.fn.upload = upload;

function upload(options, params)
{

    if (typeof options === 'string') {
        const fileUploadModel = this[0].fileUploadModel;
        if (typeof fileUploadModel[options] == 'function')
            return fileUploadModel[options](params);
    }
    else {
        this[0].fileUploadModel = fileUploadModelObject(this, options);
    }
    return this;
}
