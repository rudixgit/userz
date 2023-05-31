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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateview = exports.scrapeArticle = exports.scrheaders = exports.extractOpenGraphImage = exports.getUniqueStrings = exports.filterSanitizedHTML = exports.parseSanitizedHTML = void 0;
var readability_1 = require("@mozilla/readability");
var jsdom_1 = require("jsdom");
var Nano = require("nano");
var sanitizeHtml = require("sanitize-html");
var ulid_1 = require("ulid");
var nano = Nano('https://db.kloun.lol');
var db = nano.db.use('db');
function parseSanitizedHTML(html) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var dom, elements, sanitized, i, element, src;
        return __generator(this, function (_b) {
            dom = new jsdom_1.JSDOM(html);
            elements = dom.window.document.body.children;
            sanitized = [];
            for (i = 0; i < elements.length; i++) {
                element = elements[i];
                if (element.tagName.toLowerCase() === 'p') {
                    sanitized.push({ type: 'p', content: (_a = element.textContent) !== null && _a !== void 0 ? _a : '' });
                }
                else if (element.tagName.toLowerCase() === 'img') {
                    src = element.getAttribute('src');
                    if (src) {
                        sanitized.push({ type: 'img', content: src });
                    }
                }
            }
            return [2 /*return*/, sanitized];
        });
    });
}
exports.parseSanitizedHTML = parseSanitizedHTML;
function filterSanitizedHTML(sanitized, filters) {
    return sanitized.filter(function (obj) {
        for (var _i = 0, filters_1 = filters; _i < filters_1.length; _i++) {
            var filter = filters_1[_i];
            if (obj.content.startsWith(filter) || obj.content.length < 7) {
                return false; // Filter out this object
            }
        }
        return true; // Keep this object
    });
}
exports.filterSanitizedHTML = filterSanitizedHTML;
var getUniqueStrings = function (inputArray) {
    return Array.from(new Set(inputArray));
};
exports.getUniqueStrings = getUniqueStrings;
function extractOpenGraphImage(html) {
    var dom = new jsdom_1.JSDOM(html);
    var meta = dom.window.document.querySelector('meta[property="og:image"]');
    return meta ? meta.getAttribute('content') : null;
}
exports.extractOpenGraphImage = extractOpenGraphImage;
exports.scrheaders = {
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Mobile/15E148 Safari/604.1",
};
function scrapeArticle(url, filters, type) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var exist, response, d, doc, reader, image, article, sanit, pimgtags, docx, conditions, test, x;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, db.get(url).catch(function () { })];
                case 1:
                    exist = _b.sent();
                    if (exist) {
                        console.log('exist');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, db.insert({ _id: url }).catch(function () { })];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, fetch(url, {
                            method: "GET",
                            headers: exports.scrheaders,
                        })];
                case 3:
                    response = _b.sent();
                    return [4 /*yield*/, response.text()];
                case 4:
                    d = _b.sent();
                    doc = new jsdom_1.JSDOM(d);
                    reader = new readability_1.Readability(doc.window.document);
                    image = (_a = doc.window.document
                        .querySelector('meta[property="og:image"]')) === null || _a === void 0 ? void 0 : _a.getAttribute("content");
                    article = reader.parse();
                    sanit = sanitizeHtml((article === null || article === void 0 ? void 0 : article.content) || "", {
                        allowedTags: ["p", "img"],
                        allowedAttributes: {
                            img: ["src"],
                        },
                    });
                    return [4 /*yield*/, parseSanitizedHTML(sanit)];
                case 5:
                    pimgtags = _b.sent();
                    docx = {
                        title: article === null || article === void 0 ? void 0 : article.title.replace('- Mediapool.bg', '').replace('- новини СЕГА', ''),
                        html: filterSanitizedHTML(pimgtags, filters),
                        nid: (0, ulid_1.ulid)(),
                        type: type || 'NewsBG',
                        date: new Date().toLocaleString("en-US", { timeZone: "Europe/Sofia" }),
                        link: url,
                        image: image || '',
                    };
                    conditions = ["NOVA", "Видео", "Снимки", "СНИМКИ", "ВИДЕО"];
                    test = conditions.some(function (el) { return docx.title.includes(el); });
                    if (!!test) return [3 /*break*/, 7];
                    return [4 /*yield*/, db.insert(docx)];
                case 6:
                    x = _b.sent();
                    console.log(x);
                    return [2 /*return*/, docx];
                case 7:
                    console.log(docx.title, ' forbidden title');
                    return [2 /*return*/, null];
            }
        });
    });
}
exports.scrapeArticle = scrapeArticle;
function updateview() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.view('newsbg', 'news', {
                        reduce: false,
                        limit: 1,
                        update: 'lazy'
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.updateview = updateview;
