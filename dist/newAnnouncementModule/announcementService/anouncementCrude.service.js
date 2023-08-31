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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_service_1 = __importDefault(require("../../abstract/abstract.service"));
class announcemnetCrudService extends abstract_service_1.default {
    constructor() {
        super();
    }
    createAnnouce({ announcement_created_by, announcement_topic, announcemet_text, announcemet_date, announcemet_for }) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.db('announcement')
                .insert({ announcement_created_by, announcement_topic, announcemet_text, announcemet_date, announcemet_for });
            if (res.length) {
                return {
                    success: true,
                    code: 201,
                    message: 'Hello Bro',
                    data: {
                        id: res[0],
                    },
                };
            }
            else {
                return {
                    success: false,
                    code: 401,
                    message: 'meow',
                };
            }
        });
    }
}
exports.default = announcemnetCrudService;
//# sourceMappingURL=anouncementCrude.service.js.map