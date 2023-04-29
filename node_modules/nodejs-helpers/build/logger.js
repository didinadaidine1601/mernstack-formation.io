"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var winston = require("winston");
var logging_winston_1 = require("@google-cloud/logging-winston");
var env = process.env.NODE_ENV || "dev";
var loggingTransportConfig = {
    level: ["dev", "test", "local"].includes(env) ? "debug" : "error",
};
// populate values if running this package locally
if (env === "local") {
    loggingTransportConfig.logName = "projects/" + process.env.GCLOUD_PROJECT + "/logs/myservice-local_log";
    loggingTransportConfig.resource = {
        type: "global"
    };
}
var transport = new logging_winston_1.LoggingWinston(loggingTransportConfig);
var Logger = /** @class */ (function (_super) {
    __extends(Logger, _super);
    function Logger(options) {
        var _this = _super.call(this, options) || this;
        _this.add(transport, loggingTransportConfig, true);
        _this.add(winston.transports.Console, {
            timestamp: true,
            colorize: true,
            level: ["dev", "test", "local"].includes(env) ? "debug" : "error"
        });
        return _this;
    }
    return Logger;
}(winston.Logger));
exports.default = Logger;
//# sourceMappingURL=logger.js.map