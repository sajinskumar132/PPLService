"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Service = new mongoose_1.Schema({
    userId: { type: String, required: true },
    category: { type: String, required: true },
    experience: { type: String, required: true },
    description: { type: String },
    location: { type: String, required: true },
    status: { type: String, required: true }
});
exports.default = (0, mongoose_1.model)('Service', Service);
