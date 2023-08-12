const multer = require("multer");
const path = require("path");

tempDir = path.join(__dirname, "../", "temp");

const multerConf = multer.diskStorage({
    destination: tempDir,
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
})

const upload = multer({
    storage: multerConf,
})

module.exports = upload;