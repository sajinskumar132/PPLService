"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const User = new mongoose_1.Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    bookings: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Booking' }]
});
exports.default = (0, mongoose_1.model)("User", User);
