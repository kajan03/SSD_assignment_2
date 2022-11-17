const multer = require('multer'); // for uploading files
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");
const CryptoAlgorithm = "aes-256-cbc";
const stream = require("stream");
const execute = require("../utils/queryExecuter");
const { encrypt, decrypt } = require('../crypto')

const thumbStorage = multer.memoryStorage();

// Obviously keys should not be kept in code, these should be populated with environmental variables or key store
const secret = {
    iv: Buffer.from('efb2da92cff888c9c295dc4ee682789c', 'hex'),
    key: Buffer.from('6245cb9b8dab1c1630bb3283063f963574d612ca6ec60bc8a5d1e07ddd3f7c53', 'hex')
}
async function inputData (data) {
    const hashMessage = encrypt(data.body.message)
    let query = `insert into data (userId, message, imagePath) values (${data.user},'${hashMessage}','${data.file.originalname}')`;
    let result = await execute(query);

    if (result.affectedRows > 0) return true;
    return false;
}

async function inputMessageData (data) {
    const hashMessage = encrypt(data.body.message)
    let query = `insert into data (userId, message, imagePath) values (${data.user},'${hashMessage}','NULL')`;
    let result = await execute(query);

    if (result.affectedRows > 0) return true;
    return false;
}

async function getData (data) {
    let query = `select * from data WHERE userId = ${data.user}`;
    let result = await execute(query);

    return result;
}

function encrypt(algorithm, buffer, key, iv) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([cipher.update(buffer),cipher.final()]);
    return encrypted;
};

function decrypt(algorithm, buffer, key, iv) {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const decrypted = Buffer.concat([decipher.update(buffer), decipher.final()]);
    return decrypted;
}

function getEncryptedFile(filePath, key, iv) {
    filePath = getEncryptedFilePath(filePath);
    const encrypted = fs.readFileSync(filePath);
    const buffer = decrypt(CryptoAlgorithm, encrypted, key, iv);
    return buffer;
}

function getEncryptedFilePath(filePath) {
    return path.join(path.dirname(filePath), path.basename(filePath, path.extname(filePath)) + "_encrypted" + path.extname(filePath))
}


function saveEncryptedFile(buffer, filePath, key, iv) {
    const encrypted = encrypt(CryptoAlgorithm, buffer, key, iv);

    filePath = getEncryptedFilePath(filePath);
    if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath))
    }

    fs.writeFileSync(filePath, encrypted);
}

// uploading image on server
const thumbUploadMulter = multer({ storage: thumbStorage });
// return response image is uploaded or not
const thumbImageUpload = function (req, res) {
    console.log("Uploading file:", req.body);
    if (!req.file) {
        console.log("No file received");
        return res.status(200).json([{ success: 'Fail to upload image, No image received' }])
    } else {

        console.log('file received');
        const inputValue = inputData(req);

        if (inputValue) {
            saveEncryptedFile(req.file.buffer, path.join("./uploads", req.file.originalname), secret.key, secret.iv);
            return res.status(200).json([{ success: 'Successfully uploaded image' }])
        }
    }
};

const readImage = function (req, res) {
    console.log("Getting file:", req.params.fileName);
    const buffer = getEncryptedFile(path.join("./uploads", req.params.fileName), secret.key, secret.iv);
    const readStream = new stream.PassThrough();
    readStream.end(buffer);
    res.writeHead(200, {
        "Content-disposition": "attachment; filename=" + req.params.fileName,
        "Content-Type": "application/octet-stream",
        "Content-Length": buffer.length
    });
    res.end(buffer);
};

const readImages = function (req, res) {

    const results =  getData(req);  

    results.then(function(result) {
        res.status(200).json(result);
     })

};

// return response image is uploaded or not
const messageUpload = function (req, res) {

    const inputValue = inputMessageData(req);
    console.log("Uploading message:", req.body);

    return res.status(200).json([{ success: 'Successfully uploaded message' }])
    
};

exports.thumbUploadMulter = thumbUploadMulter;
exports.thumbImageUpload = thumbImageUpload;
exports.readImage = readImage;
exports.readImages = readImages
exports.messageUpload = messageUpload;