"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = require("./app/error/globalErrorHandler");
const notFoundRoute_1 = require("./app/error/notFoundRoute");
// Create Express APP
const app = (0, express_1.default)();
// List of allowed origins
const allowedOrigins = [
    'http://localhost:3000',
    'https://fs-client.vercel.app',
];
const corsOptionsDelegate = function (req, callback) {
    const origin = req.header('Origin');
    let corsOptions;
    if (allowedOrigins.indexOf(origin) !== -1) {
        corsOptions = { origin: true, credentials: true };
    }
    else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};
// Parser
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.options('*', (0, cors_1.default)(corsOptionsDelegate));
app.use((0, cors_1.default)(corsOptionsDelegate));
// Application Routes
app.use('/api', routes_1.default);
// Create handler for GET request /
const getRootController = (req, res) => {
    // Send response text
    res.send('Hello Express JS!');
};
// Route handler for /
app.get('/', getRootController);
// Global Error Handler
app.use(globalErrorHandler_1.globalErrorHandler);
// Not Found Route
app.use(notFoundRoute_1.notFoundRoute);
exports.default = app;
