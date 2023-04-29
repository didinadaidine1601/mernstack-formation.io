import * as PubSub from "@google-cloud/pubsub";

class Logger {
  info(...args:any[]){}
  log(...args:any[]){}
  debug(...args:any[]){}
  warn(...args:any[]){}
  error(...args:any[]){}
}
const pubsub = PubSub(),
  _logger = new Logger();

export interface MessageAttributes {
  [key:string]: string;
}

/**
 * An abstraction class for Google Pubsub
 */
export default class MessageTransport {
  logger?: any;
  topicName: string;
  topic: PubSub.Topic;
  publisher: PubSub.Publisher;
  readonly autoCreateTopic: boolean;

  /**
   * @param {string} topicName - Message topic name.
   * @param {boolean} autoCreateTopic? - Create the topic if it does not exist.
   */
  constructor(topicName: string, autoCreateTopic?: boolean, logger?: any) {
    this.logger = logger || _logger;
    this.topicName = topicName;
    this.topic = pubsub.topic(this.topicName);
    this.publisher = this.topic.publisher();
    this.autoCreateTopic = autoCreateTopic || false;

    this.checkTopic();
  }

  private async checkTopic() {
    const [exists] = await this.topic.exists();

    if(this.autoCreateTopic === true && !exists) {
      this.topic = (await this.createTopic())[0];
    }

    return this.topic;
  }

  createTopic() {
    return this.topic.create();
  }

  /**
   * Publish the provided message.
   *
   * @param {object|buffer} data - The message payload to publish. If data is not a Buffer object
   *   then it will be converted before publishing the message; otherwise the message is published.
   * @param {object} attributes? - Attributes of the message in the form
   *   of an object containing a list of "key": value pairs.
   * @return {string[]} - The server-assigned ID of the published message.
   */
  async publish(data: any, attributes?: MessageAttributes): Promise<string[]> {
    this.logger.debug("publish message", { data, attributes });
    let payload: any;

    if(data instanceof Buffer) {
      payload = data;
    } else {
      payload = new Buffer(JSON.stringify(data));
    }

    const result = await this.publisher.publish(payload, attributes);
    return Array.isArray(result) ?
      result :
      [result];
  }
}
