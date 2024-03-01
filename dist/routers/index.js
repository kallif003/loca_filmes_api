"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware");
const cors_1 = __importDefault(require("cors"));
const user_route_1 = __importDefault(require("./user_route"));
const login_route_1 = __importDefault(require("./login_route"));
const customer_route_1 = __importDefault(require("./customer_route"));
const location_route_1 = __importDefault(require("./location_route"));
const router = (app) => {
    app.route("/").get((req, res) => {
        res.status(200).send("Loca Filmes Backend Ativo");
    });
    app.use(express_1.default.json(), (0, cors_1.default)(), user_route_1.default, login_route_1.default, middleware_1.verifyToken, customer_route_1.default, location_route_1.default);
};
exports.default = router;
//# sourceMappingURL=index.js.map