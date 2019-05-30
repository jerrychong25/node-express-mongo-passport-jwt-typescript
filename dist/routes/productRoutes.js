"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const authController_1 = require("../controllers/authController");
class ProductRoutes {
    constructor() {
        this.productController = new productController_1.ProductController();
        this.authController = new authController_1.AuthController();
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.get("/", this.productController.getProducts);
        this.router.get("/:id", this.productController.getProduct);
        this.router.post("/", this.authController.authenticateJWT, this.productController.createProduct);
        this.router.put("/:id", this.authController.authenticateJWT, this.productController.updateProduct);
        this.router.delete("/:id", this.authController.authenticateJWT, this.productController.deleteProduct);
    }
}
exports.ProductRoutes = ProductRoutes;
//# sourceMappingURL=productRoutes.js.map