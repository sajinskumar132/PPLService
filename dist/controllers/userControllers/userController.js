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
exports.login = exports.signUp = void 0;
const User_1 = __importDefault(require("../../Models/Users/User"));
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phoneNumber, password } = req.body;
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser)
            return res.status(400).json({ data: null, message: `User with ${email} already exists` });
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
        if (!password.trim()) {
            errors.push('passoword is required');
        }
        if (errors.length > 0)
            return res.status(400).json({ data: null, message: errors.toString() });
        const encryptPassword = (0, bcryptjs_1.hashSync)(password);
        const newUser = new User_1.default({ name, email, phoneNumber, role: "user", password: encryptPassword });
        yield newUser.save();
        if (newUser) {
            const token = jsonwebtoken_1.default.sign({ id: newUser._id }, process.env.SeacretKey, { expiresIn: '7D' });
            const data = {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                token
            };
            return res.status(201).json({ data: data, message: "Sucessfully Created" });
        }
        else {
            return res.status(400).json({ data: null, message: "failed Created" });
        }
    }
    catch (error) {
        next(error);
        return res.status(500).json({ data: null, message: "Internal Server error" });
    }
});
exports.signUp = signUp;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const existingUser = yield User_1.default.findOne({ email });
        if (!existingUser)
            return res.status(400).json({ data: null, message: `User with ${email} not exists` });
        const errors = [];
        if (!email.trim()) {
            errors.push('Email is required');
        }
        if (!password.trim()) {
            errors.push('passoword is required');
        }
        if (errors.length > 0)
            return res.status(400).json({ data: null, message: errors.toString() });
        const isValid = (0, bcryptjs_1.compareSync)(password, existingUser.password);
        if (!isValid)
            return res.status(400).json({ data: null, message: `Incorrect password` });
        const token = jsonwebtoken_1.default.sign({ id: existingUser._id }, process.env.SeacretKey, { expiresIn: '7D' });
        const data = {
            id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
            token
        };
        return res.status(200).json({ data: data, message: "Sucessfully Created" });
    }
    catch (error) {
        next(error);
        return res.status(500).json({ data: null, message: "Internal Server error" });
    }
});
exports.login = login;
