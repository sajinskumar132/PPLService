"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const login = (req, res, next) => {
    try {
        const { name, email, phoneNumber, adharNumber, password } = req.body;
    }
    catch (error) {
        next(error);
        return res.status(500).json({ data: null, message: "Internal Server error" });
    }
};
exports.login = login;
