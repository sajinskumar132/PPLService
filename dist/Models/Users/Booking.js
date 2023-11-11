"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Booking = new mongoose_1.Schema({
    serviceId: { type: String, required: true },
    serviceCategory: { type: String, required: true },
    bookingDate: { type: String, required: true },
    contactNumber: { type: String, required: true },
    alternativeNumber: { type: String, required: true },
    location: { type: String, required: true },
    status: { type: String, required: true },
});
exports.default = (0, mongoose_1.model)("Booking", Booking);
