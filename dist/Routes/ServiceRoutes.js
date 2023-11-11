"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const serviceUserController_1 = require("../controllers/ServiceUserControllers/serviceUserController");
const ServiceRoutes = express_1.default.Router();
ServiceRoutes.post('/login', serviceUserController_1.login);
ServiceRoutes.post('/signup', serviceUserController_1.SignUp);
exports.default = ServiceRoutes;
