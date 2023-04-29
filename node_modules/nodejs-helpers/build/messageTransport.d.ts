/// <reference types="google-cloud__pubsub" />
import * as PubSub from "@google-cloud/pubsub";
export interface MessageAttributes {
    [key: string]: string;
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
    constructor(topicName: string, autoCreateTopic?: boolean, logger?: any);
    private checkTopic;
    createTopic(): Promise<any[]>;
    /**
     * Publish the provided message.
     *
     * @param {object|buffer} data - The message payload to publish. If data is not a Buffer object
     *   then it will be converted before publishing the message; otherwise the message is published.
     * @param {object} attributes? - Attributes of the message in the form
     *   of an object containing a list of "key": value pairs.
     * @return {string[]} - The server-assigned ID of the published message.
     */
    publish(data: any, attributes?: MessageAttributes): Promise<string[]>;
}
