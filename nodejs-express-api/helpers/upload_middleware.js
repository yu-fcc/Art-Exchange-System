
import config from '../config.js';
import uploader from './uploader.js';

function fileUploadMiddleware(fieldName, fileFormName = 'file') {
    return function (req, res, next) {
        let uploadField = fieldName || req.params.fieldname;
        const uploadSettings = config.upload[uploadField];
        if (!uploadSettings) {
            return res.badRequest(`No upload settings found for ${uploadField}`);
        }
        uploader.upload(uploadField, fileFormName).array(fileFormName)(req, res, (err) => {
            if(err){
                console.error(err);
                return res.badRequest(err.message);
            }
            return next();
        });
    }
}

export { fileUploadMiddleware };