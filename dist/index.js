#!/usr/bin/env node
"use strict";

var p = _interopRequireWildcard(require("@clack/prompts"));
var _picocolors = _interopRequireDefault(require("picocolors"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var path = require("path");
var fs = require("fs-extra");
var _require = require("child_process"),
  exec = _require.exec;
var util = require("util");
var execPromise = util.promisify(exec);
var templateDir = path.join(__dirname, "../template_main");
var targetDir = process.cwd();
function main() {
  return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
    var _this = this;
    var copyFiles, copyDb, copyMobile, copyIac, project, s, nextSteps;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          console.clear();
          p.intro("".concat(_picocolors["default"].bgCyan(_picocolors["default"].black(" create-app "))));
          copyFiles = function copyFiles() {
            return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return fs.copy(templateDir, targetDir).then(function () {
                      console.log("Project created successfully.");
                    })["catch"](function (err) {
                      console.error("Error creating project:", err);
                    });
                  case 2:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
          };
          copyDb = function copyDb(app) {
            return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
              var paths;
              return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    paths = path.join(__dirname, "../templates/apps/".concat(app));
                    _context2.prev = 1;
                    _context2.next = 4;
                    return fs.copy(paths, targetDir + "/apps/database");
                  case 4:
                    console.log("Database copied successfully!");
                    _context2.next = 10;
                    break;
                  case 7:
                    _context2.prev = 7;
                    _context2.t0 = _context2["catch"](1);
                    console.error("Error copying directory:", _context2.t0);
                  case 10:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2, null, [[1, 7]]);
            }));
          };
          copyMobile = function copyMobile() {
            return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
              var expoPaths, iosPaths;
              return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    expoPaths = path.join(__dirname, "../templates/apps/expo");
                    iosPaths = path.join(__dirname, "../templates/ios");
                    _context3.prev = 2;
                    _context3.next = 5;
                    return fs.copy(expoPaths, targetDir + "/apps/expo");
                  case 5:
                    _context3.next = 7;
                    return fs.copy(iosPaths, targetDir + "/ios");
                  case 7:
                    console.log("Expo copied successfully!");
                    _context3.next = 13;
                    break;
                  case 10:
                    _context3.prev = 10;
                    _context3.t0 = _context3["catch"](2);
                    console.error("Error copying directory:", _context3.t0);
                  case 13:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3, null, [[2, 10]]);
            }));
          };
          copyIac = function copyIac() {
            return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
              var iacPaths, githubPaths;
              return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                while (1) switch (_context4.prev = _context4.next) {
                  case 0:
                    iacPaths = path.join(__dirname, "../templates/aws/iac");
                    githubPaths = path.join(__dirname, "../templates/aws/github");
                    _context4.prev = 2;
                    _context4.next = 5;
                    return fs.copy(iacPaths, targetDir + "/iac");
                  case 5:
                    _context4.next = 7;
                    return fs.copy(githubPaths, targetDir + "/.github");
                  case 7:
                    console.log("IAC copied successfully!");
                    _context4.next = 13;
                    break;
                  case 10:
                    _context4.prev = 10;
                    _context4.t0 = _context4["catch"](2);
                    console.error("Error copying directory:", _context4.t0);
                  case 13:
                  case "end":
                    return _context4.stop();
                }
              }, _callee4, null, [[2, 10]]);
            }));
          };
          _context5.next = 8;
          return p.group({
            path: function path() {
              return p.text({
                message: "Where should we create your project?",
                placeholder: "./sparkling-solid",
                validate: function validate(value) {
                  if (!value) return "Please enter a path.";
                  if (value[0] !== ".") return "Please enter a relative path.";
                }
              });
            },
            mobile: function mobile() {
              return p.confirm({
                message: "Is this a mobile project?",
                initialValue: false
              });
            },
            auth: function auth(_ref) {
              var results = _ref.results;
              return p.select({
                message: "Pick an auth type within \"".concat(results.path, "\""),
                initialValue: "nextauth",
                maxItems: 1,
                options: [{
                  value: "nextauth",
                  label: "Next Auth"
                }, {
                  value: "clerk",
                  label: "Clerk"
                }]
              });
            },
            database: function database(_ref2) {
              var results = _ref2.results;
              return p.select({
                message: "Pick a database type within \"".concat(results.path, "\""),
                initialValue: "psql",
                maxItems: 1,
                options: [{
                  value: "psql",
                  label: "Postgresql & Golang"
                }, {
                  value: "sqlite",
                  label: "SQLite"
                }, {
                  value: "",
                  label: "None"
                }]
              });
            },
            iac: function iac() {
              return p.confirm({
                message: "Install IaC? (terraform aws setup)",
                initialValue: false
              });
            },
            install: function install() {
              return p.confirm({
                message: "Install dependencies?",
                initialValue: false
              });
            }
          }, {
            onCancel: function onCancel() {
              p.cancel("Operation cancelled.");
              process.exit(0);
            }
          });
        case 8:
          project = _context5.sent;
          if (project.path) {
            targetDir = path.join(process.cwd(), project.path);
          }
          _context5.next = 12;
          return copyFiles();
        case 12:
          if (!project.mobile) {
            _context5.next = 15;
            break;
          }
          _context5.next = 15;
          return copyMobile();
        case 15:
          if (!project.database) {
            _context5.next = 18;
            break;
          }
          _context5.next = 18;
          return copyDb(project.database);
        case 18:
          s = p.spinner();
          if (!project.auth) {
            _context5.next = 35;
            break;
          }
          s.start("Adding Auth");
          _context5.prev = 21;
          _context5.next = 24;
          return execPromise("mv ".concat(targetDir, "/apps/next/middleware_").concat(project.auth, ".ts ").concat(targetDir, "/apps/next/middleware.ts"));
        case 24:
          _context5.next = 26;
          return execPromise("mv \"".concat(targetDir, "/apps/next/app/(auth)/signin/[[...rest]]/page_").concat(project.auth, ".tsx\" \"").concat(targetDir, "/apps/next/app/(auth)/signin/[[...rest]]/page.tsx\""));
        case 26:
          _context5.next = 28;
          return execPromise("mv \"".concat(targetDir, "/apps/next/app/(auth)/register/[[...rest]]/page_").concat(project.auth, ".tsx\" \"").concat(targetDir, "/apps/next/app/(auth)/register/[[...rest]]/page.tsx\""));
        case 28:
          s.stop("Added Auth");
          _context5.next = 35;
          break;
        case 31:
          _context5.prev = 31;
          _context5.t0 = _context5["catch"](21);
          console.error("Error adding auth: ".concat(_context5.t0.message));
          s.stop("Failed to add Auth");
        case 35:
          if (!project.iac) {
            _context5.next = 40;
            break;
          }
          s.start("Installing IaC");
          _context5.next = 39;
          return copyIac();
        case 39:
          s.stop("Installed IaC");
        case 40:
          if (!project.install) {
            _context5.next = 53;
            break;
          }
          s.start("Installing via pnpm");
          _context5.prev = 42;
          if (project.path) {
            process.chdir(targetDir);
          }
          _context5.next = 46;
          return execPromise("pnpm install");
        case 46:
          console.log("Installed via pnpm");
          _context5.next = 52;
          break;
        case 49:
          _context5.prev = 49;
          _context5.t1 = _context5["catch"](42);
          console.error("Error executing pnpm install: ".concat(_context5.t1.message));
        case 52:
          s.stop();
        case 53:
          nextSteps = "cd ".concat(project.path, "        \n").concat(project.install ? "" : "pnpm install\n", "pnpm dev");
          p.note(nextSteps, "Next steps.");
          p.outro("Done! Don't forget to set your environment vars! Problems? ".concat(_picocolors["default"].underline(_picocolors["default"].cyan("https://github.com/jarrodmedrano/jarrod-starter/issues"))));
        case 56:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[21, 31], [42, 49]]);
  }));
}
main()["catch"](console.error);