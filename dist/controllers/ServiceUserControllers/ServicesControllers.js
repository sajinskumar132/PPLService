"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewService = exports.getServices = void 0;
const Service_1 = __importDefault(require("../../Models/ServiceProviders/Service"));
const accessTokenAuthenticator_1 = require("../../Services/accessTokenAuthenticator");
const getServices = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Services = yield Service_1.default.find();
        return res.status(200).json({ data: Services, message: "Services" });
    }
    catch (error) {
        next(error);
        return res.status(500).json({ data: null, message: "Internal Server error" });
    }
});
exports.getServices = getServices;
const NewService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[0];
        if (!token)
            return res.status(401).json({ data: null, message: "Unauthorized" });
        const userid = accessTokenAuthenticator_1.accessTokenAuthenticator.TokenAuthenticator(token);
        if (!userid)
            return res.status(401).json({ data: null, message: "Unauthorized" });
        const { category, experience, description, location, status } = req.body;
        const newService = new Service_1.default({ category, experience, description, location, status });
        yield newService.save();
        return res.status(201).json({ data: newService, message: "Sucessfully created service" });
        // ServiceCatogory
    }
    catch (error) {
        next(error);
        return res.status(500).json({ data: null, message: "Internal Server error" });
    }
});
exports.NewService = NewService;
