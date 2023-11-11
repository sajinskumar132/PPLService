"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MongoDbConnet_1 = __importDefault(require("./connetion/MongoDbConnet"));
const dotenv_1 = require("dotenv");
const UserRoute_1 = __importDefault(require("./Routes/UserRoute"));
const ServiceRoutes_1 = __importDefault(require("./Routes/ServiceRoutes"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/user', UserRoute_1.default);
app.use('/service', ServiceRoutes_1.default);
const Server = () => {
    (0, MongoDbConnet_1.default)(process.env.MongoDbUrl).then(() => {
        app.listen(process.env.Port, () => {
            console.log("Server started");
        });
    });
};
Server();
