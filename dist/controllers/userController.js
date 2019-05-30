"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_nodejs_1 = __importDefault(require("bcrypt-nodejs"));
const jwt = __importStar(require("jsonwebtoken"));
const passport_1 = __importDefault(require("passport"));
require("../auth/passportHandler");
const user_1 = require("../models/user");
const secrets_1 = require("../util/secrets");
class UserController {
    registerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = bcrypt_nodejs_1.default.hashSync(req.body.password, bcrypt_nodejs_1.default.genSaltSync(10));
            yield user_1.User.create({
                username: req.body.username,
                password: hashedPassword,
            });
            const token = jwt.sign({ username: req.body.username, scope: req.body.scope }, secrets_1.JWT_SECRET);
            res.status(200).send({ token: token });
        });
    }
    authenticateUser(req, res, next) {
        passport_1.default.authenticate("local", function (err, user, info) {
            // no async/await because passport works only with callback ..
            if (err)
                return next(err);
            if (!user) {
                return res.status(401).json({ status: "error", code: "unauthorized" });
            }
            else {
                const token = jwt.sign({ username: user.username }, secrets_1.JWT_SECRET);
                res.status(200).send({ token: token });
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map