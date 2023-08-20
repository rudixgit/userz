import { r as reactExports } from './index.d92747a1.js';

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production_min = {};

/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f=reactExports,k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};
function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a)void 0===d[b]&&(d[b]=a[b]);return {$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}reactJsxRuntime_production_min.Fragment=l;reactJsxRuntime_production_min.jsx=q;reactJsxRuntime_production_min.jsxs=q;

{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}

var jsxRuntimeExports = jsxRuntime.exports;

const ProgramReact = () => {
  const [filterstring, setFiterString] = reactExports.useState(null);
  const [url, setUrl] = reactExports.useState("https://db.kloun.lol/db/_design/newsbg/_view/news?descending=true&limit=100&include_docs=true");
  const [items, setItems] = reactExports.useState([]);
  reactExports.useEffect(() => {
    console.log("test");
  }, []);
  reactExports.useEffect(() => {
    fetchMyAPI(url || "");
  }, [url]);
  async function fetchMyAPI(url2) {
    const res2 = await fetch(url2);
    console.log(res2);
    const response = await res2.json();
    setItems(response.rows);
  }
  async function deleter(_id, _rev) {
    console.log("https://secede.kloun.lol/db/");
    const response = await fetch("https://secede.kloun.lol/db/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        _id,
        _rev,
        del: true
      })
    });
    const d = await response.json();
    console.log(d);
  }
  if (!items[0]) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
      type: "text",
      className: "rounded-md bg border-2 border-white p-1 font-bold text-lg w-full",
      onChange: (e) => setUrl(e.target.value),
      value: url
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx("input", {
      type: "text",
      className: "rounded-md bg border-2 border-white p-1 font-bold text-lg w-full",
      onChange: (e) => setUrl(e.target.value),
      value: url
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("input", {
      type: "text",
      className: "rounded-md bg border-2 border-white p-1 font-bold text-sm w-1/3",
      onChange: (e) => setFiterString(e.target.value),
      value: filterstring || ""
    }), items.map((item) => {
      const x = JSON.stringify(item.doc ? item.doc : item, null, 2).split("\n");
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        className: filterstring ? "text-xs my-2 p-1 border flex" : "text-xs my-2 p-1 border",
        children: [x.map((line) => {
          if (filterstring && filterstring.length > 2) {
            return line.includes(filterstring) ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
              children: line
            }, line) : null;
          }
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
            children: line
          });
        }), /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          width: "26",
          height: "26",
          fill: "currentColor",
          className: "pointer",
          viewBox: "0 0 16 16",
          children: [" ", /* @__PURE__ */ jsxRuntimeExports.jsx("path", {
            d: "M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
          }), " ", /* @__PURE__ */ jsxRuntimeExports.jsx("path", {
            "fill-rule": "evenodd",
            d: "M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z",
            onClick: () => deleter(item.doc._id, item.doc._rev)
          })]
        })]
      });
    })]
  });
};

export { ProgramReact as default };
