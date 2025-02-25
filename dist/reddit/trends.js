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
const axios_1 = __importDefault(require("axios"));
const CATEGORIES = [
    'politics', 'crypto', 'tech', 'gossip', 'business',
    'sports', 'education', 'football', 'nigeria-politics', 'nigeria-news'
];
function fetchRedditTrends() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const trends = {};
        for (const category of CATEGORIES) {
            try {
                const url = `https://www.reddit.com/r/${category}/hot.json?limit=5`;
                const response = yield axios_1.default.get(url);
                // Ensure response.data and response.data.children are defined
                if ((_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.children) {
                    trends[category] = response.data.data.children.map((child) => ({
                        title: child.data.title,
                        url: `https://www.reddit.com${child.data.permalink || ''}`,
                    }));
                }
                else {
                    trends[category] = [];
                }
            }
            catch (error) {
                console.error(`Error fetching ${category} trends:`, error);
                trends[category] = [];
            }
        }
        return trends;
    });
}
exports.default = fetchRedditTrends;
