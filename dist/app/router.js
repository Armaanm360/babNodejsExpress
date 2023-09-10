"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_router_1 = __importDefault(require("../appAdmin/admin.router"));
const common_router_1 = __importDefault(require("../common/commonRouter/common.router"));
const auth_router_1 = __importDefault(require("../auth/auth.router"));
const trainee_router_1 = __importDefault(require("../appTrainee/traineeRouter/trainee.router"));
const authChecker_1 = __importDefault(require("../common/middlewares/authChecker/authChecker"));
const member_router_1 = __importDefault(require("../appMember/member.router"));
const student_router_1 = __importDefault(require("../appStudent/student.router"));
const announcement_router_1 = __importDefault(require("../newAnnouncementModule/announcement.router"));
const building_router_1 = __importDefault(require("../appBuilding/building.router"));
const app_audit_router_1 = __importDefault(require("./../appAudit/app.audit.router"));
const audit_trail_router_1 = __importDefault(require("../auditTrail/audit.trail.router"));
const pre_user_router_1 = __importDefault(require("../preUser/pre.user.router"));
const payment_router_1 = __importDefault(require("../payment/payment.router"));
class RootRouter {
    constructor() {
        this.v1Router = (0, express_1.Router)();
        this.authChecker = new authChecker_1.default();
        this.adminRouter = new admin_router_1.default();
        this.commonRouter = new common_router_1.default();
        this.authRouter = new auth_router_1.default();
        this.memberRouter = new member_router_1.default();
        this.traineeRouter = new trainee_router_1.default();
        this.studentRouter = new student_router_1.default();
        this.announcementRouter = new announcement_router_1.default();
        this.buildingRouter = new building_router_1.default();
        this.appAudit = new app_audit_router_1.default();
        this.auditTrail = new audit_trail_router_1.default();
        this.preUser = new pre_user_router_1.default();
        this.paymnetRouter = new payment_router_1.default();
        this.callV1Router();
    }
    callV1Router() {
        // auth router for member, admin, trainee
        this.v1Router.use('/auth', this.authRouter.AuthRouter);
        // common router for all
        this.v1Router.use('/common', this.commonRouter.router);
        // admin router all are protected
        this.v1Router.use('/admin', this.authChecker.adminAuthChecker, this.adminRouter.AdminRouter);
        // member router all are protected
        this.v1Router.use('/member', this.authChecker.memberAuthChecker, this.memberRouter.MemberRouter);
        // trainee router all are protected
        this.v1Router.use('/trainee', this.authChecker.traineeAuthChecker, this.traineeRouter.TraineeRouter);
        this.v1Router.use('/student', this.studentRouter.StudentRouter);
        this.v1Router.use('/announcement', this.announcementRouter.announcementrouter);
        //building
        this.v1Router.use('/building', this.buildingRouter.BuildingRouter);
        // external routers some public and some protected
        // this.v1Router.use('/external');
        //create apps
        this.v1Router.use('/apps', this.appAudit.appAuditRouter);
        this.v1Router.use('/audit', this.auditTrail.AuditTrailRouter);
        //create user
        this.v1Router.use('/users', this.preUser.PreUserRouter);
        //payment
        this.v1Router.use('/payment', this.paymnetRouter.Payrouter);
    }
}
exports.default = RootRouter;
//# sourceMappingURL=router.js.map