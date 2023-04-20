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
var jsdom_1 = require("jsdom");
var readability_1 = require("@mozilla/readability");
var ulid_1 = require("ulid");
var sanitizeHtml = require("sanitize-html");
var sanitize_1 = require("./sanitize");
var Nano = require("nano");
var nano = Nano('https://db.kloun.lol');
var db = nano.db.use('db');
var unique = function (value, index, self) {
    return self.indexOf(value) === index;
};
var headers = {
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Mobile/15E148 Safari/604.1",
};
function getArticle(url) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var exist, response, d, doc, reader, image, article, sanit, pimgtags, docx, x;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, db.view('newsbg', 'link', {
                        key: url,
                        limit: 1,
                        update: 'lazy'
                    })];
                case 1:
                    exist = _b.sent();
                    if (exist.rows.length > 0) {
                        console.log('exist');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, fetch(url, {
                            method: "GET",
                            headers: headers,
                        })];
                case 2:
                    response = _b.sent();
                    return [4 /*yield*/, response.text()];
                case 3:
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
                    return [4 /*yield*/, (0, sanitize_1.parseSanitizedHTML)(sanit)];
                case 4:
                    pimgtags = _b.sent();
                    docx = {
                        title: article === null || article === void 0 ? void 0 : article.title,
                        html: (0, sanitize_1.filterSanitizedHTML)(pimgtags, ["Снимка: "]),
                        nid: (0, ulid_1.ulid)(),
                        type: 'NewsBG',
                        insert: new Date().getTime().toString(),
                        link: url,
                        image: image || '',
                    };
                    return [4 /*yield*/, db.insert(docx)];
                case 5:
                    x = _b.sent();
                    console.log(x);
                    return [2 /*return*/, docx];
            }
        });
    });
}
var go = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, d, links1, links;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("https://nova.bg/filter/all", {
                    method: "GET",
                    headers: headers,
                })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.text()];
            case 2:
                d = _a.sent();
                links1 = Array.from(new jsdom_1.JSDOM(d).window.document.querySelectorAll("a"))
                    .map(function (link) { return link.getAttribute("href"); })
                    .filter(function (href) { return href !== null && !href.includes('javascript:') && href.includes('/news/view') && !href.includes('viber:'); });
                links = links1.filter(unique);
                return [4 /*yield*/, Promise.all(links.map(function (link) { return getArticle(link); }))];
            case 3:
                _a.sent();
                return [4 /*yield*/, db.view('newsbg', 'news', {
                        reduce: false,
                        limit: 1,
                        update: 'lazy'
                    })];
            case 4:
                _a.sent();
                return [2 /*return*/, links];
        }
    });
}); };
//getArticle('https://nova.bg/news/view/2023/04/05/407306/пропуски-на-11-сик-в-чужбина-променят-данните-от-вота/').then(() => console.log('done'));
go().then(function (links) { return console.log(links.length); });
