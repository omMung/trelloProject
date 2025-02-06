"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadInterceptor = exports.multerOptions = void 0;
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
exports.multerOptions = {
    storage: (0, multer_1.diskStorage)({
        destination: './cardfiles',
        filename: (req, file, callback) => {
            const date = new Date();
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hour = String(date.getHours()).padStart(2, '0');
            const minute = String(date.getMinutes()).padStart(2, '0');
            const formattedDate = `${year}${month}${day}-${hour}${minute}`;
            const originalname = file.originalname.replace(/[^a-zA-Z0-9.]/g, '_');
            callback(null, `${formattedDate}-${randomCode()}-${originalname}`);
        },
    }),
    fileFilter: (req, file, callback) => {
        callback(null, true);
    },
};
function randomCode(length = 4) {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}
exports.FileUploadInterceptor = (0, platform_express_1.FileInterceptor)('file', exports.multerOptions);
//# sourceMappingURL=file.interceptor.js.map