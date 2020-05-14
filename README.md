# EasyuploadJS
Easy to implement upload control that is integrated with jquery. Some of the good features that I can list:

  - Easy to implement
  - Integrated with jquery
  - Compatible with asp.net core

### Version
1.0.0

### Dependency
Easy upload depends of:
* [jQuery]

### Installation
Copy dist/easyUpload.js to your src folder and your all set to go.

### Implementation
Add the reference in your html file.
```html
<script src="/src/easyUpload.js"></script>
```
### How to use
```html
<input type="file" id="#txtFile" name="#txtFile" multiple class="hidden"/>
```
```javascript
$(function(){
  $("#txtFile").upload(options)
});
```
## API
### Elements
##### Attributes:
* chunkSize
* disallowedExtensions
* allowedExtensions
* maxNumFiles
* maxFileSize
* modestring64
* autoUpload
* additional
* url

##### Events:
* onStartedUploading
* onFinishedUploadingFile
* onFinishedUploadingFiles
* onError
* onChunkUploaded
* onfilesSelected

##### Methods
* config
* status
* stop
* pause
* resume
* retry
* deleteFile
* getFilesList
* getFile
* upload

### Attributes
#### chunkSize
**Type:** int

**Default:** 50

Determine the size in kb that every piece of the file is going to be transferred to the server.

**Code example**

To initialize with chunkSize specified
```javascript
$("#txtFile").upload({chunkSize:100});
```
Get or set the chunkSize after initialization:

```javascript
//getter
$("#txtFile").upload("config","chunkSize");
//setter
$("#txtFile").upload("config",{chunkSize:50});

```

#### disallowedExtensions
**Type:** Array of string

**Default:** null

Indicates which file extensions are not allowed to upload. In the case some disallowed file is selected for uploading, it will be ignored. If disallowed extensions is null then there is no restriction for files that can be included in the upload.

Note: If allowed extensions is set, this option will be ignored


**Code example**

To initialize with disallowedExtensions specified
```javascript
$("#txtFile").upload({disallowedExtensions:["exe", "bat", "dll", "js"]});
```
Get or set the disallowedExtensions after initialization:

```javascript
//getter
$("#txtFile").upload("config"," disallowedExtensions");
//setter
$("#txtFile").upload("config",{ disallowedExtensions:["doc", "docx", "mp4"]});

```


#### allowedExtensions
**Type:** Array of string

**Default:** null

Indicates which file extensions are allowed to upload. In the case some disallowed file is selected for uploading, it will be ignored. If allowed extensions is null then there is no restriction for files that can be included in the upload.

**Code example**

To initialize with allowedExtensions specified
```javascript
$("#txtFile").upload({allowedExtensions:["exe", "bat", "dll", "js"]});
```
Get or set the allowedExtensions after initialization:

```javascript
//getter
$("#txtFile").upload("config"," allowedExtensions");
//setter
$("#txtFile").upload("config",{ allowedExtensions:["doc", "docx", "mp4"]});
```


#### maxFileSize
**Type:** int

**Default:** 0

Determine the max size allowed in bits that every file must have. If maxFileSize is zero it will not restrict files by size

**Code example**

To initialize with maxFileSize specified
```javascript
$("#txtFile").upload({maxFileSize:100});
```
Get or set the maxFileSize after initialization:

```javascript
//getter
$("#txtFile").upload("config","maxFileSize");
//setter
$("#txtFile").upload("config",{maxFileSize:50});

```


#### maxNumFiles
**Type:** int

**Default:** 0

Determine the max number of files allowed per upload. If maxNumFiles is zero it will not restrict by this parameter.

**Code example**

To initialize with maxNumFiles specified
```javascript
$("#txtFile").upload({maxNumFiles:5});
```
Get or set the maxNumFiles after initialization:

```javascript
//getter
$("#txtFile").upload("config","maxNumFiles");
//setter
$("#txtFile").upload("config",{maxNumFiles:50});
```


#### autoUpload
**Type:** bool

**Default:** false

Determine the size in kb that every piece of the file is going to be transferred to the server.

**Code example**

To initialize with autoUpload specified
```javascript
$("#txtFile").upload({autoUpload:false});	
```
Get or set the autoUpload after initialization:

```javascript
//getter
$("#txtFile").upload("config","autoUpload");
//setter
$("#txtFile").upload("config",{autoUpload:true});
```


#### modestring64
**Type:** bool

**Default:** false

Determine if the files will be uploaded using string64 encoding. This way the file chunks go to the server in the body of the request as a parameter rather than a file.

**Code example**

To initialize with modestring64 specified
```javascript
$("#txtFile").upload({modestring64:true});
```
Get or set the modestring64 after initialization:

```javascript
//getter
$("#txtFile").upload("config","modestring64");
//setter
$("#txtFile").upload("config",{modestring64:false});
```


#### Additional
**Type:** object

**Default:** null

Allows including additional information to the upload when transferring to the server.

**Code example**

To initialize with Additional specified
```javascript
$("#txtFile").upload({additional:{param1: 'value1', param2: 56}});
```
Get or set the Additional after initialization:

```javascript
//getter
$("#txtFile").upload("config","additional");
//setter
$("#txtFile").upload("config",{additional:{param1: 'value1', param2: 56}});
```

#### Url
**Type:** string

Determines the url of the server where the upload is going to send the chunks

**Code example**

