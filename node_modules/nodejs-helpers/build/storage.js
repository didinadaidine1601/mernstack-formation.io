"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var Storage = require("@google-cloud/storage");
var _ = require("lodash");
var mimeTypes = require("mime-types");
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Logger.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Logger.prototype.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Logger.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Logger.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    return Logger;
}());
var gcs = Storage(), _logger = new Logger();
/**
 * Recursively rename properties in to meet BigQuery field name requirements.
 *
 * @param {*} obj Value to examine.
 */
function fixNames(obj) {
    if (Array.isArray(obj)) {
        obj.forEach(fixNames);
    }
    else if (obj && typeof obj === 'object') {
        Object.keys(obj).forEach(function (key) {
            var value = obj[key];
            fixNames(value);
            var fixedKey = key.replace('-', '_')
                .replace('@', '_at_')
                .replace('.', '_')
                .replace(/(^[^a-zA-Z_])/, '_$1');
            if (fixedKey !== key) {
                obj[fixedKey] = value;
                delete obj[key];
            }
        });
    }
}
var StorageProvider = /** @class */ (function () {
    /**
     * @param {object} options?
     * @param {string} options.bucketName - The default bucket where files will be saved.
     * @param {boolean} options.forBigQuery - Format data for the consumption
     * of BigQuery before save. Default: false
     */
    function StorageProvider(options, logger) {
        this.storage = gcs;
        this.options = _.merge({
            forBigQuery: false,
        }, options);
        this.logger = logger || _logger;
    }
    /**
     * Save data to the remote storage provider.
     *
     * @param {string} filename - The filename as it will appear on the remote storage provider.
     * @param {object} data - Data to be saved.
     * @param {object} options?
     * @param {string} options.bucketName - The bucket where files will be saved; this will
     * override the default bucketName set during instantiation.
     * @param {boolean} options.forBigQuery? - Format data for the consumption
     * of BigQuery before save. Default: false
     */
    StorageProvider.prototype.save = function (filename, data, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _options, payload, temp, bucketName, file, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _options = _.merge({}, this.options, options);
                        if (!_options.bucketName) {
                            throw new Error("'options.bucketName' must be provided");
                        }
                        if (_options.forBigQuery === true) {
                            temp = _.merge([], data);
                            fixNames(temp);
                            payload = (Array.isArray(temp) ? temp : [temp])
                                .map(function (event) { return JSON.stringify(event); })
                                .join('\n');
                        }
                        else {
                            payload = data;
                        }
                        bucketName = _options.bucketName;
                        file = this.storage.bucket(bucketName).file(filename);
                        this.logger.info("Saving events to " + filename + " in bucket " + bucketName);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, file.save(payload, {
                                metadata: {
                                    contentType: mimeTypes.lookup(filename) || '',
                                }
                            })];
                    case 2:
                        _a.sent();
                        this.logger.info("JSON written to gs://" + bucketName + "/" + filename);
                        return [2 /*return*/, {
                                success: true,
                                payload: payload,
                            }];
                    case 3:
                        err_1 = _a.sent();
                        this.logger.error(err_1);
                        throw err_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return StorageProvider;
}());
exports.default = StorageProvider;
//# sourceMappingURL=storage.js.map