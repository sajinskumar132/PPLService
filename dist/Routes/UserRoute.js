"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userControllers/userController");
const UserRoutes = express_1.default.Router();
UserRoutes.post('/login', userController_1.login);
UserRoutes.post('/signup', userController_1.signUp);
exports.default = UserRoutes;
