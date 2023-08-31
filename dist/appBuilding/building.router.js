"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const build_crud_router_1 = __importDefault(require("./buildingRoute/build.crud.router"));
class BuildingRouter {
    constructor() {
        this.BuildingRouter = (0, express_1.Router)();
        this.CrudBuildingRouter = new build_crud_router_1.default();
        this.callRouter();
    }
    callRouter() {
        this.BuildingRouter.use("/", this.CrudBuildingRouter.router);
    }
}
exports.default = BuildingRouter;
//# sourceMappingURL=building.router.js.map