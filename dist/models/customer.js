"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const customerSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    surname: {
        type: String,
        required: true,
        trim: true,
    },
    role: [
        {
            type: String,
            required: false,
        },
    ],
    email: {
        type: String,
        trim: true,
        require: false,
        lowercase: true,
        validate: {
            validator(value) {
                return value.includes("@");
            },
            message: "Email inválido",
        },
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    cep: {
        type: String,
        required: true,
        trim: true,
    },
    street: {
        type: String,
        required: true,
        trim: true,
    },
    district: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    state: {
        type: String,
        required: true,
        trim: true,
    },
    docNum: {
        type: String,
        required: true,
        trim: true,
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
const Customer = mongoose_1.default.model("Customer", customerSchema);
exports.default = Customer;
//# sourceMappingURL=customer.js.map