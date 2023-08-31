"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = __importDefault(require("../../abstract/abstract.router"));
const announcementCrud_controller_1 = __importDefault(require("../announcementController/announcementCrud.controller"));
class announcementCrudRouter extends abstract_router_1.default {
    constructor() {
        super();
        //first need a controller
        this.crudController = new announcementCrud_controller_1.default();
        this.callRouter();
    }
    callRouter() {
        //route for fetching all data
        this.router.route('/').get(this.crudController.getAllAnouncements);
        //route for creating announcement
        this.router.route('/create').post(this.crudController.createAnouncement);
    }
}
exports.default = announcementCrudRouter;
//# sourceMappingURL=announcementCrud.router.js.map