To initialize with Url specified
```javascript
$("#txtFile").upload({url:'/upload'});
```
Get or set the Url after initialization:

```javascript
//getter
$("#txtFile").upload("config","url");
//setter
$("#txtFile").upload("config",{url:"/upload"});
```
### Events
#### onfilesSelected([file])
Triggers when a file is selected successfully to upload.
**Code example**

To initialize with onfilesSelected specified
```javascript
$("#txtFile").upload({onfilesSelected:function(file){
	/*code here*/
}});
```
Set the onFileSelected after initialization:

```javascript
//setter
$("#txtFile").upload("config",{onfilesSelected:function(file){
	/*code here*/
}});
```
#### onFinishedUploadingFiles([successful], [error])
Triggers when all the files finished uploading or with errors.
**Code example**

To initialize with chunkSize specified
```javascript
$("#txtFile").upload({onFinishedUploadingFiles:function(successful, error){
	/*code here*/
}});
```
Set the onFinishedUploadingFiles after initialization:

```javascript
//setter
$("#txtFile").upload("config",{onFinishedUploadingFiles:function(successful, error){
	/*code here*/
}});
```

#### onFinishedUploadingFile([file])
Triggers when a file has uploaded successfully.
**Code example**

To initialize with onFinishedUploadingFile specified
```javascript
$("#txtFile").upload({onFinishedUploadingFile:function(file){
	/*code here*/
}});
```
Set the onFinishedUploadingFile after initialization:

```javascript
//setter
$("#txtFile").upload("config",{onFinishedUploadingFile:function(file){
	/*code here*/
}});
```

#### onfilesSelected([file])
Triggers when a file is selected successfully to upload.
**Code example**

To initialize with chunkSize specified
```javascript
$("#txtFile").upload({onfilesSelected:function(file){
	/*code here*/
}});
```
Set the onFileSelected after initialization:

```javascript
//setter
$("#txtFile").upload("config",{onfilesSelected:function(file){
	/*code here*/
}});
```

#### onChunkUploaded([file], [chunkNo], [uploaded])
Triggers when a piece of a file uploaded successfully to upload.
**Code example**

To initialize with onChunkUploaded specified
```javascript
$("#txtFile").upload({onChunkUploaded:function(file, chunkNo, uploaded){
	/*code here*/
}});
```
Set the onChunkUploaded after initialization:

```javascript
//setter
$("#txtFile").upload("config",{onChunkUploaded:function(file, chunkNo, uploaded){
	/*code here*/
}});
```
#### onError([data])
Triggers when a piece of a file uploaded successfully to upload.
**Code example**

To initialize with onError specified
```javascript
$("#txtFile").upload({onError:function(data){
	/*code here*/
}});
```
Set the onError after initialization:

```javascript
//setter
$("#txtFile").upload("config",{onError:function(data){
	/*code here*/
}});
```

### Methods
#### Config
Allows getting or settings values to attributes or events after initialization. It is possible to retreieve or set any attribute or event to the upload control.

**Code example**

Set values after initialization:

```javascript
//setter
$("#txtFile").upload("config",{
	onError:function(data){
	/*code here*/
	}
    chunkSize:100,
    url:'/upload',
    onError:function(data){/*my code*/}
});
```

Get values after initialization
```javascript
//setter
var url = $("#txtFile").upload("config","url");
var chunkSize = $("#txtFile").upload("config","chunkSize");
var allowedExtensions = $("#txtFile").upload("config","allowedExtensions");
```
#### status
Returns an enumerable with a list of the status that a file can have before, during and after uploading.

**Code example**

```javascript
//setter
 var statusList=$('#txtFile').upload('status');
 /*The status list returns the following values
 {
        inserted: 0,
        uploading: 1,
        uploaded: 2,
        paused: 3,
        stopped: 4,
        error: -1
    }
 */
```

#### upload

If there is at least one file selected and if it is set the property autoUpload as false, this allows the upload start sending chunks to the server.

**Code example**
```javascript
//setter
 $('#txtFile').upload('upload');
```
#### stop
If there is any file whose status is not error, stopped or inserted this method allows interrupting the upload permanently. Also it will send the server a request using the delete verb indicating that the upload has been aborted.

**Code example**
```javascript
//setter
 $('#txtFile').upload('stop', "filename.pdf");
```
#### pause
If there is any file whose status is not error, stopped or inserted this method allows interrupting the upload without canceling. 
**Code example**
```javascript
//setter
 $('#txtFile').upload('pause', "filename.pdf");
```


#### resume

If there is any file whose status is paused this method allows resuming the upload from where it left off. 
**Code example**
```javascript
//setter
 $('#txtFile').upload('resume', "filename.pdf");
```

#### retry
If there is any file whose status is error this method allows resuming the upload from where it left off. 
**Code example**
```javascript
//setter
 $('#txtFile').upload('resume', "filename.pdf");
```
#### deleteFile
If there is any file whose status is inserted this method allows removing the file from the upload control. 
**Code example**
```javascript
//setter
 $('#txtFile').upload('delete', "filename.pdf");
```

#### getFilesList
This method allows retrieving a list of all the files that have been inserted to the upload control no matter their status.
**Code example**
```javascript
//setter
 var file = $('#txtFile').upload('getFilesList');
```

#### getFile
This method allows retrieving a file, given a name, from upload control no matter its status.
**Code example**
```javascript
//setter
 var file = $('#txtFile').upload('getFile', 'fileName.pdf');
```
