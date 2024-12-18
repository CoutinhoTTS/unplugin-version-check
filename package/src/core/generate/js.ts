export default `var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var _CheckVersion = /** @class */ (function () {
    function _CheckVersion(option) {
        this.time = 30000;
        this.version_key = "".concat(option.systemName, "_version");
        this.time = option.time || 30000;
    }
    _CheckVersion.prototype.check = function () {
        return __awaiter(this, arguments, void 0, function (bool) {
            var data, _a;
            if (bool === void 0) { bool = false; }
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.current_version = localStorage.getItem(this.version_key) || void 0;
                        return [4 /*yield*/, fetch("./version?key=".concat(Date.now()))];
                    case 1:
                        data = _b.sent();
                        _a = this;
                        return [4 /*yield*/, data.text()];
                    case 2:
                        _a.version_value = _b.sent();
                        if (!this.version_value)
                            return [2 /*return*/];
                        if (!this.current_version) {
                            localStorage.setItem(this.version_key, this.version_value);
                            return [2 /*return*/];
                        }
                        if (this.current_version === this.version_value)
                            return [2 /*return*/];
                        if (bool) {
                            localStorage.setItem(this.version_key, this.version_value);
                            location.reload();
                            return [2 /*return*/];
                        }
                        if (this.dialog && 'showModal' in this.dialog) {
                            this.dialog.showModal();
                            clearInterval(this.checkVersionInterval);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    _CheckVersion.prototype.hideDialog = function () {
        var _this = this;
        this.dialog && this.dialog.close();
        this.checkVersionInterval = setInterval(function () {
            _this.check();
        }, this.time);
    };
    _CheckVersion.prototype.refreshVersion = function () {
        this.hideDialog();
        localStorage.setItem(this.version_key, this.version_value);
        window.location.reload();
    };
    _CheckVersion.prototype.startCheck = function () {
        var _this = this;
        !this.dialog && (this.dialog = document.querySelector("dialog.version-check-dialog"));
        if (!this.dialog)
            return;
        this.check(true);
        var closeBtn = document.querySelector("dialog.version-check-dialog #version-tips_close");
        closeBtn === null || closeBtn === void 0 ? void 0 : closeBtn.addEventListener('click', this.hideDialog.bind(this));
        var refreshBtn = document.querySelector("dialog.version-check-dialog #version-dialog-button-confirm");
        refreshBtn === null || refreshBtn === void 0 ? void 0 : refreshBtn.addEventListener('click', this.refreshVersion.bind(this));
        this.checkVersionInterval = setInterval(function () {
            _this.check();
        }, this.time);
    };
    return _CheckVersion;
}());
`
