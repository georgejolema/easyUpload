# Easy upload
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
Copy easyUpload.js to your src folder and your all set to go.

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

To initialize with chunkSize specified
```javascript
$("#txtFile").upload({additional:{param1: 'value1', param2: 56}});
```
Get or set the chunkSize after initialization:

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

To initialize with chunkSize specified
```javascript
$("#txtFile").upload({url:'/upload'});
```
Get or set the chunkSize after initialization:

```javascript
//getter
$("#txtFile").upload("config","url");
//setter
$("#txtFile").upload("config",{url:"/upload"});
```
