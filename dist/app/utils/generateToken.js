"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (payLoad, secret, expiresIn) => {
    const accessToken = jsonwebtoken_1.default.sign(payLoad, secret, {
        expiresIn,
    });
    return accessToken;
};
exports.generateToken = generateToken;
