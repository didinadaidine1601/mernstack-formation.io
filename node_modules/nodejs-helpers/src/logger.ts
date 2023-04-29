import * as winston from "winston";
import { LoggingWinston } from "@google-cloud/logging-winston";
import * as LoggingWinstonTypes from "@google-cloud/logging-winston/build/src/types/core";

const env = process.env.NODE_ENV || "dev";

const loggingTransportConfig: LoggingWinstonTypes.Options = {
  level: ["dev", "test", "local"].includes(env) ? "debug" : "error",
};

// populate values if running this package locally
if (env === "local") {
  loggingTransportConfig.logName = `projects/${process.env.GCLOUD_PROJECT}/logs/myservice-local_log`;
  loggingTransportConfig.resource = {
    type: "global"
  };
}

const transport = new LoggingWinston(loggingTransportConfig);

export default class Logger extends winston.Logger {
  constructor(options: winston.LoggerOptions) {
    super(options);

    this.add(transport, loggingTransportConfig, true);
    this.add(winston.transports.Console, {
      timestamp: true,
      colorize: true,
      level: ["dev", "test", "local"].includes(env) ? "debug" : "error"
    });
  }
}
