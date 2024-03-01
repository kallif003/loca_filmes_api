"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const locationSchema = new mongoose_1.default.Schema({
    movie: {
        type: String,
        required: true,
        trim: true,
    },
    customer: {
        type: String,
        required: true,
        trim: true,
    },
    docNum: {
        type: String,
        required: true,
        trim: true,
    },
    date_devolution: {
        type: Date,
        default: Date.now,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updateAt: {
        type: Date,
    },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
});
const Location = mongoose_1.default.model("location", locationSchema);
exports.default = Location;
//# sourceMappingURL=location.js.map