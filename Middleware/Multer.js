const multer = require('multer')

var uploader = multer({
    storage:multer.diskStorage({}),
    limits: {fileSize: 5000000}
})

module.exports = {
    uploader
}