"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_controller_1 = __importDefault(require("../../abstract/abstract.controller"));
const admin_member_service_1 = __importDefault(require("../adminService/admin.member.service"));
class AdminMemberController extends abstract_controller_1.default {
    constructor() {
        super();
        this.adminMemberService = new admin_member_service_1.default();
        // create member controller
        this.createMember = this.asyncWrapper.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.admin;
            const { name, email, phone, address, board_meeting_date, board_meeting_number, chairman_name, boardCommittee, } = req.body;
            // console.log(req.body);
            const memberBody = {
                name,
                email,
                phone,
                address,
                board_meeting_date,
                board_meeting_number,
                chairman_name,
                created_by: id,
            };
            if (!boardCommittee) {
                res.status(this.StatusCode.HTTP_UNPROCESSABLE_ENTITY).json({
                    success: false,
                    message: 'You must provide board committee',
                });
                return;
            }
            let board = JSON.parse(boardCommittee);
            const files = req.files || [];
            // console.log({ files });
            files.forEach((item) => {
                if (item.fieldname === 'avatar' ||
                    item.fieldname === 'chairman_signature') {
                    memberBody[item.fieldname] = item.filename;
                }
                else {
                    board = board.map((com) => {
                        if (com.name === item.fieldname) {
                            return Object.assign(Object.assign({}, com), { signature: item.filename });
                        }
                        else {
                            return com;
                        }
                    });
                }
            });
            // console.log({ board });
            const _a = yield this.adminMemberService.createMember(Object.assign(Object.assign({}, memberBody), { boardCommittee: board })), { code } = _a, data = __rest(_a, ["code"]);
            if (data.success) {
                res.status(code).json(data);
                // await this.createAudit(
                //   id,
                //   'created member. Member id' + data.data?.id,
                //   code
                // );
            }
            else {
                this.error(data.message, code);
            }
        }));
        // get member controller
        this.getMember = this.asyncWrapper.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { status } = req.query;
            const _b = yield this.adminMemberService.getMember({
                status: status,
            }), { code } = _b, data = __rest(_b, ["code"]);
            res.status(code).json(data);
        }));
        // get single member controller
        this.getSingleMember = this.asyncWrapper.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const _c = yield this.adminMemberService.getSingleMember(id), { code } = _c, data = __rest(_c, ["code"]);
            res.status(code).json(data);
        }));
        // update member controller
        this.updateMember = this.asyncWrapper.wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { id: admin_id } = req.admin;
            const body = req.body;
            const files = req.files || [];
            if (files.length) {
                files.forEach((item) => {
                    body[item.fieldname] = item.filename;
                });
            }
            const _d = yield this.adminMemberService.updateMember(id, body), { code } = _d, data = __rest(_d, ["code"]);
            yield this.createAudit(admin_id, 'updated member. Member id' + id, code);
            if (data.success) {
                res.status(code).json(data);
            }
            else {
                this.error(data.message, code);
            }
        }));
    }
}
exports.default = AdminMemberController;
//# sourceMappingURL=admin.member.controller.js.map