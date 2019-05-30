"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.productSchema = new mongoose_1.Schema({
    productId: {
        type: String, required: true,
        unique: true
    },
    name: String,
    price: Number,
    quantity: Number
});
exports.Product = mongoose_1.model("Product", exports.productSchema);
//# sourceMappingURL=product.js.map