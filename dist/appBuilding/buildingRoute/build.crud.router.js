"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const build_crud_controller_1 = __importDefault(require("./../buildingController/build.crud.controller"));
class CrudBuildRouter extends abstract_router_1.default {
    constructor() {
        super();
        this.BuildingController = new build_crud_controller_1.default();
        this.callRouter();
    }
    callRouter() {
        this.router.route('/').get(this.BuildingController.getBuilding);
    }
}
exports.default = CrudBuildRouter;
//# sourceMappingURL=build.crud.router.js.map