/*global assert */
"use strict";

const {
  StorageProvider,
  MessageTransport,
  Logger,
} = require("../build"),
  assert = require("assert");

function testLogger() {
  const logger = new Logger();
  logger.info("test");
}

async function testMessageTransport() {
  try {
    const transport = new MessageTransport("test-jal", true);
    let response = await transport.publish({
      jal: "test"
    }, {
      attr1: "1",
      attr2: "2"
    });
    assert(response !== null);
  } catch (err) {
    console.error(err);
  }
}

async function testStorageProvider() {
  try {
    const storage = new StorageProvider({
      forBigQuery: true,
      "bucketName": process.env.GCS_BUCKET_NAME
    });

    const data = Array.from({
      length: 10
    }, (v, k) => {
      return {
        prop1: parseFloat(k),
        prop2: k.toString(),
        prop3: {
          foo: `bar${k}`,
          baz: false,
          foobar: new Date()
        }
      }
    })
    let response = await storage.save("test_jal/jal.bq.json", data);
    assert(response.success === true);
    assert(response.payload === data.map(v => JSON.stringify(v)).join('\n'));

    response = await storage.save("test_jal/jal.txt", "hey", {
      forBigQuery: false
    });
    assert(response.success === true);
    assert(response.payload === "hey");
  } catch (err) {
    console.error(err);
  }
}

(async () => {
  testLogger();
  await testMessageTransport();
  await testStorageProvider();
})();
