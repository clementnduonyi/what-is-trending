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
Object.defineProperty(exports, "__esModule", { value: true });
class InMemoryStorage {
    constructor() {
        this.storage = new Map();
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storage.get(key) || null;
        });
    }
    put(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            this.storage.set(key, value);
        });
    }
    delete(key) {
        return __awaiter(this, void 0, void 0, function* () {
            this.storage.delete(key);
        });
    }
}
const storage = new InMemoryStorage();
exports.default = storage;
