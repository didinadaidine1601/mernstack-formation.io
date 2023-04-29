# Node.js Helpers
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/a1a07b714f524c6b95aeda7eed652407)](https://www.codacy.com/app/jeremylorino/nodejs-helpers?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=jeremylorino/nodejs-helpers&amp;utm_campaign=Badge_Grade)
[![codebeat badge](https://codebeat.co/badges/bb63b024-21c7-47f2-b266-b57a8ff3e94f)](https://codebeat.co/projects/github-com-jeremylorino-nodejs-helpers-master)
[![dependencies Status](https://david-dm.org/jeremylorino/nodejs-helpers/status.svg)](https://david-dm.org/jeremylorino/nodejs-helpers)
[![devDependencies Status](https://david-dm.org/jeremylorino/nodejs-helpers/dev-status.svg)](https://david-dm.org/jeremylorino/nodejs-helpers?type=dev)
[![Known Vulnerabilities](https://snyk.io/test/github/jeremylorino/nodejs-helpers/badge.svg)](https://snyk.io/test/github/jeremylorino/nodejs-helpers)


A set of classes to simplify interaction with Google Apis.

# Table of Contents
* [Setup](#setup)
* [How to use](#how-to-use)
  * [**MessageTransport**](#messagetransport)
  * [**StorageProvider**](#storageprovider)
  * [**Logger**](#logger)

## Setup

1. Install [Node.js v8.9.2 or greater][node]
1. Set the `GCLOUD_PROJECT` environment variable:

    Linux:

        export GCLOUD_PROJECT=your-project-id

    Windows:

        set GCLOUD_PROJECT=your-project-id

    Windows (PowerShell):

        $env:GCLOUD_PROJECT="your-project-id"

1. Obtain authentication credentials.

    Create local credentials by running the following command and following the
    oauth2 flow (read more about the command [here][auth_command]):

        gcloud auth application-default login

    In non-Google Cloud environments, GCE instances created without the
    correct scopes, or local workstations where the
    `gcloud beta auth application-default login` command fails, use a service
    account by doing the following:

    * Go to API Manager -> Credentials
    * Click "New Credentials", and create a service account or [click here](https://console.cloud.google.com/project/_/apiui/credential/serviceaccount)
    * Download the JSON for this service account, and set the `GOOGLE_APPLICATION_CREDENTIALS`
    environment variable to point to the file containing the JSON credentials.

    Set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable:

    Linux:

        export GOOGLE_APPLICATION_CREDENTIALS=/path/to/service_account_file.json

    Windows:

        set GOOGLE_APPLICATION_CREDENTIALS=/path/to/service_account_file.json

    Windows (PowerShell):

        $env:GOOGLE_APPLICATION_CREDENTIALS="/path/to/service_account_file.json"

    __Note for code running on GCE, GAE, or other environments:__

    On Google App Engine, the credentials should be found automatically.

    On Google Compute Engine, the credentials should be found automatically, but require that
    you create the instance with the correct scopes.

        gcloud compute instances create --scopes="https://www.googleapis.com/auth/cloud-platform,https://www.googleapis.com/auth/compute,https://www.googleapis.com/auth/compute.readonly" test-instance

    If you did not create the instance with the right scopes, you can still
    upload a JSON service account and set `GOOGLE_APPLICATION_CREDENTIALS`
    as described.

    Read more about [Google Cloud Platform Authentication][gcp_auth].

[node]: https://nodejs.org/
[auth_command]: https://cloud.google.com/sdk/gcloud/reference/beta/auth/application-default/login
[gcp_auth]: https://cloud.google.com/docs/authentication#projects_and_resources

## How to use

### MessageTransport
Using Promises
```javascript
const { MessageTransport } = require("nodejs-helpers");

const topicName = "test-jal",
  data = { jal: "test" },
  attributes = { attr1: "1", attr2: "2" },
  transport = new MessageTransport(topicName);
transport.publish(data, attributes)
  .then((response) => {
    console.log(response);
    // 45031755284181 // messageId of the published message
  })
  .catch((err) => {
    console.error(err);
  });
```

Using async/await
```javascript
const { MessageTransport } = require("nodejs-helpers");

async function testMessageTransport() {
  try {
    const topicName = "test-jal",
      data = { jal: "test" },
      attributes = { attr1: "1", attr2: "2" }
    const transport = new MessageTransport(topicName);
    const response = await transport.publish(data, attributes);
    console.log(response);
    // 45031755284181 // messageId of the published message
  } catch (err) {
    console.error(err);
  }
}

(async() => {
  await testMessageTransport();
})();
```

### StorageProvider
Using Promises
```javascript
const { StorageProvider } = require("nodejs-helpers");

const storage = new StorageProvider({
  forBigQuery: true,
  bucketName: "now-ims-core-dev_bigquery-staging"
});

storage.save("test_jal/jal.txt", "hey")
  .then((response) => {
    console.log(response);
    // { success: true, payload: '"h"\n"e"\n"y"' }
  })
  .catch((err) => {
    console.error(err);
  });

storage.save("test_jal/jal.txt", "hey", { forBigQuery: false })
  .then((response) => {
    console.log(response);
    // { success: true, payload: 'hey' }
  })
  .catch((err) => {
    console.error(err);
  });

```

Using async/await
```javascript
const { StorageProvider } = require("nodejs-helpers");

async function testStorageProvider() {
  try {
    const storage = new StorageProvider({
      forBigQuery: true,
      bucketName: "my-testing-bucket"
    });

    let response = await storage.save("test_jal/jal.txt", "hey");
    console.log(response);
    // { success: true, payload: '"h"\n"e"\n"y"' }

    response = await storage.save("test_jal/jal.txt", "hey", { forBigQuery: false });
    console.log(response);
    // { success: true, payload: 'hey' }
  } catch (err) {
    console.error(err);
  }
}

(async() => {
  await testStorageProvider();
})();
```

### Logger
```javascript
const { Logger } = require("nodejs-helpers");
const logger = new Logger();

logger.debug("debug");
// 2018-02-28T05:21:53.214Z - debug: debug
logger.info("info");
// 2018-02-28T05:21:53.217Z - info: info
logger.error("error");
// 2018-02-28T05:21:53.218Z - error: error
```
