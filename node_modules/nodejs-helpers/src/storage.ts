import * as Storage from '@google-cloud/storage';
import * as _ from 'lodash';
import * as mimeTypes from 'mime-types';

class Logger {
  info(...args: any[]) { }
  log(...args: any[]) { }
  debug(...args: any[]) { }
  warn(...args: any[]) { }
  error(...args: any[]) { }
}
const gcs = Storage(),
  _logger = new Logger();

/**
 * Recursively rename properties in to meet BigQuery field name requirements.
 *
 * @param {*} obj Value to examine.
 */
function fixNames(obj: any) {
  if (Array.isArray(obj)) {
    obj.forEach(fixNames);
  }
  else if (obj && typeof obj === 'object') {
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      fixNames(value);
      const fixedKey = key.replace('-', '_')
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

export interface StorageProviderOptions {
  bucketName: string;
  forBigQuery: boolean;
}

export default class StorageProvider {
  private storage: Storage.Storage;
  private logger: any;

  options: StorageProviderOptions;

  /**
   * @param {object} options?
   * @param {string} options.bucketName - The default bucket where files will be saved.
   * @param {boolean} options.forBigQuery - Format data for the consumption
   * of BigQuery before save. Default: false
   */
  constructor(options?: StorageProviderOptions, logger?: any) {
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
  async save<T>(filename: string, data: T | T[], options?: StorageProviderOptions) {
    const _options = _.merge({}, this.options, options);
    let payload: string;

    if (!_options.bucketName) {
      throw new Error(`'options.bucketName' must be provided`);
    }

    if (_options.forBigQuery === true) {
      const temp = _.merge([], data);
      fixNames(temp);
      payload = (Array.isArray(temp) ? temp : [temp])
        .map((event: any) => JSON.stringify(event))
        .join('\n');
    } else {
      payload = data as any;
    }

    const bucketName = _options.bucketName;
    const file = this.storage.bucket(bucketName).file(filename);

    this.logger.info(`Saving events to ${filename} in bucket ${bucketName}`);

    try {
      await file.save(payload, {
        metadata: {
          contentType: mimeTypes.lookup(filename) || '',
        }
      });
      this.logger.info(`JSON written to gs://${bucketName}/${filename}`);
      return {
        success: true,
        payload,
      };
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}
