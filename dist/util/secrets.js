"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGODB_URI = process.env["MONGODB_URI"];
if (!exports.MONGODB_URI) {
    console.log("No mongo connection string. Set MONGODB_URI environment variable.");
    process.exit(1);
}
exports.JWT_SECRET = process.env["JWT_SECRET"];
if (!exports.JWT_SECRET) {
    console.log("No JWT secret string. Set JWT_SECRET environment variable.");
    process.exit(1);
}
//# sourceMappingURL=secrets.js.map