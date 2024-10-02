const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const streamifier = require('streamifier');

cloudinary.config({
    cloud_name: 'dqoryawe2',
    api_key: '279961784458148',
    api_secret: 'EgOm2j_1vdUb9oul-GfmC7cpJ4w',
});
module.exports = (req, res, next) => {
    if (!req.file) {
        next()
        return
    }
    const uploadToCloudinary = (req) => {
        return new Promise((resolve, reject) => {
            let stream = cloudinary.uploader.upload_stream((error, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            });

            streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
    };
    async function upload(req) {
        let result = await uploadToCloudinary(req)
        req.body.image = result.url
        next()
    }
    upload(req)
}

