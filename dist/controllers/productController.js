"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
class ProductController {
    getProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield product_1.Product.find();
            res.json({ products });
        });
    }
    getProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_1.Product.findOne({ productId: req.params.id });
            if (product === null) {
                res.sendStatus(404);
            }
            else {
                res.json(product);
            }
        });
    }
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProduct = new product_1.Product(req.body);
            const product = yield product_1.Product.findOne({ productId: req.body.productId });
            if (product === null) {
                const result = yield newProduct.save();
                if (result === null) {
                    res.sendStatus(500);
                }
                else {
                    res.status(201).json({ status: 201, data: result });
                }
            }
            else {
                res.sendStatus(422);
            }
        });
    }
    updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_1.Product.findOneAndUpdate({ productId: req.params.id }, req.body);
            if (product === null) {
                res.sendStatus(404);
            }
            else {
                const updatedProduct = Object.assign({ productId: req.params.id }, req.body);
                res.json({ status: res.status, data: updatedProduct });
            }
        });
    }
    deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_1.Product.findOneAndDelete({ productId: req.params.id });
            if (product === null) {
                res.sendStatus(404);
            }
            else {
                res.json({ response: "Product deleted Successfully" });
            }
        });
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=productController.js.map