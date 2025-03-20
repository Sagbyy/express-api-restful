"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const initHandler = (app) => {
    app.get("/ping", (req, res) => {
        res.send({ message: "pong" });
    });
};
exports.default = initHandler;
