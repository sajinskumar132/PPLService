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
exports.login = exports.SignUp = void 0;
const ServiceUser_1 = __importDefault(require("../../Models/ServiceProviders/ServiceUser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = require("bcryptjs");
const SignUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phoneNumber, adharNumber, password } = req.body;
        const errors = [];
        if (!name.trim()) {
            errors.push('Name is required');
        }
        if (!email.trim()) {
            errors.push('Email is required');
        }
        if (!phoneNumber.trim()) {
            errors.push('phoneNumber is required');
        }
        if (!adharNumber.trim()) {
            errors.push('adharNumber is required');
        }
        if (!password.trim()) {
            errors.push('passoword is required');
        }
        if (errors.length > 0)
            return res.status(400).json({ data: null, message: errors.toString() });
        const existingUser = yield ServiceUser_1.default.findOne({ email });
        if (existingUser)
            return res.status(400).json({ data: null, message: `User with ${email} already exists` });
        const encodePassword = (0, bcryptjs_1.hashSync)(password);
        const newServiceUser = new ServiceUser_1.default({ name, email, phoneNumber, adharNumber, password: encodePassword, role: 'service', isVerified: true });
        yield newServiceUser.save();
        const token = jsonwebtoken_1.default.sign({ id: newServiceUser._id }, process.env.SeacretKey, { expiresIn: '7D' });
        const data = {
            id: newServiceUser._id,
            name: newServiceUser.name,
            email: newServiceUser.email,
            role: newServiceUser.role,
            token
        };
        return res.status(201).json({ data: data, message: "Sucessfully Signup" });
    }
    catch (error) {
        next(error);
        return res.status(500).json({ daa: null, message: "Internal Server error" });
    }
});
exports.SignUp = SignUp;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const errors = [];
        if (!email.trim()) {
            errors.push('Email is required');
        }
        if (!password.trim()) {
            errors.push('passoword is required');
        }
        if (errors.length > 0)
            return res.status(400).json({ data: null, message: errors.toString() });
        const existingUser = yield ServiceUser_1.default.findOne({ email });
        if (!existingUser)
            return res.status(400).json({ data: null, message: `User with ${email} does not exists` });
        const isValid = (0, bcryptjs_1.compareSync)(password, existingUser.password);
        if (!isValid)
            return res.status(400).json({ data: null, message: `Incorrect password` });
        if (!existingUser.isVerified)
            return res.status(400).json({ data: null, message: `User is not verified` });
        const token = jsonwebtoken_1.default.sign({ id: existingUser._id }, process.env.SeacretKey, { expiresIn: '7D' });
        const data = {
            id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
            role: existingUser.role,
            token
        };
        return res.status(200).json({ data: data, message: "Sucessfully login" });
    }
    catch (error) {
        next(error);
        return res.status(500).json({ data: null, message: "Internal Server error" });
    }
});
exports.login = login;
