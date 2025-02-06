"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConstants = void 0;
exports.jwtConstants = {
    secret: process.env.JWT_SECRET || 'supersecretkey',
    expiresIn: '1h',
};
//# sourceMappingURL=jwt.config.js.map