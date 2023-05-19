import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute, d as renderComponent, e as renderSlot, f as renderHead, F as Fragment, u as unescapeHTML } from '../astro.7c20b0a4.mjs';
import { chunk, shuffle, uniqBy } from 'lodash';
import { slugify as slugify$1 } from 'transliteration';
/* empty css                                  */import { eng } from 'stopword';
/* empty css                                   */
const url = "https://dbcached.kloun.lol/";
const serialize = (obj) => {
  return Object.entries(obj).map(
    ([key, val]) => `${key}=${key === "key" || key === "start_key" ? `"${val}"` : val}`
  ).join("&");
};
async function fetcher(query) {
  const { db: db2, id, _view, _design, params, insert: insert2 } = query;
  const body = JSON.stringify(query);
  const isPost = body?.includes("_id") || insert2;
  const buildurl = `${url}${db2 ? db2 + "/" : "db/"}${_design ? `_design/${_design}/_view/${_view}?${params}` : ""}${id || ""}`;
  const response = await fetch(buildurl, {
    method: isPost ? "POST" : "GET",
    headers: {
      "Content-Type": "application/json"
    },
    body: isPost ? body : null
  });
  const d = await response.json();
  return d;
}
async function get$1(id) {
  const d = await fetcher({ id, nocdn: "yes" });
  if (d.error) {
    return Promise.resolve({ error: "not found" });
  }
  d.id = d._id;
  return Promise.resolve(d);
}
async function view(id, params) {
  const split = id.split("/");
  const d = await fetcher({
    _design: split[0],
    _view: split[1],
    params: serialize(params)
  });
  const rows = d.rows.map((x) => {
    const val = typeof x.value === "string" ? { value: x.value, ...x.doc } : { ...x.value, ...x.doc };
    return { ...val, id: x.id, key: x.key, value: x.value };
  });
  if (rows.length === 1) {
    return Promise.resolve(rows[0]);
  }
  return Promise.resolve({ ...d, rows });
}
async function insert(obj) {
  const ins = await fetcher(obj);
  return Promise.resolve(ins);
}
async function multiple(db2, obj) {
  const response = await fetch(url + "" + db2 + "/_all_docs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ keys: obj })
  });
  const d = await response.json();
  return Promise.resolve(d.rows);
}
const db = {
  view,
  get: get$1,
  insert,
  multiple
};

const $$Astro$r = createAstro();
function timeAgo(date) {
  const seconds = Math.floor(((/* @__PURE__ */ new Date()).getTime() - date.getTime()) / 1e3);
  const intervals = {
    "\u0433\u043E\u0434\u0438\u043D\u0430": { int: 31536e3, ext: "\u0433\u043E\u0434\u0438\u043D\u0438" },
    "\u043C\u0435\u0441\u0435\u0446": { int: 2592e3, ext: "\u043C\u0435\u0441\u0435\u0446\u0430" },
    "\u0441\u0435\u0434\u043C\u0438\u0446\u0430": { int: 604800, ext: "\u0441\u0435\u0434\u043C\u0438\u0446\u0438" },
    "\u0434\u0435\u043D": { int: 86400, ext: "\u0434\u043D\u0438" },
    "\u0447\u0430\u0441": { int: 3600, ext: "\u0447\u0430\u0441\u0430" },
    "\u043C\u0438\u043D\u0443\u0442\u0430": { int: 60, ext: "\u043C\u0438\u043D\u0443\u0442\u0438" },
    "\u0441\u0435\u043A\u0443\u043D\u0434\u0430": { int: 1, ext: "\u0441\u0435\u043A\u0443\u043D\u0434\u0438" }
  };
  let counter;
  for (const interval in intervals) {
    counter = Math.floor(seconds / intervals[interval].int);
    if (counter > 0) {
      return `\u043F\u0440\u0435\u0434\u0438 ${counter === 1 ? "" : counter} ${counter === 1 ? interval : intervals[interval].ext}`;
    }
  }
  return "";
}
const $$CardNews = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$r, $$props, $$slots);
  Astro2.self = $$CardNews;
  const { title, date, id, key } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<a class="cursor-point md:w-1/3 lg:w-1/4 overflow-hidden newswrap" style="height: 180px;"${addAttribute(`/news/i/${slugify$1(title)}/${id}`, "href")}>
    <div class="flex">
        <div style="width:130px; height: 180px;" class="relative overflow-hidden">
            <img${addAttribute(title, "alt")}${addAttribute("https://kloun.lol/api/img/" + key + ".jpg", "src")} loading="lazy" height="100%" class="absolute top-0 left-0 w-full h-full object-cover">
        </div>

        <div class="flex flex-col  justify-center w-full">
            <h3 class="px-2 font-bold text-slate-300 dark:text-gray-800">
                ${title}
            </h3>
            <div class="pl-2 text-xs">${timeAgo(new Date(date))}</div>
        </div>
    </div>
</a>`;
}, "/home/runner/work/monext/monext/apps/clown/src/components/CardNews.astro");

const $$Astro$q = createAstro();
const $$CatButton = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$q, $$props, $$slots);
  Astro2.self = $$CatButton;
  const { url, title, count } = Astro2.props;
  const formatcount = (count2) => {
    if (count2 > 1500) {
      return `${Math.floor(count2 / 1e3)}k`;
    }
    return count2;
  };
  return renderTemplate`${maybeRenderHead($$result)}<a class="w-full grow sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"${addAttribute(url, "href")}><div class="flex h-full items-center rounded border border-gray-800 bg-gray-800 p-4 dark:border-gray-500 dark:bg-slate-100">
        <div class="flex-1 justify-center align-middle text-white dark:text-gray-800">
            <span class="text-shadow font-black">${title}</span>
        </div>${count && renderTemplate`<div class="btn1-count">${formatcount(count)}</div>`}
    </div></a>`;
}, "/home/runner/work/monext/monext/apps/clown/src/components/CatButton.astro");

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(raw || cooked.slice()) }));
var _a$1;
const $$Astro$p = createAstro();
const $$RudSense = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$p, $$props, $$slots);
  Astro2.self = $$RudSense;
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", '<div class="flex justify-center items-center">\n    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5476404733919333" crossorigin="anonymous"><\/script> \n    <ins class="adsbygoogle w-full rounded-md" style="display:block; min-width: 250px;" data-ad-format="fluid" data-ad-layout-key="-gw-3+1f-3d+2z" data-ad-client="ca-pub-5476404733919333" data-ad-slot="2115206418"></ins>\n    <script>\n        (adsbygoogle = window.adsbygoogle || []).push({});\n    <\/script>\n</div>'])), maybeRenderHead($$result));
}, "/home/runner/work/monext/monext/apps/clown/src/components/RudSense.astro");

const jokecats = [{ "cat": "Разни", "slug": "razni", "count": 25073 }, { "cat": "Семейни", "slug": "semeini", "count": 3870 }, { "cat": "Жени", "slug": "zheni", "count": 3713 }, { "cat": "Бисери", "slug": "biseri", "count": 3571 }, { "cat": "Мръсни", "slug": "mr-sni", "count": 1474 }, { "cat": "Животни", "slug": "zhivotni", "count": 1135 }, { "cat": "Професионални", "slug": "profesionalni", "count": 1134 }, { "cat": "Блондинки", "slug": "blondinki", "count": 1099 }, { "cat": "Любими Герои", "slug": "liubimi-geroi", "count": 1011 }, { "cat": "Програмисти", "slug": "programisti", "count": 934 }, { "cat": "Черен хумор", "slug": "cheren-khumor", "count": 913 }, { "cat": "Политически", "slug": "politicheski", "count": 864 }, { "cat": "Иванчо и Марийка", "slug": "ivancho-i-mariika", "count": 686 }, { "cat": "Пиянски", "slug": "piianski", "count": 666 }, { "cat": "Полицаи", "slug": "politsai", "count": 513 }, { "cat": "Лекари", "slug": "lekari", "count": 512 }, { "cat": "Проститутки", "slug": "prostitutki", "count": 446 }, { "cat": "Спортни", "slug": "sportni", "count": 389 }, { "cat": "Други", "slug": "drugi", "count": 385 }, { "cat": "Студентски", "slug": "studentski", "count": 368 }, { "cat": "Борци", "slug": "bortsi", "count": 343 }, { "cat": "Деца", "slug": "detsa", "count": 323 }, { "cat": "Цигани", "slug": "tsigani", "count": 276 }, { "cat": "Младоженци", "slug": "mladozhentsi", "count": 245 }, { "cat": "Фармацевти", "slug": "farmatsevti", "count": 241 }, { "cat": "Надписи", "slug": "nadpisi", "count": 238 }, { "cat": "Иванчо", "slug": "ivancho", "count": 237 }, { "cat": "Ученически", "slug": "uchenicheski", "count": 230 }, { "cat": "Монаси", "slug": "monasi", "count": 225 }, { "cat": "Глупави", "slug": "glupavi", "count": 224 }, { "cat": "Шофьори", "slug": "shof-ori", "count": 218 }, { "cat": "Евреи", "slug": "evrei", "count": 211 }, { "cat": "Цигари", "slug": "tsigari", "count": 210 }, { "cat": "Радио Ереван", "slug": "radio-erevan", "count": 200 }, { "cat": "Тъщи", "slug": "t-shti", "count": 200 }, { "cat": "Младежи", "slug": "mladezhi", "count": 190 }, { "cat": "Свалки", "slug": "svalki", "count": 188 }, { "cat": "Умрели", "slug": "umreli", "count": 188 }, { "cat": "Кръчми", "slug": "kr-chmi", "count": 185 }, { "cat": "Съседи", "slug": "s-sedi", "count": 184 }, { "cat": "Професии", "slug": "profesii", "count": 183 }, { "cat": "Мъже", "slug": "m-zhe", "count": 182 }, { "cat": "Фейсбук", "slug": "feisbuk", "count": 182 }, { "cat": "Вино", "slug": "vino", "count": 180 }, { "cat": "Доктори", "slug": "doktori", "count": 179 }, { "cat": "Сутиени", "slug": "sutieni", "count": 178 }, { "cat": "Дядовци", "slug": "diadovtsi", "count": 174 }, { "cat": "Ракия", "slug": "rakiia", "count": 170 }, { "cat": "Дебели", "slug": "debeli", "count": 167 }, { "cat": "Америка", "slug": "amerika", "count": 164 }, { "cat": "Крави", "slug": "kravi", "count": 164 }, { "cat": "Подаръци", "slug": "podar-tsi", "count": 164 }, { "cat": "Родители", "slug": "roditeli", "count": 163 }, { "cat": "Щерки", "slug": "shterki", "count": 162 }, { "cat": "Празнични", "slug": "praznichni", "count": 160 }, { "cat": "Тъпизми", "slug": "t-pizmi", "count": 156 }, { "cat": "Прасета", "slug": "praseta", "count": 154 }, { "cat": "SMS", "slug": "sms", "count": 153 }, { "cat": "Адвокати", "slug": "advokati", "count": 153 }, { "cat": "Радио ереван", "slug": "radio-erevan", "count": 153 }, { "cat": "Огледало", "slug": "ogledalo", "count": 152 }, { "cat": "Рожденици", "slug": "rozhdenitsi", "count": 152 }, { "cat": "Гинеколози", "slug": "ginekolozi", "count": 148 }, { "cat": "Директори", "slug": "direktori", "count": 148 }, { "cat": "Хляб", "slug": "khliab", "count": 148 }, { "cat": "Военни", "slug": "voenni", "count": 147 }, { "cat": "Влакове", "slug": "vlakove", "count": 146 }, { "cat": "Наркомански", "slug": "narkomanski", "count": 138 }, { "cat": "Кокошки", "slug": "kokoshki", "count": 135 }, { "cat": "Психиатрия", "slug": "psikhiatriia", "count": 135 }, { "cat": "Катаджии", "slug": "katadzhii", "count": 133 }, { "cat": "Математика", "slug": "matematika", "count": 133 }, { "cat": "Овчари", "slug": "ovchari", "count": 133 }, { "cat": "Бебета", "slug": "bebeta", "count": 132 }, { "cat": "Любовник", "slug": "liubovnik", "count": 132 }, { "cat": "Гадории", "slug": "gadorii", "count": 130 }, { "cat": "Градове", "slug": "gradove", "count": 130 }, { "cat": "Тоалетна", "slug": "toaletna", "count": 130 }, { "cat": "Принцове и принцеси", "slug": "printsove-i-printsesi", "count": 128 }, { "cat": "Грозни", "slug": "grozni", "count": 126 }, { "cat": "Затворници", "slug": "zatvornitsi", "count": 126 }, { "cat": "Марийка", "slug": "mariika", "count": 126 }, { "cat": "Отслабване", "slug": "otslabvane", "count": 126 }, { "cat": "Слонове", "slug": "slonove", "count": 126 }, { "cat": "С*кс", "slug": "s-ks", "count": 125 }, { "cat": "Обувки", "slug": "obuvki", "count": 121 }, { "cat": "Шоколад", "slug": "shokolad", "count": 121 }, { "cat": "Обяд", "slug": "obiad", "count": 120 }, { "cat": "Любовница", "slug": "liubovnitsa", "count": 117 }, { "cat": "Секретарки", "slug": "sekretarki", "count": 117 }, { "cat": "Каква е разликата", "slug": "kakva-e-razlikata", "count": 116 }, { "cat": "Петък", "slug": "pet-k", "count": 114 }, { "cat": "Зима", "slug": "zima", "count": 113 }, { "cat": "Професори", "slug": "profesori", "count": 112 }, { "cat": "Филми", "slug": "filmi", "count": 112 }, { "cat": "Маймуни", "slug": "maimuni", "count": 110 }, { "cat": "Плажове", "slug": "plazhove", "count": 109 }, { "cat": "Плуване", "slug": "pluvane", "count": 109 }, { "cat": "Уиски", "slug": "uiski", "count": 104 }, { "cat": "Русия", "slug": "rusiia", "count": 103 }, { "cat": "Супи", "slug": "supi", "count": 103 }, { "cat": "Чък Норис", "slug": "ch-k-noris", "count": 103 }, { "cat": "Готвачи", "slug": "gotvachi", "count": 102 }, { "cat": "Франция", "slug": "frantsiia", "count": 100 }, { "cat": "Гардероби", "slug": "garderobi", "count": 99 }, { "cat": "Обратни", "slug": "obratni", "count": 98 }, { "cat": "Капитани", "slug": "kapitani", "count": 97 }, { "cat": "Луди", "slug": "ludi", "count": 97 }, { "cat": "Такси", "slug": "taksi", "count": 97 }, { "cat": "Хотели", "slug": "khoteli", "count": 97 }, { "cat": "Ядене", "slug": "iadene", "count": 95 }, { "cat": "Японци", "slug": "iapontsi", "count": 95 }, { "cat": "Заплати", "slug": "zaplati", "count": 93 }, { "cat": "Усмивки", "slug": "usmivki", "count": 93 }, { "cat": "Командировки", "slug": "komandirovki", "count": 91 }, { "cat": "Купони", "slug": "kuponi", "count": 90 }, { "cat": "Чукчи", "slug": "chukchi", "count": 90 }, { "cat": "Лято", "slug": "liato", "count": 89 }, { "cat": "Мутри", "slug": "mutri", "count": 89 }, { "cat": "Сутрин", "slug": "sutrin", "count": 89 }, { "cat": "Изпити", "slug": "izpiti", "count": 88 }, { "cat": "Умни", "slug": "umni", "count": 88 }, { "cat": "Mercedes", "slug": "mercedes", "count": 87 }, { "cat": "Нова година", "slug": "nova-godina", "count": 87 }, { "cat": "Маса", "slug": "masa", "count": 85 }, { "cat": "Съдии", "slug": "s-dii", "count": 85 }, { "cat": "Бай Ганьо", "slug": "bai-gan-o", "count": 83 }, { "cat": "Китай", "slug": "kitai", "count": 83 }, { "cat": "Перничани", "slug": "pernichani", "count": 83 }, { "cat": "Татковци", "slug": "tatkovtsi", "count": 82 }, { "cat": "Банки", "slug": "banki", "count": 80 }, { "cat": "Планина", "slug": "planina", "count": 80 }, { "cat": "България", "slug": "b-lgariia", "count": 79 }, { "cat": "Водка", "slug": "vodka", "count": 79 }, { "cat": "Дискотеки", "slug": "diskoteki", "count": 79 }, { "cat": "София", "slug": "sofiia", "count": 79 }, { "cat": "Телефони", "slug": "telefoni", "count": 78 }, { "cat": "Морето", "slug": "moreto", "count": 77 }, { "cat": "Подсъдими", "slug": "pods-dimi", "count": 77 }, { "cat": "Футбол", "slug": "futbol", "count": 74 }, { "cat": "Ресторанти", "slug": "restoranti", "count": 72 }, { "cat": "Дядо Мраз", "slug": "diado-mraz", "count": 71 }, { "cat": "Началници", "slug": "nachalnitsi", "count": 70 }, { "cat": "Авто", "slug": "avto", "count": 68 }, { "cat": "Котки", "slug": "kotki", "count": 68 }, { "cat": "В ресторанта", "slug": "v-restoranta", "count": 65 }, { "cat": "Комунистически", "slug": "komunisticheski", "count": 63 }, { "cat": "Герои", "slug": "geroi", "count": 62 }, { "cat": "Хасан и Айшето", "slug": "khasan-i-aisheto", "count": 61 }, { "cat": "Кучета", "slug": "kucheta", "count": 59 }, { "cat": "Баби", "slug": "babi", "count": 58 }, { "cat": "Шефове", "slug": "shefove", "count": 57 }, { "cat": "Бойко Борисов", "slug": "boiko-borisov", "count": 56 }, { "cat": "Щирлиц", "slug": "shtirlits", "count": 53 }, { "cat": "Кредити", "slug": "krediti", "count": 52 }, { "cat": "Червената шапчица", "slug": "chervenata-shapchitsa", "count": 51 }, { "cat": "Брюнетки", "slug": "briunetki", "count": 50 }, { "cat": "Бира", "slug": "bira", "count": 48 }, { "cat": "Интернет", "slug": "internet", "count": 48 }, { "cat": "Поручик Ржевски", "slug": "poruchik-rzhevski", "count": 47 }, { "cat": "Телевизия", "slug": "televiziia", "count": 47 }, { "cat": "Петка и Чапаев", "slug": "petka-i-chapaev", "count": 44 }, { "cat": "Пожелания", "slug": "pozhelaniia", "count": 44 }, { "cat": "Годеници", "slug": "godenitsi", "count": 40 }, { "cat": "Кухня", "slug": "kukhnia", "count": 40 }, { "cat": "Кафе", "slug": "kafe", "count": 38 }, { "cat": "Габровски", "slug": "gabrovski", "count": 36 }, { "cat": "Келнери", "slug": "kelneri", "count": 36 }, { "cat": "Расистки", "slug": "rasistki", "count": 36 }, { "cat": "Чапай и Петка", "slug": "chapai-i-petka", "count": 35 }, { "cat": "Жаби", "slug": "zhabi", "count": 33 }, { "cat": "Пари", "slug": "pari", "count": 33 }, { "cat": "Храна", "slug": "khrana", "count": 33 }, { "cat": "Индианци и Каубои", "slug": "indiantsi-i-kauboi", "count": 30 }, { "cat": "Комар", "slug": "komar", "count": 30 }, { "cat": "Ловци", "slug": "lovtsi", "count": 30 }, { "cat": "Нане и Вуте", "slug": "nane-i-vute", "count": 30 }, { "cat": "Сервитьори", "slug": "servit-ori", "count": 30 }, { "cat": "Митничари", "slug": "mitnichari", "count": 29 }, { "cat": "Данъчни", "slug": "dan-chni", "count": 25 }, { "cat": "Джипове", "slug": "dzhipove", "count": 25 }, { "cat": "Канибали", "slug": "kanibali", "count": 24 }, { "cat": "Генко", "slug": "genko", "count": 22 }, { "cat": "Щастие", "slug": "shtastie", "count": 22 }, { "cat": "Изневери", "slug": "izneveri", "count": 21 }, { "cat": "Рибари", "slug": "ribari", "count": 21 }, { "cat": "Знаете ли че", "slug": "znaete-li-che", "count": 19 }, { "cat": "Служители", "slug": "sluzhiteli", "count": 19 }, { "cat": "Коледа и Нова година", "slug": "koleda-i-nova-godina", "count": 17 }, { "cat": "Кюфтета", "slug": "kiufteta", "count": 16 }, { "cat": "Приятели", "slug": "priiateli", "count": 16 }, { "cat": "Бърза помощ", "slug": "b-rza-pomosht", "count": 15 }, { "cat": "Импотентни", "slug": "impotentni", "count": 15 }, { "cat": "Киркор и Гарабед", "slug": "kirkor-i-garabed", "count": 15 }, { "cat": "Сватба", "slug": "svatba", "count": 15 }, { "cat": "Бизнесмени", "slug": "biznesmeni", "count": 14 }, { "cat": "Варна", "slug": "varna", "count": 14 }, { "cat": "Крокодили", "slug": "krokodili", "count": 14 }, { "cat": "Майки", "slug": "maiki", "count": 14 }, { "cat": "Златната рибка", "slug": "zlatnata-ribka", "count": 13 }, { "cat": "Зъболекари", "slug": "z-bolekari", "count": 13 }, { "cat": "Пътуване", "slug": "p-tuvane", "count": 13 }, { "cat": "Шерлок Хоумс", "slug": "sherlok-khoums", "count": 13 }, { "cat": "Гъбари", "slug": "g-bari", "count": 12 }, { "cat": "Извънземни", "slug": "izv-nzemni", "count": 12 }, { "cat": "Зетьове", "slug": "zet-ove", "count": 11 }, { "cat": "Медицински сестри", "slug": "meditsinski-sestri", "count": 11 }, { "cat": "Мравки", "slug": "mravki", "count": 11 }, { "cat": "Оптимисти", "slug": "optimisti", "count": 11 }, { "cat": "Англия", "slug": "angliia", "count": 10 }, { "cat": "Синове", "slug": "sinove", "count": 10 }, { "cat": "Депутати", "slug": "deputati", "count": 9 }, { "cat": "Дъщери", "slug": "d-shteri", "count": 9 }, { "cat": "Избори", "slug": "izbori", "count": 9 }, { "cat": "Мечо Пух", "slug": "mecho-pukh", "count": 9 }, { "cat": "Негри", "slug": "negri", "count": 9 }, { "cat": "Парламент", "slug": "parlament", "count": 9 }, { "cat": "Свекър и свекърва", "slug": "svek-r-i-svek-rva", "count": 9 }, { "cat": "Хирурзи", "slug": "khirurzi", "count": 9 }, { "cat": "Африка", "slug": "afrika", "count": 8 }, { "cat": "Слаботелесни", "slug": "slabotelesni", "count": 8 }, { "cat": "Смърта", "slug": "sm-rta", "count": 8 }, { "cat": "Клиенти", "slug": "klienti", "count": 7 }, { "cat": "Магарета", "slug": "magareta", "count": 7 }, { "cat": "Пешо", "slug": "pesho", "count": 7 }, { "cat": "Истории", "slug": "istorii", "count": 6 }, { "cat": "Красиви", "slug": "krasivi", "count": 6 }, { "cat": "Образованието", "slug": "obrazovanieto", "count": 6 }, { "cat": "Щъркели", "slug": "sht-rkeli", "count": 6 }, { "cat": "Кино", "slug": "kino", "count": 5 }, { "cat": "Луната", "slug": "lunata", "count": 5 }, { "cat": "Стюардеси", "slug": "stiuardesi", "count": 5 }, { "cat": "Тока", "slug": "toka", "count": 5 }, { "cat": "Джентълмени", "slug": "dzhent-lmeni", "count": 4 }, { "cat": "Журналисти", "slug": "zhurnalisti", "count": 4 }, { "cat": "Колеги", "slug": "kolegi", "count": 4 }, { "cat": "Понеделник", "slug": "ponedelnik", "count": 4 }, { "cat": "Уикенд", "slug": "uikend", "count": 4 }, { "cat": "Германия", "slug": "germaniia", "count": 3 }, { "cat": "Европа", "slug": "evropa", "count": 3 }, { "cat": "Змии", "slug": "zmii", "count": 3 }, { "cat": "Казарма", "slug": "kazarma", "count": 3 }, { "cat": "Зоопарк", "slug": "zoopark", "count": 2 }, { "cat": "Патки", "slug": "patki", "count": 2 }];

const $$Astro$o = createAstro();
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$o, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`${maybeRenderHead($$result)}<footer class="relative">
    <div class="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-6 pb-6 gap-3 container mx-auto px-4">
        <div class="z-10 text-sm">
            <h3 class="headingbottom">Services</h3>
            <a class="block" href="/vicove" rel="prefetch">Вицове</a>
            <a class="block" href="/news" rel="prefetch">Новини</a>
            <a class="block" href="https://eziktok.com/">ezikTok</a>
            <a class="block" href="/business" rel="prefetch">Бизнес</a>
        </div>
        <div class="z-10 text-sm text-right sm:text-left">
            <div class="headingbottom">&nbsp;</div><a class="block" href="/movies" rel="prefetch">Филми</a>
            <a class="block" href="/tw">Туитър ДБ (бета)</a><a class="block" href="https://rudixops.com/">DevOps</a>
        </div>
        <div class="z-10 text-sm text-right sm:text-left hidden sm:block"></div>
        <div class="z-10 text-sm text-right sm:text-left hidden md:block"></div>
        <div class="z-10 text-sm">
            <h3 class="headingbottom">Company</h3><a class="block" href="/other/about" rel="prefetch">За</a><a class="block" href="/other/contact" rel="prefetch">Контакт</a>
        </div>
        <div class="z-10 text-sm">
            <h3 class="headingbottom text-right">Legal</h3><a class="block text-right" href="/other/terms" rel="prefetch">Terms of use</a><a class="block text-right" href="/other/privacy" rel="prefetch">Privacy policy</a>
        </div>
    </div>
    <div class="w-full absolute z-0 bottom-0">
        <svg xmlns="http://w3.org/2000/svg" viewBox="0 0 1440 320" class="w-full z-10 hidden dark:block">
            <path fill="#00b894" d="m0 224 48 10.7C96 245 192 267 288 240c96-27 192-101 288-96s192 91 288 101.3c96 10.7 192-53.3 288-90.6 96-37.7 192-47.7 240-53.4l48-5.3v224H0Z"></path>
        </svg><svg xmlns="http://w3.org/2000/svg" viewBox="0 0 1440 320" class="w-full z-10 dark:hidden block">
            <path fill="#2d3748" d="m0 224 48 10.7C96 245 192 267 288 240c96-27 192-101 288-96s192 91 288 101.3c96 10.7 192-53.3 288-90.6 96-37.7 192-47.7 240-53.4l48-5.3v224H0Z"></path>
        </svg>
        <div class="flex justify-center items-center text-xs text-gray-600 z-10 absolute w-full bottom-2 drop-shadow-md dark:text-white">
            2023 kloun | All Rights Reserved ®
        </div>
    </div>
</footer>`;
}, "/home/runner/work/monext/monext/apps/clown/src/components/Footer.astro");

const $$Astro$n = createAstro();
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$n, $$props, $$slots);
  Astro2.self = $$Header;
  return renderTemplate`${maybeRenderHead($$result)}<header>
    <div class="flex w-full items-center justify-center sm:justify-start md:justify-center">
        <svg viewBox="0 0 1440 190" xmlns="http://w3.org/2000/svg" class="w-full block fill-gray-800 dark:fill-blue-500 absolute top-0 z-0"><path d="M0 128h48c48 0 144 0 240-16s192-48 288-42.7c96 5.7 192 47.7 288 48 96-.3 192-42.3 288-42.6 96 .3 192 42.3 240 64l48 21.3V0H0z"></path></svg><div class="w-24 sm:w-24 md:w-fit relative z-10">
            <a href="https://kloun.lol/">
                ${renderComponent($$result, "amp-img", "amp-img", { "layout": "fixed", "src": "/images/logodark.png", "alt": "", "class": "dark:sepia i-amphtml-element i-amphtml-layout-fixed i-amphtml-layout-size-defined i-amphtml-built i-amphtml-layout amp-notsupported", "width": "140", "height": "181", "i-amphtml-layout": "fixed", "style": "width: 140px; height: 181px; --loader-delay-offset: 296ms !important;" }, { "default": () => renderTemplate`<img decoding="async" alt="" src="/images/logodark.png" class="i-amphtml-fill-content i-amphtml-replaced-content i-amphtml-ghost">` })}
                <img src="/images/logodark.png" width="140" height="181" alt="" class="absolute dark:grayscale blur-lg duration-500 dark:blur-none top-0"></a>
        </div><ul tabindex="0" class="hidden sm:flex justify-end w-full items-center space-x-4 pr-2 -mt-12 z-10">
            <li><a class="text-shadow font-bold" href="/">Начало</a></li><li>
                <a class="text-shadow font-bold" href="/vicove" rel="prefetch">Вицове</a>
            </li><li>
                <a class="text-shadow font-bold" href="/fb" rel="prefetch">Късметчета</a>
            </li><li>
                <label><input class="hidden" type="checkbox" checked=""><svg class="swap-off h-10 w-10 fill-white block dark:hidden cursor-pointer rotate-swap" xmlns="http://w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"></path></svg><svg class="h-10 w-10 fill-gray-800 hidden dark:block cursor-pointer rotate-swap" xmlns="http://w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"></path></svg></label>
            </li>
        </ul>
    </div><div class="z-40 top-0 fixed">
        <label class="cursor-pointer visible xs:visible sm:invisible backdrop-blur-sm bg-black/30 dark:bg-white/30 false"><input type="checkbox" class="hidden"><svg xmlns="http://w3.org/2000/svg" class="h-8 w-8 m-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"></path></svg></label><div class="hidden">
            <ul tabindex="0" class="mt-3 w-52 p-2 shadow bg flex flex-col fixed top-8 left-2 rounded-md border-2 border-white dark:border-black gap-4">
                <li><a class="text-shadow font-bold" href="/">Начало</a></li><li>
                    <a class="text-shadow font-bold" href="/vicove" rel="prefetch">Вицове</a>
                </li><li>
                    <a class="text-shadow font-bold" href="/fb" rel="prefetch">Късметчета</a>
                </li><li>
                    <label><input class="hidden" type="checkbox" checked=""><svg class="swap-off h-10 w-10 fill-white block dark:hidden cursor-pointer rotate-swap" xmlns="http://w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"></path></svg><svg class="h-10 w-10 fill-gray-800 hidden dark:block cursor-pointer rotate-swap" xmlns="http://w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"></path></svg></label>
                </li>
            </ul>
        </div>
    </div>
</header>`;
}, "/home/runner/work/monext/monext/apps/clown/src/components/Header.astro");

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$m = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$m, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description, image, noContainer, hideFooter } = Astro2.props;
  const currentPath = "https://kloun.lol" + Astro2.url.pathname;
  return renderTemplate(_a || (_a = __template(['<html lang="en">\n	<head>\n		<meta charset="UTF-8">\n		<meta name="viewport" content="width=device-width">\n		<link rel="icon" type="image/svg+xml" href="/favicon.svg">\n		<title>', '</title>\n		<meta name="description"', '>\n		<link rel="canonical"', '>\n		<meta name="twitter:card" content="summary_large_image">\n		<meta name="twitter:site" content="@site">\n		<meta name="twitter:creator" content="@handle">\n		<meta property="fb:app_id" content="281985576166744">\n		<meta property="og:title"', '>\n		<meta property="og:description"', '>\n		<meta property="og:url"', '>\n		<meta property="og:type" content="article">\n		<meta property="og:image"', '>\n		<meta property="og:image:alt" content="Og Image Alt">\n		<meta property="og:image:type" content="image/jpeg">\n		<meta property="og:image:width" content="800">\n		<meta property="og:image:height" content="600">\n		<meta property="og:site_name" content="kloun.lol">\n		<meta name="theme-color" media="(prefers-color-scheme: light)" content="light">\n		<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5476404733919333" crossorigin="anonymous"><\/script>\n	', '</head>\n	<body>\n		<div class="flex flex-col h-screen">\n			', "\n			", "\n			", '\n		</div>\n\n		<script id="rendered-js">\n			function fbshare(url) {\n				window.open(\n					"http://www.facebook.com/sharer.php?u=" +\n						encodeURIComponent(url),\n					"sharer",\n					"toolbar=0,status=0,width=626,height=436"\n				);\n				return false;\n			}\n			//# sourceURL=pen.js\n		<\/script>\n		<div id="fb-root"></div>\n		<script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v16.0&appId=281985576166744&autoLogAppEvents=1" nonce="CaQdL6e8"><\/script>\n		<script async src="https://www.googletagmanager.com/gtag/js?id=G-PDX6T8DTFR"><\/script>\n		<script>\n			window.dataLayer = window.dataLayer || [];\n			function gtag() {\n				dataLayer.push(arguments);\n			}\n			gtag("js", new Date());\n			gtag("config", "G-PDX6T8DTFR");\n		<\/script>\n	</body>\n</html>'])), title, addAttribute(description || "Zero in on  social media presence by checking out their  profiles, featuring photos and engaging content", "content"), addAttribute(currentPath, "href"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(currentPath, "content"), addAttribute(image || "https://kloun.pages.dev/images/og.jpg", "content"), renderHead($$result), renderComponent($$result, "Header", $$Header, {}), noContainer ? renderTemplate`<main class="flex z-20 grow">
						${renderSlot($$result, $$slots["default"])}
					</main>` : renderTemplate`<main class="container mx-auto z-20 grow px-1">
						${renderSlot($$result, $$slots["default"])}
					</main>`, renderComponent($$result, "Footer", $$Footer, {}));
}, "/home/runner/work/monext/monext/apps/clown/src/layouts/Layout.astro");

const $$Astro$l = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$l, $$props, $$slots);
  Astro2.self = $$Index;
  const newsx = db.view("newsbg/news", {
    limit: 30,
    update: "lazy",
    descending: true
  });
  const memesx = fetch(
    "https://img_proxy.kloun.workers.dev/"
  ).then((res) => res.json());
  const resp = await Promise.all([newsx, memesx]).then((results) => ({
    news: results[0].rows,
    memes: results[1].items
  }));
  const { news, memes } = resp;
  Astro2.response.headers.set("Cache-Control", "max-age=7200");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "\u0412\u0438\u0446\u043E\u0432\u0435 \u0438 \u0437\u0430\u0431\u0430\u0432\u043D\u0438 \u043A\u043E\u0442\u043A\u0438 \u0438 \u043C\u0435\u043C\u0435\u0442\u0430", "description": "\u0412\u0438\u0446\u043E\u0432\u0435 \u0438 \u0437\u0430\u0431\u0430\u0432\u043D\u0438 \u043A\u043E\u0442\u043A\u0438 \u0438 \u043C\u0435\u043C\u0435\u0442\u0430" }, { "default": ($$result2) => renderTemplate`
	${maybeRenderHead($$result2)}<h1 class="text-5xl">Актуално</h1>
	<div class="flex flex-wrap gap-3">
		${news.map(
    ({
      id,
      title,
      date,
      key,
      image
    }) => renderTemplate`${renderComponent($$result2, "CardNews", $$CardNews, { "title": title, "img": image, "date": date, "key": key, "id": id })}`
  )}
	</div>
	<div class="flex flex-wrap justify-end my-2">
		<a class="btn dark:btn-ghost border-2" href="/news">Още новини</a>
	</div>
	${renderComponent($$result2, "RudSense", $$RudSense, {})}
	<h1 class="text-5xl">Вицове</h1>
	<div class="my-3 flex w-full flex-wrap gap-3">
		${jokecats.slice(0, 9).map(
    ({
      cat,
      slug,
      count
    }) => renderTemplate`${renderComponent($$result2, "CatButton", $$CatButton, { "title": cat, "url": "/cat/" + slug, "count": count })}`
  )}
	</div>
	<div class="flex flex-wrap justify-end my-2">
		<a class="btn dark:btn-ghost border-2" href="/vicove">Всички</a>
	</div>
	${renderComponent($$result2, "RudSense", $$RudSense, {})}
	<h1 class="text-5xl">Забавно в картинки</h1>
	<div class="snap-x flex flex-nowrap py-2 snap-proximity overflow-x-auto">
		${memes.slice(0, 20).map(({ thumb }) => renderTemplate`<label class="hover:animate-pulse snap-center flex-shrink-0" for="my-modal">
					<div class="rounded-lg bg-gradient-to-r from-purple-900 to-pink-600 p-1 dark:from-white dark:to-slate-400 m-1 cursor-pointer flex">
						<img width="128" height="128" class="rounded-lg i-amphtml-element i-amphtml-layout-fixed i-amphtml-layout-size-defined i-amphtml-built i-amphtml-layout" alt="pr0gramm"${addAttribute(`https://thumb.pr0gramm.com/${thumb}`, "src")} i-amphtml-layout="fixed" style="width: 128px; height: 128px; --loader-delay-offset:1ms !important;">
					</div>
				</label>`)}
	</div>
	<div class="flex flex-wrap justify-end my-2">
		<a class="btn dark:btn-ghost border-2" href="/memes">Всички</a>
	</div>
` })}`;
}, "/home/runner/work/monext/monext/apps/clown/src/pages/index.astro");

const $$file$e = "/home/runner/work/monext/monext/apps/clown/src/pages/index.astro";
const $$url$e = "";

const _page0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file$e,
  url: $$url$e
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$k = createAstro();
const $$Pagination = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$k, $$props, $$slots);
  Astro2.self = $$Pagination;
  const { items, pageSize, currentPage, prefix } = Astro2.props;
  function makeArray({
    pagesToShow,
    items: items2,
    pageSize: pageSize2,
    currentPage: currentPage2
  }) {
    const middle = Math.floor(pagesToShow / 2);
    const isArr = Array.isArray(items2);
    let startIndex = currentPage2 - middle;
    let endIndex = currentPage2 + middle;
    const pagesCount = Math.ceil(isArr ? items2.length : items2 / pageSize2);
    const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
    if (startIndex < 1) {
      startIndex = 1;
      endIndex = startIndex + pagesToShow;
      if (endIndex > pagesCount) {
        endIndex = pagesCount;
      }
    }
    if (endIndex > pagesCount) {
      endIndex = pagesCount;
      startIndex = endIndex - pagesToShow;
      if (startIndex < 1) {
        startIndex = 1;
      }
    }
    const pagesToRender2 = pages.slice(startIndex - 1, endIndex);
    return pagesToRender2;
  }
  const pagesToRender = makeArray({
    pagesToShow: 9,
    items,
    pageSize,
    currentPage
  });
  const pagesToRenderMobile = makeArray({
    pagesToShow: 3,
    items,
    pageSize,
    currentPage
  });
  return renderTemplate`${maybeRenderHead($$result)}<div class="fixed bottom-2 left-2 right-2 z-20 flex justify-center bg-black/30 p-4 backdrop-blur-sm rounded-xl">
    <div class="btn-group hidden sm:flex">
        ${pagesToRender.map((page) => renderTemplate`<a${addAttribute(
    page === currentPage ? "#" : `${prefix}${page === 1 ? prefix.includes("_") ? 1 : "" : page}/`,
    "href"
  )}${addAttribute(
    page === currentPage ? "btn px-4 font-bold bg-gray-700 dark:bg-gray-500" : "btn px-4 font-bold",
    "class"
  )}>
                    ${page}
                </a>`)}
    </div>
    <div class="block xs:hidden sm:hidden">
        <div class="btn-group">
            ${pagesToRenderMobile.map((page) => renderTemplate`<a${addAttribute(
    page === currentPage ? "#" : `${prefix}${page === 1 ? "" : page}/`,
    "href"
  )} rel="nofollow"${addAttribute(
    page === currentPage ? "btn px-4 font-bold bg-gray-700 dark:bg-gray-500" : "btn px-4 font-bold",
    "class"
  )}>
                        ${page}
                    </a>`)}
        </div>
    </div>
</div>`;
}, "/home/runner/work/monext/monext/apps/clown/src/components/Pagination.astro");

const businesses = [{ "key": "Абланица", "value": 130, "slug": "ablanica" }, { "key": "Абрит", "value": 6, "slug": "abrit" }, { "key": "Аврамово", "value": 21, "slug": "avramovo" }, { "key": "Аврен", "value": 100, "slug": "avren" }, { "key": "Агатово", "value": 8, "slug": "agatovo" }, { "key": "Айдемир", "value": 280, "slug": "aydemir" }, { "key": "Айрово", "value": 31, "slug": "ayrovo" }, { "key": "Айтос", "value": 1531, "slug": "aytos" }, { "key": "Аканджиево", "value": 9, "slug": "akandzhievo" }, { "key": "Акациево", "value": 1, "slug": "akacievo" }, { "key": "Аксаково", "value": 569, "slug": "aksakovo" }, { "key": "Аламовци", "value": 4, "slug": "alamovci" }, { "key": "Албанци", "value": 1, "slug": "albanci" }, { "key": "Алваново", "value": 4, "slug": "alvanovo" }, { "key": "Алдомировци", "value": 79, "slug": "aldomirovci" }, { "key": "Алеко Константиново", "value": 47, "slug": "aleko-konstantinovo" }, { "key": "Алеково", "value": 23, "slug": "alekovo" }, { "key": "Александрия", "value": 4, "slug": "aleksandriya" }, { "key": "Александрово", "value": 154, "slug": "aleksandrovo" }, { "key": "Алендарова", "value": 3, "slug": "alendarova" }, { "key": "Алино", "value": 10, "slug": "alino" }, { "key": "Алтимир", "value": 29, "slug": "altimir" }, { "key": "Алфатар", "value": 65, "slug": "alfatar" }, { "key": "Алцек", "value": 2, "slug": "alcek" }, { "key": "Ангел войвода", "value": 12, "slug": "angel-voyvoda" }, { "key": "Ангеларий", "value": 1, "slug": "angelariy" }, { "key": "Анево", "value": 21, "slug": "anevo" }, { "key": "Антимово", "value": 21, "slug": "antimovo" }, { "key": "Антон", "value": 65, "slug": "anton" }, { "key": "Антоново", "value": 83, "slug": "antonovo" }, { "key": "Априлово", "value": 69, "slug": "aprilovo" }, { "key": "Априлци", "value": 242, "slug": "aprilci" }, { "key": "Арбанаси", "value": 52, "slug": "arbanasi" }, { "key": "Арда", "value": 13, "slug": "arda" }, { "key": "Ардино", "value": 217, "slug": "ardino" }, { "key": "Арковна", "value": 2, "slug": "arkovna" }, { "key": "Армените", "value": 5, "slug": "armenite" }, { "key": "Арнаутито", "value": 6, "slug": "arnautito" }, { "key": "Арчар", "value": 69, "slug": "archar" }, { "key": "Асен", "value": 12, "slug": "asen" }, { "key": "Асеновград", "value": 4690, "slug": "asenovgrad" }, { "key": "Асеновец", "value": 29, "slug": "asenovec" }, { "key": "Асеново", "value": 29, "slug": "asenovo" }, { "key": "Асеновци", "value": 16, "slug": "asenovci" }, { "key": "Аспарухово", "value": 63, "slug": "asparuhovo" }, { "key": "Атия", "value": 47, "slug": "atiya" }, { "key": "Атолово", "value": 9, "slug": "atolovo" }, { "key": "Ауста", "value": 2, "slug": "austa" }, { "key": "Ахелой", "value": 345, "slug": "aheloy" }, { "key": "Ахматово", "value": 4, "slug": "ahmatovo" }, { "key": "Ахтопол", "value": 174, "slug": "ahtopol" }, { "key": "Бабек", "value": 3, "slug": "babek" }, { "key": "Бабино", "value": 4, "slug": "babino" }, { "key": "Бабинци", "value": 6, "slug": "babinci" }, { "key": "Бабово", "value": 23, "slug": "babovo" }, { "key": "Бабук", "value": 16, "slug": "babuk" }, { "key": "Бабяк", "value": 17, "slug": "babyak" }, { "key": "Багалевци", "value": 2, "slug": "bagalevci" }, { "key": "Багренци", "value": 8, "slug": "bagrenci" }, { "key": "Багрилци", "value": 4, "slug": "bagrilci" }, { "key": "Багрянка", "value": 5, "slug": "bagryanka" }, { "key": "Бадевци", "value": 1, "slug": "badevci" }, { "key": "Байкал", "value": 8, "slug": "baykal" }, { "key": "Байкалско", "value": 2, "slug": "baykalsko" }, { "key": "Байково", "value": 5, "slug": "baykovo" }, { "key": "Байлово", "value": 11, "slug": "baylovo" }, { "key": "Бакалите", "value": 1, "slug": "bakalite" }, { "key": "Балабаново", "value": 1, "slug": "balabanovo" }, { "key": "Балабанско", "value": 5, "slug": "balabansko" }, { "key": "Баланите", "value": 3, "slug": "balanite" }, { "key": "Баланово", "value": 14, "slug": "balanovo" }, { "key": "Балван", "value": 14, "slug": "balvan" }, { "key": "Балдево", "value": 5, "slug": "baldevo" }, { "key": "Балей", "value": 8, "slug": "baley" }, { "key": "Балик", "value": 5, "slug": "balik" }, { "key": "Балкан", "value": 4, "slug": "balkan" }, { "key": "Балканец", "value": 9, "slug": "balkanec" }, { "key": "Балкански", "value": 8, "slug": "balkanski" }, { "key": "Балканци", "value": 10, "slug": "balkanci" }, { "key": "Балуци", "value": 7, "slug": "baluci" }, { "key": "Балчик", "value": 1217, "slug": "balchik" }, { "key": "Балша", "value": 18, "slug": "balsha" }, { "key": "Балювица", "value": 2, "slug": "balyuvica" }, { "key": "Бангейци", "value": 2, "slug": "bangeyci" }, { "key": "Банево", "value": 63, "slug": "banevo" }, { "key": "Баниска", "value": 29, "slug": "baniska" }, { "key": "Баните", "value": 100, "slug": "banite" }, { "key": "Баница", "value": 13, "slug": "banica" }, { "key": "Баничан", "value": 29, "slug": "banichan" }, { "key": "Банище", "value": 3, "slug": "banishche" }, { "key": "Банкя", "value": 946, "slug": "bankya" }, { "key": "Баново", "value": 23, "slug": "banovo" }, { "key": "Банско", "value": 1352, "slug": "bansko" }, { "key": "Баня", "value": 359, "slug": "banya" }, { "key": "Бараково", "value": 15, "slug": "barakovo" }, { "key": "Бараци", "value": 3, "slug": "baraci" }, { "key": "БАРБЕЙДОС,", "value": 1, "slug": "barbeydos" }, { "key": "Барутин", "value": 72, "slug": "barutin" }, { "key": "Басарбово", "value": 67, "slug": "basarbovo" }, { "key": "Бата", "value": 45, "slug": "bata" }, { "key": "Батак", "value": 248, "slug": "batak" }, { "key": "Батановци", "value": 106, "slug": "batanovci" }, { "key": "Батин", "value": 30, "slug": "batin" }, { "key": "Батишница", "value": 22, "slug": "batishnica" }, { "key": "Батово", "value": 30, "slug": "batovo" }, { "key": "Батошево", "value": 12, "slug": "batoshevo" }, { "key": "Батулия", "value": 5, "slug": "batuliya" }, { "key": "Батулци", "value": 7, "slug": "batulci" }, { "key": "Баурене", "value": 4, "slug": "baurene" }, { "key": "Баховица", "value": 21, "slug": "bahovica" }, { "key": "Бацова махала", "value": 1, "slug": "bacova-mahala" }, { "key": "Бачево", "value": 111, "slug": "bachevo" }, { "key": "Бачково", "value": 26, "slug": "bachkovo" }, { "key": "Башево", "value": 12, "slug": "bashevo" }, { "key": "Бащино", "value": 9, "slug": "bashchino" }, { "key": "Баячево", "value": 22, "slug": "bayachevo" }, { "key": "Бдинци", "value": 4, "slug": "bdinci" }, { "key": "Беброво", "value": 8, "slug": "bebrovo" }, { "key": "Беглеж", "value": 10, "slug": "beglezh" }, { "key": "Бегово", "value": 11, "slug": "begovo" }, { "key": "Бегуновци", "value": 5, "slug": "begunovci" }, { "key": "Бегунци", "value": 20, "slug": "begunci" }, { "key": "Беден", "value": 6, "slug": "beden" }, { "key": "Беджене", "value": 1, "slug": "bedzhene" }, { "key": "Бежаново", "value": 34, "slug": "bezhanovo" }, { "key": "Безводица", "value": 16, "slug": "bezvodica" }, { "key": "Безден", "value": 22, "slug": "bezden" }, { "key": "Безденица", "value": 5, "slug": "bezdenica" }, { "key": "Безмер", "value": 64, "slug": "bezmer" }, { "key": "Бел камен", "value": 7, "slug": "bel-kamen" }, { "key": "Бела", "value": 1, "slug": "bela" }, { "key": "Бела Рада", "value": 14, "slug": "bela-rada" }, { "key": "Беласица", "value": 59, "slug": "belasica" }, { "key": "Белащица", "value": 192, "slug": "belashchica" }, { "key": "Белгун", "value": 6, "slug": "belgun" }, { "key": "Белев дол", "value": 2, "slug": "belev-dol" }, { "key": "Белеврен", "value": 2, "slug": "belevren" }, { "key": "Белене", "value": 346, "slug": "belene" }, { "key": "Беленци", "value": 6, "slug": "belenci" }, { "key": "Бели брег", "value": 1, "slug": "beli-breg" }, { "key": "Бели брод", "value": 3, "slug": "beli-brod" }, { "key": "Бели бряг", "value": 4, "slug": "beli-bryag" }, { "key": "Бели вир", "value": 10, "slug": "beli-vir" }, { "key": "Бели извор", "value": 36, "slug": "beli-izvor" }, { "key": "Бели Искър", "value": 44, "slug": "beli-iskr" }, { "key": "Бели Лом", "value": 30, "slug": "beli-lom" }, { "key": "Бели Осъм", "value": 38, "slug": "beli-osm" }, { "key": "Бели пласт", "value": 7, "slug": "beli-plast" }, { "key": "Белила", "value": 1, "slug": "belila" }, { "key": "Белимел", "value": 11, "slug": "belimel" }, { "key": "Белинци", "value": 14, "slug": "belinci" }, { "key": "Белица", "value": 228, "slug": "belica" }, { "key": "Белиш", "value": 5, "slug": "belish" }, { "key": "Бело поле", "value": 98, "slug": "belo-pole" }, { "key": "Беловец", "value": 49, "slug": "belovec" }, { "key": "Беловица", "value": 16, "slug": "belovica" }, { "key": "Белово", "value": 184, "slug": "belovo" }, { "key": "Белоградец", "value": 32, "slug": "belogradec" }, { "key": "Белоградчик", "value": 291, "slug": "belogradchik" }, { "key": "Белодол", "value": 13, "slug": "belodol" }, { "key": "Белозем", "value": 149, "slug": "belozem" }, { "key": "Белокопитово", "value": 9, "slug": "belokopitovo" }, { "key": "Беломорци", "value": 39, "slug": "belomorci" }, { "key": "Белополци", "value": 4, "slug": "belopolci" }, { "key": "Белополяне", "value": 4, "slug": "belopolyane" }, { "key": "Белопопци", "value": 14, "slug": "belopopci" }, { "key": "Белослав", "value": 444, "slug": "beloslav" }, { "key": "Белотинци", "value": 11, "slug": "belotinci" }, { "key": "Белцов", "value": 20, "slug": "belcov" }, { "key": "Белчин", "value": 17, "slug": "belchin" }, { "key": "Белчински бани", "value": 2, "slug": "belchinski-bani" }, { "key": "Беляковец", "value": 57, "slug": "belyakovec" }, { "key": "Беляново", "value": 1, "slug": "belyanovo" }, { "key": "Бенковски", "value": 229, "slug": "benkovski" }, { "key": "Беренде", "value": 2, "slug": "berende" }, { "key": "Беренде извор", "value": 1, "slug": "berende-izvor" }, { "key": "Бериево", "value": 2, "slug": "berievo" }, { "key": "Берковица", "value": 745, "slug": "berkovica" }, { "key": "Берковски", "value": 1, "slug": "berkovski" }, { "key": "БЕРМУДСКИ ОСТРОВИ,", "value": 6, "slug": "bermudski-ostrovi" }, { "key": "Бероново", "value": 13, "slug": "beronovo" }, { "key": "Берсин", "value": 4, "slug": "bersin" }, { "key": "Беслен", "value": 5, "slug": "beslen" }, { "key": "Биволаре", "value": 7, "slug": "bivolare" }, { "key": "Бижовци", "value": 2, "slug": "bizhovci" }, { "key": "Биково", "value": 9, "slug": "bikovo" }, { "key": "Билка", "value": 14, "slug": "bilka" }, { "key": "Било", "value": 1, "slug": "bilo" }, { "key": "Бинкос", "value": 6, "slug": "binkos" }, { "key": "Биркова", "value": 6, "slug": "birkova" }, { "key": "Бисер", "value": 26, "slug": "biser" }, { "key": "Бисерци", "value": 29, "slug": "biserci" }, { "key": "Бистра", "value": 44, "slug": "bistra" }, { "key": "Бистренци", "value": 10, "slug": "bistrenci" }, { "key": "Бистрец", "value": 5, "slug": "bistrec" }, { "key": "Бистрилица", "value": 2, "slug": "bistrilica" }, { "key": "Бистрица", "value": 423, "slug": "bistrica" }, { "key": "Благово", "value": 19, "slug": "blagovo" }, { "key": "Благоевград", "value": 10020, "slug": "blagoevgrad" }, { "key": "Благоево", "value": 16, "slug": "blagoevo" }, { "key": "Блажиево", "value": 11, "slug": "blazhievo" }, { "key": "Блатец", "value": 20, "slug": "blatec" }, { "key": "Блатница", "value": 9, "slug": "blatnica" }, { "key": "Блато", "value": 1, "slug": "blato" }, { "key": "Блатска", "value": 17, "slug": "blatska" }, { "key": "Бленика", "value": 8, "slug": "blenika" }, { "key": "Близнак", "value": 10, "slug": "bliznak" }, { "key": "Близнаци", "value": 126, "slug": "bliznaci" }, { "key": "Близнец", "value": 2, "slug": "bliznec" }, { "key": "Блъсково", "value": 39, "slug": "blskovo" }, { "key": "Блъсковци", "value": 6, "slug": "blskovci" }, { "key": "Бобов дол", "value": 219, "slug": "bobov-dol" }, { "key": "Бобораци", "value": 2, "slug": "boboraci" }, { "key": "Бобошево", "value": 68, "slug": "boboshevo" }, { "key": "Бов", "value": 29, "slug": "bov" }, { "key": "Богатино", "value": 3, "slug": "bogatino" }, { "key": "Богатово", "value": 11, "slug": "bogatovo" }, { "key": "Богдан", "value": 27, "slug": "bogdan" }, { "key": "Богданица", "value": 7, "slug": "bogdanica" }, { "key": "Богданлия", "value": 4, "slug": "bogdanliya" }, { "key": "Богданов дол", "value": 14, "slug": "bogdanov-dol" }, { "key": "Богданово", "value": 16, "slug": "bogdanovo" }, { "key": "Богданци", "value": 20, "slug": "bogdanci" }, { "key": "Боголин", "value": 16, "slug": "bogolin" }, { "key": "Богомилово", "value": 101, "slug": "bogomilovo" }, { "key": "Богомилци", "value": 15, "slug": "bogomilci" }, { "key": "Богорово", "value": 12, "slug": "bogorovo" }, { "key": "Богослов", "value": 22, "slug": "bogoslov" }, { "key": "Богутево", "value": 15, "slug": "bogutevo" }, { "key": "Богьовци", "value": 12, "slug": "bogovci" }, { "key": "Боденец", "value": 9, "slug": "bodenec" }, { "key": "Бодрово", "value": 3, "slug": "bodrovo" }, { "key": "Боерица", "value": 2, "slug": "boerica" }, { "key": "Божан", "value": 11, "slug": "bozhan" }, { "key": "Божевци", "value": 4, "slug": "bozhevci" }, { "key": "Боженица", "value": 6, "slug": "bozhenica" }, { "key": "Боженците", "value": 8, "slug": "bozhencite" }, { "key": "Божичен", "value": 13, "slug": "bozhichen" }, { "key": "Божурец", "value": 54, "slug": "bozhurec" }, { "key": "Божурица", "value": 22, "slug": "bozhurica" }, { "key": "Божурище", "value": 478, "slug": "bozhurishche" }, { "key": "Божурка", "value": 4, "slug": "bozhurka" }, { "key": "Божурлук", "value": 1, "slug": "bozhurluk" }, { "key": "Божурово", "value": 25, "slug": "bozhurovo" }, { "key": "Божурци", "value": 2, "slug": "bozhurci" }, { "key": "Бозаджии", "value": 1, "slug": "bozadzhii" }, { "key": "Бозвелийско", "value": 36, "slug": "bozveliysko" }, { "key": "Боздуганово", "value": 14, "slug": "bozduganovo" }, { "key": "Боил", "value": 30, "slug": "boil" }, { "key": "Бойковец", "value": 9, "slug": "boykovec" }, { "key": "Бойково", "value": 13, "slug": "boykovo" }, { "key": "Бойница", "value": 4, "slug": "boynica" }, { "key": "Бойно", "value": 16, "slug": "boyno" }, { "key": "Бойновци", "value": 2, "slug": "boynovci" }, { "key": "Бойчиновци", "value": 45, "slug": "boychinovci" }, { "key": "Бокиловци", "value": 4, "slug": "bokilovci" }, { "key": "Болярино", "value": 5, "slug": "bolyarino" }, { "key": "Болярово", "value": 118, "slug": "bolyarovo" }, { "key": "Болярско", "value": 14, "slug": "bolyarsko" }, { "key": "Болярци", "value": 112, "slug": "bolyarci" }, { "key": "Борец", "value": 16, "slug": "borec" }, { "key": "Борие", "value": 7, "slug": "borie" }, { "key": "Борика", "value": 8, "slug": "borika" }, { "key": "Борики", "value": 8, "slug": "boriki" }, { "key": "Бориловец", "value": 2, "slug": "borilovec" }, { "key": "Борилово", "value": 9, "slug": "borilovo" }, { "key": "Борима", "value": 54, "slug": "borima" }, { "key": "Боримечково", "value": 9, "slug": "borimechkovo" }, { "key": "Борино", "value": 123, "slug": "borino" }, { "key": "Бориново", "value": 14, "slug": "borinovo" }, { "key": "Боринци", "value": 7, "slug": "borinci" }, { "key": "Борислав", "value": 4, "slug": "borislav" }, { "key": "Бориславци", "value": 11, "slug": "borislavci" }, { "key": "Борисово", "value": 30, "slug": "borisovo" }, { "key": "Борнарево", "value": 1, "slug": "bornarevo" }, { "key": "Боров дол", "value": 16, "slug": "borov-dol" }, { "key": "Борован", "value": 53, "slug": "borovan" }, { "key": "Боровец", "value": 2, "slug": "borovec" }, { "key": "Боровина", "value": 10, "slug": "borovina" }, { "key": "Боровица", "value": 21, "slug": "borovica" }, { "key": "Борово", "value": 164, "slug": "borovo" }, { "key": "Боровци", "value": 18, "slug": "borovci" }, { "key": "Борущица", "value": 5, "slug": "borushchica" }, { "key": "Борци", "value": 20, "slug": "borci" }, { "key": "Боряна", "value": 16, "slug": "boryana" }, { "key": "Босилково", "value": 3, "slug": "bosilkovo" }, { "key": "Босилковци", "value": 17, "slug": "bosilkovci" }, { "key": "Босна", "value": 4, "slug": "bosna" }, { "key": "Боснек", "value": 4, "slug": "bosnek" }, { "key": "Бостанци", "value": 1, "slug": "bostanci" }, { "key": "Бостина", "value": 9, "slug": "bostina" }, { "key": "Ботевград", "value": 1740, "slug": "botevgrad" }, { "key": "Ботево", "value": 39, "slug": "botevo" }, { "key": "Ботров", "value": 4, "slug": "botrov" }, { "key": "Ботуня", "value": 5, "slug": "botunya" }, { "key": "Бохот", "value": 15, "slug": "bohot" }, { "key": "Бошуля", "value": 17, "slug": "boshulya" }, { "key": "Бояджик", "value": 40, "slug": "boyadzhik" }, { "key": "Боян", "value": 8, "slug": "boyan" }, { "key": "Боян Ботево", "value": 30, "slug": "boyan-botevo" }, { "key": "Бояна", "value": 8, "slug": "boyana" }, { "key": "Бояново", "value": 49, "slug": "boyanovo" }, { "key": "Боянци", "value": 34, "slug": "boyanci" }, { "key": "Брадвари", "value": 32, "slug": "bradvari" }, { "key": "Бракница", "value": 5, "slug": "braknica" }, { "key": "Браниполе", "value": 230, "slug": "branipole" }, { "key": "Браница", "value": 3, "slug": "branica" }, { "key": "Браничево", "value": 37, "slug": "branichevo" }, { "key": "Бранище", "value": 36, "slug": "branishche" }, { "key": "Бранковци", "value": 1, "slug": "brankovci" }, { "key": "Братан", "value": 2, "slug": "bratan" }, { "key": "Братаница", "value": 58, "slug": "bratanica" }, { "key": "Братово", "value": 3, "slug": "bratovo" }, { "key": "Братушково", "value": 7, "slug": "bratushkovo" }, { "key": "Братя Даскалови", "value": 40, "slug": "bratya-daskalovi" }, { "key": "Братя Кунчеви", "value": 17, "slug": "bratya-kunchevi" }, { "key": "Брацигово", "value": 267, "slug": "bracigovo" }, { "key": "Брегаре", "value": 18, "slug": "bregare" }, { "key": "Брегово", "value": 73, "slug": "bregovo" }, { "key": "Брежани", "value": 40, "slug": "brezhani" }, { "key": "Брезе", "value": 29, "slug": "breze" }, { "key": "Брезен", "value": 9, "slug": "brezen" }, { "key": "Брезник", "value": 216, "slug": "breznik" }, { "key": "Брезница", "value": 171, "slug": "breznica" }, { "key": "Брезово", "value": 125, "slug": "brezovo" }, { "key": "Бреница", "value": 48, "slug": "brenica" }, { "key": "Брест", "value": 52, "slug": "brest" }, { "key": "Брестак", "value": 37, "slug": "brestak" }, { "key": "Бресте", "value": 17, "slug": "breste" }, { "key": "Брестник", "value": 147, "slug": "brestnik" }, { "key": "Брестница", "value": 23, "slug": "brestnica" }, { "key": "Брестовене", "value": 77, "slug": "brestovene" }, { "key": "Брестовец", "value": 39, "slug": "brestovec" }, { "key": "Брестовица", "value": 166, "slug": "brestovica" }, { "key": "Брестово", "value": 9, "slug": "brestovo" }, { "key": "Брод", "value": 46, "slug": "brod" }, { "key": "Бродилово", "value": 14, "slug": "brodilovo" }, { "key": "Брош", "value": 12, "slug": "brosh" }, { "key": "Брусарци", "value": 33, "slug": "brusarci" }, { "key": "Брусен", "value": 19, "slug": "brusen" }, { "key": "Брусник", "value": 1, "slug": "brusnik" }, { "key": "Брънеците", "value": 1, "slug": "brnecite" }, { "key": "Бръшлен", "value": 28, "slug": "brshlen" }, { "key": "Бръшлян", "value": 5, "slug": "brshlyan" }, { "key": "Бръшляница", "value": 8, "slug": "brshlyanica" }, { "key": "Бръщен", "value": 19, "slug": "brshchen" }, { "key": "Бряговица", "value": 8, "slug": "bryagovica" }, { "key": "Брягово", "value": 28, "slug": "bryagovo" }, { "key": "Бряст", "value": 5, "slug": "bryast" }, { "key": "Брястовец", "value": 31, "slug": "bryastovec" }, { "key": "Брястово", "value": 26, "slug": "bryastovo" }, { "key": "Бузовград", "value": 84, "slug": "buzovgrad" }, { "key": "Бузяковци", "value": 2, "slug": "buzyakovci" }, { "key": "Буйновица", "value": 3, "slug": "buynovica" }, { "key": "Буйново", "value": 43, "slug": "buynovo" }, { "key": "Буйновци", "value": 3, "slug": "buynovci" }, { "key": "Бук", "value": 6, "slug": "buk" }, { "key": "Буката", "value": 6, "slug": "bukata" }, { "key": "Букова поляна", "value": 7, "slug": "bukova-polyana" }, { "key": "Буковец", "value": 33, "slug": "bukovec" }, { "key": "Буковлък", "value": 104, "slug": "bukovlk" }, { "key": "Буково", "value": 56, "slug": "bukovo" }, { "key": "Букоровци", "value": 1, "slug": "bukorovci" }, { "key": "Булаир", "value": 2, "slug": "bulair" }, { "key": "Буново", "value": 11, "slug": "bunovo" }, { "key": "Бунцево", "value": 11, "slug": "buncevo" }, { "key": "Бургас", "value": 28269, "slug": "burgas" }, { "key": "Бурево", "value": 1, "slug": "burevo" }, { "key": "Буря", "value": 13, "slug": "burya" }, { "key": "Бусинци", "value": 1, "slug": "businci" }, { "key": "Бусманци", "value": 100, "slug": "busmanci" }, { "key": "Бутан", "value": 104, "slug": "butan" }, { "key": "Бутово", "value": 29, "slug": "butovo" }, { "key": "Бухово", "value": 90, "slug": "buhovo" }, { "key": "Буховци", "value": 13, "slug": "buhovci" }, { "key": "Бучин проход", "value": 9, "slug": "buchin-prohod" }, { "key": "Бучино", "value": 1, "slug": "buchino" }, { "key": "Бъдеще", "value": 6, "slug": "bdeshche" }, { "key": "Бъзовец", "value": 28, "slug": "bzovec" }, { "key": "Бъзън", "value": 60, "slug": "bzn" }, { "key": "Българаново", "value": 8, "slug": "blgaranovo" }, { "key": "Българево", "value": 71, "slug": "blgarevo" }, { "key": "Българене", "value": 43, "slug": "blgarene" }, { "key": "Българи", "value": 8, "slug": "blgari" }, { "key": "Българин", "value": 11, "slug": "blgarin" }, { "key": "Българка", "value": 4, "slug": "blgarka" }, { "key": "Българово", "value": 101, "slug": "blgarovo" }, { "key": "Българска поляна", "value": 3, "slug": "blgarska-polyana" }, { "key": "Български извор", "value": 67, "slug": "blgarski-izvor" }, { "key": "Българско Сливово", "value": 46, "slug": "blgarsko-slivovo" }, { "key": "Българчево", "value": 20, "slug": "blgarchevo" }, { "key": "Бърдарево", "value": 1, "slug": "brdarevo" }, { "key": "Бърдарски геран", "value": 15, "slug": "brdarski-geran" }, { "key": "Бърдоква", "value": 9, "slug": "brdokva" }, { "key": "Бърза река", "value": 1, "slug": "brza-reka" }, { "key": "Бързина", "value": 7, "slug": "brzina" }, { "key": "Бързица", "value": 10, "slug": "brzica" }, { "key": "Бързия", "value": 38, "slug": "brziya" }, { "key": "Бъркач", "value": 28, "slug": "brkach" }, { "key": "Бъркачево", "value": 22, "slug": "brkachevo" }, { "key": "Бърложница", "value": 12, "slug": "brlozhnica" }, { "key": "Бърчево", "value": 4, "slug": "brchevo" }, { "key": "Бъта", "value": 28, "slug": "bta" }, { "key": "Бяга", "value": 41, "slug": "byaga" }, { "key": "Бял бряг", "value": 14, "slug": "byal-bryag" }, { "key": "Бял извор", "value": 91, "slug": "byal-izvor" }, { "key": "Бял кладенец", "value": 9, "slug": "byal-kladenec" }, { "key": "Бяла", "value": 1016, "slug": "byala" }, { "key": "Бяла вода", "value": 15, "slug": "byala-voda" }, { "key": "Бяла паланка", "value": 17, "slug": "byala-palanka" }, { "key": "Бяла поляна", "value": 6, "slug": "byala-polyana" }, { "key": "Бяла река", "value": 82, "slug": "byala-reka" }, { "key": "Бяла Слатина", "value": 739, "slug": "byala-slatina" }, { "key": "Бяла черква", "value": 88, "slug": "byala-cherkva" }, { "key": "Бяло поле", "value": 6, "slug": "byalo-pole" }, { "key": "Вазово", "value": 26, "slug": "vazovo" }, { "key": "Вакарел", "value": 119, "slug": "vakarel" }, { "key": "Ваклино", "value": 6, "slug": "vaklino" }, { "key": "Ваклиново", "value": 16, "slug": "vaklinovo" }, { "key": "Ваксево", "value": 12, "slug": "vaksevo" }, { "key": "Валевци", "value": 3, "slug": "valevci" }, { "key": "Варана", "value": 1, "slug": "varana" }, { "key": "Варвара", "value": 117, "slug": "varvara" }, { "key": "Вардим", "value": 32, "slug": "vardim" }, { "key": "Вардун", "value": 51, "slug": "vardun" }, { "key": "Варна", "value": 48410, "slug": "varna" }, { "key": "Варненци", "value": 10, "slug": "varnenci" }, { "key": "Васил Друмев", "value": 11, "slug": "vasil-drumev" }, { "key": "Васил Левски", "value": 70, "slug": "vasil-levski" }, { "key": "Василево", "value": 20, "slug": "vasilevo" }, { "key": "Василовци", "value": 59, "slug": "vasilovci" }, { "key": "Васильово", "value": 7, "slug": "vasilovo" }, { "key": "Васково", "value": 6, "slug": "vaskovo" }, { "key": "Ведраре", "value": 50, "slug": "vedrare" }, { "key": "Ведрина", "value": 22, "slug": "vedrina" }, { "key": "Ведрово", "value": 6, "slug": "vedrovo" }, { "key": "Везенково", "value": 13, "slug": "vezenkovo" }, { "key": "Векилски", "value": 2, "slug": "vekilski" }, { "key": "Велешани", "value": 3, "slug": "veleshani" }, { "key": "Велика", "value": 10, "slug": "velika" }, { "key": "Великан", "value": 3, "slug": "velikan" }, { "key": "Великденче", "value": 5, "slug": "velikdenche" }, { "key": "Велики Преслав", "value": 509, "slug": "veliki-preslav" }, { "key": "Велико Търново", "value": 7996, "slug": "veliko-trnovo" }, { "key": "Великово", "value": 2, "slug": "velikovo" }, { "key": "Великовци", "value": 2, "slug": "velikovci" }, { "key": "Велинград", "value": 1816, "slug": "velingrad" }, { "key": "Велино", "value": 14, "slug": "velino" }, { "key": "Велислав", "value": 10, "slug": "velislav" }, { "key": "Величка", "value": 4, "slug": "velichka" }, { "key": "Величково", "value": 45, "slug": "velichkovo" }, { "key": "Велковци", "value": 14, "slug": "velkovci" }, { "key": "Велчево", "value": 16, "slug": "velchevo" }, { "key": "Венелин", "value": 41, "slug": "venelin" }, { "key": "Венец", "value": 62, "slug": "venec" }, { "key": "Венковец", "value": 2, "slug": "venkovec" }, { "key": "Венчан", "value": 2, "slug": "venchan" }, { "key": "Верен", "value": 8, "slug": "veren" }, { "key": "Веренци", "value": 10, "slug": "verenci" }, { "key": "Веринско", "value": 16, "slug": "verinsko" }, { "key": "Верско", "value": 3, "slug": "versko" }, { "key": "Веселец", "value": 20, "slug": "veselec" }, { "key": "Веселие", "value": 34, "slug": "veselie" }, { "key": "Веселина", "value": 38, "slug": "veselina" }, { "key": "Веселиново", "value": 67, "slug": "veselinovo" }, { "key": "Веслец", "value": 6, "slug": "veslec" }, { "key": "Ветово", "value": 231, "slug": "vetovo" }, { "key": "Ветрен", "value": 229, "slug": "vetren" }, { "key": "Ветрен дол", "value": 50, "slug": "vetren-dol" }, { "key": "Ветрино", "value": 109, "slug": "vetrino" }, { "key": "Ветринци", "value": 16, "slug": "vetrinci" }, { "key": "Ветрище", "value": 9, "slug": "vetrishche" }, { "key": "Вехтово", "value": 11, "slug": "vehtovo" }, { "key": "Вещица", "value": 4, "slug": "veshchica" }, { "key": "Видин", "value": 3680, "slug": "vidin" }, { "key": "Видлица", "value": 3, "slug": "vidlica" }, { "key": "Видно", "value": 16, "slug": "vidno" }, { "key": "Видрар", "value": 1, "slug": "vidrar" }, { "key": "Видраре", "value": 10, "slug": "vidrare" }, { "key": "Виево", "value": 12, "slug": "vievo" }, { "key": "Визица", "value": 1, "slug": "vizica" }, { "key": "Винарово", "value": 25, "slug": "vinarovo" }, { "key": "Винарско", "value": 20, "slug": "vinarsko" }, { "key": "Винево", "value": 5, "slug": "vinevo" }, { "key": "Виница", "value": 32, "slug": "vinica" }, { "key": "Винище", "value": 2, "slug": "vinishche" }, { "key": "Виноград", "value": 6, "slug": "vinograd" }, { "key": "Виноградец", "value": 33, "slug": "vinogradec" }, { "key": "Виногради", "value": 5, "slug": "vinogradi" }, { "key": "Вирове", "value": 7, "slug": "virove" }, { "key": "Вировско", "value": 7, "slug": "virovsko" }, { "key": "Вискяр", "value": 4, "slug": "viskyar" }, { "key": "Висок", "value": 4, "slug": "visok" }, { "key": "Висока могила", "value": 2, "slug": "visoka-mogila" }, { "key": "Висока поляна", "value": 13, "slug": "visoka-polyana" }, { "key": "Високовци", "value": 1, "slug": "visokovci" }, { "key": "Витановци", "value": 9, "slug": "vitanovci" }, { "key": "Витина", "value": 10, "slug": "vitina" }, { "key": "Вичово", "value": 5, "slug": "vichovo" }, { "key": "Вишан", "value": 1, "slug": "vishan" }, { "key": "Вишна", "value": 4, "slug": "vishna" }, { "key": "Вишнево", "value": 4, "slug": "vishnevo" }, { "key": "Вишовград", "value": 23, "slug": "vishovgrad" }, { "key": "Владая", "value": 172, "slug": "vladaya" }, { "key": "Владимир", "value": 2, "slug": "vladimir" }, { "key": "Владимирово", "value": 37, "slug": "vladimirovo" }, { "key": "Владимировци", "value": 31, "slug": "vladimirovci" }, { "key": "Владиня", "value": 13, "slug": "vladinya" }, { "key": "Владислав", "value": 4, "slug": "vladislav" }, { "key": "Владиславци", "value": 1, "slug": "vladislavci" }, { "key": "Владо Тричков", "value": 90, "slug": "vlado-trichkov" }, { "key": "Власатица", "value": 10, "slug": "vlasatica" }, { "key": "Влахово", "value": 13, "slug": "vlahovo" }, { "key": "Водач", "value": 8, "slug": "vodach" }, { "key": "Воден", "value": 41, "slug": "voden" }, { "key": "Воденичане", "value": 8, "slug": "vodenichane" }, { "key": "Воденичарско", "value": 4, "slug": "vodenicharsko" }, { "key": "Водица", "value": 35, "slug": "vodica" }, { "key": "Водна", "value": 1, "slug": "vodna" }, { "key": "Водни пад", "value": 7, "slug": "vodni-pad" }, { "key": "Водно", "value": 17, "slug": "vodno" }, { "key": "Воднянци", "value": 12, "slug": "vodnyanci" }, { "key": "Водолей", "value": 14, "slug": "vodoley" }, { "key": "Вождово", "value": 2, "slug": "vozhdovo" }, { "key": "Войвода", "value": 15, "slug": "voyvoda" }, { "key": "Войводенец", "value": 1, "slug": "voyvodenec" }, { "key": "Войводино", "value": 21, "slug": "voyvodino" }, { "key": "Войводиново", "value": 210, "slug": "voyvodinovo" }, { "key": "Войводово", "value": 38, "slug": "voyvodovo" }, { "key": "Войкова лъка", "value": 18, "slug": "voykova-lka" }, { "key": "Войнеговци", "value": 34, "slug": "voynegovci" }, { "key": "Войнежа", "value": 1, "slug": "voynezha" }, { "key": "Войника", "value": 15, "slug": "voynika" }, { "key": "Войница", "value": 2, "slug": "voynica" }, { "key": "Войново", "value": 9, "slug": "voynovo" }, { "key": "Войнягово", "value": 32, "slug": "voynyagovo" }, { "key": "Войсил", "value": 48, "slug": "voysil" }, { "key": "Вокил", "value": 25, "slug": "vokil" }, { "key": "Волово", "value": 6, "slug": "volovo" }, { "key": "Волуяк", "value": 192, "slug": "voluyak" }, { "key": "Вонеща вода", "value": 20, "slug": "voneshcha-voda" }, { "key": "Врабево", "value": 22, "slug": "vrabevo" }, { "key": "Врабците", "value": 1, "slug": "vrabcite" }, { "key": "Враненци", "value": 1, "slug": "vranenci" }, { "key": "Врани кон", "value": 12, "slug": "vrani-kon" }, { "key": "Враниловци", "value": 13, "slug": "vranilovci" }, { "key": "Вранино", "value": 18, "slug": "vranino" }, { "key": "Вранско", "value": 27, "slug": "vransko" }, { "key": "Враня", "value": 4, "slug": "vranya" }, { "key": "Враняк", "value": 10, "slug": "vranyak" }, { "key": "Вратарите", "value": 2, "slug": "vratarite" }, { "key": "Вратица", "value": 8, "slug": "vratica" }, { "key": "Вратца", "value": 3, "slug": "vratca" }, { "key": "Враца", "value": 5700, "slug": "vraca" }, { "key": "Врачеш", "value": 141, "slug": "vrachesh" }, { "key": "Врело", "value": 1, "slug": "vrelo" }, { "key": "Вресово", "value": 36, "slug": "vresovo" }, { "key": "Връв", "value": 22, "slug": "vrv" }, { "key": "Всемирци", "value": 2, "slug": "vsemirci" }, { "key": "Въбел", "value": 25, "slug": "vbel" }, { "key": "Въгларово", "value": 20, "slug": "vglarovo" }, { "key": "Въглевци", "value": 6, "slug": "vglevci" }, { "key": "Въглен", "value": 17, "slug": "vglen" }, { "key": "Възел", "value": 2, "slug": "vzel" }, { "key": "Вълкан", "value": 19, "slug": "vlkan" }, { "key": "Вълкович", "value": 6, "slug": "vlkovich" }, { "key": "Вълково", "value": 20, "slug": "vlkovo" }, { "key": "Вълкосел", "value": 78, "slug": "vlkosel" }, { "key": "Вълнари", "value": 38, "slug": "vlnari" }, { "key": "Вълча поляна", "value": 8, "slug": "vlcha-polyana" }, { "key": "Вълчан", "value": 2, "slug": "vlchan" }, { "key": "Вълчан дол", "value": 5, "slug": "vlchan-dol" }, { "key": "Вълчаново", "value": 6, "slug": "vlchanovo" }, { "key": "Вълче поле", "value": 5, "slug": "vlche-pole" }, { "key": "Вълчедръм", "value": 99, "slug": "vlchedrm" }, { "key": "Вълчек", "value": 5, "slug": "vlchek" }, { "key": "Вълчи дол", "value": 176, "slug": "vlchi-dol" }, { "key": "Вълчин", "value": 6, "slug": "vlchin" }, { "key": "Вълчитрън", "value": 32, "slug": "vlchitrn" }, { "key": "Върба", "value": 1, "slug": "vrba" }, { "key": "Върбак", "value": 5, "slug": "vrbak" }, { "key": "Върбен", "value": 20, "slug": "vrben" }, { "key": "Върбешница", "value": 7, "slug": "vrbeshnica" }, { "key": "Върбина", "value": 32, "slug": "vrbina" }, { "key": "Върбино", "value": 4, "slug": "vrbino" }, { "key": "Върбица", "value": 181, "slug": "vrbica" }, { "key": "Върбница", "value": 2, "slug": "vrbnica" }, { "key": "Върбовка", "value": 31, "slug": "vrbovka" }, { "key": "Върбово", "value": 16, "slug": "vrbovo" }, { "key": "Върбовчец", "value": 2, "slug": "vrbovchec" }, { "key": "Върбяне", "value": 10, "slug": "vrbyane" }, { "key": "Въргов дол", "value": 1, "slug": "vrgov-dol" }, { "key": "Вързилковци", "value": 1, "slug": "vrzilkovci" }, { "key": "Вързулица", "value": 5, "slug": "vrzulica" }, { "key": "Върли дол", "value": 1, "slug": "vrli-dol" }, { "key": "Върлино", "value": 3, "slug": "vrlino" }, { "key": "Въртоп", "value": 1, "slug": "vrtop" }, { "key": "Вършец", "value": 251, "slug": "vrshec" }, { "key": "Вършило", "value": 4, "slug": "vrshilo" }, { "key": "Габаре", "value": 38, "slug": "gabare" }, { "key": "Габарево", "value": 64, "slug": "gabarevo" }, { "key": "Габер", "value": 27, "slug": "gaber" }, { "key": "Габерово", "value": 14, "slug": "gaberovo" }, { "key": "Габра", "value": 28, "slug": "gabra" }, { "key": "Габрене", "value": 26, "slug": "gabrene" }, { "key": "Габрешевци", "value": 2, "slug": "gabreshevci" }, { "key": "Габрица", "value": 7, "slug": "gabrica" }, { "key": "Габровдол", "value": 4, "slug": "gabrovdol" }, { "key": "Габровица", "value": 17, "slug": "gabrovica" }, { "key": "Габровница", "value": 29, "slug": "gabrovnica" }, { "key": "Габрово", "value": 6205, "slug": "gabrovo" }, { "key": "Габровци", "value": 3, "slug": "gabrovci" }, { "key": "Габър", "value": 4, "slug": "gabr" }, { "key": "Габърница", "value": 33, "slug": "gabrnica" }, { "key": "Гавраилово", "value": 44, "slug": "gavrailovo" }, { "key": "Гаврил Геново", "value": 9, "slug": "gavril-genovo" }, { "key": "Гаганица", "value": 7, "slug": "gaganica" }, { "key": "Гагово", "value": 5, "slug": "gagovo" }, { "key": "Гайтанево", "value": 5, "slug": "gaytanevo" }, { "key": "Гайтаниново", "value": 9, "slug": "gaytaninovo" }, { "key": "Гайтаните", "value": 6, "slug": "gaytanite" }, { "key": "Гайтанци", "value": 2, "slug": "gaytanci" }, { "key": "Галата", "value": 78, "slug": "galata" }, { "key": "Галатин", "value": 21, "slug": "galatin" }, { "key": "Галиче", "value": 57, "slug": "galiche" }, { "key": "Галово", "value": 6, "slug": "galovo" }, { "key": "Ганчовец", "value": 11, "slug": "ganchovec" }, { "key": "Гарван", "value": 22, "slug": "garvan" }, { "key": "Гарваново", "value": 10, "slug": "garvanovo" }, { "key": "Гега", "value": 4, "slug": "gega" }, { "key": "Гела", "value": 5, "slug": "gela" }, { "key": "Гелеменово", "value": 15, "slug": "gelemenovo" }, { "key": "Генерал Инзово", "value": 52, "slug": "general-inzovo" }, { "key": "Генерал Кантарджиево", "value": 49, "slug": "general-kantardzhievo" }, { "key": "Генерал Киселово", "value": 20, "slug": "general-kiselovo" }, { "key": "Генерал Колево", "value": 18, "slug": "general-kolevo" }, { "key": "Генерал Мариново", "value": 1, "slug": "general-marinovo" }, { "key": "Генерал Тодоров", "value": 23, "slug": "general-todorov" }, { "key": "Генерал Тошево", "value": 566, "slug": "general-toshevo" }, { "key": "Генералово", "value": 4, "slug": "generalovo" }, { "key": "Георги Дамяново", "value": 24, "slug": "georgi-damyanovo" }, { "key": "Георги Добрево", "value": 8, "slug": "georgi-dobrevo" }, { "key": "Гергевец", "value": 23, "slug": "gergevec" }, { "key": "Герман", "value": 189, "slug": "german" }, { "key": "Гецово", "value": 90, "slug": "gecovo" }, { "key": "Геша", "value": 1, "slug": "gesha" }, { "key": "Гешаново", "value": 12, "slug": "geshanovo" }, { "key": "Гиген", "value": 22, "slug": "gigen" }, { "key": "Гигинци", "value": 7, "slug": "giginci" }, { "key": "Гинци", "value": 21, "slug": "ginci" }, { "key": "Гирчевци", "value": 5, "slug": "girchevci" }, { "key": "Гита", "value": 16, "slug": "gita" }, { "key": "Глава", "value": 23, "slug": "glava" }, { "key": "Главан", "value": 43, "slug": "glavan" }, { "key": "Главановци", "value": 8, "slug": "glavanovci" }, { "key": "Главанци", "value": 2, "slug": "glavanci" }, { "key": "Главатар", "value": 7, "slug": "glavatar" }, { "key": "Главатарци", "value": 4, "slug": "glavatarci" }, { "key": "Главаци", "value": 10, "slug": "glavaci" }, { "key": "Главиница", "value": 175, "slug": "glavinica" }, { "key": "Главник", "value": 5, "slug": "glavnik" }, { "key": "Глашатай", "value": 1, "slug": "glashatay" }, { "key": "Гледаци", "value": 2, "slug": "gledaci" }, { "key": "Гледка", "value": 20, "slug": "gledka" }, { "key": "Глогинка", "value": 13, "slug": "gloginka" }, { "key": "Глогино", "value": 4, "slug": "glogino" }, { "key": "Глоговица", "value": 3, "slug": "glogovica" }, { "key": "Глогово", "value": 48, "slug": "glogovo" }, { "key": "Глоджево", "value": 98, "slug": "glodzhevo" }, { "key": "Гложене", "value": 131, "slug": "glozhene" }, { "key": "Глумово", "value": 1, "slug": "glumovo" }, { "key": "Глумче", "value": 1, "slug": "glumche" }, { "key": "Глуфишево", "value": 21, "slug": "glufishevo" }, { "key": "Глухар", "value": 39, "slug": "gluhar" }, { "key": "Глушник", "value": 10, "slug": "glushnik" }, { "key": "Гняздово", "value": 4, "slug": "gnyazdovo" }, { "key": "Говедаре", "value": 43, "slug": "govedare" }, { "key": "Говедарци", "value": 93, "slug": "govedarci" }, { "key": "Говежда", "value": 17, "slug": "govezhda" }, { "key": "Годеч", "value": 264, "slug": "godech" }, { "key": "Годешево", "value": 14, "slug": "godeshevo" }, { "key": "Годлево", "value": 43, "slug": "godlevo" }, { "key": "Гоздейка", "value": 2, "slug": "gozdeyka" }, { "key": "Голема Раковица", "value": 9, "slug": "golema-rakovica" }, { "key": "Големаните", "value": 2, "slug": "golemanite" }, { "key": "Големаново", "value": 7, "slug": "golemanovo" }, { "key": "Големанци", "value": 11, "slug": "golemanci" }, { "key": "Големи Станчовци", "value": 6, "slug": "golemi-stanchovci" }, { "key": "Големо Бабино", "value": 16, "slug": "golemo-babino" }, { "key": "Големо Бучино", "value": 28, "slug": "golemo-buchino" }, { "key": "Големо Малово", "value": 6, "slug": "golemo-malovo" }, { "key": "Големо село", "value": 30, "slug": "golemo-selo" }, { "key": "Голец", "value": 18, "slug": "golec" }, { "key": "Голеш", "value": 28, "slug": "golesh" }, { "key": "Голица", "value": 7, "slug": "golica" }, { "key": "Голобрадово", "value": 1, "slug": "golobradovo" }, { "key": "Голям Върбовник", "value": 4, "slug": "golyam-vrbovnik" }, { "key": "Голям Девесил", "value": 2, "slug": "golyam-devesil" }, { "key": "Голям Дервент", "value": 3, "slug": "golyam-dervent" }, { "key": "Голям дол", "value": 4, "slug": "golyam-dol" }, { "key": "Голям извор", "value": 30, "slug": "golyam-izvor" }, { "key": "Голям манастир", "value": 8, "slug": "golyam-manastir" }, { "key": "Голям Поровец", "value": 17, "slug": "golyam-porovec" }, { "key": "Голям чардак", "value": 22, "slug": "golyam-chardak" }, { "key": "Голяма Брестница", "value": 7, "slug": "golyama-brestnica" }, { "key": "Голяма вода", "value": 12, "slug": "golyama-voda" }, { "key": "Голяма Желязна", "value": 30, "slug": "golyama-zhelyazna" }, { "key": "Голяма Чинка", "value": 8, "slug": "golyama-chinka" }, { "key": "Голямо Асеново", "value": 1, "slug": "golyamo-asenovo" }, { "key": "Голямо Белово", "value": 17, "slug": "golyamo-belovo" }, { "key": "Голямо Буково", "value": 5, "slug": "golyamo-bukovo" }, { "key": "Голямо Враново", "value": 58, "slug": "golyamo-vranovo" }, { "key": "Голямо градище", "value": 19, "slug": "golyamo-gradishche" }, { "key": "Голямо Дряново", "value": 4, "slug": "golyamo-dryanovo" }, { "key": "Голямо Каменяне", "value": 6, "slug": "golyamo-kamenyane" }, { "key": "Голямо Крушево", "value": 9, "slug": "golyamo-krushevo" }, { "key": "Голямо ново", "value": 11, "slug": "golyamo-novo" }, { "key": "Голямо Пещене", "value": 4, "slug": "golyamo-peshchene" }, { "key": "Голямо Соколово", "value": 7, "slug": "golyamo-sokolovo" }, { "key": "Голямо църквище", "value": 7, "slug": "golyamo-crkvishche" }, { "key": "Голямо Чочовени", "value": 11, "slug": "golyamo-chochoveni" }, { "key": "Голяновци", "value": 31, "slug": "golyanovci" }, { "key": "Гомотарци", "value": 38, "slug": "gomotarci" }, { "key": "Горан", "value": 5, "slug": "goran" }, { "key": "Горановци", "value": 2, "slug": "goranovci" }, { "key": "Гореме", "value": 1, "slug": "goreme" }, { "key": "Горен Еневец", "value": 1, "slug": "goren-enevec" }, { "key": "Горен чифлик", "value": 63, "slug": "goren-chiflik" }, { "key": "Горица", "value": 79, "slug": "gorica" }, { "key": "Горичане", "value": 4, "slug": "gorichane" }, { "key": "Горичево", "value": 3, "slug": "gorichevo" }, { "key": "Горна Арда", "value": 3, "slug": "gorna-arda" }, { "key": "Горна Бела речка", "value": 2, "slug": "gorna-bela-rechka" }, { "key": "Горна Бешовица", "value": 5, "slug": "gorna-beshovica" }, { "key": "Горна Биркова", "value": 6, "slug": "gorna-birkova" }, { "key": "Горна Брезница", "value": 38, "slug": "gorna-breznica" }, { "key": "Горна Брестница", "value": 2, "slug": "gorna-brestnica" }, { "key": "Горна Василица", "value": 5, "slug": "gorna-vasilica" }, { "key": "Горна Вереница", "value": 2, "slug": "gorna-verenica" }, { "key": "Горна Врабча", "value": 1, "slug": "gorna-vrabcha" }, { "key": "Горна Гращица", "value": 18, "slug": "gorna-grashchica" }, { "key": "Горна Диканя", "value": 6, "slug": "gorna-dikanya" }, { "key": "Горна Дъбева", "value": 2, "slug": "gorna-dbeva" }, { "key": "Горна Ковачица", "value": 7, "slug": "gorna-kovachica" }, { "key": "Горна Козница", "value": 9, "slug": "gorna-koznica" }, { "key": "Горна Кремена", "value": 14, "slug": "gorna-kremena" }, { "key": "Горна крепост", "value": 1, "slug": "gorna-krepost" }, { "key": "Горна Крушица", "value": 3, "slug": "gorna-krushica" }, { "key": "Горна кула", "value": 11, "slug": "gorna-kula" }, { "key": "Горна Липница", "value": 15, "slug": "gorna-lipnica" }, { "key": "Горна Лука", "value": 21, "slug": "gorna-luka" }, { "key": "Горна Малина", "value": 89, "slug": "gorna-malina" }, { "key": "Горна махала", "value": 5, "slug": "gorna-mahala" }, { "key": "Горна Митрополия", "value": 53, "slug": "gorna-mitropoliya" }, { "key": "Горна Оряховица", "value": 2362, "slug": "gorna-oryahovica" }, { "key": "Горна Росица", "value": 25, "slug": "gorna-rosica" }, { "key": "Горна Студена", "value": 19, "slug": "gorna-studena" }, { "key": "Горна Сушица", "value": 3, "slug": "gorna-sushica" }, { "key": "Горна Хубавка", "value": 1, "slug": "gorna-hubavka" }, { "key": "Горни Богров", "value": 86, "slug": "gorni-bogrov" }, { "key": "Горни Вадин", "value": 5, "slug": "gorni-vadin" }, { "key": "Горни Върпища", "value": 1, "slug": "gorni-vrpishcha" }, { "key": "Горни Главанак", "value": 6, "slug": "gorni-glavanak" }, { "key": "Горни Домлян", "value": 12, "slug": "gorni-domlyan" }, { "key": "Горни Дъбник", "value": 56, "slug": "gorni-dbnik" }, { "key": "Горни Лом", "value": 27, "slug": "gorni-lom" }, { "key": "Горни Окол", "value": 3, "slug": "gorni-okol" }, { "key": "Горни Романци", "value": 1, "slug": "gorni-romanci" }, { "key": "Горни Цибър", "value": 4, "slug": "gorni-cibr" }, { "key": "Горни Юруци", "value": 3, "slug": "gorni-yuruci" }, { "key": "Горник", "value": 28, "slug": "gornik" }, { "key": "Горно Абланово", "value": 18, "slug": "gorno-ablanovo" }, { "key": "Горно Александрово", "value": 13, "slug": "gorno-aleksandrovo" }, { "key": "Горно Белево", "value": 13, "slug": "gorno-belevo" }, { "key": "Горно Ботево", "value": 31, "slug": "gorno-botevo" }, { "key": "Горно Войводино", "value": 4, "slug": "gorno-voyvodino" }, { "key": "Горно Драглище", "value": 38, "slug": "gorno-draglishche" }, { "key": "Горно Дряново", "value": 59, "slug": "gorno-dryanovo" }, { "key": "Горно Изворово", "value": 11, "slug": "gorno-izvorovo" }, { "key": "Горно Камарци", "value": 15, "slug": "gorno-kamarci" }, { "key": "Горно Кирково", "value": 23, "slug": "gorno-kirkovo" }, { "key": "Горно Козарево", "value": 6, "slug": "gorno-kozarevo" }, { "key": "Горно Краище", "value": 27, "slug": "gorno-kraishche" }, { "key": "Горно Новково", "value": 3, "slug": "gorno-novkovo" }, { "key": "Горно Озирово", "value": 5, "slug": "gorno-ozirovo" }, { "key": "Горно Павликене", "value": 4, "slug": "gorno-pavlikene" }, { "key": "Горно Пещене", "value": 6, "slug": "gorno-peshchene" }, { "key": "Горно поле", "value": 4, "slug": "gorno-pole" }, { "key": "Горно Прахово", "value": 17, "slug": "gorno-prahovo" }, { "key": "Горно Сахране", "value": 59, "slug": "gorno-sahrane" }, { "key": "Горно Спанчево", "value": 1, "slug": "gorno-spanchevo" }, { "key": "Горно трапе", "value": 10, "slug": "gorno-trape" }, { "key": "Горно Хърсово", "value": 1, "slug": "gorno-hrsovo" }, { "key": "Горно Церовене", "value": 6, "slug": "gorno-cerovene" }, { "key": "Горно Черковище", "value": 30, "slug": "gorno-cherkovishche" }, { "key": "Горно Ябълково", "value": 1, "slug": "gorno-yablkovo" }, { "key": "Горнослав", "value": 3, "slug": "gornoslav" }, { "key": "Гороцвет", "value": 11, "slug": "gorocvet" }, { "key": "Горочевци", "value": 2, "slug": "gorochevci" }, { "key": "Горска поляна", "value": 6, "slug": "gorska-polyana" }, { "key": "Горски горен Тръмбеш", "value": 4, "slug": "gorski-goren-trmbesh" }, { "key": "Горски долен Тръмбеш", "value": 3, "slug": "gorski-dolen-trmbesh" }, { "key": "Горски извор", "value": 65, "slug": "gorski-izvor" }, { "key": "Горски Сеновец", "value": 9, "slug": "gorski-senovec" }, { "key": "Горско Абланово", "value": 3, "slug": "gorsko-ablanovo" }, { "key": "Горско Дюлево", "value": 1, "slug": "gorsko-dyulevo" }, { "key": "Горско Калугерово", "value": 6, "slug": "gorsko-kalugerovo" }, { "key": "Горско Косово", "value": 5, "slug": "gorsko-kosovo" }, { "key": "Горско ново село", "value": 30, "slug": "gorsko-novo-selo" }, { "key": "Горско село", "value": 2, "slug": "gorsko-selo" }, { "key": "Горско Сливово", "value": 22, "slug": "gorsko-slivovo" }, { "key": "Горталово", "value": 3, "slug": "gortalovo" }, { "key": "Горун", "value": 7, "slug": "gorun" }, { "key": "Господиново", "value": 12, "slug": "gospodinovo" }, { "key": "Господинци", "value": 16, "slug": "gospodinci" }, { "key": "Гостилица", "value": 31, "slug": "gostilica" }, { "key": "Гостиля", "value": 6, "slug": "gostilya" }, { "key": "Гостиня", "value": 6, "slug": "gostinya" }, { "key": "Гоце Делчев", "value": 2391, "slug": "goce-delchev" }, { "key": "Градево", "value": 10, "slug": "gradevo" }, { "key": "Градежница", "value": 46, "slug": "gradezhnica" }, { "key": "Градец", "value": 125, "slug": "gradec" }, { "key": "Градешница", "value": 12, "slug": "gradeshnica" }, { "key": "Градина", "value": 125, "slug": "gradina" }, { "key": "Градинарово", "value": 17, "slug": "gradinarovo" }, { "key": "Градини", "value": 4, "slug": "gradini" }, { "key": "Градище", "value": 37, "slug": "gradishche" }, { "key": "Градница", "value": 28, "slug": "gradnica" }, { "key": "Градско", "value": 9, "slug": "gradsko" }, { "key": "Градът", "value": 4, "slug": "gradt" }, { "key": "Грамада", "value": 48, "slug": "gramada" }, { "key": "Грамаде", "value": 3, "slug": "gramade" }, { "key": "Грамаждано", "value": 14, "slug": "gramazhdano" }, { "key": "Граматиково", "value": 40, "slug": "gramatikovo" }, { "key": "Гранит", "value": 7, "slug": "granit" }, { "key": "Гранитово", "value": 38, "slug": "granitovo" }, { "key": "Граница", "value": 18, "slug": "granica" }, { "key": "Граничар", "value": 8, "slug": "granichar" }, { "key": "Граф Игнатиево", "value": 112, "slug": "graf-ignatievo" }, { "key": "Грашево", "value": 23, "slug": "grashevo" }, { "key": "Гривица", "value": 54, "slug": "grivica" }, { "key": "Гривка", "value": 1, "slug": "grivka" }, { "key": "Григорево", "value": 17, "slug": "grigorevo" }, { "key": "Грозден", "value": 29, "slug": "grozden" }, { "key": "Гроздьово", "value": 76, "slug": "grozdovo" }, { "key": "Громшин", "value": 11, "slug": "gromshin" }, { "key": "Грохотно", "value": 22, "slug": "grohotno" }, { "key": "Груево", "value": 14, "slug": "gruevo" }, { "key": "Гръблевци", "value": 2, "slug": "grblevci" }, { "key": "Грънчарово", "value": 11, "slug": "grncharovo" }, { "key": "Губеш", "value": 2, "slug": "gubesh" }, { "key": "Гулийка", "value": 4, "slug": "guliyka" }, { "key": "Гулянци", "value": 105, "slug": "gulyanci" }, { "key": "Гумощник", "value": 3, "slug": "gumoshchnik" }, { "key": "Гурково", "value": 178, "slug": "gurkovo" }, { "key": "Гурмазово", "value": 42, "slug": "gurmazovo" }, { "key": "Гусла", "value": 15, "slug": "gusla" }, { "key": "Гуцал", "value": 8, "slug": "gucal" }, { "key": "Гъбене", "value": 12, "slug": "gbene" }, { "key": "Гълъбец", "value": 77, "slug": "glbec" }, { "key": "Гълъбинци", "value": 10, "slug": "glbinci" }, { "key": "Гълъбник", "value": 3, "slug": "glbnik" }, { "key": "Гълъбово", "value": 598, "slug": "glbovo" }, { "key": "Гълъбовци", "value": 17, "slug": "glbovci" }, { "key": "Гъмзово", "value": 19, "slug": "gmzovo" }, { "key": "Гърбище", "value": 3, "slug": "grbishche" }, { "key": "Гърдевци", "value": 2, "slug": "grdevci" }, { "key": "Гърло", "value": 4, "slug": "grlo" }, { "key": "Гърляно", "value": 11, "slug": "grlyano" }, { "key": "Гърмен", "value": 135, "slug": "grmen" }, { "key": "Гърнати", "value": 1, "slug": "grnati" }, { "key": "Гърчиново", "value": 16, "slug": "grchinovo" }, { "key": "Гъсково", "value": 4, "slug": "gskovo" }, { "key": "Гьоврен", "value": 26, "slug": "govren" }, { "key": "Гюешево", "value": 5, "slug": "gyueshevo" }, { "key": "Гюльовца", "value": 64, "slug": "gyulovca" }, { "key": "Гюргич", "value": 4, "slug": "gyurgich" }, { "key": "Давери", "value": 2, "slug": "daveri" }, { "key": "Давидково", "value": 30, "slug": "davidkovo" }, { "key": "Давидово", "value": 17, "slug": "davidovo" }, { "key": "Дагоново", "value": 17, "slug": "dagonovo" }, { "key": "Дамяница", "value": 58, "slug": "damyanica" }, { "key": "Дамяново", "value": 16, "slug": "damyanovo" }, { "key": "Даскал-Атанасово", "value": 11, "slug": "daskal-atanasovo" }, { "key": "Даскалово", "value": 7, "slug": "daskalovo" }, { "key": "Две могили", "value": 196, "slug": "dve-mogili" }, { "key": "Дворище", "value": 2, "slug": "dvorishche" }, { "key": "Дебел дял", "value": 1, "slug": "debel-dyal" }, { "key": "Дебелец", "value": 198, "slug": "debelec" }, { "key": "Дебели лаг", "value": 4, "slug": "debeli-lag" }, { "key": "Дебелт", "value": 85, "slug": "debelt" }, { "key": "Дебелцово", "value": 3, "slug": "debelcovo" }, { "key": "Дебеляново", "value": 3, "slug": "debelyanovo" }, { "key": "Дебнево", "value": 25, "slug": "debnevo" }, { "key": "Дебово", "value": 7, "slug": "debovo" }, { "key": "Дебрен", "value": 109, "slug": "debren" }, { "key": "Дебрене", "value": 2, "slug": "debrene" }, { "key": "Дебръщица", "value": 35, "slug": "debrshchica" }, { "key": "Девене", "value": 20, "slug": "devene" }, { "key": "Девенци", "value": 16, "slug": "devenci" }, { "key": "Девесилица", "value": 2, "slug": "devesilica" }, { "key": "Девесилово", "value": 2, "slug": "devesilovo" }, { "key": "Деветак", "value": 7, "slug": "devetak" }, { "key": "Деветаки", "value": 7, "slug": "devetaki" }, { "key": "Деветинци", "value": 5, "slug": "devetinci" }, { "key": "Девин", "value": 495, "slug": "devin" }, { "key": "Девинци", "value": 2, "slug": "devinci" }, { "key": "Девня", "value": 543, "slug": "devnya" }, { "key": "Дедец", "value": 1, "slug": "dedec" }, { "key": "Дедина", "value": 2, "slug": "dedina" }, { "key": "Дедино", "value": 3, "slug": "dedino" }, { "key": "Дединци", "value": 2, "slug": "dedinci" }, { "key": "Дедово", "value": 7, "slug": "dedovo" }, { "key": "Деков", "value": 24, "slug": "dekov" }, { "key": "Делвино", "value": 1, "slug": "delvino" }, { "key": "Делейна", "value": 5, "slug": "deleyna" }, { "key": "Делчево", "value": 20, "slug": "delchevo" }, { "key": "Делян", "value": 4, "slug": "delyan" }, { "key": "Деляновци", "value": 3, "slug": "delyanovci" }, { "key": "Денница", "value": 4, "slug": "dennica" }, { "key": "Денчевци", "value": 4, "slug": "denchevci" }, { "key": "Дерманци", "value": 75, "slug": "dermanci" }, { "key": "Детелина", "value": 14, "slug": "detelina" }, { "key": "Джебел", "value": 196, "slug": "dzhebel" }, { "key": "Джелепско", "value": 6, "slug": "dzhelepsko" }, { "key": "Джерман", "value": 60, "slug": "dzherman" }, { "key": "Джерово", "value": 8, "slug": "dzherovo" }, { "key": "Джигурово", "value": 28, "slug": "dzhigurovo" }, { "key": "Джинот", "value": 7, "slug": "dzhinot" }, { "key": "Джинчовци", "value": 1, "slug": "dzhinchovci" }, { "key": "Джулюница", "value": 63, "slug": "dzhulyunica" }, { "key": "Джумриите", "value": 1, "slug": "dzhumriite" }, { "key": "Джурково", "value": 7, "slug": "dzhurkovo" }, { "key": "Джурово", "value": 28, "slug": "dzhurovo" }, { "key": "Диамандово", "value": 4, "slug": "diamandovo" }, { "key": "Дибич", "value": 24, "slug": "dibich" }, { "key": "Дива Слатина", "value": 3, "slug": "diva-slatina" }, { "key": "Дивеци", "value": 1, "slug": "diveci" }, { "key": "Дивля", "value": 5, "slug": "divlya" }, { "key": "Дивотино", "value": 107, "slug": "divotino" }, { "key": "Дивчовото", "value": 2, "slug": "divchovoto" }, { "key": "Диманово", "value": 3, "slug": "dimanovo" }, { "key": "Димиевци", "value": 1, "slug": "dimievci" }, { "key": "Димитриево", "value": 3, "slug": "dimitrievo" }, { "key": "Димитровград", "value": 3669, "slug": "dimitrovgrad" }, { "key": "Димитровче", "value": 22, "slug": "dimitrovche" }, { "key": "Димово", "value": 36, "slug": "dimovo" }, { "key": "Димовци", "value": 3, "slug": "dimovci" }, { "key": "Димча", "value": 8, "slug": "dimcha" }, { "key": "Димчево", "value": 12, "slug": "dimchevo" }, { "key": "Динево", "value": 11, "slug": "dinevo" }, { "key": "Динк", "value": 10, "slug": "dink" }, { "key": "Динката", "value": 25, "slug": "dinkata" }, { "key": "Динково", "value": 3, "slug": "dinkovo" }, { "key": "Диня", "value": 6, "slug": "dinya" }, { "key": "Дирало", "value": 1, "slug": "diralo" }, { "key": "Дисевица", "value": 9, "slug": "disevica" }, { "key": "Дичево", "value": 8, "slug": "dichevo" }, { "key": "Дичин", "value": 15, "slug": "dichin" }, { "key": "Длъгнево", "value": 4, "slug": "dlgnevo" }, { "key": "Длъгня", "value": 6, "slug": "dlgnya" }, { "key": "Длъжка поляна", "value": 5, "slug": "dlzhka-polyana" }, { "key": "Длъжко", "value": 4, "slug": "dlzhko" }, { "key": "Доборско", "value": 2, "slug": "doborsko" }, { "key": "Добра поляна", "value": 17, "slug": "dobra-polyana" }, { "key": "Добралък", "value": 4, "slug": "dobralk" }, { "key": "Добрево", "value": 5, "slug": "dobrevo" }, { "key": "Добревци", "value": 10, "slug": "dobrevci" }, { "key": "Добри Войниково", "value": 6, "slug": "dobri-voynikovo" }, { "key": "Добри дол", "value": 7, "slug": "dobri-dol" }, { "key": "Добри дял", "value": 23, "slug": "dobri-dyal" }, { "key": "Добри лаки", "value": 5, "slug": "dobri-laki" }, { "key": "Добрин", "value": 12, "slug": "dobrin" }, { "key": "Добрина", "value": 22, "slug": "dobrina" }, { "key": "Добринище", "value": 212, "slug": "dobrinishche" }, { "key": "Добриново", "value": 10, "slug": "dobrinovo" }, { "key": "Добринци", "value": 8, "slug": "dobrinci" }, { "key": "Добрич", "value": 9162, "slug": "dobrich" }, { "key": "Добровница", "value": 55, "slug": "dobrovnica" }, { "key": "Доброглед", "value": 16, "slug": "dobrogled" }, { "key": "Добродан", "value": 14, "slug": "dobrodan" }, { "key": "Добролево", "value": 22, "slug": "dobrolevo" }, { "key": "Добромир", "value": 34, "slug": "dobromir" }, { "key": "Добромирка", "value": 20, "slug": "dobromirka" }, { "key": "Добромирци", "value": 31, "slug": "dobromirci" }, { "key": "Доброплодно", "value": 17, "slug": "dobroplodno" }, { "key": "Доброславци", "value": 78, "slug": "dobroslavci" }, { "key": "Добротица", "value": 14, "slug": "dobrotica" }, { "key": "Добротич", "value": 17, "slug": "dobrotich" }, { "key": "Добруджанка", "value": 1, "slug": "dobrudzhanka" }, { "key": "Добруша", "value": 4, "slug": "dobrusha" }, { "key": "Добърско", "value": 18, "slug": "dobrsko" }, { "key": "Добърчин", "value": 1, "slug": "dobrchin" }, { "key": "Доганово", "value": 26, "slug": "doganovo" }, { "key": "Дойранци", "value": 14, "slug": "doyranci" }, { "key": "Дойренци", "value": 32, "slug": "doyrenci" }, { "key": "Доктор Йосифово", "value": 17, "slug": "doktor-yosifovo" }, { "key": "Долен", "value": 44, "slug": "dolen" }, { "key": "Долец", "value": 10, "slug": "dolec" }, { "key": "Долие", "value": 3, "slug": "dolie" }, { "key": "Долина", "value": 28, "slug": "dolina" }, { "key": "Долистово", "value": 11, "slug": "dolistovo" }, { "key": "Долище", "value": 42, "slug": "dolishche" }, { "key": "Долна баня", "value": 194, "slug": "dolna-banya" }, { "key": "Долна Бела речка", "value": 1, "slug": "dolna-bela-rechka" }, { "key": "Долна Бешовица", "value": 11, "slug": "dolna-beshovica" }, { "key": "Долна Вереница", "value": 5, "slug": "dolna-verenica" }, { "key": "Долна Градешница", "value": 51, "slug": "dolna-gradeshnica" }, { "key": "Долна Гращица", "value": 1, "slug": "dolna-grashchica" }, { "key": "Долна Диканя", "value": 25, "slug": "dolna-dikanya" }, { "key": "Долна Дъбева", "value": 4, "slug": "dolna-dbeva" }, { "key": "Долна Кабда", "value": 10, "slug": "dolna-kabda" }, { "key": "Долна Кремена", "value": 16, "slug": "dolna-kremena" }, { "key": "Долна крепост", "value": 1, "slug": "dolna-krepost" }, { "key": "Долна Крушица", "value": 5, "slug": "dolna-krushica" }, { "key": "Долна Липница", "value": 17, "slug": "dolna-lipnica" }, { "key": "Долна Малина", "value": 6, "slug": "dolna-malina" }, { "key": "Долна махала", "value": 15, "slug": "dolna-mahala" }, { "key": "Долна Митрополия", "value": 155, "slug": "dolna-mitropoliya" }, { "key": "Долна Невля", "value": 3, "slug": "dolna-nevlya" }, { "key": "Долна Оряховица", "value": 129, "slug": "dolna-oryahovica" }, { "key": "Долна Рибница", "value": 12, "slug": "dolna-ribnica" }, { "key": "Долна Рикса", "value": 2, "slug": "dolna-riksa" }, { "key": "Долна Секирна", "value": 5, "slug": "dolna-sekirna" }, { "key": "Долна Студена", "value": 36, "slug": "dolna-studena" }, { "key": "Долна Хубавка", "value": 8, "slug": "dolna-hubavka" }, { "key": "Долни Богров", "value": 47, "slug": "dolni-bogrov" }, { "key": "Долни Бошняк", "value": 1, "slug": "dolni-boshnyak" }, { "key": "Долни Вадин", "value": 12, "slug": "dolni-vadin" }, { "key": "Долни Вит", "value": 18, "slug": "dolni-vit" }, { "key": "Долни Главанак", "value": 7, "slug": "dolni-glavanak" }, { "key": "Долни Дъбник", "value": 222, "slug": "dolni-dbnik" }, { "key": "Долни Лом", "value": 17, "slug": "dolni-lom" }, { "key": "Долни Луковит", "value": 37, "slug": "dolni-lukovit" }, { "key": "Долни Марян", "value": 1, "slug": "dolni-maryan" }, { "key": "Долни Окол", "value": 1, "slug": "dolni-okol" }, { "key": "Долни Пасарел", "value": 44, "slug": "dolni-pasarel" }, { "key": "Долни Раковец", "value": 12, "slug": "dolni-rakovec" }, { "key": "Долни Цибър", "value": 38, "slug": "dolni-cibr" }, { "key": "Долни чифлик", "value": 403, "slug": "dolni-chiflik" }, { "key": "Долно Абланово", "value": 7, "slug": "dolno-ablanovo" }, { "key": "Долно Белево", "value": 12, "slug": "dolno-belevo" }, { "key": "Долно Белотинци", "value": 11, "slug": "dolno-belotinci" }, { "key": "Долно Ботево", "value": 13, "slug": "dolno-botevo" }, { "key": "Долно Войводино", "value": 3, "slug": "dolno-voyvodino" }, { "key": "Долно Големанци", "value": 10, "slug": "dolno-golemanci" }, { "key": "Долно Драглище", "value": 34, "slug": "dolno-draglishche" }, { "key": "Долно Дряново", "value": 30, "slug": "dolno-dryanovo" }, { "key": "Долно изворово", "value": 22, "slug": "dolno-izvorovo" }, { "key": "Долно Камарци", "value": 9, "slug": "dolno-kamarci" }, { "key": "Долно Кобиле", "value": 1, "slug": "dolno-kobile" }, { "key": "Долно Козарево", "value": 6, "slug": "dolno-kozarevo" }, { "key": "Долно Къпиново", "value": 5, "slug": "dolno-kpinovo" }, { "key": "Долно Линево", "value": 4, "slug": "dolno-linevo" }, { "key": "Долно Луково", "value": 2, "slug": "dolno-lukovo" }, { "key": "Долно Новково", "value": 1, "slug": "dolno-novkovo" }, { "key": "Долно ново село", "value": 4, "slug": "dolno-novo-selo" }, { "key": "Долно Озирово", "value": 14, "slug": "dolno-ozirovo" }, { "key": "Долно Осеново", "value": 23, "slug": "dolno-osenovo" }, { "key": "Долно Прахово", "value": 1, "slug": "dolno-prahovo" }, { "key": "Долно Ряхово", "value": 8, "slug": "dolno-ryahovo" }, { "key": "Долно Сахране", "value": 37, "slug": "dolno-sahrane" }, { "key": "Долно село", "value": 3, "slug": "dolno-selo" }, { "key": "Долно Спанчево", "value": 11, "slug": "dolno-spanchevo" }, { "key": "Долно Съдиево", "value": 2, "slug": "dolno-sdievo" }, { "key": "Долно Уйно", "value": 6, "slug": "dolno-uyno" }, { "key": "Долно Церовене", "value": 10, "slug": "dolno-cerovene" }, { "key": "Долно Черковище", "value": 9, "slug": "dolno-cherkovishche" }, { "key": "Долно Ябълково", "value": 1, "slug": "dolno-yablkovo" }, { "key": "Долнослав", "value": 11, "slug": "dolnoslav" }, { "key": "Домище", "value": 4, "slug": "domishche" }, { "key": "Домлян", "value": 7, "slug": "domlyan" }, { "key": "Дондуково", "value": 11, "slug": "dondukovo" }, { "key": "Донино", "value": 3, "slug": "donino" }, { "key": "Донковци", "value": 2, "slug": "donkovci" }, { "key": "Дончево", "value": 36, "slug": "donchevo" }, { "key": "Дорково", "value": 89, "slug": "dorkovo" }, { "key": "Доситеево", "value": 9, "slug": "dositeevo" }, { "key": "Доспат", "value": 216, "slug": "dospat" }, { "key": "Доспей", "value": 51, "slug": "dospey" }, { "key": "Драбишна", "value": 2, "slug": "drabishna" }, { "key": "Драгана", "value": 6, "slug": "dragana" }, { "key": "Драганица", "value": 3, "slug": "draganica" }, { "key": "Драгановец", "value": 4, "slug": "draganovec" }, { "key": "Драганово", "value": 89, "slug": "draganovo" }, { "key": "Драгановци", "value": 14, "slug": "draganovci" }, { "key": "Драганци", "value": 7, "slug": "draganci" }, { "key": "Драганчетата", "value": 4, "slug": "draganchetata" }, { "key": "Драгаш войвода", "value": 13, "slug": "dragash-voyvoda" }, { "key": "Драгиевци", "value": 11, "slug": "dragievci" }, { "key": "Драгижево", "value": 49, "slug": "dragizhevo" }, { "key": "Драгиново", "value": 100, "slug": "draginovo" }, { "key": "Драгичево", "value": 118, "slug": "dragichevo" }, { "key": "Драговищица", "value": 78, "slug": "dragovishchica" }, { "key": "Драгово", "value": 3, "slug": "dragovo" }, { "key": "Драгоданово", "value": 12, "slug": "dragodanovo" }, { "key": "Драгоево", "value": 30, "slug": "dragoevo" }, { "key": "Драгоил", "value": 2, "slug": "dragoil" }, { "key": "Драгойново", "value": 15, "slug": "dragoynovo" }, { "key": "Драгоман", "value": 240, "slug": "dragoman" }, { "key": "Драгомир", "value": 13, "slug": "dragomir" }, { "key": "Драгомирово", "value": 9, "slug": "dragomirovo" }, { "key": "Драгомъж", "value": 12, "slug": "dragomzh" }, { "key": "Драгор", "value": 75, "slug": "dragor" }, { "key": "Драготинци", "value": 1, "slug": "dragotinci" }, { "key": "Драгушиново", "value": 42, "slug": "dragushinovo" }, { "key": "Дражево", "value": 25, "slug": "drazhevo" }, { "key": "Дражинци", "value": 1, "slug": "drazhinci" }, { "key": "Драка", "value": 10, "slug": "draka" }, { "key": "Драката", "value": 10, "slug": "drakata" }, { "key": "Дралфа", "value": 7, "slug": "dralfa" }, { "key": "Драма", "value": 4, "slug": "drama" }, { "key": "Дрангово", "value": 45, "slug": "drangovo" }, { "key": "Драчево", "value": 20, "slug": "drachevo" }, { "key": "Драшан", "value": 1, "slug": "drashan" }, { "key": "Драшкова поляна", "value": 10, "slug": "drashkova-polyana" }, { "key": "Дрен", "value": 35, "slug": "dren" }, { "key": "Дренов", "value": 14, "slug": "drenov" }, { "key": "Дреновец", "value": 29, "slug": "drenovec" }, { "key": "Дреново", "value": 3, "slug": "drenovo" }, { "key": "Дрента", "value": 3, "slug": "drenta" }, { "key": "Дренци", "value": 6, "slug": "drenci" }, { "key": "Дриново", "value": 12, "slug": "drinovo" }, { "key": "Дрипчево", "value": 3, "slug": "dripchevo" }, { "key": "Дропла", "value": 26, "slug": "dropla" }, { "key": "Друган", "value": 18, "slug": "drugan" }, { "key": "Дружба", "value": 2, "slug": "druzhba" }, { "key": "Дружинци", "value": 3, "slug": "druzhinci" }, { "key": "Друмево", "value": 23, "slug": "drumevo" }, { "key": "Друмохар", "value": 8, "slug": "drumohar" }, { "key": "Дръмша", "value": 14, "slug": "drmsha" }, { "key": "Дръндар", "value": 3, "slug": "drndar" }, { "key": "Дрянка", "value": 10, "slug": "dryanka" }, { "key": "Дрянковец", "value": 5, "slug": "dryankovec" }, { "key": "Дряновец", "value": 55, "slug": "dryanovec" }, { "key": "Дряново", "value": 582, "slug": "dryanovo" }, { "key": "Дрянът", "value": 1, "slug": "dryant" }, { "key": "Дуванлии", "value": 7, "slug": "duvanlii" }, { "key": "Дулово", "value": 566, "slug": "dulovo" }, { "key": "Думници", "value": 6, "slug": "dumnici" }, { "key": "Дунавци", "value": 118, "slug": "dunavci" }, { "key": "Дунево", "value": 7, "slug": "dunevo" }, { "key": "Дупница", "value": 2733, "slug": "dupnica" }, { "key": "Дуранкулак", "value": 53, "slug": "durankulak" }, { "key": "Духовец", "value": 9, "slug": "duhovec" }, { "key": "Душанци", "value": 27, "slug": "dushanci" }, { "key": "Душево", "value": 39, "slug": "dushevo" }, { "key": "Дъбен", "value": 8, "slug": "dben" }, { "key": "Дъбене", "value": 76, "slug": "dbene" }, { "key": "Дъбник", "value": 38, "slug": "dbnik" }, { "key": "Дъбница", "value": 77, "slug": "dbnica" }, { "key": "Дъбова", "value": 1, "slug": "dbova" }, { "key": "Дъбован", "value": 17, "slug": "dbovan" }, { "key": "Дъбовец", "value": 4, "slug": "dbovec" }, { "key": "Дъбовик", "value": 7, "slug": "dbovik" }, { "key": "Дъбовица", "value": 2, "slug": "dbovica" }, { "key": "Дъбово", "value": 49, "slug": "dbovo" }, { "key": "Дъбрава", "value": 14, "slug": "dbrava" }, { "key": "Дъбравата", "value": 2, "slug": "dbravata" }, { "key": "Дъбравино", "value": 44, "slug": "dbravino" }, { "key": "Дъбравите", "value": 17, "slug": "dbravite" }, { "key": "Дъбравка", "value": 1, "slug": "dbravka" }, { "key": "Дъждино", "value": 11, "slug": "dzhdino" }, { "key": "Дъждовница", "value": 1, "slug": "dzhdovnica" }, { "key": "Дълбок дол", "value": 14, "slug": "dlbok-dol" }, { "key": "Дълбок извор", "value": 43, "slug": "dlbok-izvor" }, { "key": "Дълбоки", "value": 47, "slug": "dlboki" }, { "key": "Дългач", "value": 16, "slug": "dlgach" }, { "key": "Дълги дел", "value": 12, "slug": "dlgi-del" }, { "key": "Дълго поле", "value": 54, "slug": "dlgo-pole" }, { "key": "Дългоделци", "value": 8, "slug": "dlgodelci" }, { "key": "Дългопол", "value": 216, "slug": "dlgopol" }, { "key": "Държава", "value": 4, "slug": "drzhava" }, { "key": "Държаница", "value": 12, "slug": "drzhanica" }, { "key": "Дърманци", "value": 8, "slug": "drmanci" }, { "key": "Дъскот", "value": 22, "slug": "dskot" }, { "key": "Дъскотна", "value": 43, "slug": "dskotna" }, { "key": "Дюлево", "value": 53, "slug": "dyulevo" }, { "key": "Дюлино", "value": 20, "slug": "dyulino" }, { "key": "Дюлица", "value": 12, "slug": "dyulica" }, { "key": "Дядово", "value": 12, "slug": "dyadovo" }, { "key": "Дядовско", "value": 6, "slug": "dyadovsko" }, { "key": "Дядовци", "value": 3, "slug": "dyadovci" }, { "key": "Дяково", "value": 1, "slug": "dyakovo" }, { "key": "Дянково", "value": 77, "slug": "dyankovo" }, { "key": "Евренозово", "value": 2, "slug": "evrenozovo" }, { "key": "Егрек", "value": 4, "slug": "egrek" }, { "key": "Егълница", "value": 4, "slug": "eglnica" }, { "key": "Единаковци", "value": 5, "slug": "edinakovci" }, { "key": "Едрево", "value": 16, "slug": "edrevo" }, { "key": "Едрино", "value": 6, "slug": "edrino" }, { "key": "Ездимирци", "value": 6, "slug": "ezdimirci" }, { "key": "Езерец", "value": 1, "slug": "ezerec" }, { "key": "Езеро", "value": 12, "slug": "ezero" }, { "key": "Езерово", "value": 143, "slug": "ezerovo" }, { "key": "Езерче", "value": 59, "slug": "ezerche" }, { "key": "Екзарх Антимово", "value": 31, "slug": "ekzarh-antimovo" }, { "key": "Екзарх Йосиф", "value": 14, "slug": "ekzarh-yosif" }, { "key": "Елена", "value": 390, "slug": "elena" }, { "key": "Еленино", "value": 33, "slug": "elenino" }, { "key": "Еленка", "value": 4, "slug": "elenka" }, { "key": "Еленово", "value": 47, "slug": "elenovo" }, { "key": "Елешница", "value": 68, "slug": "eleshnica" }, { "key": "Елин Пелин", "value": 786, "slug": "elin-pelin" }, { "key": "Елисейна", "value": 7, "slug": "eliseyna" }, { "key": "Еловдол", "value": 6, "slug": "elovdol" }, { "key": "Елховец", "value": 44, "slug": "elhovec" }, { "key": "Елхово", "value": 1167, "slug": "elhovo" }, { "key": "Елшица", "value": 17, "slug": "elshica" }, { "key": "Емен", "value": 7, "slug": "emen" }, { "key": "Емона", "value": 12, "slug": "emona" }, { "key": "Енев рът", "value": 1, "slug": "enev-rt" }, { "key": "Енево", "value": 15, "slug": "enevo" }, { "key": "Енина", "value": 154, "slug": "enina" }, { "key": "Еница", "value": 18, "slug": "enica" }, { "key": "Енчец", "value": 20, "slug": "enchec" }, { "key": "Енчовци", "value": 1, "slug": "enchovci" }, { "key": "Еньовче", "value": 2, "slug": "enovche" }, { "key": "Ерден", "value": 15, "slug": "erden" }, { "key": "Еремия", "value": 1, "slug": "eremiya" }, { "key": "Ерма река", "value": 29, "slug": "erma-reka" }, { "key": "Еровете", "value": 2, "slug": "erovete" }, { "key": "Есен", "value": 1, "slug": "esen" }, { "key": "Есеница", "value": 12, "slug": "esenica" }, { "key": "Етрополе", "value": 598, "slug": "etropole" }, { "key": "Ефрейтор Бакалово", "value": 2, "slug": "efreytor-bakalovo" }, { "key": "Ефрем", "value": 3, "slug": "efrem" }, { "key": "Жабляно", "value": 4, "slug": "zhablyano" }, { "key": "Жабокрът", "value": 37, "slug": "zhabokrt" }, { "key": "Жегларци", "value": 15, "slug": "zheglarci" }, { "key": "Жеглица", "value": 5, "slug": "zheglica" }, { "key": "Жедна", "value": 4, "slug": "zhedna" }, { "key": "Железари", "value": 3, "slug": "zhelezari" }, { "key": "Железино", "value": 7, "slug": "zhelezino" }, { "key": "Железна", "value": 14, "slug": "zhelezna" }, { "key": "Железник", "value": 12, "slug": "zheleznik" }, { "key": "Железница", "value": 92, "slug": "zheleznica" }, { "key": "Желен", "value": 6, "slug": "zhelen" }, { "key": "Желъд", "value": 1, "slug": "zheld" }, { "key": "Желъдово", "value": 1, "slug": "zheldovo" }, { "key": "Желю войвода", "value": 76, "slug": "zhelyu-voyvoda" }, { "key": "Желява", "value": 39, "slug": "zhelyava" }, { "key": "Желязковец", "value": 15, "slug": "zhelyazkovec" }, { "key": "Желязно", "value": 23, "slug": "zhelyazno" }, { "key": "Желязово", "value": 9, "slug": "zhelyazovo" }, { "key": "Женда", "value": 1, "slug": "zhenda" }, { "key": "Жеравна", "value": 21, "slug": "zheravna" }, { "key": "Жернов", "value": 2, "slug": "zhernov" }, { "key": "Живко", "value": 2, "slug": "zhivko" }, { "key": "Живково", "value": 41, "slug": "zhivkovo" }, { "key": "Жижево", "value": 5, "slug": "zhizhevo" }, { "key": "Жиленци", "value": 60, "slug": "zhilenci" }, { "key": "Жилино", "value": 4, "slug": "zhilino" }, { "key": "Жинзифово", "value": 7, "slug": "zhinzifovo" }, { "key": "Житен", "value": 53, "slug": "zhiten" }, { "key": "Житница", "value": 174, "slug": "zhitnica" }, { "key": "Житосвят", "value": 10, "slug": "zhitosvyat" }, { "key": "Житуша", "value": 1, "slug": "zhitusha" }, { "key": "Жребево", "value": 2, "slug": "zhrebevo" }, { "key": "Жребичко", "value": 1, "slug": "zhrebichko" }, { "key": "Жълт бряг", "value": 9, "slug": "zhlt-bryag" }, { "key": "Жълт камък", "value": 3, "slug": "zhlt-kamk" }, { "key": "Жълтеш", "value": 13, "slug": "zhltesh" }, { "key": "Жълти бряг", "value": 13, "slug": "zhlti-bryag" }, { "key": "Жълти рид", "value": 4, "slug": "zhlti-rid" }, { "key": "Жълтуша", "value": 22, "slug": "zhltusha" }, { "key": "Заберново", "value": 5, "slug": "zabernovo" }, { "key": "Забърдо", "value": 11, "slug": "zabrdo" }, { "key": "Завет", "value": 145, "slug": "zavet" }, { "key": "Завой", "value": 25, "slug": "zavoy" }, { "key": "Завоя", "value": 10, "slug": "zavoya" }, { "key": "Загоре", "value": 28, "slug": "zagore" }, { "key": "Загориче", "value": 18, "slug": "zagoriche" }, { "key": "Загорско", "value": 2, "slug": "zagorsko" }, { "key": "Загорци", "value": 38, "slug": "zagorci" }, { "key": "Загражден", "value": 24, "slug": "zagrazhden" }, { "key": "Задруга", "value": 9, "slug": "zadruga" }, { "key": "Заимчево", "value": 7, "slug": "zaimchevo" }, { "key": "Зайчар", "value": 28, "slug": "zaychar" }, { "key": "Зайчино", "value": 2, "slug": "zaychino" }, { "key": "Зайчино ореше", "value": 14, "slug": "zaychino-oreshe" }, { "key": "Замфир", "value": 22, "slug": "zamfir" }, { "key": "Замфирово", "value": 50, "slug": "zamfirovo" }, { "key": "Заноге", "value": 1, "slug": "zanoge" }, { "key": "Зараево", "value": 15, "slug": "zaraevo" }, { "key": "Зарица", "value": 6, "slug": "zarica" }, { "key": "Зарник", "value": 6, "slug": "zarnik" }, { "key": "Заселе", "value": 8, "slug": "zasele" }, { "key": "Засмяно", "value": 8, "slug": "zasmyano" }, { "key": "Зафирово", "value": 48, "slug": "zafirovo" }, { "key": "Захари Стояново", "value": 13, "slug": "zahari-stoyanovo" }, { "key": "Зая", "value": 8, "slug": "zaya" }, { "key": "Звегор", "value": 6, "slug": "zvegor" }, { "key": "Звезда", "value": 3, "slug": "zvezda" }, { "key": "Звездел", "value": 23, "slug": "zvezdel" }, { "key": "Звезделина", "value": 14, "slug": "zvezdelina" }, { "key": "Звезден", "value": 5, "slug": "zvezden" }, { "key": "Звездец", "value": 16, "slug": "zvezdec" }, { "key": "Звездица", "value": 101, "slug": "zvezdica" }, { "key": "Звенимир", "value": 8, "slug": "zvenimir" }, { "key": "Зверино", "value": 54, "slug": "zverino" }, { "key": "Звиница", "value": 7, "slug": "zvinica" }, { "key": "Звънарка", "value": 16, "slug": "zvnarka" }, { "key": "Звънарци", "value": 14, "slug": "zvnarci" }, { "key": "Звънец", "value": 4, "slug": "zvnec" }, { "key": "Звъничево", "value": 83, "slug": "zvnichevo" }, { "key": "Згалево", "value": 20, "slug": "zgalevo" }, { "key": "Згориград", "value": 84, "slug": "zgorigrad" }, { "key": "Згурово", "value": 2, "slug": "zgurovo" }, { "key": "Здравец", "value": 66, "slug": "zdravec" }, { "key": "Здравковец", "value": 2, "slug": "zdravkovec" }, { "key": "Здравчец", "value": 1, "slug": "zdravchec" }, { "key": "Зебил", "value": 14, "slug": "zebil" }, { "key": "Зелена морава", "value": 10, "slug": "zelena-morava" }, { "key": "Зелендол", "value": 19, "slug": "zelendol" }, { "key": "Зелениград", "value": 1, "slug": "zelenigrad" }, { "key": "Зеленика", "value": 1, "slug": "zelenika" }, { "key": "Зелениково", "value": 19, "slug": "zelenikovo" }, { "key": "Земен", "value": 91, "slug": "zemen" }, { "key": "Земенци", "value": 2, "slug": "zemenci" }, { "key": "Землен", "value": 11, "slug": "zemlen" }, { "key": "Зетьово", "value": 41, "slug": "zetovo" }, { "key": "Зидарово", "value": 32, "slug": "zidarovo" }, { "key": "Зидарци", "value": 2, "slug": "zidarci" }, { "key": "Зимен", "value": 3, "slug": "zimen" }, { "key": "Зимница", "value": 95, "slug": "zimnica" }, { "key": "Зимовина", "value": 14, "slug": "zimovina" }, { "key": "Златар", "value": 14, "slug": "zlatar" }, { "key": "Златари", "value": 6, "slug": "zlatari" }, { "key": "Златарица", "value": 92, "slug": "zlatarica" }, { "key": "Златевци", "value": 11, "slug": "zlatevci" }, { "key": "Злати войвода", "value": 21, "slug": "zlati-voyvoda" }, { "key": "Златина", "value": 10, "slug": "zlatina" }, { "key": "Златитрап", "value": 120, "slug": "zlatitrap" }, { "key": "Златица", "value": 308, "slug": "zlatica" }, { "key": "Златия", "value": 24, "slug": "zlatiya" }, { "key": "Златна ливада", "value": 5, "slug": "zlatna-livada" }, { "key": "Златна нива", "value": 8, "slug": "zlatna-niva" }, { "key": "Златна Панега", "value": 42, "slug": "zlatna-panega" }, { "key": "Златовръх", "value": 26, "slug": "zlatovrh" }, { "key": "Златоград", "value": 513, "slug": "zlatograd" }, { "key": "Златоклас", "value": 11, "slug": "zlatoklas" }, { "key": "Златолист", "value": 5, "slug": "zlatolist" }, { "key": "Златополе", "value": 10, "slug": "zlatopole" }, { "key": "Златосел", "value": 9, "slug": "zlatosel" }, { "key": "Златоустово", "value": 2, "slug": "zlatoustovo" }, { "key": "Златуша", "value": 10, "slug": "zlatusha" }, { "key": "Злогош", "value": 3, "slug": "zlogosh" }, { "key": "Злокучене", "value": 38, "slug": "zlokuchene" }, { "key": "Змеево", "value": 20, "slug": "zmeevo" }, { "key": "Змеица", "value": 50, "slug": "zmeica" }, { "key": "Змейно", "value": 5, "slug": "zmeyno" }, { "key": "Змейово", "value": 30, "slug": "zmeyovo" }, { "key": "Знаменосец", "value": 26, "slug": "znamenosec" }, { "key": "Зограф", "value": 1, "slug": "zograf" }, { "key": "Зорница", "value": 35, "slug": "zornica" }, { "key": "Зърнево", "value": 21, "slug": "zrnevo" }, { "key": "Ивайло", "value": 123, "slug": "ivaylo" }, { "key": "Ивайловград", "value": 183, "slug": "ivaylovgrad" }, { "key": "Иван Вазово", "value": 15, "slug": "ivan-vazovo" }, { "key": "Иван Шишманово", "value": 9, "slug": "ivan-shishmanovo" }, { "key": "Иванковци", "value": 1, "slug": "ivankovci" }, { "key": "Иваново", "value": 71, "slug": "ivanovo" }, { "key": "Ивановци", "value": 1, "slug": "ivanovci" }, { "key": "Ивански", "value": 28, "slug": "ivanski" }, { "key": "Иванци", "value": 4, "slug": "ivanci" }, { "key": "Иванча", "value": 5, "slug": "ivancha" }, { "key": "Иваняне", "value": 43, "slug": "ivanyane" }, { "key": "Иганово", "value": 10, "slug": "iganovo" }, { "key": "Иглика", "value": 1, "slug": "iglika" }, { "key": "Игнатиево", "value": 172, "slug": "ignatievo" }, { "key": "Игнатица", "value": 20, "slug": "ignatica" }, { "key": "Игнатово", "value": 3, "slug": "ignatovo" }, { "key": "Игнатовци", "value": 1, "slug": "ignatovci" }, { "key": "Игралище", "value": 8, "slug": "igralishche" }, { "key": "Идилево", "value": 1, "slug": "idilevo" }, { "key": "Избеглии", "value": 27, "slug": "izbeglii" }, { "key": "Избул", "value": 4, "slug": "izbul" }, { "key": "Извор", "value": 75, "slug": "izvor" }, { "key": "Изворище", "value": 38, "slug": "izvorishche" }, { "key": "Изворник", "value": 6, "slug": "izvornik" }, { "key": "Изворово", "value": 54, "slug": "izvorovo" }, { "key": "Изворско", "value": 22, "slug": "izvorsko" }, { "key": "Изгрев", "value": 110, "slug": "izgrev" }, { "key": "Илаков рът", "value": 3, "slug": "ilakov-rt" }, { "key": "Илийно", "value": 3, "slug": "iliyno" }, { "key": "Илийско", "value": 1, "slug": "iliysko" }, { "key": "Илинден", "value": 4, "slug": "ilinden" }, { "key": "Илинденци", "value": 42, "slug": "ilindenci" }, { "key": "Илия Блъсково", "value": 3, "slug": "iliya-blskovo" }, { "key": "Имренчево", "value": 15, "slug": "imrenchevo" }, { "key": "Индже войвода", "value": 8, "slug": "indzhe-voyvoda" }, { "key": "Иново", "value": 15, "slug": "inovo" }, { "key": "Иречеково", "value": 15, "slug": "irechekovo" }, { "key": "Ирник", "value": 3, "slug": "irnik" }, { "key": "Искра", "value": 100, "slug": "iskra" }, { "key": "Искрец", "value": 68, "slug": "iskrec" }, { "key": "Искрица", "value": 8, "slug": "iskrica" }, { "key": "Искър", "value": 116, "slug": "iskr" }, { "key": "Исперих", "value": 612, "slug": "isperih" }, { "key": "Исперихово", "value": 38, "slug": "isperihovo" }, { "key": "Ихтиман", "value": 736, "slug": "ihtiman" }, { "key": "Ичера", "value": 8, "slug": "ichera" }, { "key": "Йерусалимово", "value": 7, "slug": "yerusalimovo" }, { "key": "Йоаким Груево", "value": 127, "slug": "yoakim-gruevo" }, { "key": "Йовково", "value": 8, "slug": "yovkovo" }, { "key": "Йоглав", "value": 3, "slug": "yoglav" }, { "key": "Йонково", "value": 32, "slug": "yonkovo" }, { "key": "Йончово", "value": 1, "slug": "yonchovo" }, { "key": "Йорданово", "value": 10, "slug": "yordanovo" }, { "key": "Кабиле", "value": 74, "slug": "kabile" }, { "key": "Каблешково", "value": 303, "slug": "kableshkovo" }, { "key": "Каварна", "value": 867, "slug": "kavarna" }, { "key": "Кавракирово", "value": 40, "slug": "kavrakirovo" }, { "key": "Кадиево", "value": 47, "slug": "kadievo" }, { "key": "Казанка", "value": 3, "slug": "kazanka" }, { "key": "Казанлък", "value": 4337, "slug": "kazanlk" }, { "key": "Казаците", "value": 1, "slug": "kazacite" }, { "key": "Казачево", "value": 8, "slug": "kazachevo" }, { "key": "Казашка река", "value": 7, "slug": "kazashka-reka" }, { "key": "Казашко", "value": 21, "slug": "kazashko" }, { "key": "Казимир", "value": 5, "slug": "kazimir" }, { "key": "Казичене", "value": 397, "slug": "kazichene" }, { "key": "КАЙМАНОВИ ОСТРОВИ,", "value": 9, "slug": "kaymanovi-ostrovi" }, { "key": "Кайнарджа", "value": 23, "slug": "kaynardzha" }, { "key": "Калайджии", "value": 7, "slug": "kalaydzhii" }, { "key": "Калейца", "value": 33, "slug": "kaleyca" }, { "key": "Калековец", "value": 152, "slug": "kalekovec" }, { "key": "Кален", "value": 2, "slug": "kalen" }, { "key": "Каленик", "value": 8, "slug": "kalenik" }, { "key": "Каленовци", "value": 5, "slug": "kalenovci" }, { "key": "Калиманци", "value": 36, "slug": "kalimanci" }, { "key": "Калина", "value": 8, "slug": "kalina" }, { "key": "Калинка", "value": 8, "slug": "kalinka" }, { "key": "Калино", "value": 5, "slug": "kalino" }, { "key": "Калипетрово", "value": 173, "slug": "kalipetrovo" }, { "key": "Калитиново", "value": 33, "slug": "kalitinovo" }, { "key": "Калище", "value": 9, "slug": "kalishche" }, { "key": "Каломен", "value": 1, "slug": "kalomen" }, { "key": "Калотина", "value": 17, "slug": "kalotina" }, { "key": "Калотинци", "value": 2, "slug": "kalotinci" }, { "key": "Калофер", "value": 131, "slug": "kalofer" }, { "key": "Калоян", "value": 8, "slug": "kaloyan" }, { "key": "Калояновец", "value": 23, "slug": "kaloyanovec" }, { "key": "Калояново", "value": 150, "slug": "kaloyanovo" }, { "key": "Калоянци", "value": 9, "slug": "kaloyanci" }, { "key": "Калугерене", "value": 16, "slug": "kalugerene" }, { "key": "Калугерово", "value": 69, "slug": "kalugerovo" }, { "key": "Калчево", "value": 32, "slug": "kalchevo" }, { "key": "Камбелевци", "value": 1, "slug": "kambelevci" }, { "key": "Камбурово", "value": 22, "slug": "kamburovo" }, { "key": "Камен", "value": 89, "slug": "kamen" }, { "key": "Камен бряг", "value": 5, "slug": "kamen-bryag" }, { "key": "Камен връх", "value": 1, "slug": "kamen-vrh" }, { "key": "Камен дял", "value": 2, "slug": "kamen-dyal" }, { "key": "Камена", "value": 12, "slug": "kamena" }, { "key": "Каменар", "value": 120, "slug": "kamenar" }, { "key": "Каменари", "value": 9, "slug": "kamenari" }, { "key": "Каменарци", "value": 1, "slug": "kamenarci" }, { "key": "Каменец", "value": 43, "slug": "kamenec" }, { "key": "Каменица", "value": 6, "slug": "kamenica" }, { "key": "Каменичка Скакавица", "value": 1, "slug": "kamenichka-skakavica" }, { "key": "Каменка", "value": 1, "slug": "kamenka" }, { "key": "Каменна Рикса", "value": 10, "slug": "kamenna-riksa" }, { "key": "Камено", "value": 283, "slug": "kameno" }, { "key": "Камено поле", "value": 14, "slug": "kameno-pole" }, { "key": "Каменово", "value": 24, "slug": "kamenovo" }, { "key": "Каменяк", "value": 12, "slug": "kamenyak" }, { "key": "Камещица", "value": 2, "slug": "kameshchica" }, { "key": "Камчия", "value": 5, "slug": "kamchiya" }, { "key": "Кандилка", "value": 12, "slug": "kandilka" }, { "key": "Кандови", "value": 1, "slug": "kandovi" }, { "key": "Каняк", "value": 1, "slug": "kanyak" }, { "key": "Каолиново", "value": 56, "slug": "kaolinovo" }, { "key": "Капатово", "value": 5, "slug": "kapatovo" }, { "key": "Капитан Андреево", "value": 43, "slug": "kapitan-andreevo" }, { "key": "Капитан Димитриево", "value": 32, "slug": "kapitan-dimitrievo" }, { "key": "Капитан Димитрово", "value": 1, "slug": "kapitan-dimitrovo" }, { "key": "Капитан Петко", "value": 19, "slug": "kapitan-petko" }, { "key": "Капитан Петко войвода", "value": 6, "slug": "kapitan-petko-voyvoda" }, { "key": "Капитановци", "value": 39, "slug": "kapitanovci" }, { "key": "Кара Михал", "value": 1, "slug": "kara-mihal" }, { "key": "Карабунар", "value": 32, "slug": "karabunar" }, { "key": "Каравелово", "value": 70, "slug": "karavelovo" }, { "key": "Каравельово", "value": 9, "slug": "karavelovo" }, { "key": "Карагеоргиево", "value": 43, "slug": "karageorgievo" }, { "key": "Караджалово", "value": 18, "slug": "karadzhalovo" }, { "key": "Караджово", "value": 28, "slug": "karadzhovo" }, { "key": "Караиванца", "value": 3, "slug": "karaivanca" }, { "key": "Караисен", "value": 31, "slug": "karaisen" }, { "key": "Караманите", "value": 9, "slug": "karamanite" }, { "key": "Караманово", "value": 12, "slug": "karamanovo" }, { "key": "Караманци", "value": 47, "slug": "karamanci" }, { "key": "Карамфил", "value": 4, "slug": "karamfil" }, { "key": "Каран Върбовка", "value": 16, "slug": "karan-vrbovka" }, { "key": "Караново", "value": 25, "slug": "karanovo" }, { "key": "Каранци", "value": 10, "slug": "karanci" }, { "key": "Карапелит", "value": 38, "slug": "karapelit" }, { "key": "Караполци", "value": 8, "slug": "karapolci" }, { "key": "Караш", "value": 2, "slug": "karash" }, { "key": "Кардам", "value": 79, "slug": "kardam" }, { "key": "Карлиево", "value": 5, "slug": "karlievo" }, { "key": "Карлово", "value": 1800, "slug": "karlovo" }, { "key": "Карлуково", "value": 14, "slug": "karlukovo" }, { "key": "Карнобат", "value": 1256, "slug": "karnobat" }, { "key": "Касилаг", "value": 4, "slug": "kasilag" }, { "key": "Каснаково", "value": 15, "slug": "kasnakovo" }, { "key": "Каспичан", "value": 262, "slug": "kaspichan" }, { "key": "Катерица", "value": 1, "slug": "katerica" }, { "key": "Катранджии", "value": 3, "slug": "katrandzhii" }, { "key": "Катраница", "value": 11, "slug": "katranica" }, { "key": "Катрище", "value": 5, "slug": "katrishche" }, { "key": "Катунец", "value": 8, "slug": "katunec" }, { "key": "Катуница", "value": 134, "slug": "katunica" }, { "key": "Катунище", "value": 4, "slug": "katunishche" }, { "key": "Катунци", "value": 82, "slug": "katunci" }, { "key": "Кацелово", "value": 23, "slug": "kacelovo" }, { "key": "Кашина", "value": 1, "slug": "kashina" }, { "key": "Каялоба", "value": 2, "slug": "kayaloba" }, { "key": "Керека", "value": 7, "slug": "kereka" }, { "key": "Керените", "value": 1, "slug": "kerenite" }, { "key": "Кермен", "value": 79, "slug": "kermen" }, { "key": "Кесарево", "value": 49, "slug": "kesarevo" }, { "key": "Кестен", "value": 6, "slug": "kesten" }, { "key": "Кестеново", "value": 4, "slug": "kestenovo" }, { "key": "Киевци", "value": 7, "slug": "kievci" }, { "key": "Килифарево", "value": 149, "slug": "kilifarevo" }, { "key": "Кипилово", "value": 19, "slug": "kipilovo" }, { "key": "Кипра", "value": 33, "slug": "kipra" }, { "key": "Киреево", "value": 5, "slug": "kireevo" }, { "key": "Кирилово", "value": 30, "slug": "kirilovo" }, { "key": "Кирково", "value": 91, "slug": "kirkovo" }, { "key": "Кирово", "value": 2, "slug": "kirovo" }, { "key": "Кирчево", "value": 22, "slug": "kirchevo" }, { "key": "Киселево", "value": 4, "slug": "kiselevo" }, { "key": "Киселчово", "value": 14, "slug": "kiselchovo" }, { "key": "Китанчево", "value": 41, "slug": "kitanchevo" }, { "key": "Китен", "value": 228, "slug": "kiten" }, { "key": "Китино", "value": 5, "slug": "kitino" }, { "key": "Китка", "value": 22, "slug": "kitka" }, { "key": "Китна", "value": 5, "slug": "kitna" }, { "key": "Китница", "value": 2, "slug": "kitnica" }, { "key": "Кичево", "value": 89, "slug": "kichevo" }, { "key": "Киченица", "value": 25, "slug": "kichenica" }, { "key": "Кладенец", "value": 6, "slug": "kladenec" }, { "key": "Кладенци", "value": 2, "slug": "kladenci" }, { "key": "Кладни дял", "value": 2, "slug": "kladni-dyal" }, { "key": "Кладница", "value": 59, "slug": "kladnica" }, { "key": "Кленовик", "value": 11, "slug": "klenovik" }, { "key": "Кликач", "value": 25, "slug": "klikach" }, { "key": "Климаш", "value": 9, "slug": "klimash" }, { "key": "Климент", "value": 102, "slug": "kliment" }, { "key": "Климентово", "value": 42, "slug": "klimentovo" }, { "key": "Клисура", "value": 44, "slug": "klisura" }, { "key": "Клисурица", "value": 4, "slug": "klisurica" }, { "key": "Клокотница", "value": 39, "slug": "klokotnica" }, { "key": "Ключ", "value": 42, "slug": "klyuch" }, { "key": "Кметовци", "value": 2, "slug": "kmetovci" }, { "key": "Кнежа", "value": 505, "slug": "knezha" }, { "key": "Книжовник", "value": 9, "slug": "knizhovnik" }, { "key": "Княжево", "value": 16, "slug": "knyazhevo" }, { "key": "Княжевско", "value": 8, "slug": "knyazhevsko" }, { "key": "Кобиляк", "value": 2, "slug": "kobilyak" }, { "key": "Кобиляне", "value": 16, "slug": "kobilyane" }, { "key": "Ковач", "value": 2, "slug": "kovach" }, { "key": "Ковачевец", "value": 21, "slug": "kovachevec" }, { "key": "Ковачевица", "value": 13, "slug": "kovachevica" }, { "key": "Ковачево", "value": 92, "slug": "kovachevo" }, { "key": "Ковачевци", "value": 44, "slug": "kovachevci" }, { "key": "Ковачите", "value": 29, "slug": "kovachite" }, { "key": "Ковачица", "value": 29, "slug": "kovachica" }, { "key": "Коевци", "value": 4, "slug": "koevci" }, { "key": "Кожари", "value": 3, "slug": "kozhari" }, { "key": "Кожинци", "value": 1, "slug": "kozhinci" }, { "key": "Кожлювци", "value": 1, "slug": "kozhlyuvci" }, { "key": "Козаново", "value": 22, "slug": "kozanovo" }, { "key": "Козар Белене", "value": 27, "slug": "kozar-belene" }, { "key": "Козаре", "value": 3, "slug": "kozare" }, { "key": "Козаревец", "value": 37, "slug": "kozarevec" }, { "key": "Козарево", "value": 6, "slug": "kozarevo" }, { "key": "Козарка", "value": 12, "slug": "kozarka" }, { "key": "Козарско", "value": 36, "slug": "kozarsko" }, { "key": "Козица", "value": 4, "slug": "kozica" }, { "key": "Козичино", "value": 7, "slug": "kozichino" }, { "key": "Козлево", "value": 1, "slug": "kozlevo" }, { "key": "Козлец", "value": 25, "slug": "kozlec" }, { "key": "Козловец", "value": 36, "slug": "kozlovec" }, { "key": "Козлодуй", "value": 587, "slug": "kozloduy" }, { "key": "Козлодуйци", "value": 15, "slug": "kozloduyci" }, { "key": "Козма презвитер", "value": 13, "slug": "kozma-prezviter" }, { "key": "Козяк", "value": 7, "slug": "kozyak" }, { "key": "Коиловци", "value": 28, "slug": "koilovci" }, { "key": "Койнаре", "value": 131, "slug": "koynare" }, { "key": "Кокаляне", "value": 153, "slug": "kokalyane" }, { "key": "Кокиче", "value": 2, "slug": "kokiche" }, { "key": "Кокорци", "value": 1, "slug": "kokorci" }, { "key": "Кокошане", "value": 2, "slug": "kokoshane" }, { "key": "Коларово", "value": 169, "slug": "kolarovo" }, { "key": "Коларци", "value": 9, "slug": "kolarci" }, { "key": "Колена", "value": 6, "slug": "kolena" }, { "key": "Колец", "value": 6, "slug": "kolec" }, { "key": "Колобър", "value": 9, "slug": "kolobr" }, { "key": "Колю Мариново", "value": 7, "slug": "kolyu-marinovo" }, { "key": "Комарево", "value": 69, "slug": "komarevo" }, { "key": "Комощица", "value": 21, "slug": "komoshchica" }, { "key": "Комунари", "value": 3, "slug": "komunari" }, { "key": "Комунига", "value": 41, "slug": "komuniga" }, { "key": "Комщица", "value": 1, "slug": "komshchica" }, { "key": "Конак", "value": 6, "slug": "konak" }, { "key": "Конаре", "value": 20, "slug": "konare" }, { "key": "Конарско", "value": 15, "slug": "konarsko" }, { "key": "Конарското", "value": 3, "slug": "konarskoto" }, { "key": "Кондофрей", "value": 14, "slug": "kondofrey" }, { "key": "Коневец", "value": 5, "slug": "konevec" }, { "key": "Конево", "value": 19, "slug": "konevo" }, { "key": "Коноп", "value": 2, "slug": "konop" }, { "key": "Конска", "value": 4, "slug": "konska" }, { "key": "Константин", "value": 30, "slug": "konstantin" }, { "key": "Константиново", "value": 106, "slug": "konstantinovo" }, { "key": "Конуш", "value": 28, "slug": "konush" }, { "key": "Конче", "value": 4, "slug": "konche" }, { "key": "Коньовец", "value": 6, "slug": "konovec" }, { "key": "Коньово", "value": 21, "slug": "konovo" }, { "key": "Коняво", "value": 43, "slug": "konyavo" }, { "key": "Копаница", "value": 6, "slug": "kopanica" }, { "key": "Копиловци", "value": 40, "slug": "kopilovci" }, { "key": "Копрец", "value": 1, "slug": "koprec" }, { "key": "Копривец", "value": 29, "slug": "koprivec" }, { "key": "Копривлен", "value": 83, "slug": "koprivlen" }, { "key": "Копривщица", "value": 139, "slug": "koprivshchica" }, { "key": "Копринка", "value": 114, "slug": "koprinka" }, { "key": "Копчелиите", "value": 4, "slug": "kopcheliite" }, { "key": "Корен", "value": 10, "slug": "koren" }, { "key": "Коритата", "value": 5, "slug": "koritata" }, { "key": "Коритен", "value": 3, "slug": "koriten" }, { "key": "Коркина", "value": 5, "slug": "korkina" }, { "key": "Кормянско", "value": 24, "slug": "kormyansko" }, { "key": "Корница", "value": 58, "slug": "kornica" }, { "key": "Кортен", "value": 78, "slug": "korten" }, { "key": "Кос", "value": 1, "slug": "kos" }, { "key": "Косара", "value": 2, "slug": "kosara" }, { "key": "Косарка", "value": 2, "slug": "kosarka" }, { "key": "Косача", "value": 19, "slug": "kosacha" }, { "key": "Косовец", "value": 12, "slug": "kosovec" }, { "key": "Косово", "value": 27, "slug": "kosovo" }, { "key": "Коста Перчево", "value": 4, "slug": "kosta-perchevo" }, { "key": "Костадинкино", "value": 3, "slug": "kostadinkino" }, { "key": "Костанденец", "value": 23, "slug": "kostandenec" }, { "key": "Костандово", "value": 119, "slug": "kostandovo" }, { "key": "Костел", "value": 3, "slug": "kostel" }, { "key": "Костелево", "value": 26, "slug": "kostelevo" }, { "key": "Костен", "value": 10, "slug": "kosten" }, { "key": "Костена река", "value": 7, "slug": "kostena-reka" }, { "key": "Костенец", "value": 696, "slug": "kostenec" }, { "key": "Костенковци", "value": 2, "slug": "kostenkovci" }, { "key": "Костенци", "value": 2, "slug": "kostenci" }, { "key": "Кости", "value": 8, "slug": "kosti" }, { "key": "Костиево", "value": 78, "slug": "kostievo" }, { "key": "Костилково", "value": 1, "slug": "kostilkovo" }, { "key": "Костинброд", "value": 1016, "slug": "kostinbrod" }, { "key": "Костино", "value": 5, "slug": "kostino" }, { "key": "Костур", "value": 1, "slug": "kostur" }, { "key": "Костуринци", "value": 1, "slug": "kosturinci" }, { "key": "Котел", "value": 329, "slug": "kotel" }, { "key": "Котеновци", "value": 2, "slug": "kotenovci" }, { "key": "Котлари", "value": 1, "slug": "kotlari" }, { "key": "Котленци", "value": 4, "slug": "kotlenci" }, { "key": "Кочан", "value": 108, "slug": "kochan" }, { "key": "Кочани", "value": 6, "slug": "kochani" }, { "key": "Кочево", "value": 33, "slug": "kochevo" }, { "key": "Кочериново", "value": 50, "slug": "kocherinovo" }, { "key": "Кочмар", "value": 36, "slug": "kochmar" }, { "key": "Кочово", "value": 15, "slug": "kochovo" }, { "key": "Кошава", "value": 12, "slug": "koshava" }, { "key": "Кошарево", "value": 15, "slug": "kosharevo" }, { "key": "Кошарите", "value": 2, "slug": "kosharite" }, { "key": "Кошарица", "value": 212, "slug": "kosharica" }, { "key": "Кошарна", "value": 22, "slug": "kosharna" }, { "key": "Кошница", "value": 4, "slug": "koshnica" }, { "key": "Кошничари", "value": 4, "slug": "koshnichari" }, { "key": "Кошов", "value": 12, "slug": "koshov" }, { "key": "Кравино", "value": 4, "slug": "kravino" }, { "key": "Краводер", "value": 26, "slug": "kravoder" }, { "key": "Краево", "value": 4, "slug": "kraevo" }, { "key": "Краище", "value": 65, "slug": "kraishche" }, { "key": "Крайгорци", "value": 6, "slug": "kraygorci" }, { "key": "Крайници", "value": 93, "slug": "kraynici" }, { "key": "Крайно село", "value": 10, "slug": "krayno-selo" }, { "key": "Крайново", "value": 2, "slug": "kraynovo" }, { "key": "Кракра", "value": 2, "slug": "krakra" }, { "key": "Кралев дол", "value": 27, "slug": "kralev-dol" }, { "key": "Кралево", "value": 35, "slug": "kralevo" }, { "key": "Крали Марко", "value": 13, "slug": "krali-marko" }, { "key": "Крамолин", "value": 7, "slug": "kramolin" }, { "key": "Кранево", "value": 182, "slug": "kranevo" }, { "key": "Крапец", "value": 21, "slug": "krapec" }, { "key": "Крапчене", "value": 5, "slug": "krapchene" }, { "key": "Красен", "value": 58, "slug": "krasen" }, { "key": "Красен дол", "value": 5, "slug": "krasen-dol" }, { "key": "Красимир", "value": 9, "slug": "krasimir" }, { "key": "Красно градище", "value": 2, "slug": "krasno-gradishche" }, { "key": "Красново", "value": 15, "slug": "krasnovo" }, { "key": "Красноселци", "value": 6, "slug": "krasnoselci" }, { "key": "Крачимир", "value": 5, "slug": "krachimir" }, { "key": "Кремен", "value": 5, "slug": "kremen" }, { "key": "Кремена", "value": 3, "slug": "kremena" }, { "key": "Кремене", "value": 1, "slug": "kremene" }, { "key": "Крепост", "value": 74, "slug": "krepost" }, { "key": "Крепча", "value": 31, "slug": "krepcha" }, { "key": "Кресна", "value": 292, "slug": "kresna" }, { "key": "Крета", "value": 19, "slug": "kreta" }, { "key": "Крибул", "value": 10, "slug": "kribul" }, { "key": "Крива бара", "value": 27, "slug": "kriva-bara" }, { "key": "Крива река", "value": 11, "slug": "kriva-reka" }, { "key": "Кривина", "value": 91, "slug": "krivina" }, { "key": "Кривини", "value": 8, "slug": "krivini" }, { "key": "Кривица", "value": 8, "slug": "krivica" }, { "key": "Кривня", "value": 32, "slug": "krivnya" }, { "key": "Криво поле", "value": 15, "slug": "krivo-pole" }, { "key": "Криводол", "value": 178, "slug": "krivodol" }, { "key": "Крилатица", "value": 8, "slug": "krilatica" }, { "key": "Крин", "value": 9, "slug": "krin" }, { "key": "Крислово", "value": 18, "slug": "krislovo" }, { "key": "Кричим", "value": 424, "slug": "krichim" }, { "key": "Кромидово", "value": 2, "slug": "kromidovo" }, { "key": "Крояч", "value": 5, "slug": "kroyach" }, { "key": "Крум", "value": 6, "slug": "krum" }, { "key": "Крумовград", "value": 348, "slug": "krumovgrad" }, { "key": "Крумово", "value": 243, "slug": "krumovo" }, { "key": "Крумово градище", "value": 16, "slug": "krumovo-gradishche" }, { "key": "Крупен", "value": 1, "slug": "krupen" }, { "key": "Крупник", "value": 78, "slug": "krupnik" }, { "key": "Круша", "value": 11, "slug": "krusha" }, { "key": "Крушаре", "value": 53, "slug": "krushare" }, { "key": "Крушари", "value": 41, "slug": "krushari" }, { "key": "Крушевец", "value": 33, "slug": "krushevec" }, { "key": "Крушево", "value": 54, "slug": "krushevo" }, { "key": "Крушевска", "value": 3, "slug": "krushevska" }, { "key": "Крушето", "value": 14, "slug": "krusheto" }, { "key": "Крушка", "value": 1, "slug": "krushka" }, { "key": "Крушовене", "value": 25, "slug": "krushovene" }, { "key": "Крушовица", "value": 93, "slug": "krushovica" }, { "key": "Крушово", "value": 7, "slug": "krushovo" }, { "key": "Крушолак", "value": 2, "slug": "krusholak" }, { "key": "Крушуна", "value": 9, "slug": "krushuna" }, { "key": "Кръвеник", "value": 13, "slug": "krvenik" }, { "key": "Крън", "value": 215, "slug": "krn" }, { "key": "Кръстава", "value": 34, "slug": "krstava" }, { "key": "Кръстевич", "value": 11, "slug": "krstevich" }, { "key": "Кръстец", "value": 5, "slug": "krstec" }, { "key": "Кръстина", "value": 20, "slug": "krstina" }, { "key": "Кръшно", "value": 7, "slug": "krshno" }, { "key": "Кубадин", "value": 5, "slug": "kubadin" }, { "key": "Кубрат", "value": 519, "slug": "kubrat" }, { "key": "Кубратово", "value": 41, "slug": "kubratovo" }, { "key": "Куделин", "value": 5, "slug": "kudelin" }, { "key": "Кузьово", "value": 6, "slug": "kuzovo" }, { "key": "Куклен", "value": 430, "slug": "kuklen" }, { "key": "Кукорево", "value": 80, "slug": "kukorevo" }, { "key": "Кукуряк", "value": 7, "slug": "kukuryak" }, { "key": "Кула", "value": 152, "slug": "kula" }, { "key": "Кулата", "value": 98, "slug": "kulata" }, { "key": "Куманите", "value": 6, "slug": "kumanite" }, { "key": "Куманово", "value": 31, "slug": "kumanovo" }, { "key": "Кундево", "value": 7, "slug": "kundevo" }, { "key": "Кунино", "value": 16, "slug": "kunino" }, { "key": "Купен", "value": 2, "slug": "kupen" }, { "key": "Курново", "value": 4, "slug": "kurnovo" }, { "key": "Куртово", "value": 9, "slug": "kurtovo" }, { "key": "Куртово Конаре", "value": 94, "slug": "kurtovo-konare" }, { "key": "Кутела", "value": 25, "slug": "kutela" }, { "key": "Кутловица", "value": 3, "slug": "kutlovica" }, { "key": "Кутово", "value": 24, "slug": "kutovo" }, { "key": "Куцина", "value": 19, "slug": "kucina" }, { "key": "Къкрина", "value": 10, "slug": "kkrina" }, { "key": "Кълново", "value": 11, "slug": "klnovo" }, { "key": "Кънчево", "value": 31, "slug": "knchevo" }, { "key": "Къпиново", "value": 18, "slug": "kpinovo" }, { "key": "Къпиновци", "value": 4, "slug": "kpinovci" }, { "key": "Кърджали", "value": 4275, "slug": "krdzhali" }, { "key": "Кърланово", "value": 1, "slug": "krlanovo" }, { "key": "Кърналово", "value": 71, "slug": "krnalovo" }, { "key": "Кърнаре", "value": 28, "slug": "krnare" }, { "key": "Кърпачево", "value": 3, "slug": "krpachevo" }, { "key": "Къртожабене", "value": 4, "slug": "krtozhabene" }, { "key": "Кърчовско", "value": 3, "slug": "krchovsko" }, { "key": "Късак", "value": 27, "slug": "ksak" }, { "key": "Кътина", "value": 49, "slug": "ktina" }, { "key": "Къшин", "value": 10, "slug": "kshin" }, { "key": "Кьолмен", "value": 1, "slug": "kolmen" }, { "key": "Кьосево", "value": 7, "slug": "kosevo" }, { "key": "Кьосевци", "value": 4, "slug": "kosevci" }, { "key": "Кюлевча", "value": 30, "slug": "kyulevcha" }, { "key": "Кюстендил", "value": 4764, "slug": "kyustendil" }, { "key": "Лагошевци", "value": 4, "slug": "lagoshevci" }, { "key": "Ладарево", "value": 2, "slug": "ladarevo" }, { "key": "Лазарово", "value": 11, "slug": "lazarovo" }, { "key": "Лазарци", "value": 8, "slug": "lazarci" }, { "key": "Лакатник", "value": 61, "slug": "lakatnik" }, { "key": "Лале", "value": 5, "slug": "lale" }, { "key": "Лалково", "value": 10, "slug": "lalkovo" }, { "key": "Ласкар", "value": 3, "slug": "laskar" }, { "key": "Ласкарево", "value": 16, "slug": "laskarevo" }, { "key": "Латинка", "value": 1, "slug": "latinka" }, { "key": "Лебед", "value": 1, "slug": "lebed" }, { "key": "Лебница", "value": 23, "slug": "lebnica" }, { "key": "Лева река", "value": 1, "slug": "leva-reka" }, { "key": "Левка", "value": 16, "slug": "levka" }, { "key": "Левочево", "value": 9, "slug": "levochevo" }, { "key": "Левски", "value": 588, "slug": "levski" }, { "key": "Левуново", "value": 33, "slug": "levunovo" }, { "key": "Леденик", "value": 45, "slug": "ledenik" }, { "key": "Ленище", "value": 4, "slug": "lenishche" }, { "key": "Ленково", "value": 7, "slug": "lenkovo" }, { "key": "Леново", "value": 12, "slug": "lenovo" }, { "key": "Ленско", "value": 1, "slug": "lensko" }, { "key": "Лепица", "value": 9, "slug": "lepica" }, { "key": "Лесидрен", "value": 57, "slug": "lesidren" }, { "key": "Лесичарка", "value": 7, "slug": "lesicharka" }, { "key": "Лесичери", "value": 14, "slug": "lesicheri" }, { "key": "Лесичово", "value": 33, "slug": "lesichovo" }, { "key": "Леска", "value": 9, "slug": "leska" }, { "key": "Лесковдол", "value": 1, "slug": "leskovdol" }, { "key": "Лесковец", "value": 13, "slug": "leskovec" }, { "key": "Лесново", "value": 72, "slug": "lesnovo" }, { "key": "Лесово", "value": 28, "slug": "lesovo" }, { "key": "Лесура", "value": 28, "slug": "lesura" }, { "key": "Летница", "value": 122, "slug": "letnica" }, { "key": "Летовник", "value": 1, "slug": "letovnik" }, { "key": "Лехчево", "value": 39, "slug": "lehchevo" }, { "key": "Лешко", "value": 2, "slug": "leshko" }, { "key": "Лешниково", "value": 1, "slug": "leshnikovo" }, { "key": "Лешниковци", "value": 4, "slug": "leshnikovci" }, { "key": "Лешница", "value": 38, "slug": "leshnica" }, { "key": "Лещак", "value": 5, "slug": "leshchak" }, { "key": "Лещарка", "value": 2, "slug": "leshcharka" }, { "key": "Лещен", "value": 22, "slug": "leshchen" }, { "key": "Ливада", "value": 19, "slug": "livada" }, { "key": "Лик", "value": 8, "slug": "lik" }, { "key": "Лилеково", "value": 5, "slug": "lilekovo" }, { "key": "Лилково", "value": 4, "slug": "lilkovo" }, { "key": "Лиляк", "value": 18, "slug": "lilyak" }, { "key": "Лиляново", "value": 10, "slug": "lilyanovo" }, { "key": "Лиляч", "value": 13, "slug": "lilyach" }, { "key": "Лиляче", "value": 22, "slug": "lilyache" }, { "key": "Липен", "value": 5, "slug": "lipen" }, { "key": "Липник", "value": 25, "slug": "lipnik" }, { "key": "Липница", "value": 31, "slug": "lipnica" }, { "key": "Лисец", "value": 20, "slug": "lisec" }, { "key": "Лиси връх", "value": 1, "slug": "lisi-vrh" }, { "key": "Листец", "value": 17, "slug": "listec" }, { "key": "Литаково", "value": 50, "slug": "litakovo" }, { "key": "Лобош", "value": 8, "slug": "lobosh" }, { "key": "Ловец", "value": 32, "slug": "lovec" }, { "key": "Ловеч", "value": 3025, "slug": "lovech" }, { "key": "Ловнидол", "value": 3, "slug": "lovnidol" }, { "key": "Ловско", "value": 18, "slug": "lovsko" }, { "key": "Ловци", "value": 8, "slug": "lovci" }, { "key": "Ловчанци", "value": 16, "slug": "lovchanci" }, { "key": "Логодаж", "value": 10, "slug": "logodazh" }, { "key": "Лоза", "value": 1, "slug": "loza" }, { "key": "Лозарево", "value": 39, "slug": "lozarevo" }, { "key": "Лозево", "value": 15, "slug": "lozevo" }, { "key": "Лозен", "value": 520, "slug": "lozen" }, { "key": "Лозенградци", "value": 2, "slug": "lozengradci" }, { "key": "Лозенец", "value": 149, "slug": "lozenec" }, { "key": "Лозеница", "value": 7, "slug": "lozenica" }, { "key": "Лозица", "value": 10, "slug": "lozica" }, { "key": "Лозница", "value": 169, "slug": "loznica" }, { "key": "Лозно", "value": 30, "slug": "lozno" }, { "key": "Локвата", "value": 1, "slug": "lokvata" }, { "key": "Локорско", "value": 41, "slug": "lokorsko" }, { "key": "Лом", "value": 1207, "slug": "lom" }, { "key": "Лом Черковна", "value": 7, "slug": "lom-cherkovna" }, { "key": "Ломец", "value": 29, "slug": "lomec" }, { "key": "Ломница", "value": 1, "slug": "lomnica" }, { "key": "Ломци", "value": 15, "slug": "lomci" }, { "key": "Лопушна", "value": 24, "slug": "lopushna" }, { "key": "Лопян", "value": 14, "slug": "lopyan" }, { "key": "Лудогорци", "value": 28, "slug": "ludogorci" }, { "key": "Луковит", "value": 554, "slug": "lukovit" }, { "key": "Луково", "value": 15, "slug": "lukovo" }, { "key": "Луличка", "value": 1, "slug": "lulichka" }, { "key": "Лъвино", "value": 20, "slug": "lvino" }, { "key": "Лъга", "value": 5, "slug": "lga" }, { "key": "Лъжница", "value": 63, "slug": "lzhnica" }, { "key": "Лъка", "value": 31, "slug": "lka" }, { "key": "Лъки", "value": 137, "slug": "lki" }, { "key": "Любен", "value": 14, "slug": "lyuben" }, { "key": "Любен Каравелово", "value": 30, "slug": "lyuben-karavelovo" }, { "key": "Любенец", "value": 7, "slug": "lyubenec" }, { "key": "Любенова махала", "value": 28, "slug": "lyubenova-mahala" }, { "key": "Любеново", "value": 29, "slug": "lyubenovo" }, { "key": "Любимец", "value": 433, "slug": "lyubimec" }, { "key": "Любино", "value": 1, "slug": "lyubino" }, { "key": "Любичево", "value": 8, "slug": "lyubichevo" }, { "key": "Люблен", "value": 19, "slug": "lyublen" }, { "key": "Любовка", "value": 2, "slug": "lyubovka" }, { "key": "Любча", "value": 22, "slug": "lyubcha" }, { "key": "Люлин", "value": 55, "slug": "lyulin" }, { "key": "Люлка", "value": 1, "slug": "lyulka" }, { "key": "Люляк", "value": 1, "slug": "lyulyak" }, { "key": "Люляково", "value": 123, "slug": "lyulyakovo" }, { "key": "Лютаджик", "value": 7, "slug": "lyutadzhik" }, { "key": "Лютиброд", "value": 13, "slug": "lyutibrod" }, { "key": "Лютидол", "value": 5, "slug": "lyutidol" }, { "key": "Лютово", "value": 5, "slug": "lyutovo" }, { "key": "Лява река", "value": 1, "slug": "lyava-reka" }, { "key": "Лясковец", "value": 515, "slug": "lyaskovec" }, { "key": "Лясково", "value": 72, "slug": "lyaskovo" }, { "key": "Лятно", "value": 12, "slug": "lyatno" }, { "key": "Ляхово", "value": 11, "slug": "lyahovo" }, { "key": "Мадан", "value": 465, "slug": "madan" }, { "key": "Мадара", "value": 36, "slug": "madara" }, { "key": "Маджаре", "value": 18, "slug": "madzhare" }, { "key": "Маджари", "value": 3, "slug": "madzhari" }, { "key": "Маджарово", "value": 29, "slug": "madzharovo" }, { "key": "Маджерито", "value": 44, "slug": "madzherito" }, { "key": "Мазарачево", "value": 4, "slug": "mazarachevo" }, { "key": "Майор Узуново", "value": 5, "slug": "mayor-uzunovo" }, { "key": "Майско", "value": 16, "slug": "maysko" }, { "key": "Макариополско", "value": 25, "slug": "makariopolsko" }, { "key": "Македонци", "value": 5, "slug": "makedonci" }, { "key": "Маково", "value": 2, "slug": "makovo" }, { "key": "Макоцево", "value": 10, "slug": "makocevo" }, { "key": "Макреш", "value": 19, "slug": "makresh" }, { "key": "Мала Раковица", "value": 4, "slug": "mala-rakovica" }, { "key": "Мала Фуча", "value": 5, "slug": "mala-fucha" }, { "key": "Мала църква", "value": 30, "slug": "mala-crkva" }, { "key": "Малево", "value": 35, "slug": "malevo" }, { "key": "Маленово", "value": 6, "slug": "malenovo" }, { "key": "Мали Дреновец", "value": 1, "slug": "mali-drenovec" }, { "key": "Мали извор", "value": 7, "slug": "mali-izvor" }, { "key": "Малина", "value": 13, "slug": "malina" }, { "key": "Малиново", "value": 29, "slug": "malinovo" }, { "key": "Малка Арда", "value": 6, "slug": "malka-arda" }, { "key": "Малка Верея", "value": 42, "slug": "malka-vereya" }, { "key": "Малка Желязна", "value": 3, "slug": "malka-zhelyazna" }, { "key": "Малка поляна", "value": 16, "slug": "malka-polyana" }, { "key": "Малка Смолница", "value": 2, "slug": "malka-smolnica" }, { "key": "Малка Черковна", "value": 2, "slug": "malka-cherkovna" }, { "key": "Малка Чинка", "value": 3, "slug": "malka-chinka" }, { "key": "Малки Воден", "value": 1, "slug": "malki-voden" }, { "key": "Малки Вършец", "value": 5, "slug": "malki-vrshec" }, { "key": "Малки Искър", "value": 10, "slug": "malki-iskr" }, { "key": "Малки чифлик", "value": 6, "slug": "malki-chiflik" }, { "key": "Малко Враново", "value": 30, "slug": "malko-vranovo" }, { "key": "Малко градище", "value": 21, "slug": "malko-gradishche" }, { "key": "Малко Дряново", "value": 7, "slug": "malko-dryanovo" }, { "key": "Малко Йонково", "value": 9, "slug": "malko-yonkovo" }, { "key": "Малко Кадиево", "value": 10, "slug": "malko-kadievo" }, { "key": "Малко Кирилово", "value": 1, "slug": "malko-kirilovo" }, { "key": "Малко село", "value": 4, "slug": "malko-selo" }, { "key": "Малко Тръново", "value": 8, "slug": "malko-trnovo" }, { "key": "Малко Търново", "value": 181, "slug": "malko-trnovo" }, { "key": "Малко Чочовени", "value": 16, "slug": "malko-chochoveni" }, { "key": "Малко Шарково", "value": 7, "slug": "malko-sharkovo" }, { "key": "Малкоч", "value": 3, "slug": "malkoch" }, { "key": "Мало Бучино", "value": 41, "slug": "malo-buchino" }, { "key": "Мало Конаре", "value": 127, "slug": "malo-konare" }, { "key": "Мало Крушево", "value": 1, "slug": "malo-krushevo" }, { "key": "Мало Пещене", "value": 1, "slug": "malo-peshchene" }, { "key": "Мало село", "value": 16, "slug": "malo-selo" }, { "key": "Малоградец", "value": 1, "slug": "malogradec" }, { "key": "Маломир", "value": 41, "slug": "malomir" }, { "key": "Маломирово", "value": 20, "slug": "malomirovo" }, { "key": "Малорад", "value": 23, "slug": "malorad" }, { "key": "Малчика", "value": 48, "slug": "malchika" }, { "key": "Малък Девесил", "value": 6, "slug": "malk-devesil" }, { "key": "Малък дол", "value": 1, "slug": "malk-dol" }, { "key": "Малък извор", "value": 37, "slug": "malk-izvor" }, { "key": "Малък манастир", "value": 23, "slug": "malk-manastir" }, { "key": "Малък Поровец", "value": 12, "slug": "malk-porovec" }, { "key": "Малък Преславец", "value": 15, "slug": "malk-preslavec" }, { "key": "Малък чардак", "value": 20, "slug": "malk-chardak" }, { "key": "Мамарчево", "value": 17, "slug": "mamarchevo" }, { "key": "ман. Рилски манастир", "value": 2, "slug": "man.-rilski-manastir" }, { "key": "Манастир", "value": 23, "slug": "manastir" }, { "key": "Манастирище", "value": 18, "slug": "manastirishche" }, { "key": "Манастирско", "value": 7, "slug": "manastirsko" }, { "key": "Манастирци", "value": 14, "slug": "manastirci" }, { "key": "Мандра", "value": 6, "slug": "mandra" }, { "key": "Мандрица", "value": 3, "slug": "mandrica" }, { "key": "Маноле", "value": 105, "slug": "manole" }, { "key": "Манолич", "value": 38, "slug": "manolich" }, { "key": "Манолово", "value": 23, "slug": "manolovo" }, { "key": "Манолско Конаре", "value": 31, "slug": "manolsko-konare" }, { "key": "Маноя", "value": 1, "slug": "manoya" }, { "key": "Мараш", "value": 41, "slug": "marash" }, { "key": "Марикостиново", "value": 108, "slug": "marikostinovo" }, { "key": "Маринка", "value": 108, "slug": "marinka" }, { "key": "Марино поле", "value": 24, "slug": "marino-pole" }, { "key": "Марица", "value": 29, "slug": "marica" }, { "key": "Марково", "value": 327, "slug": "markovo" }, { "key": "Марково равнище", "value": 1, "slug": "markovo-ravnishche" }, { "key": "Мартен", "value": 267, "slug": "marten" }, { "key": "Мартиново", "value": 2, "slug": "martinovo" }, { "key": "Марулево", "value": 1, "slug": "marulevo" }, { "key": "Марчево", "value": 19, "slug": "marchevo" }, { "key": "Марчино", "value": 4, "slug": "marchino" }, { "key": "Марян", "value": 6, "slug": "maryan" }, { "key": "Масларево", "value": 32, "slug": "maslarevo" }, { "key": "Маслиново", "value": 9, "slug": "maslinovo" }, { "key": "Махалата", "value": 2, "slug": "mahalata" }, { "key": "Маца", "value": 3, "slug": "maca" }, { "key": "Медвен", "value": 23, "slug": "medven" }, { "key": "Медевци", "value": 1, "slug": "medevci" }, { "key": "Меден кладенец", "value": 11, "slug": "meden-kladenec" }, { "key": "Медени поляни", "value": 20, "slug": "medeni-polyani" }, { "key": "Медешевци", "value": 1, "slug": "medeshevci" }, { "key": "Медковец", "value": 60, "slug": "medkovec" }, { "key": "Медникарово", "value": 11, "slug": "mednikarovo" }, { "key": "Медовене", "value": 8, "slug": "medovene" }, { "key": "Медовец", "value": 53, "slug": "medovec" }, { "key": "Медовина", "value": 14, "slug": "medovina" }, { "key": "Медовница", "value": 4, "slug": "medovnica" }, { "key": "Медово", "value": 50, "slug": "medovo" }, { "key": "Межда", "value": 4, "slug": "mezhda" }, { "key": "Межден", "value": 4, "slug": "mezhden" }, { "key": "Междени", "value": 1, "slug": "mezhdeni" }, { "key": "Мездра", "value": 717, "slug": "mezdra" }, { "key": "Мездрея", "value": 10, "slug": "mezdreya" }, { "key": "Мезек", "value": 23, "slug": "mezek" }, { "key": "Мелник", "value": 37, "slug": "melnik" }, { "key": "Мелница", "value": 23, "slug": "melnica" }, { "key": "Меляне", "value": 11, "slug": "melyane" }, { "key": "Менгишево", "value": 16, "slug": "mengishevo" }, { "key": "Мендово", "value": 2, "slug": "mendovo" }, { "key": "Мененкьово", "value": 25, "slug": "menenkovo" }, { "key": "Мерданя", "value": 33, "slug": "merdanya" }, { "key": "Меричлери", "value": 56, "slug": "merichleri" }, { "key": "Места", "value": 5, "slug": "mesta" }, { "key": "Метличина", "value": 17, "slug": "metlichina" }, { "key": "Методиево", "value": 27, "slug": "metodievo" }, { "key": "Мечка", "value": 37, "slug": "mechka" }, { "key": "Мечкарево", "value": 22, "slug": "mechkarevo" }, { "key": "Мещица", "value": 46, "slug": "meshchica" }, { "key": "Мизия", "value": 119, "slug": "miziya" }, { "key": "Мийковци", "value": 5, "slug": "miykovci" }, { "key": "Микре", "value": 12, "slug": "mikre" }, { "key": "Микрево", "value": 89, "slug": "mikrevo" }, { "key": "Миладиново", "value": 2, "slug": "miladinovo" }, { "key": "Миладиновци", "value": 40, "slug": "miladinovci" }, { "key": "Миланово", "value": 16, "slug": "milanovo" }, { "key": "Милево", "value": 25, "slug": "milevo" }, { "key": "Милевци", "value": 2, "slug": "milevci" }, { "key": "Милковица", "value": 49, "slug": "milkovica" }, { "key": "Милковци", "value": 1, "slug": "milkovci" }, { "key": "Милославци", "value": 2, "slug": "miloslavci" }, { "key": "Миндя", "value": 16, "slug": "mindya" }, { "key": "Миневци", "value": 1, "slug": "minevci" }, { "key": "Минерални бани", "value": 145, "slug": "mineralni-bani" }, { "key": "Минзухар", "value": 15, "slug": "minzuhar" }, { "key": "Мирково", "value": 60, "slug": "mirkovo" }, { "key": "Мировец", "value": 8, "slug": "mirovec" }, { "key": "Мирово", "value": 44, "slug": "mirovo" }, { "key": "Мировци", "value": 9, "slug": "mirovci" }, { "key": "Мировяне", "value": 129, "slug": "mirovyane" }, { "key": "Миролюбово", "value": 10, "slug": "mirolyubovo" }, { "key": "Мирянци", "value": 24, "slug": "miryanci" }, { "key": "Митино", "value": 10, "slug": "mitino" }, { "key": "Митовска", "value": 7, "slug": "mitovska" }, { "key": "Митровци", "value": 5, "slug": "mitrovci" }, { "key": "Михайлово", "value": 30, "slug": "mihaylovo" }, { "key": "Михалич", "value": 13, "slug": "mihalich" }, { "key": "Михалково", "value": 28, "slug": "mihalkovo" }, { "key": "Михалци", "value": 33, "slug": "mihalci" }, { "key": "Михилци", "value": 9, "slug": "mihilci" }, { "key": "Михнево", "value": 35, "slug": "mihnevo" }, { "key": "Мичковци", "value": 2, "slug": "michkovci" }, { "key": "Мишевско", "value": 4, "slug": "mishevsko" }, { "key": "Млада гвардия", "value": 11, "slug": "mlada-gvardiya" }, { "key": "Младежко", "value": 8, "slug": "mladezhko" }, { "key": "Младен", "value": 7, "slug": "mladen" }, { "key": "Младиново", "value": 7, "slug": "mladinovo" }, { "key": "Младово", "value": 14, "slug": "mladovo" }, { "key": "Мламолово", "value": 26, "slug": "mlamolovo" }, { "key": "Млекарево", "value": 26, "slug": "mlekarevo" }, { "key": "Млечево", "value": 4, "slug": "mlechevo" }, { "key": "Млечино", "value": 15, "slug": "mlechino" }, { "key": "Могила", "value": 57, "slug": "mogila" }, { "key": "Могилец", "value": 12, "slug": "mogilec" }, { "key": "Могилино", "value": 13, "slug": "mogilino" }, { "key": "Могилица", "value": 30, "slug": "mogilica" }, { "key": "Могилище", "value": 6, "slug": "mogilishche" }, { "key": "Могилово", "value": 11, "slug": "mogilovo" }, { "key": "Могиляне", "value": 5, "slug": "mogilyane" }, { "key": "Мокрен", "value": 27, "slug": "mokren" }, { "key": "Мокреш", "value": 37, "slug": "mokresh" }, { "key": "Мокрище", "value": 60, "slug": "mokrishche" }, { "key": "Момин проход", "value": 57, "slug": "momin-prohod" }, { "key": "Момин сбор", "value": 9, "slug": "momin-sbor" }, { "key": "Момина клисура", "value": 52, "slug": "momina-klisura" }, { "key": "Момина църква", "value": 10, "slug": "momina-crkva" }, { "key": "Момино", "value": 11, "slug": "momino" }, { "key": "Момино село", "value": 24, "slug": "momino-selo" }, { "key": "Моминско", "value": 13, "slug": "mominsko" }, { "key": "Момково", "value": 30, "slug": "momkovo" }, { "key": "Момчилград", "value": 713, "slug": "momchilgrad" }, { "key": "Момчилово", "value": 12, "slug": "momchilovo" }, { "key": "Момчиловци", "value": 77, "slug": "momchilovci" }, { "key": "МОНАКО,", "value": 1, "slug": "monako" }, { "key": "Монтана", "value": 3769, "slug": "montana" }, { "key": "Морава", "value": 16, "slug": "morava" }, { "key": "Моравица", "value": 32, "slug": "moravica" }, { "key": "Моравка", "value": 5, "slug": "moravka" }, { "key": "Мортагоново", "value": 18, "slug": "mortagonovo" }, { "key": "Московец", "value": 2, "slug": "moskovec" }, { "key": "Мосомище", "value": 10, "slug": "mosomishche" }, { "key": "Мост", "value": 25, "slug": "most" }, { "key": "Мостич", "value": 7, "slug": "mostich" }, { "key": "Мостово", "value": 1, "slug": "mostovo" }, { "key": "Мощанец", "value": 3, "slug": "moshchanec" }, { "key": "Мракетинци", "value": 1, "slug": "mraketinci" }, { "key": "Мрамор", "value": 187, "slug": "mramor" }, { "key": "Мраморен", "value": 31, "slug": "mramoren" }, { "key": "Мраченик", "value": 4, "slug": "mrachenik" }, { "key": "Мрежичко", "value": 20, "slug": "mrezhichko" }, { "key": "Мугла", "value": 9, "slug": "mugla" }, { "key": "Музга", "value": 4, "slug": "muzga" }, { "key": "Мулдава", "value": 57, "slug": "muldava" }, { "key": "Мургово", "value": 15, "slug": "murgovo" }, { "key": "Мурено", "value": 3, "slug": "mureno" }, { "key": "Мурсалево", "value": 15, "slug": "mursalevo" }, { "key": "Муртинци", "value": 1, "slug": "murtinci" }, { "key": "Мусачево", "value": 97, "slug": "musachevo" }, { "key": "Муселиево", "value": 30, "slug": "muselievo" }, { "key": "Мусина", "value": 5, "slug": "musina" }, { "key": "Мусомища", "value": 112, "slug": "musomishcha" }, { "key": "Мустрак", "value": 10, "slug": "mustrak" }, { "key": "Мухово", "value": 1, "slug": "muhovo" }, { "key": "Муця", "value": 2, "slug": "mucya" }, { "key": "Мъглен", "value": 26, "slug": "mglen" }, { "key": "Мъглене", "value": 1, "slug": "mglene" }, { "key": "Мъглиж", "value": 208, "slug": "mglizh" }, { "key": "Мъглища", "value": 11, "slug": "mglishcha" }, { "key": "Мъдрево", "value": 25, "slug": "mdrevo" }, { "key": "Мъдрец", "value": 44, "slug": "mdrec" }, { "key": "Мъдрино", "value": 1, "slug": "mdrino" }, { "key": "Мърчаево", "value": 76, "slug": "mrchaevo" }, { "key": "Мърчево", "value": 16, "slug": "mrchevo" }, { "key": "Мътеница", "value": 5, "slug": "mtenica" }, { "key": "Навъсен", "value": 5, "slug": "navsen" }, { "key": "Надарево", "value": 18, "slug": "nadarevo" }, { "key": "Надежден", "value": 11, "slug": "nadezhden" }, { "key": "Найден Герово", "value": 24, "slug": "nayden-gerovo" }, { "key": "Найденово", "value": 8, "slug": "naydenovo" }, { "key": "Нановица", "value": 22, "slug": "nanovica" }, { "key": "Нареченски бани", "value": 27, "slug": "narechenski-bani" }, { "key": "Насалевци", "value": 2, "slug": "nasalevci" }, { "key": "Наум", "value": 8, "slug": "naum" }, { "key": "Научене", "value": 4, "slug": "nauchene" }, { "key": "Нацовци", "value": 3, "slug": "nacovci" }, { "key": "Невестино", "value": 47, "slug": "nevestino" }, { "key": "Невша", "value": 19, "slug": "nevsha" }, { "key": "Негован", "value": 96, "slug": "negovan" }, { "key": "Неговановци", "value": 14, "slug": "negovanovci" }, { "key": "Негованци", "value": 30, "slug": "negovanci" }, { "key": "Негушево", "value": 6, "slug": "negushevo" }, { "key": "Недан", "value": 22, "slug": "nedan" }, { "key": "Неделево", "value": 10, "slug": "nedelevo" }, { "key": "Неделино", "value": 237, "slug": "nedelino" }, { "key": "Неделкова Гращица", "value": 1, "slug": "nedelkova-grashchica" }, { "key": "Недоклан", "value": 6, "slug": "nedoklan" }, { "key": "Недялско", "value": 15, "slug": "nedyalsko" }, { "key": "Нейково", "value": 12, "slug": "neykovo" }, { "key": "Ненково", "value": 2, "slug": "nenkovo" }, { "key": "Неново", "value": 4, "slug": "nenovo" }, { "key": "Неофит Бозвелиево", "value": 13, "slug": "neofit-bozvelievo" }, { "key": "Неофит Рилски", "value": 42, "slug": "neofit-rilski" }, { "key": "Несебър", "value": 4250, "slug": "nesebr" }, { "key": "Несла", "value": 3, "slug": "nesla" }, { "key": "Нефела", "value": 22, "slug": "nefela" }, { "key": "Нешевци", "value": 1, "slug": "neshevci" }, { "key": "Нивянин", "value": 3, "slug": "nivyanin" }, { "key": "Никола Козлево", "value": 20, "slug": "nikola-kozlevo" }, { "key": "Николаевка", "value": 30, "slug": "nikolaevka" }, { "key": "Николаево", "value": 121, "slug": "nikolaevo" }, { "key": "Николичевци", "value": 11, "slug": "nikolichevci" }, { "key": "Николово", "value": 154, "slug": "nikolovo" }, { "key": "Николовци", "value": 1, "slug": "nikolovci" }, { "key": "Никопол", "value": 130, "slug": "nikopol" }, { "key": "Никудин", "value": 1, "slug": "nikudin" }, { "key": "Никюп", "value": 21, "slug": "nikyup" }, { "key": "Нисово", "value": 14, "slug": "nisovo" }, { "key": "Нова бяла река", "value": 14, "slug": "nova-byala-reka" }, { "key": "Нова Върбовка", "value": 40, "slug": "nova-vrbovka" }, { "key": "Нова Загора", "value": 1392, "slug": "nova-zagora" }, { "key": "Нова Камена", "value": 17, "slug": "nova-kamena" }, { "key": "Нова ливада", "value": 1, "slug": "nova-livada" }, { "key": "Нова махала", "value": 146, "slug": "nova-mahala" }, { "key": "Нова Надежда", "value": 6, "slug": "nova-nadezhda" }, { "key": "Нова Попина", "value": 3, "slug": "nova-popina" }, { "key": "Нова Черна", "value": 48, "slug": "nova-cherna" }, { "key": "Нова Шипка", "value": 6, "slug": "nova-shipka" }, { "key": "Новаково", "value": 17, "slug": "novakovo" }, { "key": "Новаковци", "value": 10, "slug": "novakovci" }, { "key": "Новачево", "value": 20, "slug": "novachevo" }, { "key": "Новачене", "value": 58, "slug": "novachene" }, { "key": "Новград", "value": 23, "slug": "novgrad" }, { "key": "Нови извор", "value": 4, "slug": "novi-izvor" }, { "key": "Нови Искър", "value": 848, "slug": "novi-iskr" }, { "key": "Нови пазар", "value": 838, "slug": "novi-pazar" }, { "key": "Нови хан", "value": 182, "slug": "novi-han" }, { "key": "Нови чифлик", "value": 4, "slug": "novi-chiflik" }, { "key": "Ново градище", "value": 9, "slug": "novo-gradishche" }, { "key": "Ново Делчево", "value": 60, "slug": "novo-delchevo" }, { "key": "Ново Железаре", "value": 3, "slug": "novo-zhelezare" }, { "key": "Ново Кономлади", "value": 2, "slug": "novo-konomladi" }, { "key": "Ново Лески", "value": 31, "slug": "novo-leski" }, { "key": "Ново Оряхово", "value": 16, "slug": "novo-oryahovo" }, { "key": "Ново Паничарево", "value": 32, "slug": "novo-panicharevo" }, { "key": "Ново село", "value": 183, "slug": "novo-selo" }, { "key": "Ново Ходжово", "value": 2, "slug": "novo-hodzhovo" }, { "key": "Ново Янково", "value": 1, "slug": "novo-yankovo" }, { "key": "Новосел", "value": 20, "slug": "novosel" }, { "key": "Новоселец", "value": 31, "slug": "novoselec" }, { "key": "Новоселци", "value": 27, "slug": "novoselci" }, { "key": "Ноевци", "value": 11, "slug": "noevci" }, { "key": "Ножарево", "value": 14, "slug": "nozharevo" }, { "key": "Ножарово", "value": 5, "slug": "nozharovo" }, { "key": "Обединение", "value": 23, "slug": "obedinenie" }, { "key": "Обзор", "value": 336, "slug": "obzor" }, { "key": "Обидим", "value": 1, "slug": "obidim" }, { "key": "Обител", "value": 14, "slug": "obitel" }, { "key": "Обнова", "value": 62, "slug": "obnova" }, { "key": "Оборище", "value": 27, "slug": "oborishche" }, { "key": "Обретеник", "value": 44, "slug": "obretenik" }, { "key": "Оброчище", "value": 183, "slug": "obrochishche" }, { "key": "Обручище", "value": 74, "slug": "obruchishche" }, { "key": "Овен", "value": 25, "slug": "oven" }, { "key": "Овощарци", "value": 2, "slug": "ovoshcharci" }, { "key": "Овощник", "value": 87, "slug": "ovoshchnik" }, { "key": "Овча могила", "value": 35, "slug": "ovcha-mogila" }, { "key": "Овчага", "value": 6, "slug": "ovchaga" }, { "key": "Овчари", "value": 4, "slug": "ovchari" }, { "key": "Овчарово", "value": 46, "slug": "ovcharovo" }, { "key": "Овчарци", "value": 42, "slug": "ovcharci" }, { "key": "Овчеполци", "value": 17, "slug": "ovchepolci" }, { "key": "Овчи кладенец", "value": 12, "slug": "ovchi-kladenec" }, { "key": "Оглед", "value": 3, "slug": "ogled" }, { "key": "Огнен", "value": 3, "slug": "ognen" }, { "key": "Огняново", "value": 185, "slug": "ognyanovo" }, { "key": "Оградна", "value": 1, "slug": "ogradna" }, { "key": "Одраница", "value": 2, "slug": "odranica" }, { "key": "Одринци", "value": 14, "slug": "odrinci" }, { "key": "Одърне", "value": 28, "slug": "odrne" }, { "key": "Одърци", "value": 11, "slug": "odrci" }, { "key": "Окоп", "value": 16, "slug": "okop" }, { "key": "Окорш", "value": 27, "slug": "okorsh" }, { "key": "Оман", "value": 5, "slug": "oman" }, { "key": "Омарчево", "value": 18, "slug": "omarchevo" }, { "key": "Омуртаг", "value": 552, "slug": "omurtag" }, { "key": "Оногур", "value": 4, "slug": "onogur" }, { "key": "Опака", "value": 69, "slug": "opaka" }, { "key": "Опан", "value": 16, "slug": "opan" }, { "key": "Опанец", "value": 57, "slug": "opanec" }, { "key": "Опицвет", "value": 26, "slug": "opicvet" }, { "key": "Оплетня", "value": 1, "slug": "opletnya" }, { "key": "Опълченец", "value": 13, "slug": "oplchenec" }, { "key": "Опълченско", "value": 36, "slug": "oplchensko" }, { "key": "Орех", "value": 1, "slug": "oreh" }, { "key": "Ореховица", "value": 46, "slug": "orehovica" }, { "key": "Орехово", "value": 8, "slug": "orehovo" }, { "key": "Ореш", "value": 35, "slug": "oresh" }, { "key": "Орешак", "value": 163, "slug": "oreshak" }, { "key": "Ореше", "value": 9, "slug": "oreshe" }, { "key": "Орешене", "value": 18, "slug": "oreshene" }, { "key": "Орешец", "value": 33, "slug": "oreshec" }, { "key": "Орешник", "value": 15, "slug": "oreshnik" }, { "key": "Орешница", "value": 2, "slug": "oreshnica" }, { "key": "Оризаре", "value": 92, "slug": "orizare" }, { "key": "Оризари", "value": 80, "slug": "orizari" }, { "key": "Оризово", "value": 25, "slug": "orizovo" }, { "key": "Орлинци", "value": 9, "slug": "orlinci" }, { "key": "Орлица", "value": 2, "slug": "orlica" }, { "key": "Орлов дол", "value": 5, "slug": "orlov-dol" }, { "key": "Орлова могила", "value": 11, "slug": "orlova-mogila" }, { "key": "Орловец", "value": 18, "slug": "orlovec" }, { "key": "Орлово", "value": 25, "slug": "orlovo" }, { "key": "Орловци", "value": 3, "slug": "orlovci" }, { "key": "Орляк", "value": 27, "slug": "orlyak" }, { "key": "Орляне", "value": 1, "slug": "orlyane" }, { "key": "Орцево", "value": 6, "slug": "orcevo" }, { "key": "Оряховец", "value": 24, "slug": "oryahovec" }, { "key": "Оряховица", "value": 18, "slug": "oryahovica" }, { "key": "Оряхово", "value": 182, "slug": "oryahovo" }, { "key": "Оселна", "value": 13, "slug": "oselna" }, { "key": "Осен", "value": 11, "slug": "osen" }, { "key": "Осенец", "value": 17, "slug": "osenec" }, { "key": "Осеновец", "value": 4, "slug": "osenovec" }, { "key": "Осеновлаг", "value": 6, "slug": "osenovlag" }, { "key": "Осеново", "value": 55, "slug": "osenovo" }, { "key": "Осетеново", "value": 28, "slug": "osetenovo" }, { "key": "Осиковица", "value": 17, "slug": "osikovica" }, { "key": "Осиково", "value": 31, "slug": "osikovo" }, { "key": "Осиковска Лакавица", "value": 7, "slug": "osikovska-lakavica" }, { "key": "Осина", "value": 14, "slug": "osina" }, { "key": "Ослен Криводол", "value": 1, "slug": "oslen-krivodol" }, { "key": "Осмар", "value": 22, "slug": "osmar" }, { "key": "Осоица", "value": 21, "slug": "osoica" }, { "key": "Остра могила", "value": 7, "slug": "ostra-mogila" }, { "key": "Острец", "value": 8, "slug": "ostrec" }, { "key": "Острица", "value": 22, "slug": "ostrica" }, { "key": "Остров", "value": 17, "slug": "ostrov" }, { "key": "Островец", "value": 2, "slug": "ostrovec" }, { "key": "Островица", "value": 5, "slug": "ostrovica" }, { "key": "Острово", "value": 67, "slug": "ostrovo" }, { "key": "Островче", "value": 5, "slug": "ostrovche" }, { "key": "Остър камък", "value": 3, "slug": "ostr-kamk" }, { "key": "Отец Кирилово", "value": 9, "slug": "otec-kirilovo" }, { "key": "Отец Паисиево", "value": 4, "slug": "otec-paisievo" }, { "key": "Охлювец", "value": 6, "slug": "ohlyuvec" }, { "key": "Оходен", "value": 9, "slug": "ohoden" }, { "key": "Охрид", "value": 12, "slug": "ohrid" }, { "key": "Очиндол", "value": 1, "slug": "ochindol" }, { "key": "Очуша", "value": 1, "slug": "ochusha" }, { "key": "Ошаните", "value": 1, "slug": "oshanite" }, { "key": "Ощава", "value": 2, "slug": "oshchava" }, { "key": "Павел", "value": 20, "slug": "pavel" }, { "key": "Павел баня", "value": 151, "slug": "pavel-banya" }, { "key": "Павелско", "value": 32, "slug": "pavelsko" }, { "key": "Павликени", "value": 839, "slug": "pavlikeni" }, { "key": "Паволче", "value": 12, "slug": "pavolche" }, { "key": "Падеш", "value": 13, "slug": "padesh" }, { "key": "Падина", "value": 60, "slug": "padina" }, { "key": "Пазарджик", "value": 6976, "slug": "pazardzhik" }, { "key": "Пазарци", "value": 3, "slug": "pazarci" }, { "key": "Паисиево", "value": 34, "slug": "paisievo" }, { "key": "Паисий", "value": 11, "slug": "paisiy" }, { "key": "Пайдушко", "value": 5, "slug": "paydushko" }, { "key": "Паламарца", "value": 55, "slug": "palamarca" }, { "key": "Палатово", "value": 3, "slug": "palatovo" }, { "key": "Палаузово", "value": 7, "slug": "palauzovo" }, { "key": "Палилула", "value": 2, "slug": "palilula" }, { "key": "Палици", "value": 8, "slug": "palici" }, { "key": "Памидово", "value": 17, "slug": "pamidovo" }, { "key": "Памукчии", "value": 27, "slug": "pamukchii" }, { "key": "Панагюрище", "value": 1126, "slug": "panagyurishche" }, { "key": "Панагюрски колонии", "value": 4, "slug": "panagyurski-kolonii" }, { "key": "Панайот Волово", "value": 13, "slug": "panayot-volovo" }, { "key": "Панайот Хитово", "value": 4, "slug": "panayot-hitovo" }, { "key": "Панаретовци", "value": 16, "slug": "panaretovci" }, { "key": "Паницово", "value": 11, "slug": "panicovo" }, { "key": "Паничарево", "value": 1, "slug": "panicharevo" }, { "key": "Паничерево", "value": 40, "slug": "panicherevo" }, { "key": "Паничери", "value": 25, "slug": "panicheri" }, { "key": "Паничино", "value": 1, "slug": "panichino" }, { "key": "Паничище", "value": 4, "slug": "panichishche" }, { "key": "Паничково", "value": 13, "slug": "panichkovo" }, { "key": "Панчарево", "value": 215, "slug": "pancharevo" }, { "key": "Панчево", "value": 2, "slug": "panchevo" }, { "key": "Папрат", "value": 6, "slug": "paprat" }, { "key": "Парамун", "value": 10, "slug": "paramun" }, { "key": "Парил", "value": 1, "slug": "paril" }, { "key": "Партизани", "value": 28, "slug": "partizani" }, { "key": "Партизанин", "value": 10, "slug": "partizanin" }, { "key": "Парчовци", "value": 1, "slug": "parchovci" }, { "key": "Паскалевец", "value": 17, "slug": "paskalevec" }, { "key": "Паскалево", "value": 26, "slug": "paskalevo" }, { "key": "Пастра", "value": 8, "slug": "pastra" }, { "key": "Пастух", "value": 1, "slug": "pastuh" }, { "key": "Паталеница", "value": 64, "slug": "patalenica" }, { "key": "Патица", "value": 6, "slug": "patica" }, { "key": "Патреш", "value": 10, "slug": "patresh" }, { "key": "Патриарх Евтимово", "value": 8, "slug": "patriarh-evtimovo" }, { "key": "Пауново", "value": 2, "slug": "paunovo" }, { "key": "Пашинци", "value": 4, "slug": "pashinci" }, { "key": "Пашови", "value": 10, "slug": "pashovi" }, { "key": "Певец", "value": 4, "slug": "pevec" }, { "key": "Певците", "value": 3, "slug": "pevcite" }, { "key": "Пейна", "value": 1, "slug": "peyna" }, { "key": "Пейчиново", "value": 14, "slug": "peychinovo" }, { "key": "Пелатиково", "value": 1, "slug": "pelatikovo" }, { "key": "Пелин", "value": 5, "slug": "pelin" }, { "key": "Пелишат", "value": 13, "slug": "pelishat" }, { "key": "Пеньово", "value": 5, "slug": "penovo" }, { "key": "Пепелина", "value": 3, "slug": "pepelina" }, { "key": "Пепелище", "value": 8, "slug": "pepelishche" }, { "key": "Периловец", "value": 1, "slug": "perilovec" }, { "key": "Перник", "value": 6704, "slug": "pernik" }, { "key": "Перперек", "value": 28, "slug": "perperek" }, { "key": "Перущица", "value": 246, "slug": "perushchica" }, { "key": "Песнопой", "value": 11, "slug": "pesnopoy" }, { "key": "Пет кладенци", "value": 7, "slug": "pet-kladenci" }, { "key": "Пет могили", "value": 48, "slug": "pet-mogili" }, { "key": "Петелово", "value": 4, "slug": "petelovo" }, { "key": "Петко Каравелово", "value": 47, "slug": "petko-karavelovo" }, { "key": "Петко Славейков", "value": 31, "slug": "petko-slaveykov" }, { "key": "Петково", "value": 37, "slug": "petkovo" }, { "key": "Петковци", "value": 1, "slug": "petkovci" }, { "key": "Петлешково", "value": 7, "slug": "petleshkovo" }, { "key": "Петлино", "value": 10, "slug": "petlino" }, { "key": "Петокладенци", "value": 7, "slug": "petokladenci" }, { "key": "Петревене", "value": 11, "slug": "petrevene" }, { "key": "Петрелик", "value": 8, "slug": "petrelik" }, { "key": "Петрино", "value": 5, "slug": "petrino" }, { "key": "Петрич", "value": 7119, "slug": "petrich" }, { "key": "Петров дол", "value": 25, "slug": "petrov-dol" }, { "key": "Петрово", "value": 16, "slug": "petrovo" }, { "key": "Петърница", "value": 25, "slug": "petrnica" }, { "key": "Петърч", "value": 142, "slug": "petrch" }, { "key": "Печеница", "value": 10, "slug": "pechenica" }, { "key": "Печинска", "value": 2, "slug": "pechinska" }, { "key": "Пешаково", "value": 1, "slug": "peshakovo" }, { "key": "Пещера", "value": 1070, "slug": "peshchera" }, { "key": "Пещерна", "value": 6, "slug": "peshcherna" }, { "key": "Пещерско", "value": 20, "slug": "peshchersko" }, { "key": "Пиперево", "value": 12, "slug": "piperevo" }, { "key": "Пиперица", "value": 1, "slug": "piperica" }, { "key": "Пиперков чифлик", "value": 51, "slug": "piperkov-chiflik" }, { "key": "Пиперково", "value": 9, "slug": "piperkovo" }, { "key": "Пиргово", "value": 90, "slug": "pirgovo" }, { "key": "Пирдоп", "value": 489, "slug": "pirdop" }, { "key": "Пирин", "value": 20, "slug": "pirin" }, { "key": "Пиринец", "value": 2, "slug": "pirinec" }, { "key": "Пирне", "value": 17, "slug": "pirne" }, { "key": "Писанец", "value": 9, "slug": "pisanec" }, { "key": "Писарево", "value": 18, "slug": "pisarevo" }, { "key": "Писарово", "value": 26, "slug": "pisarovo" }, { "key": "Писменово", "value": 17, "slug": "pismenovo" }, { "key": "Питово", "value": 8, "slug": "pitovo" }, { "key": "Пишурка", "value": 2, "slug": "pishurka" }, { "key": "Пищигово", "value": 29, "slug": "pishchigovo" }, { "key": "Плазище", "value": 1, "slug": "plazishche" }, { "key": "Плаково", "value": 13, "slug": "plakovo" }, { "key": "Плана", "value": 6, "slug": "plana" }, { "key": "Планиница", "value": 50, "slug": "planinica" }, { "key": "Планиново", "value": 23, "slug": "planinovo" }, { "key": "Плачидол", "value": 31, "slug": "plachidol" }, { "key": "Плачковци", "value": 71, "slug": "plachkovci" }, { "key": "Плевен", "value": 9580, "slug": "pleven" }, { "key": "Плевун", "value": 7, "slug": "plevun" }, { "key": "Пленимир", "value": 11, "slug": "plenimir" }, { "key": "Плетена", "value": 67, "slug": "pletena" }, { "key": "Плешивец", "value": 5, "slug": "pleshivec" }, { "key": "Плиска", "value": 43, "slug": "pliska" }, { "key": "Пловдив", "value": 43312, "slug": "plovdiv" }, { "key": "Пловдивци", "value": 5, "slug": "plovdivci" }, { "key": "Плодовитово", "value": 16, "slug": "plodovitovo" }, { "key": "Плоска могила", "value": 9, "slug": "ploska-mogila" }, { "key": "Плоски", "value": 13, "slug": "ploski" }, { "key": "Плъстина", "value": 11, "slug": "plstina" }, { "key": "Победа", "value": 92, "slug": "pobeda" }, { "key": "Побит камък", "value": 18, "slug": "pobit-kamk" }, { "key": "Повет", "value": 5, "slug": "povet" }, { "key": "Подайва", "value": 44, "slug": "podayva" }, { "key": "Подвис", "value": 94, "slug": "podvis" }, { "key": "Подвръх", "value": 3, "slug": "podvrh" }, { "key": "Подгоре", "value": 3, "slug": "podgore" }, { "key": "Подгорец", "value": 7, "slug": "podgorec" }, { "key": "Подгорие", "value": 1, "slug": "podgorie" }, { "key": "Подгорица", "value": 15, "slug": "podgorica" }, { "key": "Подгумер", "value": 36, "slug": "podgumer" }, { "key": "Подем", "value": 33, "slug": "podem" }, { "key": "Подкова", "value": 21, "slug": "podkova" }, { "key": "Подкрепа", "value": 7, "slug": "podkrepa" }, { "key": "Подлес", "value": 10, "slug": "podles" }, { "key": "Подрумче", "value": 2, "slug": "podrumche" }, { "key": "Подслон", "value": 29, "slug": "podslon" }, { "key": "Пожарево", "value": 13, "slug": "pozharevo" }, { "key": "Поибрене", "value": 2, "slug": "poibrene" }, { "key": "Покрайна", "value": 41, "slug": "pokrayna" }, { "key": "Покровник", "value": 80, "slug": "pokrovnik" }, { "key": "Полена", "value": 28, "slug": "polena" }, { "key": "Поленица", "value": 125, "slug": "polenica" }, { "key": "Полетковци", "value": 1, "slug": "poletkovci" }, { "key": "Полето", "value": 24, "slug": "poleto" }, { "key": "Поликраище", "value": 105, "slug": "polikraishche" }, { "key": "Полковник Дяково", "value": 5, "slug": "polkovnik-dyakovo" }, { "key": "Полковник Желязово", "value": 17, "slug": "polkovnik-zhelyazovo" }, { "key": "Полковник Иваново", "value": 20, "slug": "polkovnik-ivanovo" }, { "key": "Полковник Ламбриново", "value": 1, "slug": "polkovnik-lambrinovo" }, { "key": "Полковник Минково", "value": 11, "slug": "polkovnik-minkovo" }, { "key": "Полковник Савово", "value": 2, "slug": "polkovnik-savovo" }, { "key": "Полковник Свещарово", "value": 13, "slug": "polkovnik-sveshcharovo" }, { "key": "Полковник Серафимово", "value": 20, "slug": "polkovnik-serafimovo" }, { "key": "Полковник Таслаково", "value": 4, "slug": "polkovnik-taslakovo" }, { "key": "Полковник Чолаково", "value": 1, "slug": "polkovnik-cholakovo" }, { "key": "Полски Градец", "value": 14, "slug": "polski-gradec" }, { "key": "Полски извор", "value": 23, "slug": "polski-izvor" }, { "key": "Полски Сеновец", "value": 30, "slug": "polski-senovec" }, { "key": "Полски Тръмбеш", "value": 332, "slug": "polski-trmbesh" }, { "key": "Полско Косово", "value": 24, "slug": "polsko-kosovo" }, { "key": "Полско Пъдарево", "value": 2, "slug": "polsko-pdarevo" }, { "key": "Поляна", "value": 17, "slug": "polyana" }, { "key": "Полянец", "value": 3, "slug": "polyanec" }, { "key": "Поляново", "value": 22, "slug": "polyanovo" }, { "key": "Полянци", "value": 6, "slug": "polyanci" }, { "key": "Поляците", "value": 11, "slug": "polyacite" }, { "key": "Помеждин", "value": 1, "slug": "pomezhdin" }, { "key": "Помен", "value": 5, "slug": "pomen" }, { "key": "Поморие", "value": 2299, "slug": "pomorie" }, { "key": "Помощица", "value": 6, "slug": "pomoshchica" }, { "key": "Помощник", "value": 6, "slug": "pomoshchnik" }, { "key": "Попгригорово", "value": 8, "slug": "popgrigorovo" }, { "key": "Попгруево", "value": 11, "slug": "popgruevo" }, { "key": "Попина", "value": 8, "slug": "popina" }, { "key": "Попинци", "value": 49, "slug": "popinci" }, { "key": "Попица", "value": 40, "slug": "popica" }, { "key": "Поповец", "value": 3, "slug": "popovec" }, { "key": "Поповица", "value": 50, "slug": "popovica" }, { "key": "Попович", "value": 13, "slug": "popovich" }, { "key": "Попово", "value": 1064, "slug": "popovo" }, { "key": "Поповци", "value": 42, "slug": "popovci" }, { "key": "Поповяне", "value": 7, "slug": "popovyane" }, { "key": "Попрусевци", "value": 1, "slug": "poprusevci" }, { "key": "Попска", "value": 2, "slug": "popska" }, { "key": "Пордим", "value": 70, "slug": "pordim" }, { "key": "Пороище", "value": 12, "slug": "poroishche" }, { "key": "Порой", "value": 42, "slug": "poroy" }, { "key": "Поройна", "value": 1, "slug": "poroyna" }, { "key": "Поройно", "value": 28, "slug": "poroyno" }, { "key": "Пороминово", "value": 6, "slug": "porominovo" }, { "key": "Портитовци", "value": 12, "slug": "portitovci" }, { "key": "Поручик Кърджиево", "value": 2, "slug": "poruchik-krdzhievo" }, { "key": "Поручик Чунчево", "value": 3, "slug": "poruchik-chunchevo" }, { "key": "Посабина", "value": 2, "slug": "posabina" }, { "key": "Посев", "value": 2, "slug": "posev" }, { "key": "Постник", "value": 2, "slug": "postnik" }, { "key": "Потоп", "value": 1, "slug": "potop" }, { "key": "Поточница", "value": 3, "slug": "potochnica" }, { "key": "Правда", "value": 51, "slug": "pravda" }, { "key": "Правдино", "value": 7, "slug": "pravdino" }, { "key": "Правдолюб", "value": 1, "slug": "pravdolyub" }, { "key": "Правенци", "value": 3, "slug": "pravenci" }, { "key": "Правец", "value": 389, "slug": "pravec" }, { "key": "Правешка Лакавица", "value": 9, "slug": "praveshka-lakavica" }, { "key": "Правище", "value": 5, "slug": "pravishche" }, { "key": "Право бърдо", "value": 1, "slug": "pravo-brdo" }, { "key": "Православ", "value": 5, "slug": "pravoslav" }, { "key": "Православен", "value": 10, "slug": "pravoslaven" }, { "key": "Праужда", "value": 1, "slug": "prauzhda" }, { "key": "Прахали", "value": 3, "slug": "prahali" }, { "key": "Превала", "value": 18, "slug": "prevala" }, { "key": "Преколница", "value": 4, "slug": "prekolnica" }, { "key": "Прелез", "value": 12, "slug": "prelez" }, { "key": "Прелом", "value": 2, "slug": "prelom" }, { "key": "Преображенци", "value": 9, "slug": "preobrazhenci" }, { "key": "Пресека", "value": 2, "slug": "preseka" }, { "key": "Преселенци", "value": 24, "slug": "preselenci" }, { "key": "Преселец", "value": 9, "slug": "preselec" }, { "key": "Преселка", "value": 14, "slug": "preselka" }, { "key": "Пресиян", "value": 5, "slug": "presiyan" }, { "key": "Преславен", "value": 25, "slug": "preslaven" }, { "key": "Преславец", "value": 3, "slug": "preslavec" }, { "key": "Преславци", "value": 12, "slug": "preslavci" }, { "key": "Преспа", "value": 9, "slug": "prespa" }, { "key": "Пресяк", "value": 3, "slug": "presyak" }, { "key": "Пресяка", "value": 11, "slug": "presyaka" }, { "key": "Прибой", "value": 3, "slug": "priboy" }, { "key": "Прилеп", "value": 17, "slug": "prilep" }, { "key": "Прилепци", "value": 26, "slug": "prilepci" }, { "key": "Приморско", "value": 668, "slug": "primorsko" }, { "key": "Приморци", "value": 12, "slug": "primorci" }, { "key": "Припек", "value": 28, "slug": "pripek" }, { "key": "Присад", "value": 22, "slug": "prisad" }, { "key": "Присадец", "value": 1, "slug": "prisadec" }, { "key": "Приселци", "value": 134, "slug": "priselci" }, { "key": "Присово", "value": 43, "slug": "prisovo" }, { "key": "Пристое", "value": 39, "slug": "pristoe" }, { "key": "Пробуда", "value": 9, "slug": "probuda" }, { "key": "Провадия", "value": 911, "slug": "provadiya" }, { "key": "Проглед", "value": 14, "slug": "progled" }, { "key": "Прогрес", "value": 14, "slug": "progres" }, { "key": "Продановци", "value": 31, "slug": "prodanovci" }, { "key": "Проданча", "value": 1, "slug": "prodancha" }, { "key": "Пролаз", "value": 3, "slug": "prolaz" }, { "key": "Пролез", "value": 4, "slug": "prolez" }, { "key": "Пролеша", "value": 31, "slug": "prolesha" }, { "key": "Пролом", "value": 15, "slug": "prolom" }, { "key": "Пропаст", "value": 3, "slug": "propast" }, { "key": "Просена", "value": 12, "slug": "prosena" }, { "key": "Просеник", "value": 67, "slug": "prosenik" }, { "key": "Просечен", "value": 9, "slug": "prosechen" }, { "key": "Просторно", "value": 2, "slug": "prostorno" }, { "key": "Протопопинци", "value": 4, "slug": "protopopinci" }, { "key": "Професор Иширково", "value": 19, "slug": "profesor-ishirkovo" }, { "key": "Прохлада", "value": 6, "slug": "prohlada" }, { "key": "Проход", "value": 10, "slug": "prohod" }, { "key": "Прохорово", "value": 1, "slug": "prohorovo" }, { "key": "Пряпорец", "value": 9, "slug": "pryaporec" }, { "key": "Птичар", "value": 2, "slug": "ptichar" }, { "key": "Птичево", "value": 4, "slug": "ptichevo" }, { "key": "Пудрия", "value": 15, "slug": "pudriya" }, { "key": "Пушево", "value": 4, "slug": "pushevo" }, { "key": "Пчела", "value": 8, "slug": "pchela" }, { "key": "Пчелари", "value": 11, "slug": "pchelari" }, { "key": "Пчеларово", "value": 17, "slug": "pchelarovo" }, { "key": "Пчелин", "value": 33, "slug": "pchelin" }, { "key": "Пчелина", "value": 5, "slug": "pchelina" }, { "key": "Пчелино", "value": 17, "slug": "pchelino" }, { "key": "Пчелиново", "value": 4, "slug": "pchelinovo" }, { "key": "Пчелище", "value": 38, "slug": "pchelishche" }, { "key": "Пчелник", "value": 75, "slug": "pchelnik" }, { "key": "Пшеничево", "value": 9, "slug": "pshenichevo" }, { "key": "Пъдарево", "value": 19, "slug": "pdarevo" }, { "key": "Пъдарино", "value": 16, "slug": "pdarino" }, { "key": "Пъдарско", "value": 14, "slug": "pdarsko" }, { "key": "Първан", "value": 7, "slug": "prvan" }, { "key": "Първенец", "value": 285, "slug": "prvenec" }, { "key": "Първица", "value": 12, "slug": "prvica" }, { "key": "Първомай", "value": 1082, "slug": "prvomay" }, { "key": "Първомайци", "value": 127, "slug": "prvomayci" }, { "key": "Пъстрен", "value": 5, "slug": "pstren" }, { "key": "Пъстрово", "value": 1, "slug": "pstrovo" }, { "key": "Пъстрогор", "value": 6, "slug": "pstrogor" }, { "key": "Пъстроок", "value": 1, "slug": "pstrook" }, { "key": "Пътниково", "value": 1, "slug": "ptnikovo" }, { "key": "Пясъчево", "value": 3, "slug": "pyaschevo" }, { "key": "Рабиша", "value": 10, "slug": "rabisha" }, { "key": "Рабово", "value": 2, "slug": "rabovo" }, { "key": "Раброво", "value": 5, "slug": "rabrovo" }, { "key": "Равадиново", "value": 54, "slug": "ravadinovo" }, { "key": "Равда", "value": 657, "slug": "ravda" }, { "key": "Равен", "value": 10, "slug": "raven" }, { "key": "Равна", "value": 8, "slug": "ravna" }, { "key": "Равна гора", "value": 36, "slug": "ravna-gora" }, { "key": "Равнец", "value": 43, "slug": "ravnec" }, { "key": "Равнината", "value": 4, "slug": "ravninata" }, { "key": "Равнища", "value": 10, "slug": "ravnishcha" }, { "key": "Равнище", "value": 7, "slug": "ravnishche" }, { "key": "Равно", "value": 20, "slug": "ravno" }, { "key": "Равно нивище", "value": 2, "slug": "ravno-nivishche" }, { "key": "Равно поле", "value": 141, "slug": "ravno-pole" }, { "key": "Равногор", "value": 19, "slug": "ravnogor" }, { "key": "Радан войвода", "value": 10, "slug": "radan-voyvoda" }, { "key": "Раданово", "value": 50, "slug": "radanovo" }, { "key": "Радево", "value": 11, "slug": "radevo" }, { "key": "Радевци", "value": 3, "slug": "radevci" }, { "key": "Радецки", "value": 3, "slug": "radecki" }, { "key": "Радибош", "value": 3, "slug": "radibosh" }, { "key": "Радиево", "value": 31, "slug": "radievo" }, { "key": "Радилово", "value": 58, "slug": "radilovo" }, { "key": "Радинград", "value": 20, "slug": "radingrad" }, { "key": "Радино", "value": 1, "slug": "radino" }, { "key": "Радиново", "value": 73, "slug": "radinovo" }, { "key": "Радишево", "value": 13, "slug": "radishevo" }, { "key": "Радко Димитриево", "value": 16, "slug": "radko-dimitrievo" }, { "key": "Радловци", "value": 1, "slug": "radlovci" }, { "key": "Раднево", "value": 809, "slug": "radnevo" }, { "key": "Радовене", "value": 7, "slug": "radovene" }, { "key": "Радовец", "value": 10, "slug": "radovec" }, { "key": "Радово", "value": 1, "slug": "radovo" }, { "key": "Радойново", "value": 4, "slug": "radoynovo" }, { "key": "Радомир", "value": 874, "slug": "radomir" }, { "key": "Радомирци", "value": 21, "slug": "radomirci" }, { "key": "Радотина", "value": 6, "slug": "radotina" }, { "key": "Радуил", "value": 79, "slug": "raduil" }, { "key": "Радунци", "value": 3, "slug": "radunci" }, { "key": "Радювене", "value": 15, "slug": "radyuvene" }, { "key": "Раждавица", "value": 6, "slug": "razhdavica" }, { "key": "Разбойна", "value": 49, "slug": "razboyna" }, { "key": "Развигорово", "value": 7, "slug": "razvigorovo" }, { "key": "Разград", "value": 3210, "slug": "razgrad" }, { "key": "Раздел", "value": 25, "slug": "razdel" }, { "key": "Разделна", "value": 19, "slug": "razdelna" }, { "key": "Разделци", "value": 4, "slug": "razdelci" }, { "key": "Раздол", "value": 3, "slug": "razdol" }, { "key": "Разлив", "value": 24, "slug": "razliv" }, { "key": "Разлог", "value": 1212, "slug": "razlog" }, { "key": "Разсоха", "value": 4, "slug": "razsoha" }, { "key": "Райкова могила", "value": 1, "slug": "raykova-mogila" }, { "key": "Райнино", "value": 13, "slug": "raynino" }, { "key": "Райново", "value": 1, "slug": "raynovo" }, { "key": "Райновци", "value": 9, "slug": "raynovci" }, { "key": "Райово", "value": 28, "slug": "rayovo" }, { "key": "Ракево", "value": 31, "slug": "rakevo" }, { "key": "Ракиловци", "value": 4, "slug": "rakilovci" }, { "key": "Ракита", "value": 10, "slug": "rakita" }, { "key": "Ракитна", "value": 5, "slug": "rakitna" }, { "key": "Ракитница", "value": 27, "slug": "rakitnica" }, { "key": "Ракитово", "value": 341, "slug": "rakitovo" }, { "key": "Раклиново", "value": 2, "slug": "raklinovo" }, { "key": "Раковица", "value": 21, "slug": "rakovica" }, { "key": "Раковски", "value": 1009, "slug": "rakovski" }, { "key": "Раковсково", "value": 14, "slug": "rakovskovo" }, { "key": "Ралево", "value": 8, "slug": "ralevo" }, { "key": "Ралица", "value": 4, "slug": "ralica" }, { "key": "Раненци", "value": 5, "slug": "ranenci" }, { "key": "Рани лист", "value": 23, "slug": "rani-list" }, { "key": "Рани луг", "value": 1, "slug": "rani-lug" }, { "key": "Расник", "value": 10, "slug": "rasnik" }, { "key": "Расово", "value": 41, "slug": "rasovo" }, { "key": "Растник", "value": 9, "slug": "rastnik" }, { "key": "Раховци", "value": 4, "slug": "rahovci" }, { "key": "Рачевци", "value": 2, "slug": "rachevci" }, { "key": "Рашка Гращица", "value": 8, "slug": "rashka-grashchica" }, { "key": "Рашково", "value": 5, "slug": "rashkovo" }, { "key": "Раювци", "value": 6, "slug": "rayuvci" }, { "key": "Раяновци", "value": 2, "slug": "rayanovci" }, { "key": "Ребревци", "value": 3, "slug": "rebrevci" }, { "key": "Реброво", "value": 42, "slug": "rebrovo" }, { "key": "Ребърково", "value": 18, "slug": "rebrkovo" }, { "key": "Редина", "value": 1, "slug": "redina" }, { "key": "Режанци", "value": 3, "slug": "rezhanci" }, { "key": "Резач", "value": 7, "slug": "rezach" }, { "key": "Резбарци", "value": 44, "slug": "rezbarci" }, { "key": "Резово", "value": 8, "slug": "rezovo" }, { "key": "Река", "value": 4, "slug": "reka" }, { "key": "Рельово", "value": 7, "slug": "relovo" }, { "key": "Репляна", "value": 5, "slug": "replyana" }, { "key": "Реселец", "value": 21, "slug": "reselec" }, { "key": "Ресен", "value": 66, "slug": "resen" }, { "key": "Ресилово", "value": 37, "slug": "resilovo" }, { "key": "Речица", "value": 23, "slug": "rechica" }, { "key": "Рибарица", "value": 81, "slug": "ribarica" }, { "key": "Рибен", "value": 41, "slug": "riben" }, { "key": "Рибница", "value": 7, "slug": "ribnica" }, { "key": "Рибново", "value": 67, "slug": "ribnovo" }, { "key": "Ридино", "value": 6, "slug": "ridino" }, { "key": "Ридово", "value": 1, "slug": "ridovo" }, { "key": "Рила", "value": 81, "slug": "rila" }, { "key": "Рилци", "value": 59, "slug": "rilci" }, { "key": "Рисиманово", "value": 1, "slug": "risimanovo" }, { "key": "Ритя", "value": 1, "slug": "ritya" }, { "key": "Риш", "value": 25, "slug": "rish" }, { "key": "Робово", "value": 1, "slug": "robovo" }, { "key": "Рогач", "value": 6, "slug": "rogach" }, { "key": "Рогачево", "value": 51, "slug": "rogachevo" }, { "key": "Рогозен", "value": 27, "slug": "rogozen" }, { "key": "Рогозина", "value": 1, "slug": "rogozina" }, { "key": "Рогозиново", "value": 10, "slug": "rogozinovo" }, { "key": "Рогозче", "value": 4, "slug": "rogozche" }, { "key": "Рогош", "value": 132, "slug": "rogosh" }, { "key": "Родина", "value": 7, "slug": "rodina" }, { "key": "Рожден", "value": 7, "slug": "rozhden" }, { "key": "Рожен", "value": 4, "slug": "rozhen" }, { "key": "Роза", "value": 70, "slug": "roza" }, { "key": "Розино", "value": 106, "slug": "rozino" }, { "key": "Розовец", "value": 6, "slug": "rozovec" }, { "key": "Розово", "value": 47, "slug": "rozovo" }, { "key": "Роман", "value": 158, "slug": "roman" }, { "key": "Росен", "value": 107, "slug": "rosen" }, { "key": "Росеново", "value": 14, "slug": "rosenovo" }, { "key": "Росина", "value": 3, "slug": "rosina" }, { "key": "Росица", "value": 33, "slug": "rosica" }, { "key": "Росно", "value": 8, "slug": "rosno" }, { "key": "Росоман", "value": 2, "slug": "rosoman" }, { "key": "Рохлева", "value": 3, "slug": "rohleva" }, { "key": "Рояк", "value": 10, "slug": "royak" }, { "key": "Рударци", "value": 74, "slug": "rudarci" }, { "key": "Рудина", "value": 5, "slug": "rudina" }, { "key": "Рудник", "value": 142, "slug": "rudnik" }, { "key": "Рудозем", "value": 295, "slug": "rudozem" }, { "key": "Руевци", "value": 2, "slug": "ruevci" }, { "key": "Руен", "value": 111, "slug": "ruen" }, { "key": "Руец", "value": 18, "slug": "ruec" }, { "key": "Ружинци", "value": 37, "slug": "ruzhinci" }, { "key": "Ружица", "value": 22, "slug": "ruzhica" }, { "key": "Руйно", "value": 17, "slug": "ruyno" }, { "key": "Румянцево", "value": 33, "slug": "rumyancevo" }, { "key": "Руня", "value": 3, "slug": "runya" }, { "key": "Рупите", "value": 40, "slug": "rupite" }, { "key": "Рупките", "value": 17, "slug": "rupkite" }, { "key": "Рупци", "value": 39, "slug": "rupci" }, { "key": "Рупча", "value": 9, "slug": "rupcha" }, { "key": "Русаля", "value": 15, "slug": "rusalya" }, { "key": "Русе", "value": 17103, "slug": "ruse" }, { "key": "Руска Бела", "value": 9, "slug": "ruska-bela" }, { "key": "Русокастро", "value": 30, "slug": "rusokastro" }, { "key": "Руховци", "value": 2, "slug": "ruhovci" }, { "key": "Ръждак", "value": 28, "slug": "rzhdak" }, { "key": "Ръжево", "value": 4, "slug": "rzhevo" }, { "key": "Ръжево Конаре", "value": 67, "slug": "rzhevo-konare" }, { "key": "Ръжена", "value": 25, "slug": "rzhena" }, { "key": "Ръженово", "value": 6, "slug": "rzhenovo" }, { "key": "Ръжица", "value": 24, "slug": "rzhica" }, { "key": "Рътлина", "value": 1, "slug": "rtlina" }, { "key": "Ряхово", "value": 93, "slug": "ryahovo" }, { "key": "Ряховците", "value": 39, "slug": "ryahovcite" }, { "key": "Сава", "value": 18, "slug": "sava" }, { "key": "Савин", "value": 8, "slug": "savin" }, { "key": "Савино", "value": 8, "slug": "savino" }, { "key": "Садина", "value": 24, "slug": "sadina" }, { "key": "Садовец", "value": 48, "slug": "sadovec" }, { "key": "Садовик", "value": 3, "slug": "sadovik" }, { "key": "Садово", "value": 197, "slug": "sadovo" }, { "key": "Сакарци", "value": 1, "slug": "sakarci" }, { "key": "Саласука", "value": 2, "slug": "salasuka" }, { "key": "Салманово", "value": 16, "slug": "salmanovo" }, { "key": "Самовила", "value": 1, "slug": "samovila" }, { "key": "Самоводене", "value": 76, "slug": "samovodene" }, { "key": "Самодива", "value": 8, "slug": "samodiva" }, { "key": "Самокитка", "value": 2, "slug": "samokitka" }, { "key": "Самоков", "value": 2744, "slug": "samokov" }, { "key": "Самораново", "value": 67, "slug": "samoranovo" }, { "key": "Самуил", "value": 58, "slug": "samuil" }, { "key": "Самуилово", "value": 121, "slug": "samuilovo" }, { "key": "Сан-Стефано", "value": 4, "slug": "san-stefano" }, { "key": "Санадиново", "value": 3, "slug": "sanadinovo" }, { "key": "Сандански", "value": 4300, "slug": "sandanski" }, { "key": "Сандрово", "value": 102, "slug": "sandrovo" }, { "key": "Сапарева баня", "value": 365, "slug": "sapareva-banya" }, { "key": "Сапарево", "value": 55, "slug": "saparevo" }, { "key": "Саранско", "value": 4, "slug": "saransko" }, { "key": "Саранци", "value": 12, "slug": "saranci" }, { "key": "Сарая", "value": 42, "slug": "saraya" }, { "key": "Сатовча", "value": 119, "slug": "satovcha" }, { "key": "Сбор", "value": 10, "slug": "sbor" }, { "key": "Сборище", "value": 49, "slug": "sborishche" }, { "key": "Сваленик", "value": 27, "slug": "svalenik" }, { "key": "Свежен", "value": 17, "slug": "svezhen" }, { "key": "Света Петка", "value": 32, "slug": "sveta-petka" }, { "key": "Свети Влас", "value": 1033, "slug": "sveti-vlas" }, { "key": "Свети Никола", "value": 3, "slug": "sveti-nikola" }, { "key": "Светлен", "value": 20, "slug": "svetlen" }, { "key": "Светлина", "value": 34, "slug": "svetlina" }, { "key": "Светля", "value": 10, "slug": "svetlya" }, { "key": "Световрачене", "value": 143, "slug": "svetovrachene" }, { "key": "Светослав", "value": 10, "slug": "svetoslav" }, { "key": "Светославци", "value": 1, "slug": "svetoslavci" }, { "key": "Светулка", "value": 5, "slug": "svetulka" }, { "key": "Свещари", "value": 13, "slug": "sveshchari" }, { "key": "Свидня", "value": 42, "slug": "svidnya" }, { "key": "Свиленград", "value": 1797, "slug": "svilengrad" }, { "key": "Свирачи", "value": 8, "slug": "svirachi" }, { "key": "Свирково", "value": 8, "slug": "svirkovo" }, { "key": "Свищов", "value": 1589, "slug": "svishchov" }, { "key": "Свобода", "value": 54, "slug": "svoboda" }, { "key": "Свободен", "value": 4, "slug": "svoboden" }, { "key": "Свободиново", "value": 8, "slug": "svobodinovo" }, { "key": "Своге", "value": 600, "slug": "svoge" }, { "key": "Своде", "value": 7, "slug": "svode" }, { "key": "Севар", "value": 48, "slug": "sevar" }, { "key": "Северци", "value": 3, "slug": "severci" }, { "key": "Севлиево", "value": 2034, "slug": "sevlievo" }, { "key": "Седелец", "value": 1, "slug": "sedelec" }, { "key": "Седефче", "value": 1, "slug": "sedefche" }, { "key": "Седларево", "value": 1, "slug": "sedlarevo" }, { "key": "Седлари", "value": 9, "slug": "sedlari" }, { "key": "Седларци", "value": 4, "slug": "sedlarci" }, { "key": "Седловина", "value": 10, "slug": "sedlovina" }, { "key": "Седянковци", "value": 3, "slug": "sedyankovci" }, { "key": "Сейдол", "value": 13, "slug": "seydol" }, { "key": "Секулово", "value": 16, "slug": "sekulovo" }, { "key": "Селановци", "value": 85, "slug": "selanovci" }, { "key": "Селиминово", "value": 47, "slug": "seliminovo" }, { "key": "Селище", "value": 17, "slug": "selishche" }, { "key": "Селищен дол", "value": 2, "slug": "selishchen-dol" }, { "key": "Селце", "value": 4, "slug": "selce" }, { "key": "Селци", "value": 18, "slug": "selci" }, { "key": "Селча", "value": 19, "slug": "selcha" }, { "key": "Селянин", "value": 5, "slug": "selyanin" }, { "key": "Семерджиево", "value": 38, "slug": "semerdzhievo" }, { "key": "Семерци", "value": 1, "slug": "semerci" }, { "key": "Семчиново", "value": 45, "slug": "semchinovo" }, { "key": "Сенник", "value": 25, "slug": "sennik" }, { "key": "Сеново", "value": 34, "slug": "senovo" }, { "key": "Сеноклас", "value": 1, "slug": "senoklas" }, { "key": "Сенокос", "value": 34, "slug": "senokos" }, { "key": "Септември", "value": 488, "slug": "septemvri" }, { "key": "Септемврийци", "value": 46, "slug": "septemvriyci" }, { "key": "Сеслав", "value": 36, "slug": "seslav" }, { "key": "Сестримо", "value": 45, "slug": "sestrimo" }, { "key": "Сестринско", "value": 2, "slug": "sestrinsko" }, { "key": "Сечище", "value": 3, "slug": "sechishche" }, { "key": "Сива река", "value": 5, "slug": "siva-reka" }, { "key": "Сивино", "value": 3, "slug": "sivino" }, { "key": "Сигмен", "value": 8, "slug": "sigmen" }, { "key": "Силен", "value": 8, "slug": "silen" }, { "key": "Силистра", "value": 3289, "slug": "silistra" }, { "key": "Симеоновград", "value": 307, "slug": "simeonovgrad" }, { "key": "Симеоновец", "value": 41, "slug": "simeonovec" }, { "key": "Симеоново", "value": 19, "slug": "simeonovo" }, { "key": "Симитли", "value": 469, "slug": "simitli" }, { "key": "Синаговци", "value": 19, "slug": "sinagovci" }, { "key": "Синапово", "value": 18, "slug": "sinapovo" }, { "key": "Синдел", "value": 18, "slug": "sindel" }, { "key": "Синделци", "value": 8, "slug": "sindelci" }, { "key": "Синеморец", "value": 61, "slug": "sinemorec" }, { "key": "Сини вир", "value": 5, "slug": "sini-vir" }, { "key": "Сини рид", "value": 22, "slug": "sini-rid" }, { "key": "Синитово", "value": 83, "slug": "sinitovo" }, { "key": "Синчец", "value": 2, "slug": "sinchec" }, { "key": "Синьо бърдо", "value": 6, "slug": "sino-brdo" }, { "key": "Синя вода", "value": 19, "slug": "sinya-voda" }, { "key": "Сипей", "value": 30, "slug": "sipey" }, { "key": "Сираково", "value": 24, "slug": "sirakovo" }, { "key": "Сирищник", "value": 11, "slug": "sirishchnik" }, { "key": "Ситово", "value": 58, "slug": "sitovo" }, { "key": "Скала", "value": 8, "slug": "skala" }, { "key": "Скалак", "value": 32, "slug": "skalak" }, { "key": "Скалина", "value": 1, "slug": "skalina" }, { "key": "Скалица", "value": 27, "slug": "skalica" }, { "key": "Скалище", "value": 9, "slug": "skalishche" }, { "key": "Скална глава", "value": 5, "slug": "skalna-glava" }, { "key": "Скалско", "value": 12, "slug": "skalsko" }, { "key": "Скандалото", "value": 4, "slug": "skandaloto" }, { "key": "Склаве", "value": 59, "slug": "sklave" }, { "key": "Скобелево", "value": 70, "slug": "skobelevo" }, { "key": "Скравена", "value": 68, "slug": "skravena" }, { "key": "Скребатно", "value": 14, "slug": "skrebatno" }, { "key": "Скрино", "value": 2, "slug": "skrino" }, { "key": "Скриняно", "value": 7, "slug": "skrinyano" }, { "key": "Скрът", "value": 45, "slug": "skrt" }, { "key": "Скутаре", "value": 144, "slug": "skutare" }, { "key": "Скърбино", "value": 6, "slug": "skrbino" }, { "key": "Славеево", "value": 18, "slug": "slaveevo" }, { "key": "Славейково", "value": 18, "slug": "slaveykovo" }, { "key": "Славейно", "value": 10, "slug": "slaveyno" }, { "key": "Славовица", "value": 24, "slug": "slavovica" }, { "key": "Славотин", "value": 3, "slug": "slavotin" }, { "key": "Славщица", "value": 5, "slug": "slavshchica" }, { "key": "Славяни", "value": 15, "slug": "slavyani" }, { "key": "Славянин", "value": 2, "slug": "slavyanin" }, { "key": "Славяново", "value": 179, "slug": "slavyanovo" }, { "key": "Славянци", "value": 39, "slug": "slavyanci" }, { "key": "Сладка вода", "value": 2, "slug": "sladka-voda" }, { "key": "Сладун", "value": 5, "slug": "sladun" }, { "key": "Сладък кладенец", "value": 1, "slug": "sladk-kladenec" }, { "key": "Слаковци", "value": 9, "slug": "slakovci" }, { "key": "Сламино", "value": 7, "slug": "slamino" }, { "key": "Слана бара", "value": 13, "slug": "slana-bara" }, { "key": "Сланотрън", "value": 20, "slug": "slanotrn" }, { "key": "Слатина", "value": 53, "slug": "slatina" }, { "key": "Слатино", "value": 16, "slug": "slatino" }, { "key": "Слащен", "value": 68, "slug": "slashchen" }, { "key": "Сливак", "value": 6, "slug": "slivak" }, { "key": "Сливарка", "value": 9, "slug": "slivarka" }, { "key": "Сливарово", "value": 3, "slug": "slivarovo" }, { "key": "Сливата", "value": 1, "slug": "slivata" }, { "key": "Сливек", "value": 6, "slug": "slivek" }, { "key": "Сливен", "value": 8240, "slug": "sliven" }, { "key": "Сливенци", "value": 4, "slug": "slivenci" }, { "key": "Сливито", "value": 2, "slug": "slivito" }, { "key": "Сливка", "value": 1, "slug": "slivka" }, { "key": "Сливница", "value": 664, "slug": "slivnica" }, { "key": "Сливо поле", "value": 127, "slug": "slivo-pole" }, { "key": "Сливовик", "value": 5, "slug": "slivovik" }, { "key": "Сливовица", "value": 1, "slug": "slivovica" }, { "key": "Сливово", "value": 2, "slug": "slivovo" }, { "key": "Слишовци", "value": 1, "slug": "slishovci" }, { "key": "Слокощица", "value": 58, "slug": "slokoshchica" }, { "key": "Сломер", "value": 7, "slug": "slomer" }, { "key": "Слънчево", "value": 43, "slug": "slnchevo" }, { "key": "Слънчоглед", "value": 17, "slug": "slnchogled" }, { "key": "Смилец", "value": 15, "slug": "smilec" }, { "key": "Смилян", "value": 108, "slug": "smilyan" }, { "key": "Смин", "value": 3, "slug": "smin" }, { "key": "Смирненски", "value": 112, "slug": "smirnenski" }, { "key": "Смиров дол", "value": 7, "slug": "smirov-dol" }, { "key": "Смолево", "value": 8, "slug": "smolevo" }, { "key": "Смоличано", "value": 4, "slug": "smolichano" }, { "key": "Смолник", "value": 2, "slug": "smolnik" }, { "key": "Смолница", "value": 14, "slug": "smolnica" }, { "key": "Смолско", "value": 6, "slug": "smolsko" }, { "key": "Смолян", "value": 3349, "slug": "smolyan" }, { "key": "Смоляновци", "value": 21, "slug": "smolyanovci" }, { "key": "Смочан", "value": 15, "slug": "smochan" }, { "key": "Смочево", "value": 2, "slug": "smochevo" }, { "key": "Смядово", "value": 183, "slug": "smyadovo" }, { "key": "Снежа", "value": 6, "slug": "snezha" }, { "key": "Снежина", "value": 11, "slug": "snezhina" }, { "key": "Сноп", "value": 11, "slug": "snop" }, { "key": "Снягово", "value": 42, "slug": "snyagovo" }, { "key": "Совата", "value": 6, "slug": "sovata" }, { "key": "Соволяно", "value": 25, "slug": "sovolyano" }, { "key": "Созопол", "value": 979, "slug": "sozopol" }, { "key": "Сокол", "value": 16, "slug": "sokol" }, { "key": "Соколаре", "value": 12, "slug": "sokolare" }, { "key": "Соколарци", "value": 11, "slug": "sokolarci" }, { "key": "Соколец", "value": 3, "slug": "sokolec" }, { "key": "Соколино", "value": 15, "slug": "sokolino" }, { "key": "Соколица", "value": 19, "slug": "sokolica" }, { "key": "Соколово", "value": 96, "slug": "sokolovo" }, { "key": "Соколовци", "value": 10, "slug": "sokolovci" }, { "key": "Соколяне", "value": 8, "slug": "sokolyane" }, { "key": "Солища", "value": 2, "slug": "solishcha" }, { "key": "Солище", "value": 11, "slug": "solishche" }, { "key": "Солник", "value": 12, "slug": "solnik" }, { "key": "Сомовит", "value": 12, "slug": "somovit" }, { "key": "Сопица", "value": 3, "slug": "sopica" }, { "key": "Сопот", "value": 573, "slug": "sopot" }, { "key": "Сопотот", "value": 11, "slug": "sopotot" }, { "key": "Сотиря", "value": 45, "slug": "sotirya" }, { "key": "Софийци", "value": 2, "slug": "sofiyci" }, { "key": "София", "value": 192809, "slug": "sofiya" }, { "key": "Софрониево", "value": 29, "slug": "sofronievo" }, { "key": "Спанчевци", "value": 9, "slug": "spanchevci" }, { "key": "Спасово", "value": 48, "slug": "spasovo" }, { "key": "Спатово", "value": 4, "slug": "spatovo" }, { "key": "Спахиево", "value": 8, "slug": "spahievo" }, { "key": "Срацимир", "value": 9, "slug": "sracimir" }, { "key": "Срацимирово", "value": 1, "slug": "sracimirovo" }, { "key": "Сребърна", "value": 16, "slug": "srebrna" }, { "key": "Средец", "value": 588, "slug": "sredec" }, { "key": "Средина", "value": 3, "slug": "sredina" }, { "key": "Срединка", "value": 9, "slug": "sredinka" }, { "key": "Средище", "value": 34, "slug": "sredishche" }, { "key": "Средковец", "value": 13, "slug": "sredkovec" }, { "key": "Средна махала", "value": 5, "slug": "sredna-mahala" }, { "key": "Среднево", "value": 6, "slug": "srednevo" }, { "key": "Средни колиби", "value": 11, "slug": "sredni-kolibi" }, { "key": "Средно градище", "value": 14, "slug": "sredno-gradishche" }, { "key": "Средно село", "value": 7, "slug": "sredno-selo" }, { "key": "Средногорово", "value": 11, "slug": "srednogorovo" }, { "key": "Средногорци", "value": 48, "slug": "srednogorci" }, { "key": "Средня", "value": 10, "slug": "srednya" }, { "key": "Средогрив", "value": 2, "slug": "sredogriv" }, { "key": "Средорек", "value": 4, "slug": "sredorek" }, { "key": "Средоселци", "value": 11, "slug": "sredoselci" }, { "key": "Средско", "value": 3, "slug": "sredsko" }, { "key": "Срем", "value": 26, "slug": "srem" }, { "key": "Срънско", "value": 3, "slug": "srnsko" }, { "key": "Ставерци", "value": 42, "slug": "staverci" }, { "key": "Стаевци", "value": 1, "slug": "staevci" }, { "key": "Стакевци", "value": 6, "slug": "stakevci" }, { "key": "Сталево", "value": 9, "slug": "stalevo" }, { "key": "Сталийска махала", "value": 26, "slug": "staliyska-mahala" }, { "key": "Стамболийски", "value": 700, "slug": "stamboliyski" }, { "key": "Стамболово", "value": 134, "slug": "stambolovo" }, { "key": "Стан", "value": 19, "slug": "stan" }, { "key": "Станево", "value": 4, "slug": "stanevo" }, { "key": "Станец", "value": 5, "slug": "stanec" }, { "key": "Станинци", "value": 1, "slug": "staninci" }, { "key": "Становец", "value": 2, "slug": "stanovec" }, { "key": "Станчов хан", "value": 1, "slug": "stanchov-han" }, { "key": "Станьовци", "value": 1, "slug": "stanovci" }, { "key": "Станянци", "value": 11, "slug": "stanyanci" }, { "key": "Стара Загора", "value": 15025, "slug": "stara-zagora" }, { "key": "Стара Кресна", "value": 2, "slug": "stara-kresna" }, { "key": "Стара река", "value": 37, "slug": "stara-reka" }, { "key": "Стара речка", "value": 5, "slug": "stara-rechka" }, { "key": "Стари чал", "value": 1, "slug": "stari-chal" }, { "key": "Старо Железаре", "value": 18, "slug": "staro-zhelezare" }, { "key": "Старо Оряхово", "value": 95, "slug": "staro-oryahovo" }, { "key": "Старо селище", "value": 5, "slug": "staro-selishche" }, { "key": "Старо село", "value": 44, "slug": "staro-selo" }, { "key": "Старово", "value": 2, "slug": "starovo" }, { "key": "Старозагорски бани", "value": 20, "slug": "starozagorski-bani" }, { "key": "Старопатица", "value": 8, "slug": "staropatica" }, { "key": "Старосел", "value": 28, "slug": "starosel" }, { "key": "Староселец", "value": 3, "slug": "staroselec" }, { "key": "Староселци", "value": 25, "slug": "staroselci" }, { "key": "Старцево", "value": 111, "slug": "starcevo" }, { "key": "Старчево", "value": 26, "slug": "starchevo" }, { "key": "Старчище", "value": 3, "slug": "starchishche" }, { "key": "Стеврек", "value": 1, "slug": "stevrek" }, { "key": "Стежерово", "value": 17, "slug": "stezherovo" }, { "key": "Стенско", "value": 1, "slug": "stensko" }, { "key": "Стефан Караджа", "value": 92, "slug": "stefan-karadzha" }, { "key": "Стефан Караджово", "value": 23, "slug": "stefan-karadzhovo" }, { "key": "Стефан Стамболово", "value": 13, "slug": "stefan-stambolovo" }, { "key": "Стефаново", "value": 63, "slug": "stefanovo" }, { "key": "Стоб", "value": 11, "slug": "stob" }, { "key": "Стоево", "value": 18, "slug": "stoevo" }, { "key": "Стоевци", "value": 2, "slug": "stoevci" }, { "key": "Стожа", "value": 1, "slug": "stozha" }, { "key": "Стожер", "value": 62, "slug": "stozher" }, { "key": "Стоил войвода", "value": 28, "slug": "stoil-voyvoda" }, { "key": "Стоилово", "value": 8, "slug": "stoilovo" }, { "key": "Стойките", "value": 30, "slug": "stoykite" }, { "key": "Стойково", "value": 3, "slug": "stoykovo" }, { "key": "Стойново", "value": 1, "slug": "stoynovo" }, { "key": "Стойчовци", "value": 3, "slug": "stoychovci" }, { "key": "Стоките", "value": 11, "slug": "stokite" }, { "key": "Столетово", "value": 22, "slug": "stoletovo" }, { "key": "Столник", "value": 23, "slug": "stolnik" }, { "key": "Столът", "value": 9, "slug": "stolt" }, { "key": "Стоманево", "value": 5, "slug": "stomanevo" }, { "key": "Стоманеците", "value": 2, "slug": "stomanecite" }, { "key": "Стоманци", "value": 4, "slug": "stomanci" }, { "key": "Стоян Михайловски", "value": 19, "slug": "stoyan-mihaylovski" }, { "key": "Стоян-Заимово", "value": 1, "slug": "stoyan-zaimovo" }, { "key": "Стояновци", "value": 1, "slug": "stoyanovci" }, { "key": "Стража", "value": 43, "slug": "strazha" }, { "key": "Стражевци", "value": 1, "slug": "strazhevci" }, { "key": "Стражец", "value": 85, "slug": "strazhec" }, { "key": "Стражица", "value": 265, "slug": "strazhica" }, { "key": "Стражница", "value": 4, "slug": "strazhnica" }, { "key": "Стралджа", "value": 302, "slug": "straldzha" }, { "key": "Странджа", "value": 3, "slug": "strandzha" }, { "key": "Странджево", "value": 5, "slug": "strandzhevo" }, { "key": "Странско", "value": 12, "slug": "stransko" }, { "key": "Страхил", "value": 1, "slug": "strahil" }, { "key": "Страхил войвода", "value": 3, "slug": "strahil-voyvoda" }, { "key": "Страхилица", "value": 2, "slug": "strahilica" }, { "key": "Страхилово", "value": 58, "slug": "strahilovo" }, { "key": "Страцин", "value": 41, "slug": "stracin" }, { "key": "Страшимир", "value": 1, "slug": "strashimir" }, { "key": "Страшимирово", "value": 34, "slug": "strashimirovo" }, { "key": "Стрелец", "value": 13, "slug": "strelec" }, { "key": "Стрелци", "value": 37, "slug": "strelci" }, { "key": "Стрелча", "value": 213, "slug": "strelcha" }, { "key": "Стремово", "value": 6, "slug": "stremovo" }, { "key": "Стремци", "value": 34, "slug": "stremci" }, { "key": "Стрижба", "value": 3, "slug": "strizhba" }, { "key": "Строево", "value": 109, "slug": "stroevo" }, { "key": "Струино", "value": 8, "slug": "struino" }, { "key": "Струма", "value": 20, "slug": "struma" }, { "key": "Струмешница", "value": 15, "slug": "strumeshnica" }, { "key": "Струмяни", "value": 90, "slug": "strumyani" }, { "key": "Струпец", "value": 6, "slug": "strupec" }, { "key": "Струя", "value": 29, "slug": "struya" }, { "key": "Стряма", "value": 146, "slug": "stryama" }, { "key": "Стубел", "value": 19, "slug": "stubel" }, { "key": "Студен извор", "value": 2, "slug": "studen-izvor" }, { "key": "Студена", "value": 126, "slug": "studena" }, { "key": "Студенец", "value": 12, "slug": "studenec" }, { "key": "Студеница", "value": 7, "slug": "studenica" }, { "key": "Студено буче", "value": 19, "slug": "studeno-buche" }, { "key": "Стъргел", "value": 25, "slug": "strgel" }, { "key": "Стърмен", "value": 5, "slug": "strmen" }, { "key": "Стърница", "value": 17, "slug": "strnica" }, { "key": "Суворово", "value": 229, "slug": "suvorovo" }, { "key": "Сугарево", "value": 3, "slug": "sugarevo" }, { "key": "Сулица", "value": 5, "slug": "sulica" }, { "key": "Сумер", "value": 2, "slug": "sumer" }, { "key": "Сунгурларе", "value": 219, "slug": "sungurlare" }, { "key": "Сусам", "value": 26, "slug": "susam" }, { "key": "Суха река", "value": 10, "slug": "suha-reka" }, { "key": "Сухаче", "value": 18, "slug": "suhache" }, { "key": "Сухиндол", "value": 114, "slug": "suhindol" }, { "key": "Сухово", "value": 2, "slug": "suhovo" }, { "key": "Суходол", "value": 36, "slug": "suhodol" }, { "key": "Сухозем", "value": 9, "slug": "suhozem" }, { "key": "Сушево", "value": 21, "slug": "sushevo" }, { "key": "Сушина", "value": 4, "slug": "sushina" }, { "key": "Сушица", "value": 28, "slug": "sushica" }, { "key": "Съботковци", "value": 2, "slug": "sbotkovci" }, { "key": "Събрано", "value": 10, "slug": "sbrano" }, { "key": "Съдиево", "value": 36, "slug": "sdievo" }, { "key": "Съдийско поле", "value": 3, "slug": "sdiysko-pole" }, { "key": "Съединение", "value": 315, "slug": "sedinenie" }, { "key": "Сърневец", "value": 9, "slug": "srnevec" }, { "key": "Сърнево", "value": 78, "slug": "srnevo" }, { "key": "Сърнегор", "value": 8, "slug": "srnegor" }, { "key": "Сърнец", "value": 5, "slug": "srnec" }, { "key": "Сърнино", "value": 12, "slug": "srnino" }, { "key": "Сърница", "value": 346, "slug": "srnica" }, { "key": "Сърпово", "value": 4, "slug": "srpovo" }, { "key": "Сърцево", "value": 3, "slug": "srcevo" }, { "key": "Сяново", "value": 11, "slug": "syanovo" }, { "key": "Табан", "value": 2, "slug": "taban" }, { "key": "Табачка", "value": 10, "slug": "tabachka" }, { "key": "Табашка", "value": 2, "slug": "tabashka" }, { "key": "Таваличево", "value": 4, "slug": "tavalichevo" }, { "key": "Таймище", "value": 2, "slug": "taymishche" }, { "key": "Тамарино", "value": 9, "slug": "tamarino" }, { "key": "Татарево", "value": 38, "slug": "tatarevo" }, { "key": "Татари", "value": 2, "slug": "tatari" }, { "key": "Татул", "value": 1, "slug": "tatul" }, { "key": "Твърдинци", "value": 1, "slug": "tvrdinci" }, { "key": "Твърдица", "value": 321, "slug": "tvrdica" }, { "key": "Текето", "value": 3, "slug": "teketo" }, { "key": "Телериг", "value": 18, "slug": "telerig" }, { "key": "Телиш", "value": 24, "slug": "telish" }, { "key": "Телчарка", "value": 4, "slug": "telcharka" }, { "key": "Теменуга", "value": 1, "slug": "temenuga" }, { "key": "Тенево", "value": 59, "slug": "tenevo" }, { "key": "Теплен", "value": 12, "slug": "teplen" }, { "key": "Тервел", "value": 357, "slug": "tervel" }, { "key": "Терзийско", "value": 23, "slug": "terziysko" }, { "key": "Тертер", "value": 4, "slug": "terter" }, { "key": "Тетевен", "value": 612, "slug": "teteven" }, { "key": "Тетово", "value": 57, "slug": "tetovo" }, { "key": "Тешово", "value": 11, "slug": "teshovo" }, { "key": "Тикале", "value": 4, "slug": "tikale" }, { "key": "Тимарево", "value": 20, "slug": "timarevo" }, { "key": "Типченица", "value": 6, "slug": "tipchenica" }, { "key": "Тихомир", "value": 30, "slug": "tihomir" }, { "key": "Тихомирово", "value": 2, "slug": "tihomirovo" }, { "key": "Тича", "value": 38, "slug": "ticha" }, { "key": "Тишаново", "value": 2, "slug": "tishanovo" }, { "key": "Тишевица", "value": 12, "slug": "tishevica" }, { "key": "Тияновци", "value": 2, "slug": "tiyanovci" }, { "key": "Тлачене", "value": 14, "slug": "tlachene" }, { "key": "Тодор Икономово", "value": 57, "slug": "todor-ikonomovo" }, { "key": "Тодоричене", "value": 12, "slug": "todorichene" }, { "key": "Тодорово", "value": 40, "slug": "todorovo" }, { "key": "Тодорчета", "value": 1, "slug": "todorcheta" }, { "key": "Тодювци", "value": 3, "slug": "todyuvci" }, { "key": "Токачка", "value": 4, "slug": "tokachka" }, { "key": "Толовица", "value": 3, "slug": "tolovica" }, { "key": "Томпсън", "value": 19, "slug": "tompsn" }, { "key": "Топола", "value": 23, "slug": "topola" }, { "key": "Тополи", "value": 204, "slug": "topoli" }, { "key": "Тополи дол", "value": 4, "slug": "topoli-dol" }, { "key": "Тополица", "value": 64, "slug": "topolica" }, { "key": "Тополница", "value": 75, "slug": "topolnica" }, { "key": "Тополовград", "value": 336, "slug": "topolovgrad" }, { "key": "Тополовец", "value": 8, "slug": "topolovec" }, { "key": "Тополово", "value": 108, "slug": "topolovo" }, { "key": "Тополчане", "value": 83, "slug": "topolchane" }, { "key": "Тополяне", "value": 8, "slug": "topolyane" }, { "key": "Топузево", "value": 1, "slug": "topuzevo" }, { "key": "Топчии", "value": 11, "slug": "topchii" }, { "key": "Топчийско", "value": 23, "slug": "topchiysko" }, { "key": "Торос", "value": 50, "slug": "toros" }, { "key": "Тотлебен", "value": 21, "slug": "totleben" }, { "key": "Точилари", "value": 6, "slug": "tochilari" }, { "key": "Тошевци", "value": 5, "slug": "toshevci" }, { "key": "Траве", "value": 1, "slug": "trave" }, { "key": "Трайково", "value": 23, "slug": "traykovo" }, { "key": "Тракиец", "value": 10, "slug": "trakiec" }, { "key": "Тракия", "value": 13, "slug": "trakiya" }, { "key": "Трапище", "value": 10, "slug": "trapishche" }, { "key": "Трапоклово", "value": 4, "slug": "trapoklovo" }, { "key": "Требище", "value": 1, "slug": "trebishche" }, { "key": "Трекляно", "value": 11, "slug": "treklyano" }, { "key": "Трем", "value": 8, "slug": "trem" }, { "key": "Трескавец", "value": 18, "slug": "treskavec" }, { "key": "Три кладенци", "value": 16, "slug": "tri-kladenci" }, { "key": "Три могили", "value": 14, "slug": "tri-mogili" }, { "key": "Триводици", "value": 39, "slug": "trivodici" }, { "key": "Триград", "value": 47, "slug": "trigrad" }, { "key": "Трилистник", "value": 25, "slug": "trilistnik" }, { "key": "Трифоново", "value": 2, "slug": "trifonovo" }, { "key": "Троица", "value": 9, "slug": "troica" }, { "key": "Троян", "value": 1847, "slug": "troyan" }, { "key": "Трояново", "value": 52, "slug": "troyanovo" }, { "key": "Труд", "value": 341, "slug": "trud" }, { "key": "Трудовец", "value": 158, "slug": "trudovec" }, { "key": "Тръбач", "value": 8, "slug": "trbach" }, { "key": "Трън", "value": 139, "slug": "trn" }, { "key": "Трънак", "value": 31, "slug": "trnak" }, { "key": "Трънито", "value": 3, "slug": "trnito" }, { "key": "Тръница", "value": 2, "slug": "trnica" }, { "key": "Трънково", "value": 17, "slug": "trnkovo" }, { "key": "Трънчовица", "value": 19, "slug": "trnchovica" }, { "key": "Тръстеник", "value": 213, "slug": "trstenik" }, { "key": "Тръстика", "value": 3, "slug": "trstika" }, { "key": "Тръстиково", "value": 67, "slug": "trstikovo" }, { "key": "Трявна", "value": 758, "slug": "tryavna" }, { "key": "Туден", "value": 7, "slug": "tuden" }, { "key": "Тулово", "value": 40, "slug": "tulovo" }, { "key": "Тумбалово", "value": 3, "slug": "tumbalovo" }, { "key": "Турия", "value": 20, "slug": "turiya" }, { "key": "Туркинча", "value": 5, "slug": "turkincha" }, { "key": "Туроковци", "value": 3, "slug": "turokovci" }, { "key": "Турян", "value": 1, "slug": "turyan" }, { "key": "Тутракан", "value": 515, "slug": "tutrakan" }, { "key": "Тутраканци", "value": 59, "slug": "tutrakanci" }, { "key": "Туховища", "value": 31, "slug": "tuhovishcha" }, { "key": "Тученица", "value": 4, "slug": "tuchenica" }, { "key": "Тушовица", "value": 12, "slug": "tushovica" }, { "key": "Тъжа", "value": 44, "slug": "tzha" }, { "key": "Тъкач", "value": 15, "slug": "tkach" }, { "key": "Тънка бара", "value": 1, "slug": "tnka-bara" }, { "key": "Тънково", "value": 166, "slug": "tnkovo" }, { "key": "Тънкото", "value": 1, "slug": "tnkoto" }, { "key": "Търговище", "value": 3465, "slug": "trgovishche" }, { "key": "Търна", "value": 1, "slug": "trna" }, { "key": "Търнава", "value": 86, "slug": "trnava" }, { "key": "Търнак", "value": 48, "slug": "trnak" }, { "key": "Търнене", "value": 12, "slug": "trnene" }, { "key": "Търничени", "value": 20, "slug": "trnicheni" }, { "key": "Търновца", "value": 18, "slug": "trnovca" }, { "key": "Търновци", "value": 6, "slug": "trnovci" }, { "key": "Търняне", "value": 6, "slug": "trnyane" }, { "key": "Търхово", "value": 4, "slug": "trhovo" }, { "key": "Търън", "value": 31, "slug": "trn" }, { "key": "Тюленово", "value": 5, "slug": "tyulenovo" }, { "key": "Тюркмен", "value": 13, "slug": "tyurkmen" }, { "key": "Тютюнче", "value": 5, "slug": "tyutyunche" }, { "key": "Тянево", "value": 10, "slug": "tyanevo" }, { "key": "Угледно", "value": 1, "slug": "ugledno" }, { "key": "Углярци", "value": 4, "slug": "uglyarci" }, { "key": "Угърчин", "value": 115, "slug": "ugrchin" }, { "key": "Узово", "value": 2, "slug": "uzovo" }, { "key": "Узунджово", "value": 55, "slug": "uzundzhovo" }, { "key": "Узуните", "value": 2, "slug": "uzunite" }, { "key": "Умаревци", "value": 11, "slug": "umarevci" }, { "key": "Уровене", "value": 5, "slug": "urovene" }, { "key": "Усойка", "value": 12, "slug": "usoyka" }, { "key": "Устина", "value": 75, "slug": "ustina" }, { "key": "Устрем", "value": 35, "slug": "ustrem" }, { "key": "Устрен", "value": 8, "slug": "ustren" }, { "key": "Ухловица", "value": 1, "slug": "uhlovica" }, { "key": "Уши", "value": 2, "slug": "ushi" }, { "key": "Ушинци", "value": 24, "slug": "ushinci" }, { "key": "Фазаново", "value": 4, "slug": "fazanovo" }, { "key": "Факия", "value": 8, "slug": "fakiya" }, { "key": "Фатово", "value": 1, "slug": "fatovo" }, { "key": "Фелдфебел Денково", "value": 9, "slug": "feldfebel-denkovo" }, { "key": "Филаретово", "value": 14, "slug": "filaretovo" }, { "key": "Филипово", "value": 25, "slug": "filipovo" }, { "key": "Филиповци", "value": 5, "slug": "filipovci" }, { "key": "Флорентин", "value": 6, "slug": "florentin" }, { "key": "Фотиново", "value": 39, "slug": "fotinovo" }, { "key": "Фролош", "value": 1, "slug": "frolosh" }, { "key": "Фурен", "value": 16, "slug": "furen" }, { "key": "Фъргово", "value": 10, "slug": "frgovo" }, { "key": "Фъревци", "value": 1, "slug": "frevci" }, { "key": "Хаджи Димитър", "value": 12, "slug": "hadzhi-dimitr" }, { "key": "Хаджидимитрово", "value": 123, "slug": "hadzhidimitrovo" }, { "key": "Хаджидимово", "value": 174, "slug": "hadzhidimovo" }, { "key": "Хаджиево", "value": 50, "slug": "hadzhievo" }, { "key": "Хаджиите", "value": 11, "slug": "hadzhiite" }, { "key": "Хаджийско", "value": 11, "slug": "hadzhiysko" }, { "key": "Хайредин", "value": 76, "slug": "hayredin" }, { "key": "Хан Аспарухово", "value": 37, "slug": "han-asparuhovo" }, { "key": "Хан Крум", "value": 22, "slug": "han-krum" }, { "key": "Ханово", "value": 16, "slug": "hanovo" }, { "key": "Харачерите", "value": 3, "slug": "haracherite" }, { "key": "Харваловци", "value": 1, "slug": "harvalovci" }, { "key": "Харманли", "value": 1495, "slug": "harmanli" }, { "key": "Хасково", "value": 8322, "slug": "haskovo" }, { "key": "Хвойна", "value": 48, "slug": "hvoyna" }, { "key": "Хвостяне", "value": 31, "slug": "hvostyane" }, { "key": "Хераково", "value": 27, "slug": "herakovo" }, { "key": "Хирево", "value": 6, "slug": "hirevo" }, { "key": "Хисаря", "value": 552, "slug": "hisarya" }, { "key": "Хитово", "value": 9, "slug": "hitovo" }, { "key": "Хитрино", "value": 49, "slug": "hitrino" }, { "key": "Хлевене", "value": 18, "slug": "hlevene" }, { "key": "Хлябово", "value": 20, "slug": "hlyabovo" }, { "key": "ХОНКОНГ,", "value": 6, "slug": "honkong" }, { "key": "Хотанца", "value": 24, "slug": "hotanca" }, { "key": "Хотница", "value": 19, "slug": "hotnica" }, { "key": "Хотово", "value": 1, "slug": "hotovo" }, { "key": "Храбрино", "value": 46, "slug": "hrabrino" }, { "key": "Храброво", "value": 27, "slug": "hrabrovo" }, { "key": "Храбърско", "value": 30, "slug": "hrabrsko" }, { "key": "Християново", "value": 12, "slug": "hristiyanovo" }, { "key": "Христо Даново", "value": 28, "slug": "hristo-danovo" }, { "key": "Христовци", "value": 2, "slug": "hristovci" }, { "key": "Хрищени", "value": 94, "slug": "hrishcheni" }, { "key": "Хромица", "value": 1, "slug": "hromica" }, { "key": "Хубавене", "value": 3, "slug": "hubavene" }, { "key": "Хума", "value": 9, "slug": "huma" }, { "key": "Хухла", "value": 2, "slug": "huhla" }, { "key": "Хърлец", "value": 55, "slug": "hrlec" }, { "key": "Хърсово", "value": 32, "slug": "hrsovo" }, { "key": "Цалапица", "value": 219, "slug": "calapica" }, { "key": "Цани Гинчево", "value": 5, "slug": "cani-ginchevo" }, { "key": "Цапарево", "value": 3, "slug": "caparevo" }, { "key": "Цар Асен", "value": 38, "slug": "car-asen" }, { "key": "Цар Калоян", "value": 121, "slug": "car-kaloyan" }, { "key": "Цар Самуил", "value": 14, "slug": "car-samuil" }, { "key": "Цар Симеоново", "value": 5, "slug": "car-simeonovo" }, { "key": "Цар Шишманово", "value": 9, "slug": "car-shishmanovo" }, { "key": "Цар-Петрово", "value": 9, "slug": "car-petrovo" }, { "key": "Царацово", "value": 191, "slug": "caracovo" }, { "key": "Царев брод", "value": 37, "slug": "carev-brod" }, { "key": "Царев дол", "value": 3, "slug": "carev-dol" }, { "key": "Царева ливада", "value": 42, "slug": "careva-livada" }, { "key": "Царева поляна", "value": 20, "slug": "careva-polyana" }, { "key": "Царевец", "value": 64, "slug": "carevec" }, { "key": "Царево", "value": 755, "slug": "carevo" }, { "key": "Царевци", "value": 22, "slug": "carevci" }, { "key": "Царимир", "value": 46, "slug": "carimir" }, { "key": "Царичино", "value": 25, "slug": "carichino" }, { "key": "Царски извор", "value": 15, "slug": "carski-izvor" }, { "key": "Цацаровци", "value": 5, "slug": "cacarovci" }, { "key": "Цветино", "value": 3, "slug": "cvetino" }, { "key": "Цветкова бара", "value": 1, "slug": "cvetkova-bara" }, { "key": "Целина", "value": 1, "slug": "celina" }, { "key": "Ценино", "value": 3, "slug": "cenino" }, { "key": "Ценово", "value": 65, "slug": "cenovo" }, { "key": "Церетелево", "value": 15, "slug": "ceretelevo" }, { "key": "Церковски", "value": 3, "slug": "cerkovski" }, { "key": "Церова кория", "value": 14, "slug": "cerova-koriya" }, { "key": "Церовец", "value": 1, "slug": "cerovec" }, { "key": "Церовище", "value": 8, "slug": "cerovishche" }, { "key": "Церово", "value": 105, "slug": "cerovo" }, { "key": "Цирка", "value": 4, "slug": "cirka" }, { "key": "Цонево", "value": 85, "slug": "conevo" }, { "key": "Црънча", "value": 57, "slug": "crncha" }, { "key": "Цървеняно", "value": 4, "slug": "crvenyano" }, { "key": "Цървище", "value": 2, "slug": "crvishche" }, { "key": "Църква", "value": 27, "slug": "crkva" }, { "key": "Църквица", "value": 16, "slug": "crkvica" }, { "key": "Църквище", "value": 10, "slug": "crkvishche" }, { "key": "Чавдар", "value": 64, "slug": "chavdar" }, { "key": "Чавдарци", "value": 2, "slug": "chavdarci" }, { "key": "Чайка", "value": 6, "slug": "chayka" }, { "key": "Чакаларово", "value": 39, "slug": "chakalarovo" }, { "key": "Чакали", "value": 3, "slug": "chakali" }, { "key": "Чала", "value": 4, "slug": "chala" }, { "key": "Чалъкови", "value": 23, "slug": "chalkovi" }, { "key": "Чамла", "value": 1, "slug": "chamla" }, { "key": "Чарган", "value": 47, "slug": "chargan" }, { "key": "Чарда", "value": 14, "slug": "charda" }, { "key": "Чарково", "value": 9, "slug": "charkovo" }, { "key": "Чеканци", "value": 1, "slug": "chekanci" }, { "key": "Чеканчево", "value": 11, "slug": "chekanchevo" }, { "key": "Челник", "value": 6, "slug": "chelnik" }, { "key": "Челопек", "value": 15, "slug": "chelopek" }, { "key": "Челопеч", "value": 107, "slug": "chelopech" }, { "key": "Челопечене", "value": 3, "slug": "chelopechene" }, { "key": "Челюстница", "value": 3, "slug": "chelyustnica" }, { "key": "Чемиш", "value": 5, "slug": "chemish" }, { "key": "Чепеларе", "value": 484, "slug": "chepelare" }, { "key": "Чепино", "value": 1, "slug": "chepino" }, { "key": "Чепинци", "value": 278, "slug": "chepinci" }, { "key": "Червен", "value": 58, "slug": "cherven" }, { "key": "Червен брег", "value": 40, "slug": "cherven-breg" }, { "key": "Червен бряг", "value": 791, "slug": "cherven-bryag" }, { "key": "Червена", "value": 8, "slug": "chervena" }, { "key": "Червена вода", "value": 78, "slug": "chervena-voda" }, { "key": "Червена могила", "value": 7, "slug": "chervena-mogila" }, { "key": "Червенаково", "value": 10, "slug": "chervenakovo" }, { "key": "Червенци", "value": 25, "slug": "chervenci" }, { "key": "Черганово", "value": 43, "slug": "cherganovo" }, { "key": "Черенча", "value": 8, "slug": "cherencha" }, { "key": "Черепово", "value": 6, "slug": "cherepovo" }, { "key": "Череша", "value": 16, "slug": "cheresha" }, { "key": "Черешица", "value": 3, "slug": "chereshica" }, { "key": "Черешово", "value": 13, "slug": "chereshovo" }, { "key": "Черкаски", "value": 2, "slug": "cherkaski" }, { "key": "Черковица", "value": 11, "slug": "cherkovica" }, { "key": "Черковна", "value": 45, "slug": "cherkovna" }, { "key": "Черково", "value": 9, "slug": "cherkovo" }, { "key": "Черна", "value": 24, "slug": "cherna" }, { "key": "Черна гора", "value": 23, "slug": "cherna-gora" }, { "key": "Черна Места", "value": 7, "slug": "cherna-mesta" }, { "key": "Черна могила", "value": 12, "slug": "cherna-mogila" }, { "key": "Черна нива", "value": 2, "slug": "cherna-niva" }, { "key": "Черна скала", "value": 1, "slug": "cherna-skala" }, { "key": "Чернево", "value": 71, "slug": "chernevo" }, { "key": "Черневци", "value": 3, "slug": "chernevci" }, { "key": "Черни бряг", "value": 4, "slug": "cherni-bryag" }, { "key": "Черни Вит", "value": 23, "slug": "cherni-vit" }, { "key": "Черни връх", "value": 52, "slug": "cherni-vrh" }, { "key": "Черни Осъм", "value": 83, "slug": "cherni-osm" }, { "key": "Черник", "value": 89, "slug": "chernik" }, { "key": "Черница", "value": 9, "slug": "chernica" }, { "key": "Черниче", "value": 53, "slug": "cherniche" }, { "key": "Черничево", "value": 31, "slug": "chernichevo" }, { "key": "Черничино", "value": 2, "slug": "chernichino" }, { "key": "Черно море", "value": 86, "slug": "cherno-more" }, { "key": "Черно поле", "value": 4, "slug": "cherno-pole" }, { "key": "Черновръх", "value": 6, "slug": "chernovrh" }, { "key": "Черноглавци", "value": 15, "slug": "chernoglavci" }, { "key": "Черногор", "value": 7, "slug": "chernogor" }, { "key": "Черногорово", "value": 78, "slug": "chernogorovo" }, { "key": "Черноград", "value": 16, "slug": "chernograd" }, { "key": "Чернодъб", "value": 9, "slug": "chernodb" }, { "key": "Чернозем", "value": 4, "slug": "chernozem" }, { "key": "Черноземен", "value": 28, "slug": "chernozemen" }, { "key": "Чернокапци", "value": 7, "slug": "chernokapci" }, { "key": "Чернолик", "value": 30, "slug": "chernolik" }, { "key": "Черноморец", "value": 340, "slug": "chernomorec" }, { "key": "Черноморци", "value": 1, "slug": "chernomorci" }, { "key": "Черноок", "value": 7, "slug": "chernook" }, { "key": "Чернооки", "value": 1, "slug": "chernooki" }, { "key": "Чернооково", "value": 23, "slug": "chernookovo" }, { "key": "Черноочене", "value": 35, "slug": "chernoochene" }, { "key": "Черньово", "value": 20, "slug": "chernovo" }, { "key": "Честименско", "value": 2, "slug": "chestimensko" }, { "key": "Четирци", "value": 8, "slug": "chetirci" }, { "key": "Чехларе", "value": 2, "slug": "chehlare" }, { "key": "Чешма", "value": 1, "slug": "cheshma" }, { "key": "Чешнегирово", "value": 95, "slug": "cheshnegirovo" }, { "key": "Чибаовци", "value": 6, "slug": "chibaovci" }, { "key": "Чилик", "value": 6, "slug": "chilik" }, { "key": "Чилнов", "value": 15, "slug": "chilnov" }, { "key": "Чинтулово", "value": 28, "slug": "chintulovo" }, { "key": "Чипровци", "value": 94, "slug": "chiprovci" }, { "key": "Чирен", "value": 24, "slug": "chiren" }, { "key": "Чирпан", "value": 824, "slug": "chirpan" }, { "key": "Читаковци", "value": 1, "slug": "chitakovci" }, { "key": "Чифлик", "value": 54, "slug": "chiflik" }, { "key": "Чичево", "value": 2, "slug": "chichevo" }, { "key": "Чоба", "value": 34, "slug": "choba" }, { "key": "Чобанка", "value": 5, "slug": "chobanka" }, { "key": "Чокманово", "value": 6, "slug": "chokmanovo" }, { "key": "Чокоба", "value": 12, "slug": "chokoba" }, { "key": "Чолакова", "value": 3, "slug": "cholakova" }, { "key": "Чомаковци", "value": 28, "slug": "chomakovci" }, { "key": "Чорбаджийско", "value": 73, "slug": "chorbadzhiysko" }, { "key": "Чорул", "value": 4, "slug": "chorul" }, { "key": "Чубра", "value": 30, "slug": "chubra" }, { "key": "Чубрика", "value": 5, "slug": "chubrika" }, { "key": "Чудомир", "value": 7, "slug": "chudomir" }, { "key": "Чуйпетлово", "value": 3, "slug": "chuypetlovo" }, { "key": "Чукарка", "value": 10, "slug": "chukarka" }, { "key": "Чуковезер", "value": 1, "slug": "chukovezer" }, { "key": "Чуковец", "value": 9, "slug": "chukovec" }, { "key": "Чуково", "value": 6, "slug": "chukovo" }, { "key": "Чупрене", "value": 16, "slug": "chuprene" }, { "key": "Чурек", "value": 14, "slug": "churek" }, { "key": "Чурен", "value": 1, "slug": "churen" }, { "key": "Чуричени", "value": 2, "slug": "churicheni" }, { "key": "Чурка", "value": 1, "slug": "churka" }, { "key": "Чуруково", "value": 1, "slug": "churukovo" }, { "key": "Чучулигово", "value": 11, "slug": "chuchuligovo" }, { "key": "Шабла", "value": 259, "slug": "shabla" }, { "key": "Шаново", "value": 12, "slug": "shanovo" }, { "key": "Шарани", "value": 4, "slug": "sharani" }, { "key": "Шаренска", "value": 5, "slug": "sharenska" }, { "key": "Шарково", "value": 2, "slug": "sharkovo" }, { "key": "Шатрово", "value": 1, "slug": "shatrovo" }, { "key": "Шейново", "value": 62, "slug": "sheynovo" }, { "key": "Шемшево", "value": 27, "slug": "shemshevo" }, { "key": "Шереметя", "value": 10, "slug": "sheremetya" }, { "key": "Шиварово", "value": 10, "slug": "shivarovo" }, { "key": "Шивачево", "value": 113, "slug": "shivachevo" }, { "key": "Шилковци", "value": 1, "slug": "shilkovci" }, { "key": "Шипка", "value": 115, "slug": "shipka" }, { "key": "Шипково", "value": 43, "slug": "shipkovo" }, { "key": "Шипочане", "value": 4, "slug": "shipochane" }, { "key": "Шипочано", "value": 2, "slug": "shipochano" }, { "key": "Широка лъка", "value": 24, "slug": "shiroka-lka" }, { "key": "Широка поляна", "value": 10, "slug": "shiroka-polyana" }, { "key": "Широки дол", "value": 55, "slug": "shiroki-dol" }, { "key": "Широко поле", "value": 24, "slug": "shiroko-pole" }, { "key": "Широково", "value": 11, "slug": "shirokovo" }, { "key": "Шишенци", "value": 1, "slug": "shishenci" }, { "key": "Шишковица", "value": 1, "slug": "shishkovica" }, { "key": "Шишковци", "value": 16, "slug": "shishkovci" }, { "key": "Шишманово", "value": 7, "slug": "shishmanovo" }, { "key": "Шишманци", "value": 30, "slug": "shishmanci" }, { "key": "Шияково", "value": 7, "slug": "shiyakovo" }, { "key": "Шкорпиловци", "value": 53, "slug": "shkorpilovci" }, { "key": "Шодековци", "value": 1, "slug": "shodekovci" }, { "key": "Шопци", "value": 5, "slug": "shopci" }, { "key": "Шума", "value": 12, "slug": "shuma" }, { "key": "Шумата", "value": 19, "slug": "shumata" }, { "key": "Шумен", "value": 7408, "slug": "shumen" }, { "key": "Шуменци", "value": 7, "slug": "shumenci" }, { "key": "Шумнатица", "value": 7, "slug": "shumnatica" }, { "key": "Щерна", "value": 2, "slug": "shcherna" }, { "key": "Щипско", "value": 7, "slug": "shchipsko" }, { "key": "Щит", "value": 4, "slug": "shchit" }, { "key": "Щръклево", "value": 107, "slug": "shchrklevo" }, { "key": "Щърково", "value": 10, "slug": "shchrkovo" }, { "key": "Ъглен", "value": 30, "slug": "glen" }, { "key": "Югово", "value": 2, "slug": "yugovo" }, { "key": "Юделник", "value": 27, "slug": "yudelnik" }, { "key": "Юлиево", "value": 28, "slug": "yulievo" }, { "key": "Юнак", "value": 16, "slug": "yunak" }, { "key": "Юнаците", "value": 58, "slug": "yunacite" }, { "key": "Юндола", "value": 21, "slug": "yundola" }, { "key": "Юнец", "value": 33, "slug": "yunec" }, { "key": "Юпер", "value": 11, "slug": "yuper" }, { "key": "Юруково", "value": 33, "slug": "yurukovo" }, { "key": "Ябланица", "value": 172, "slug": "yablanica" }, { "key": "Ябланово", "value": 139, "slug": "yablanovo" }, { "key": "Ябълковец", "value": 6, "slug": "yablkovec" }, { "key": "Ябълково", "value": 83, "slug": "yablkovo" }, { "key": "Ябълчево", "value": 36, "slug": "yablchevo" }, { "key": "Ябълчени", "value": 2, "slug": "yablcheni" }, { "key": "Яворец", "value": 34, "slug": "yavorec" }, { "key": "Яворница", "value": 19, "slug": "yavornica" }, { "key": "Яворово", "value": 6, "slug": "yavorovo" }, { "key": "Яврово", "value": 11, "slug": "yavrovo" }, { "key": "Ягнило", "value": 11, "slug": "yagnilo" }, { "key": "Ягода", "value": 98, "slug": "yagoda" }, { "key": "Ягодина", "value": 36, "slug": "yagodina" }, { "key": "Ягодово", "value": 190, "slug": "yagodovo" }, { "key": "Яздач", "value": 3, "slug": "yazdach" }, { "key": "Яким Груево", "value": 8, "slug": "yakim-gruevo" }, { "key": "Якимово", "value": 56, "slug": "yakimovo" }, { "key": "Яковци", "value": 7, "slug": "yakovci" }, { "key": "Якоруда", "value": 324, "slug": "yakoruda" }, { "key": "Ялботина", "value": 2, "slug": "yalbotina" }, { "key": "Ялово", "value": 2, "slug": "yalovo" }, { "key": "Ямбол", "value": 6247, "slug": "yambol" }, { "key": "Ямино", "value": 8, "slug": "yamino" }, { "key": "Ямна", "value": 3, "slug": "yamna" }, { "key": "Яна", "value": 66, "slug": "yana" }, { "key": "Янино", "value": 3, "slug": "yanino" }, { "key": "Янково", "value": 18, "slug": "yankovo" }, { "key": "Янковци", "value": 6, "slug": "yankovci" }, { "key": "Яново", "value": 6, "slug": "yanovo" }, { "key": "Янтра", "value": 15, "slug": "yantra" }, { "key": "Яньовец", "value": 1, "slug": "yanovec" }, { "key": "Ярджиловци", "value": 29, "slug": "yardzhilovci" }, { "key": "Яребица", "value": 37, "slug": "yarebica" }, { "key": "Яребична", "value": 19, "slug": "yarebichna" }, { "key": "Ярлово", "value": 10, "slug": "yarlovo" }, { "key": "Ярловци", "value": 2, "slug": "yarlovci" }, { "key": "Ясен", "value": 101, "slug": "yasen" }, { "key": "Ясените", "value": 1, "slug": "yasenite" }, { "key": "Ясенково", "value": 57, "slug": "yasenkovo" }, { "key": "Ясеновец", "value": 97, "slug": "yasenovec" }, { "key": "Ясеново", "value": 26, "slug": "yasenovo" }, { "key": "Ясна поляна", "value": 35, "slug": "yasna-polyana" }, { "key": "Ясно поле", "value": 12, "slug": "yasno-pole" }, { "key": "Ястреб", "value": 11, "slug": "yastreb" }, { "key": "Ястребино", "value": 2, "slug": "yastrebino" }, { "key": "Ястребна", "value": 2, "slug": "yastrebna" }, { "key": "Ястребово", "value": 28, "slug": "yastrebovo" }, { "key": "Яхиново", "value": 111, "slug": "yahinovo" }];

const $$Astro$j = createAstro();
const $$$3 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$j, $$props, $$slots);
  Astro2.self = $$$3;
  const { business } = Astro2.params;
  console.log(business);
  const x = business ? business.split("/") : ["a"];
  let resp;
  let pagenum = 1;
  let items = 0;
  let slug = "";
  let cats;
  let firms;
  if (business?.includes("/")) {
    pagenum = x[1] ? Number(x[1].replace(/\//g, "")) : 1;
    slug = x[0];
    const skip = pagenum * 100 - 100;
    const key = businesses.find((xx) => xx.slug === x[0])?.key || "\u0421\u043E\u0444\u0438\u044F";
    const datax = db.view("company/companiesbg", {
      reduce: false,
      key,
      limit: 100,
      skip,
      update: "lazy"
    });
    const itemsx = db.view("company/companiesbg", {
      reduce: true,
      key,
      limit: 1,
      group: false,
      update: "lazy"
    });
    resp = await Promise.all([datax, itemsx]).then((values) => {
      return {
        firms: values[0].rows,
        items: values[1].value
      };
    });
    items = resp.items;
    firms = resp.firms;
  } else {
    cats = businesses.filter((i) => i.value > 1200).sort((a, z) => z.value - a.value);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": ` Twitter ecosphere ${pagenum}`, "description": `Twitter ecosphere   ` }, { "default": ($$result2) => renderTemplate`${!business ? renderTemplate`${maybeRenderHead($$result2)}<div class="flex w-full flex-wrap gap-3">
				${cats?.map((city) => renderTemplate`${renderComponent($$result2, "CatButton", $$CatButton, { "title": city.key, "url": "/business/" + city.slug + "/1", "count": city.value })}`)}
			</div>` : renderTemplate`<div>
				<div class="my-5 flex w-full flex-wrap gap-2">
					${firms.map(({ value }) => renderTemplate`${renderComponent($$result2, "CatButton", $$CatButton, { "title": value, "url": "#" + value })}`)}
				</div>
				${renderComponent($$result2, "Pagination", $$Pagination, { "items": items, "currentPage": pagenum, "pageSize": 100, "prefix": "/business/" + slug + "/" })}
			</div>`}` })}`;
}, "/home/runner/work/monext/monext/apps/clown/src/pages/business/[...business].astro");

const $$file$d = "/home/runner/work/monext/monext/apps/clown/src/pages/business/[...business].astro";
const $$url$d = "/business/[...business]";

const _page1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$$3,
  file: $$file$d,
  url: $$url$d
}, Symbol.toStringTag, { value: 'Module' }));

const business = [
	{
		count: 252346,
		cat: "София"
	},
	{
		count: 62692,
		cat: "Варна"
	},
	{
		count: 56469,
		cat: "Пловдив"
	},
	{
		count: 36904,
		cat: "Бургас"
	},
	{
		count: 22544,
		cat: "Русе"
	},
	{
		count: 19454,
		cat: "Стара Загора"
	},
	{
		count: 12950,
		cat: "Благоевград"
	},
	{
		count: 12541,
		cat: "Плевен"
	},
	{
		count: 11950,
		cat: "Добрич"
	},
	{
		count: 10899,
		cat: "Хасково"
	},
	{
		count: 10632,
		cat: "Сливен"
	},
	{
		count: 10411,
		cat: "Велико Търново"
	},
	{
		count: 9531,
		cat: "Шумен"
	},
	{
		count: 9201,
		cat: "Петрич"
	},
	{
		count: 8934,
		cat: "Пазарджик"
	},
	{
		count: 8658,
		cat: "Перник"
	},
	{
		count: 8237,
		cat: "Ямбол"
	},
	{
		count: 8193,
		cat: "Габрово"
	},
	{
		count: 7295,
		cat: "Враца"
	},
	{
		count: 6246,
		cat: "Кюстендил"
	},
	{
		count: 6194,
		cat: "Асеновград"
	},
	{
		count: 5700,
		cat: "Кърджали"
	},
	{
		count: 5599,
		cat: "Казанлък"
	},
	{
		count: 5548,
		cat: "Сандански"
	},
	{
		count: 5525,
		cat: "Несебър"
	},
	{
		count: 4927,
		cat: "Монтана"
	},
	{
		count: 4911,
		cat: "Видин"
	},
	{
		count: 4761,
		cat: "Димитровград"
	},
	{
		count: 4625,
		cat: "Търговище"
	},
	{
		count: 4405,
		cat: "Смолян"
	},
	{
		count: 4319,
		cat: "Силистра"
	},
	{
		count: 4207,
		cat: "Разград"
	},
	{
		count: 3961,
		cat: "Ловеч"
	},
	{
		count: 3680,
		cat: "Самоков"
	},
	{
		count: 3635,
		cat: "Дупница"
	},
	{
		count: 3093,
		cat: "Гоце Делчев"
	},
	{
		count: 3088,
		cat: "Горна Оряховица"
	},
	{
		count: 3017,
		cat: "Поморие"
	},
	{
		count: 2609,
		cat: "Севлиево"
	},
	{
		count: 2461,
		cat: "Троян"
	},
	{
		count: 2426,
		cat: "Карлово"
	},
	{
		count: 2352,
		cat: "Велинград"
	},
	{
		count: 2324,
		cat: "Свиленград"
	},
	{
		count: 2203,
		cat: "Ботевград"
	},
	{
		count: 2071,
		cat: "Свищов"
	},
	{
		count: 2006,
		cat: "Айтос"
	},
	{
		count: 1892,
		cat: "Харманли"
	},
	{
		count: 1832,
		cat: "Нова Загора"
	},
	{
		count: 1810,
		cat: "Банско"
	},
	{
		count: 1659,
		cat: "Карнобат"
	}
];

const jokes = [
	{
		cat: "Разни",
		count: 51785
	},
	{
		cat: "Семейни",
		count: 8115
	},
	{
		cat: "Бисери",
		count: 7511
	},
	{
		cat: "Жени",
		count: 7400
	},
	{
		cat: "Мръсни",
		count: 3035
	},
	{
		cat: "Професионални",
		count: 2377
	},
	{
		cat: "Животни",
		count: 2319
	},
	{
		cat: "Блондинки",
		count: 2242
	},
	{
		cat: "Любими Герои",
		count: 2084
	},
	{
		cat: "Черен хумор",
		count: 1892
	},
	{
		cat: "Програмисти",
		count: 1861
	},
	{
		cat: "Политически",
		count: 1750
	},
	{
		cat: "Иванчо и Марийка",
		count: 1485
	},
	{
		cat: "Пиянски",
		count: 1410
	},
	{
		cat: "Лекари",
		count: 1074
	},
	{
		cat: "Полицаи",
		count: 934
	},
	{
		cat: "Други",
		count: 801
	},
	{
		cat: "Спортни",
		count: 768
	},
	{
		cat: "Проститутки",
		count: 762
	},
	{
		cat: "Студентски",
		count: 762
	},
	{
		cat: "Борци",
		count: 696
	},
	{
		cat: "Деца",
		count: 694
	},
	{
		cat: "Иванчо",
		count: 575
	},
	{
		cat: "Цигани",
		count: 529
	},
	{
		cat: "Младоженци",
		count: 481
	},
	{
		cat: "Фармацевти",
		count: 471
	},
	{
		cat: "Ученически",
		count: 468
	},
	{
		cat: "Монаси",
		count: 465
	},
	{
		cat: "Шофьори",
		count: 439
	},
	{
		cat: "Свалки",
		count: 434
	},
	{
		cat: "Тъщи",
		count: 431
	},
	{
		cat: "Глупави",
		count: 430
	},
	{
		cat: "Надписи",
		count: 421
	},
	{
		cat: "Радио Ереван",
		count: 401
	},
	{
		cat: "Доктори",
		count: 400
	},
	{
		cat: "Адвокати",
		count: 399
	},
	{
		cat: "Фейсбук",
		count: 397
	},
	{
		cat: "Евреи",
		count: 396
	},
	{
		cat: "Гинеколози",
		count: 387
	},
	{
		cat: "Съседи",
		count: 380
	},
	{
		cat: "Цигари",
		count: 378
	},
	{
		cat: "Америка",
		count: 364
	},
	{
		cat: "Мъже",
		count: 362
	},
	{
		cat: "Огледало",
		count: 361
	},
	{
		cat: "Щерки",
		count: 359
	},
	{
		cat: "Тоалетна",
		count: 355
	},
	{
		cat: "Умрели",
		count: 349
	},
	{
		cat: "Плажове",
		count: 342
	},
	{
		cat: "Родители",
		count: 341
	},
	{
		cat: "Професии",
		count: 341
	},
	{
		cat: "Младежи",
		count: 340
	},
	{
		cat: "Прасета",
		count: 340
	},
	{
		cat: "Принцове и принцеси",
		count: 335
	},
	{
		cat: "Вино",
		count: 331
	},
	{
		cat: "Подаръци",
		count: 329
	},
	{
		cat: "С*кс",
		count: 329
	},
	{
		cat: "Дядовци",
		count: 326
	},
	{
		cat: "Ракия",
		count: 322
	},
	{
		cat: "Рожденици",
		count: 319
	},
	{
		cat: "Тъпизми",
		count: 316
	},
	{
		cat: "Радио ереван",
		count: 316
	},
	{
		cat: "Катаджии",
		count: 314
	},
	{
		cat: "SMS",
		count: 314
	},
	{
		cat: "Военни",
		count: 313
	},
	{
		cat: "Кръчми",
		count: 311
	},
	{
		cat: "Дебели",
		count: 310
	},
	{
		cat: "Психиатрия",
		count: 306
	},
	{
		cat: "Празнични",
		count: 293
	},
	{
		cat: "Градове",
		count: 277
	},
	{
		cat: "Затворници",
		count: 276
	},
	{
		cat: "Влакове",
		count: 275
	},
	{
		cat: "Каква е разликата",
		count: 270
	},
	{
		cat: "Бебета",
		count: 268
	},
	{
		cat: "Филми",
		count: 267
	},
	{
		cat: "Лято",
		count: 266
	},
	{
		cat: "Сутиени",
		count: 265
	},
	{
		cat: "Гадории",
		count: 265
	},
	{
		cat: "Петък",
		count: 261
	},
	{
		cat: "Уиски",
		count: 261
	},
	{
		cat: "Секретарки",
		count: 257
	},
	{
		cat: "Математика",
		count: 255
	},
	{
		cat: "Любовник",
		count: 255
	},
	{
		cat: "Марийка",
		count: 254
	},
	{
		cat: "Купони",
		count: 250
	},
	{
		cat: "Плуване",
		count: 250
	},
	{
		cat: "Отслабване",
		count: 248
	},
	{
		cat: "Обувки",
		count: 244
	},
	{
		cat: "Командировки",
		count: 244
	},
	{
		cat: "Крави",
		count: 244
	},
	{
		cat: "Овчари",
		count: 243
	},
	{
		cat: "Наркомански",
		count: 240
	},
	{
		cat: "Директори",
		count: 240
	},
	{
		cat: "Професори",
		count: 239
	},
	{
		cat: "Кокошки",
		count: 234
	},
	{
		cat: "Слонове",
		count: 234
	},
	{
		cat: "Хляб",
		count: 233
	},
	{
		cat: "Чък Норис",
		count: 229
	},
	{
		cat: "Шоколад",
		count: 228
	},
	{
		cat: "Зима",
		count: 226
	},
	{
		cat: "Маймуни",
		count: 226
	},
	{
		cat: "Китай",
		count: 223
	},
	{
		cat: "Грозни",
		count: 219
	},
	{
		cat: "Любовница",
		count: 218
	},
	{
		cat: "Храна",
		count: 215
	},
	{
		cat: "Усмивки",
		count: 211
	},
	{
		cat: "Такси",
		count: 210
	},
	{
		cat: "Перничани",
		count: 209
	},
	{
		cat: "Русия",
		count: 205
	},
	{
		cat: "Татковци",
		count: 202
	},
	{
		cat: "Водка",
		count: 201
	},
	{
		cat: "Нова година",
		count: 200
	},
	{
		cat: "Капитани",
		count: 199
	},
	{
		cat: "Котки",
		count: 197
	},
	{
		cat: "Съдии",
		count: 197
	},
	{
		cat: "Маса",
		count: 197
	},
	{
		cat: "Готвачи",
		count: 195
	},
	{
		cat: "Планина",
		count: 195
	},
	{
		cat: "София",
		count: 194
	},
	{
		cat: "Супи",
		count: 188
	},
	{
		cat: "Чукчи",
		count: 184
	},
	{
		cat: "Франция",
		count: 181
	},
	{
		cat: "Луди",
		count: 181
	},
	{
		cat: "Хотели",
		count: 179
	},
	{
		cat: "България",
		count: 177
	},
	{
		cat: "Мутри",
		count: 177
	}
];

function slugify(string) {
  let slug = string.replace(/\s+/g, "-");
  slug = slug.toLowerCase();
  const CYRILLIC_TO_LATIN_MAP = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "e",
    ж: "zh",
    з: "z",
    и: "i",
    й: "i",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "kh",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "sht",
    ъ: "",
    ы: "y",
    ь: "",
    э: "e",
    ю: "iu",
    я: "ia"
  };
  slug = Array.from(slug).map((ch) => CYRILLIC_TO_LATIN_MAP[ch.toLowerCase()] || ch).join("");
  slug = slug.replace(/[^a-z0-9-]+/g, "-").replace(/[-]+/g, "-");
  return slug || "404";
}
jokes.map((item) => {
  return {
    ...item,
    slug: slugify(item.cat)
  };
});
business.map((item) => {
  return {
    ...item,
    slug: slugify(item.cat)
  };
});
const formattedjoke = (joke) => {
  const formatted = joke.replace(/([.!?])[:]/g, "$1\n\n").replace(/—/g, "\n-").replace(/— ([А-Я])/g, "\n- $1").replace(/-([А-Я])/g, "\n- $1").replace(/[ ]+- ([А-Я])/g, "\n- $1").replace(/\?/g, "?\n").replace(/\n+/g, "\n").split("\n").filter((x) => x.length > 2).map((x) => x.trim()).join("\n");
  return formatted;
};

const $$Astro$i = createAstro();
const $$Vicove = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$i, $$props, $$slots);
  Astro2.self = $$Vicove;
  const catsy = await db.view("joke/cat", {
    reduce: true,
    update: "lazy",
    group: true
  });
  const newsx = await db.view("newsbg/news", {
    limit: 30,
    update: "lazy",
    descending: true
  });
  const resp = await Promise.all([catsy, newsx]).then((results) => ({
    catsx: results[0],
    news: results[1].rows,
    //memes: results[2].items,
    memes: []
  }));
  const { catsx, memes } = resp;
  const cats = catsx.rows.filter((x) => x.value > 1).map((x) => ({
    cat: x.key.replace("JOK", ""),
    slug: slugify(x.key.replace("JOK", "")),
    count: x.value
  })).sort((a, b) => b.count - a.count);
  Astro2.response.headers.set("Cache-Control", "max-age=31536000");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "\u0412\u0438\u0446\u043E\u0432\u0435 \u0438 \u0437\u0430\u0431\u0430\u0432\u043D\u0438 \u043A\u043E\u0442\u043A\u0438 \u0438 \u043C\u0435\u043C\u0435\u0442\u0430", "description": "\u0412\u0438\u0446\u043E\u0432\u0435 \u0438 \u0437\u0430\u0431\u0430\u0432\u043D\u0438 \u043A\u043E\u0442\u043A\u0438 \u0438 \u043C\u0435\u043C\u0435\u0442\u0430" }, { "default": ($$result2) => renderTemplate`
    ${renderComponent($$result2, "RudSense", $$RudSense, {})}
    ${maybeRenderHead($$result2)}<h1 class="text-5xl text-gradient">Вицове</h1>
    <div class="my-3 flex w-full flex-wrap gap-3">
        ${cats.map(
    ({
      cat,
      slug,
      count
    }) => renderTemplate`${renderComponent($$result2, "CatButton", $$CatButton, { "title": cat, "url": "/cat/" + slug, "count": count })}`
  )}
    </div>
    <div class="flex flex-wrap justify-end my-2">
        <a class="btn dark:btn-ghost border-2" href="/news">Всички</a>
    </div>
    ${renderComponent($$result2, "RudSense", $$RudSense, {})}
    <h1 class="text-5xl text-gradient">Забавно в картинки</h1>
    <div class="snap-x flex overflow-auto py-2 snap-proximity programmindex">
        ${memes.slice(0, 10).map(({ thumb }) => renderTemplate`<label class="hover:animate-pulse snap-center" for="my-modal">
                    <div class="rounded-lg bg-gradient-to-r from-purple-900 to-pink-600 p-1 dark:from-white dark:to-slate-400 m-1 cursor-pointer flex">
                        <img width="128" height="128" class="rounded-lg i-amphtml-element i-amphtml-layout-fixed i-amphtml-layout-size-defined i-amphtml-built i-amphtml-layout" alt="pr0gramm"${addAttribute(`https://thumb.pr0gramm.com/${thumb}`, "src")} i-amphtml-layout="fixed" style="width: 128px; height: 128px; --loader-delay-offset:1ms !important;">
                    </div>
                </label>`)}
    </div>
    <div class="flex flex-wrap justify-end my-2">
        <a class="btn dark:btn-ghost border-2" href="/news">Всички</a>
    </div>
` })}`;
}, "/home/runner/work/monext/monext/apps/clown/src/pages/vicove.astro");

const $$file$c = "/home/runner/work/monext/monext/apps/clown/src/pages/vicove.astro";
const $$url$c = "/vicove";

const _page2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Vicove,
  file: $$file$c,
  url: $$url$c
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$h = createAstro();
const $$Memes = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$h, $$props, $$slots);
  Astro2.self = $$Memes;
  const items = await fetch(
    "https://img_proxy.kloun.workers.dev/"
  ).then((res) => res.json());
  Astro2.response.headers.set("Cache-Control", "max-age=7200");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "memes" }, { "default": ($$result2) => renderTemplate`
	${maybeRenderHead($$result2)}<div class="container flex flex-wrap items-center justify-center sm:mx-auto">
	${items.items.map(
    ({
      thumb
    }) => renderTemplate`<label class="hover:animate-pulse snap-center">
	<div class="rounded-lg bg-gradient-to-r from-purple-900 to-pink-600 p-1 dark:from-white dark:to-slate-400 m-1 cursor-pointer flex">
		<img loading="lazy" width="128" height="128" class="rounded-lg" alt="pr0gramm"${addAttribute(`https://thumb.pr0gramm.com/${thumb}`, "src")}>
	</div>
</label>`
  )}
		</div>
` })}`;
}, "/home/runner/work/monext/monext/apps/clown/src/pages/memes.astro");

const $$file$b = "/home/runner/work/monext/monext/apps/clown/src/pages/memes.astro";
const $$url$b = "/memes";

const _page3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Memes,
  file: $$file$b,
  url: $$url$b
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$g = createAstro();
const $$Contact = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$g, $$props, $$slots);
  Astro2.self = $$Contact;
  Astro2.response.headers.set("Cache-Control", "max-age=31536000");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "", "description": "" }, { "default": ($$result2) => renderTemplate`
${maybeRenderHead($$result2)}<div>
	<h1 class="text-center text-3xl font-thin">Contact</h1>
	<div class="mt-10 flex flex-row items-center justify-center">
		<div class="mb-8 w-full px-3 lg:mb-0 lg:w-1/5">
			<p class="mb-2 font-bold lg:mb-4 lg:text-lg">Office</p>
			<p class="lg:text-lg">14 Parijka Komuna, Varna, Bulgaria</p>
		</div>
		<div class="mb-8 w-full px-3 lg:mb-0 lg:w-1/5">
			<p class="mb-2 font-bold lg:mb-4 lg:text-lg">Contacts</p>
			<p class="lg:text-lg">(+359) 876 358 115 info@rudixops.com</p>
		</div>
	</div>
</div>
` })}`;
}, "/home/runner/work/monext/monext/apps/clown/src/pages/other/contact.astro");

const $$file$a = "/home/runner/work/monext/monext/apps/clown/src/pages/other/contact.astro";
const $$url$a = "/other/contact";

const _page4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file$a,
  url: $$url$a
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$f = createAstro();
const $$Privacy = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$Privacy;
  Astro2.response.headers.set("Cache-Control", "max-age=31536000");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "", "description": "" }, { "default": ($$result2) => renderTemplate`
${maybeRenderHead($$result2)}<p>
	На ezikTok.com се отнасяме с чувство на отговорност към личните ви данни.
	Ние не публикуваме, не продаваме и не споделяме личните ви данни с трети
	страни без вашето изрично съгласие. Само администраторите на сайта имат
	достъп до личните ви данни, които се използват само за улесняване на
	използването на сайта. Ако имате допълнителни въпроси за поверителността на
	личните ви данни, моля свържете се с нас.
</p>
` })}`;
}, "/home/runner/work/monext/monext/apps/clown/src/pages/other/privacy.astro");

const $$file$9 = "/home/runner/work/monext/monext/apps/clown/src/pages/other/privacy.astro";
const $$url$9 = "/other/privacy";

const _page5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Privacy,
  file: $$file$9,
  url: $$url$9
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$e = createAstro();
const $$About = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$About;
  Astro2.response.headers.set("Cache-Control", "max-age=31536000");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "", "description": "" }, { "default": ($$result2) => renderTemplate`
	${maybeRenderHead($$result2)}<div class="mainx justify-start">
		<p>
			kloun.lol e сайт за безплатни обяви в категории: Недвижими имоти,
			Автомобили и авточасти, Eлектроника, Мода, За бебето и детето, Дом и
			градина, Свободно време, Домашни любимци, Услуги, Работа, Екскурзии
			и почивки. В езикТок можете да намерите интересни обяви за продажба
			на почти всичко, което търсите. Свържете се лесно и бързо с
			продавача и намерете атрактивни предложения на по-ниски цени
			отколкото в магазина. Ако искате да продадете нещо, добавете бързо,
			лесно и безплатно обява в езикТок. Купувайте и продавайте с езикТок!
		</p>
		${( new Date()).toISOString()}
	</div>
` })}`;
}, "/home/runner/work/monext/monext/apps/clown/src/pages/other/about.astro");

const $$file$8 = "/home/runner/work/monext/monext/apps/clown/src/pages/other/about.astro";
const $$url$8 = "/other/about";

const _page6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file$8,
  url: $$url$8
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$d = createAstro();
const $$Terms = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$Terms;
  Astro2.response.headers.set("Cache-Control", "max-age=31536000");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "tos", "description": "tos" }, { "default": ($$result2) => renderTemplate`
 ${maybeRenderHead($$result2)}<p class="mt-10">
  „Като влезете в нашето приложение, като използвате своя акаунт в
  Google или Facebook (наричан тук „Доставчик за единично влизане“), вие
  се съгласявате, че можем да използваме потребителското име, свързано с
  вашия имейл доставчик, като ваше потребителско име в нашето
  приложение. Това потребителско име ще се показва публично на други
  потребители и ще се използва, за да ви идентифицира и да проследява
  дейността ви в нашето приложение. Можете да промените потребителското
  си име по всяко време, като влезете в секцията „Профил“ на нашето
  приложение.
  <br>
  Като влезете в нашето приложение с помощта на вашия доставчик на
  единично влизане, вие също се съгласявате да получавате имейли от нас
  относно вашата дейност и маркетингова информация. Можете да се
  откажете от получаването на тези имейли по всяко време, като влезете в
  секцията „Профил“ на нашето приложение и актуализирате вашите
  предпочитания за имейл.
</p>
` })}`;
}, "/home/runner/work/monext/monext/apps/clown/src/pages/other/terms.astro");

const $$file$7 = "/home/runner/work/monext/monext/apps/clown/src/pages/other/terms.astro";
const $$url$7 = "/other/terms";

const _page7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Terms,
  file: $$file$7,
  url: $$url$7
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$c = createAstro();
const $$FacebookShare = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$FacebookShare;
  const { url } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<button${addAttribute(`fbshare('${url}')`, "onclick")} class="text-white transition duration-300 max-w-xs w-full rounded-3xl uppercase flex text-sm font-bold p-3 relative undefined false undefined" style="background-color:#1877F3">
    <div class="absolute h-full left-3 top-0 flex justify-center items-center">
        <svg class="h-6 w-6 fill-white drop-shadow-md" role="img" xmlns="http://w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z">
            </path>
        </svg>
    </div>
    <div class="w-full ml-6 flex justify-center items-center pt-0.5 drop-shadow-md">
        Сподели във Facebook
    </div>
</button>`;
}, "/home/runner/work/monext/monext/apps/clown/src/components/FacebookShare.astro");

const $$Astro$b = createAstro();
const remappedJokeFunction = (joke) => {
  let i1 = 0;
  return formattedjoke(joke).split("\n").map((line, i) => {
    const num = line.startsWith("-") || line.startsWith(" -") || line.startsWith("\u2013") || line.startsWith("  -") ? (i1 += 1) % 2 === 0 ? "even" : "odd" : false;
    return {
      key: i,
      line: num === "odd" || num === "even" ? line.replace("-", "").replace("\u2013", "") : line,
      ...num && { oddness: num }
    };
  });
};
const $$FormatJoke = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$FormatJoke;
  const { joke } = Astro2.props;
  const remapped = remappedJokeFunction(joke);
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${remapped.map(
    ({
      oddness,
      line,
      key
    }) => oddness ? renderTemplate`${maybeRenderHead($$result2)}<div${addAttribute(`flex flex-wrap pb-4 ${oddness === "even" ? "flex-row-reverse" : ""}`, "class")}>
                        <div${addAttribute(`relative whitespace-pre-wrap rounded-lg p-2 font-sans font-medium shadow-2xl ${oddness === "even" ? "bg-violet-900 text-right dark:bg-slate-200" : "bg-indigo-700 text-left dark:bg-slate-400"}`, "class")}>
                            ${oddness === "odd" ? renderTemplate`<div class="absolute -left-4 top-3 inline-block w-4 overflow-hidden">
                                    <div class="h-16  origin-top-right -rotate-45 bg-indigo-700 dark:bg-slate-400"></div>
                                </div>` : renderTemplate`<div class="absolute -right-4 top-3 inline-block w-4 overflow-hidden">
                                    <div class=" h-16  origin-top-left rotate-45 bg-violet-900 dark:bg-slate-200"></div>
                                </div>`}
                            ${line} ${key === 3 && renderTemplate`${renderComponent($$result2, "RudSense", $$RudSense, {})}`}
                        </div>
                    </div>` : renderTemplate`<div class="block pb-4 text-lg">${line}</div>`
  )}` })}`;
}, "/home/runner/work/monext/monext/apps/clown/src/components/FormatJoke.astro");

const $$Astro$a = createAstro();
const $$FormatJokeShort = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$FormatJokeShort;
  const { joke } = Astro2.props;
  const substr = joke.slice(0, 150);
  const jlen = joke.length <= 150;
  const lines = formattedjoke(jlen ? joke.replace(/\.../g, "") : `${substr} ...`).split("\n").slice(0, 3);
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${lines.map((line) => renderTemplate`${maybeRenderHead($$result2)}<p>
				${line.endsWith("...") ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${line.replace(/\.../g, "")}${" "}<span class="absolute h-6   w-8 text-4xl">
							<span class="absolute ml-1 leading-4 text-purple-600">
								...
							</span>
						</span>
					` })}` : renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${line}` })}`}
			</p>`)}` })}`;
}, "/home/runner/work/monext/monext/apps/clown/src/components/FormatJokeShort.astro");

const $$Astro$9 = createAstro();
const $$Modal = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$Modal;
  const { id, open } = Astro2.props;
  return renderTemplate`
${renderSlot($$result, $$slots["button"])}

${maybeRenderHead($$result)}<dialog${addAttribute(id, "id")} class="astro-QMZM2SOJ">
    ${renderSlot($$result, $$slots["main"])}

    ${renderSlot($$result, $$slots["close"])}
</dialog>`;
}, "/home/runner/work/monext/monext/apps/clown/src/components/Modal.astro");

const $$Astro$8 = createAstro();
const $$JokeThumbnail = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$JokeThumbnail;
  const { item, showcats, short, hideReadMore } = Astro2.props;
  const { joke, cat, id } = item;
  const jlen = joke.length <= 150;
  return renderTemplate`${maybeRenderHead($$result)}<article class="joke relative">
    ${showcats && item.cat !== "\u0420\u0430\u0437\u043D\u0438" && renderTemplate`<a class="joketop text-shadow"${addAttribute(`/cat/${cat.replace(/ /g, "%20")}`, "href")}>
                <h2>${cat.replace("JOK", "")}</h2>
            </a>`}

    <div class="jokewrap">
        <div class="py-5 font-black text-md">
            ${short ? renderTemplate`${renderComponent($$result, "FormatJokeShort", $$FormatJokeShort, { "joke": joke })}` : renderTemplate`${renderComponent($$result, "FormatJoke", $$FormatJoke, { "joke": joke })}`}
        </div>
    </div>
    ${!hideReadMore && (!jlen ? renderTemplate`${renderComponent($$result, "Modal", $$Modal, { "id": id }, { "button": ($$result2) => renderTemplate`<a${addAttribute(`(function(e){e.preventDefault(); document.getElementById("${id}").showModal()})(event)`, "onclick")}${addAttribute("/joke/" + id, "href")} class="btn absolute right-2 -mt-12 flex cursor-pointer border-gray-800 bg-black shadow-lg dark:border-gray-500 dark:bg-white rounded-l-none rounded-t-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${addAttribute(1.5, "stroke-width")} stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"></path>
                        </svg>
                    </a>` })}` : renderTemplate`<div class="absolute right-2 -mt-12">
                    <button${addAttribute(`fbshare('https://kloun.lol/joke/${id}')`, "onclick")} class="text-white  transition duration-300 max-w-xs w-full rounded-3xl uppercase flex text-sm font-bold p-3  relative   rounded-l-none rounded-t-none bg-transparent false undefined" style="background-color: transparent;">
                        <svg class="h-6 w-6 fill-white dark:fill-blue-600 " role="img" xmlns="http://w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                        </svg>
                    </button>
                </div>`)}
</article>`;
}, "/home/runner/work/monext/monext/apps/clown/src/components/JokeThumbnail.astro");

const $$Astro$7 = createAstro();
const $$jokeid = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$jokeid;
  const { jokeid } = Astro2.params;
  const rid = Math.floor(Math.random() * 1938).toString();
  const jokex = db.get(jokeid);
  const itemsx = db.view("joke/random", {
    key: rid,
    update: "lazy"
  });
  const resp = await Promise.all([jokex, itemsx]).then((values) => {
    return {
      joke: values[0],
      chunks: chunk(values[1].rows, 3)
    };
  });
  const { joke, chunks } = resp;
  if (joke.error) {
    return new Response("Not Found", {
      status: 404,
      statusText: "Not Found"
    });
  }
  Astro2.response.headers.set("Cache-Control", "max-age=31536000");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": joke.title || "", "description": joke.title, "image": `https://kloun.lol/api/joke/og/?idx=${jokeid}` }, { "default": ($$result2) => renderTemplate`
    ${maybeRenderHead($$result2)}<div class="my-10 flex w-full flex-col text-center">
        <article class="mx-auto mb-6 px-10 text-xl leading-relaxed xs:px-2 sm:px-4 lg:w-2/3">
            ${renderComponent($$result2, "FormatJoke", $$FormatJoke, { "joke": joke.title })}
        </article>
        <div class="flex justify-end items-center">
            ${renderComponent($$result2, "FacebookShare", $$FacebookShare, { "url": `https://kloun.lol/joke/${jokeid}` })}
        </div>
    </div>
    ${chunks.map((piece) => renderTemplate`<div class="flex flex-wrap">
                ${piece.map((joke2) => renderTemplate`${renderComponent($$result2, "JokeThumbnail", $$JokeThumbnail, { "item": joke2, "showcats": false, "short": true })}`)}
            </div>`)}` })}`;
}, "/home/runner/work/monext/monext/apps/clown/src/pages/joke/[jokeid].astro");

const $$file$6 = "/home/runner/work/monext/monext/apps/clown/src/pages/joke/[jokeid].astro";
const $$url$6 = "/joke/[jokeid]";

const _page8 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$jokeid,
  file: $$file$6,
  url: $$url$6
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$6 = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const data = await db.get(id);
  const { title, content, html } = data;
  const parsed = content ? JSON.parse(content).html.map((x) => ({
    type: "p",
    content: x
  })) : html;
  return renderTemplate`<head>
  <meta charset="UTF-8">
${renderHead($$result)}</head>
<div>
	<h1 class="font-bold sm:text-2xl md:text-4xl">${title}</h1>
    	<article class="leading-relaxed" id="article">
				${parsed.map(
    ({
      type,
      content: content2
    }) => type === "p" ? renderTemplate`<p>${content2}</p>` : renderTemplate`<img${addAttribute(content2, "src")}>`
  )}
			</article>
			<div id="emp">император</div>
</div>`;
}, "/home/runner/work/monext/monext/apps/clown/src/pages/news/tr/[id].astro");

const $$file$5 = "/home/runner/work/monext/monext/apps/clown/src/pages/news/tr/[id].astro";
const $$url$5 = "/news/tr/[id]";

const _page9 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file$5,
  url: $$url$5
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$5 = createAstro();
const $$newsid = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$newsid;
  function countAlphanumeric(str) {
    const regex = /[a-zA-Z0-9а-яА-Я]/g;
    const matches = str.match(regex);
    return matches ? matches.length : 0;
  }
  function getLastP(arr) {
    const emptylines = arr.filter((x) => countAlphanumeric(x.content) !== 0);
    const lastPElemIndex = emptylines.reduce((acc, curr, index) => {
      if (curr.type === "p") {
        acc = index;
      }
      return acc;
    }, 0);
    const filteredArr = arr.slice(0, lastPElemIndex + 1);
    const removeNoImages = filteredArr.filter(
      (x) => x.type === "p" || x.type === "img" && x.content.includes("http")
    );
    const arrx = uniqBy(removeNoImages, function(e) {
      return e.content;
    });
    return arrx;
  }
  const { newsid, slug } = Astro2.params;
  const keys = slug.split("-").filter((x) => x.length > 4);
  const datax = db.get(newsid);
  const newsx = db.view("newsbg/search", {
    update: "lazy",
    keys: JSON.stringify(shuffle(keys)),
    descending: true,
    include_docs: "true",
    limit: 30
  });
  const resp = await Promise.all([datax, newsx]).then((values) => {
    return {
      data: values[0],
      news: values[1].rows
    };
  });
  const { data, news } = resp;
  const { title, image, content, html, date, nid } = data;
  const parsed = content ? JSON.parse(content).html.map((x) => ({
    type: "p",
    content: x
  })) : html;
  function formatDate(date2) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false
    };
    return date2.toLocaleString("bg-BG", options);
  }
  function getRandomDate(year) {
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 31) + 1;
    const hour = Math.floor(Math.random() * 14) + 9;
    return new Date(year, month - 1, day, hour);
  }
  Astro2.response.headers.set("Cache-Control", "max-age=31536000");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": title, "image": image }, { "default": ($$result2) => renderTemplate`${formatDate(new Date(date ? date : getRandomDate(2021)))}${maybeRenderHead($$result2)}<h1 class="font-bold sm:text-2xl md:text-4xl">${title}</h1>
    <div class="flex justify-center items-center">
        <img${addAttribute("https://kloun.lol/api/img/" + nid + ".jpg", "src")} class="rounded-md" loading="lazy">
        
    </div>
    <div class="mb-6 items-center justify-center">
        ${renderComponent($$result2, "RudSense", $$RudSense, {})}
        <article class="leading-relaxed" id="article">
            ${getLastP(parsed).map(
    ({ type, content: content2 }) => type === "p" ? renderTemplate`<p class="text-md">${content2}</p>` : renderTemplate`<div class="flex justify-center items-center">
                                <img${addAttribute(content2, "src")} class="rounded-md" loading="lazy">
                            </div>`
  )}
        </article>
        <div class="clear-both"></div>
        ${renderComponent($$result2, "RudSense", $$RudSense, {})}
        
        <div class="clear-both"></div>
    </div>
    <div class="flex flex-wrap gap-3">
      ${shuffle(news).slice(0, 10).map(
    ({
      _id,
      title: title2,
      date: date2,
      nid: nid2,
      image: image2
    }) => renderTemplate`${renderComponent($$result2, "CardNews", $$CardNews, { "title": title2, "img": image2, "date": date2, "key": nid2, "id": _id })}`
  )}
    </div>
` })}`;
}, "/home/runner/work/monext/monext/apps/clown/src/pages/news/i/[slug]/[newsid].astro");

const $$file$4 = "/home/runner/work/monext/monext/apps/clown/src/pages/news/i/[slug]/[newsid].astro";
const $$url$4 = "/news/i/[slug]/[newsid]";

const _page10 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$newsid,
  file: $$file$4,
  url: $$url$4
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$4 = createAstro();
const $$$2 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$$2;
  const { newspage } = Astro2.params;
  const pagenum = newspage ? Number(newspage) : 1;
  const skip = pagenum * 30 - 30;
  const datax = db.view("newsbg/news", {
    reduce: false,
    limit: 30,
    skip,
    update: "lazy",
    descending: true
  });
  const itemsx = db.view("newsbg/agregate", {
    reduce: true,
    limit: 1,
    group: false,
    update: "lazy"
  });
  const resp = await Promise.all([datax, itemsx]).then((values) => {
    return {
      articles: values[0].rows,
      items: values[1].value
    };
  });
  Astro2.response.headers.set("Cache-Control", "max-age=7200");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `\u041D\u043E\u0432\u0438\u043D\u0438 \u043E\u0442 \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430 ${pagenum}`, "description": `\u041D\u043E\u0432\u0438\u043D\u0438  ` }, { "default": ($$result2) => renderTemplate`
    ${maybeRenderHead($$result2)}<div class="flex flex-wrap gap-3">
        ${resp.articles.map(
    ({
      id,
      title,
      date,
      key,
      image
    }) => renderTemplate`${renderComponent($$result2, "CardNews", $$CardNews, { "title": title, "img": image, "date": date, "key": key, "id": id })}`
  )}
    </div>
    ${renderComponent($$result2, "Pagination", $$Pagination, { "items": resp.items, "currentPage": pagenum, "pageSize": 30, "prefix": "/news/" })}
` })}`;
}, "/home/runner/work/monext/monext/apps/clown/src/pages/news/[...newspage].astro");

const $$file$3 = "/home/runner/work/monext/monext/apps/clown/src/pages/news/[...newspage].astro";
const $$url$3 = "/news/[...newspage]";

const _page11 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$$2,
  file: $$file$3,
  url: $$url$3
}, Symbol.toStringTag, { value: 'Module' }));

const get = async function get2({ params }) {
  const id = params.id || "";
  const datax = await db.view("newsbg/news", {
    limit: 1,
    key: id,
    update: false
  });
  const response = await fetch(datax.image);
  const buffer = await response.arrayBuffer();
  return new Response(buffer, {
    status: 200,
    headers: {
      "Content-Type": "image/jpeg"
    }
  });
};

const _page12 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  get
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$3 = createAstro();
const $$$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$$1;
  const { jokecat } = Astro2.params;
  const x = jokecat.split("/");
  const cat = jokecats.find((xx) => xx.slug === x[0])?.cat;
  const pagenum = x[1] ? Number(x[1]) : 1;
  const skip = pagenum * 30 - 30;
  const datax = db.view("joke/cat", {
    key: `JOK${cat}`,
    limit: 30,
    update: "lazy",
    reduce: "false",
    cache: skip > 1e3 ? "ok" : "nok",
    skip
  });
  const countx = db.view("joke/cat", {
    key: `JOK${cat}`,
    limit: 1,
    update: "lazy",
    cache: "ok",
    reduce: true
  });
  const resp = await Promise.all([datax, countx]).then((values) => {
    return {
      jokes: values[0].rows,
      items: values[1].value
    };
  });
  const { jokes, items } = resp;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `\u0412\u0438\u0446\u043E\u0432\u0435 \u043E\u0442 ${cat} \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430 ${pagenum}`, "description": `\u0412\u0438\u0446\u043E\u0432\u0435 \u043E\u0442 ${cat}  ` }, { "default": ($$result2) => renderTemplate`
	${maybeRenderHead($$result2)}<div class="text-sm font-bold">
		<ul class="flex gap-2 items-center">
			<li>
				<a${addAttribute("/vicove", "href")}>Вицове</a>${" "}
			</li>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${addAttribute(1.5, "stroke-width")} stroke="currentColor" class="w-5 h-5">
				<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path>
			</svg>
			<li>
				<a${addAttribute(`/cat/${x[0]}`, "href")}>${cat}</a>
			</li>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${addAttribute(1.5, "stroke-width")} stroke="currentColor" class="w-5 h-5">
				<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path>
			</svg>
			<li>
				<a${addAttribute(`/cat/${x[0]}/${pagenum}`, "href")}>${pagenum}</a>
			</li>
		</ul>
	</div>
	<div class="flex flex-wrap">
		<div class="joke">
			${renderComponent($$result2, "RudSense", $$RudSense, {})}
		</div>
		${jokes.map((item) => renderTemplate`${renderComponent($$result2, "JokeThumbnail", $$JokeThumbnail, { "item": item, "showcats": false, "short": true })}`)}
		<div class="joke">
			${renderComponent($$result2, "RudSense", $$RudSense, {})}
		</div>
	</div>
	${renderComponent($$result2, "Pagination", $$Pagination, { "items": items, "currentPage": pagenum, "pageSize": 30, "prefix": `/cat/${x[0]}/` })}
` })}`;
}, "/home/runner/work/monext/monext/apps/clown/src/pages/cat/[...jokecat].astro");

const $$file$2 = "/home/runner/work/monext/monext/apps/clown/src/pages/cat/[...jokecat].astro";
const $$url$2 = "/cat/[...jokecat]";

const _page13 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$$1,
  file: $$file$2,
  url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$2 = createAstro();
function removewords(str) {
  const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gi;
  const userRegex = /@[a-zA-Z]*/g;
  const hashTags = /#[a-zA-Z]*/g;
  const expressions = /\b’[a-zA-Z]+\b/gi;
  const expressions2 = /\b'[a-zA-Z]+\b/gi;
  const stopWordRegex = new RegExp(`\\b(${eng.join("|")})\\b`, "gi");
  const processedSentence = str.replace(expressions, (match) => `--=${match}=--`).replace(expressions2, (match) => `--=${match}=--`).replace(stopWordRegex, (match) => `--=${match}=--`).replace(hashTags, (match) => `--=${match}=--`).replace(userRegex, (match) => `--=${match}=--`).replace(urlRegex, (match) => `--=${match}=--`);
  return processedSentence;
}
function templatizeline(str) {
  const filtered = removewords(str);
  const keywordRegex = /--=(.*?)=--/g;
  const substrings = filtered.split(keywordRegex);
  const keywordMatch = filtered.match(keywordRegex)?.map((x) => x.replace("--=", "").replace("=--", ""));
  return { substrings, keywordMatch };
}
function normalizestr(str) {
  return str.replace("@", "").replaceAll("'", "").replaceAll("/", "").replaceAll(".", "").replaceAll(":", "");
}
const $$TwitterTemplatize = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$TwitterTemplatize;
  const { obj } = Astro2.props;
  let str = obj;
  if (Array.isArray(str)) {
    str = str.map((x) => x.text).join("\n");
  }
  const lines = str.split("\n").map((line) => templatizeline(line));
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${lines.map(
    ({
      substrings,
      keywordMatch
    }) => {
      return renderTemplate`${maybeRenderHead($$result2)}<p class="ml-14">
						${substrings.map((substring) => {
        if (keywordMatch?.includes(substring)) {
          return renderTemplate`<span${addAttribute(
            "pseudo" + normalizestr(substring),
            "class"
          )}></span>`;
        }
        return substring;
      })}
					</p>`;
    }
  )}` })}`;
}, "/home/runner/work/monext/monext/apps/clown/src/components/TwitterTemplatize.astro");

const $$Astro$1 = createAstro();
const $$user = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$user;
  const { user } = Astro2.params;
  const data = await db.get(user + "_tw");
  if (data.error) {
    return new Response("Not Found", {
      status: 404,
      statusText: "Not Found"
    });
  }
  const cssx = templatizeline(JSON.stringify(data.tweets)).keywordMatch?.map(
    (x) => `.pseudo${normalizestr(x)}::before { content: "${x}";}`
  ).join("\n");
  const reposts = Array.from(
    new Set(
      data.tweets.filter((item) => item.originalPoster).map(
        (user2) => user2.originalPoster.screenName + "_tw"
      )
    )
  );
  const existget = await db.view("twitter/exist", {
    update: "lazy",
    keys: JSON.stringify(reposts),
    nocdn: "ok"
  });
  const exist = existget.rows?.map(
    (it) => it.id.replace("_tw", "")
  );
  Astro2.response.headers.set("Cache-Control", "max-age=31536000");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${user} public tweets on twitter`, "description": data.description }, { "default": ($$result2) => renderTemplate`${data.tweets.map((t, i) => renderTemplate`${maybeRenderHead($$result2)}<div class="bg-gray-800 dark:bg-white mb-2 rounded-md border boder-1 dark:border-gray-500 pb-2">
				${i === 5 && renderTemplate`${renderComponent($$result2, "RudSense", $$RudSense, {})}`}
				${i === 11 && renderTemplate`${renderComponent($$result2, "RudSense", $$RudSense, {})}`}

				<div class="flex flex-shrink-0 p-2 pb-0">
					<div class="flex-shrink-0 group block">
						<div class="flex items-center">
							${renderComponent($$result2, "amp-img", "amp-img", { "width": "48", "height": "48", "class": "inline-block   rounded-full", "src": data.profileImageUrl, "alt": "", "layout": "fixed" })}

							<div class="ml-2">
								<div class="leading-6 font-light text-xl">
									${data.name}
									<div class="text-xs leading-5 font-light">
										${t.createdAt}${" "}
										${t.originalPoster ? "| retweeted:" : "| tweeted:"}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div>
					${t.originalPoster && renderTemplate`<a class="flex items-center  bg-black w-fit"${addAttribute(
    exist?.includes(t.originalPoster.screenName) ? "/tw/u/" + t.originalPoster.screenName : "https://twitter.com/" + t.originalPoster.screenName,
    "href"
  )}>
							<img width="24" height="24" class="inline-block   rounded-full ml-14"${addAttribute(t.originalPoster.profileImageUrl.replace("=--", "").replace("--=", ""), "src")} alt="">

							<div class="text-base leading-6 font-bold pl-2">
								${t.originalPoster.name} :
							</div>
						</a>`}
					<div class="flex flex-col">
						${renderComponent($$result2, "TwitterTemplatize", $$TwitterTemplatize, { "obj": t.text })}
						${t.text}
					</div>
				</div>
			</div>`)}` })}
<style>${unescapeHTML(cssx)}</style>`;
}, "/home/runner/work/monext/monext/apps/clown/src/pages/tw/u/[user].astro");

const $$file$1 = "/home/runner/work/monext/monext/apps/clown/src/pages/tw/u/[user].astro";
const $$url$1 = "/tw/u/[user]";

const _page14 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$user,
  file: $$file$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro();
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
  ];
  const { twitter } = Astro2.params;
  const x = twitter ? twitter.split("_") : ["a"];
  const pagenum = x[1] ? Number(x[1]) : 1;
  const skip = pagenum * 100 - 100;
  const datax = db.view("twitter/byletter", {
    reduce: false,
    key: x[0] || "a",
    limit: 100,
    skip,
    update: "lazy"
  });
  const itemsx = db.view("twitter/byletter", {
    reduce: true,
    key: x[0] || "a",
    limit: 1,
    group: false,
    update: "lazy"
  });
  const resp = await Promise.all([datax, itemsx]).then((values) => {
    return {
      users: values[0].rows,
      items: values[1].value
    };
  });
  Astro2.response.headers.set("Cache-Control", "max-age=31536000");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": ` Twitter ecosphere ${pagenum}`, "description": `Twitter ecosphere   ` }, { "default": ($$result2) => renderTemplate`
	${maybeRenderHead($$result2)}<div class="flex flex-wrap justify-center items-center gap-1 mb-3">
		${alphabet.map((x2) => renderTemplate`<a${addAttribute("/tw/" + x2.toLowerCase() + "_1", "href")} class="bg-slate-900 p-2 font-bold text-white dark:bg-white dark:text-slate-900 rounded-md">
					${x2}
				</a>`)}
	</div>
	<div class="flex flex-row flex-wrap justify-center p-0 gap-2">
		${resp.users.map(({ id }) => renderTemplate`<a class="active flex  bg-slate-900 font-bold text-white dark:bg-white dark:text-slate-900 px-3 rounded-xl text-sm"${addAttribute("/tw/u/" + id.replace("_tw", ""), "href")}>
					${" "}
					${id.replace("_tw", "")}${" "}
				</a>`)}
	</div>
	${renderComponent($$result2, "Pagination", $$Pagination, { "items": resp.items, "currentPage": pagenum, "pageSize": 100, "prefix": "/news/" })}
` })}`;
}, "/home/runner/work/monext/monext/apps/clown/src/pages/tw/[...twitter].astro");

const $$file = "/home/runner/work/monext/monext/apps/clown/src/pages/tw/[...twitter].astro";
const $$url = "/tw/[...twitter]";

const _page15 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { _page0 as _, _page1 as a, _page2 as b, _page3 as c, _page4 as d, _page5 as e, _page6 as f, _page7 as g, _page8 as h, _page9 as i, _page10 as j, _page11 as k, _page12 as l, _page13 as m, _page14 as n, _page15 as o };
