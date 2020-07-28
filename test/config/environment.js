const MongoClient = require("mongodb").MongoClient
const NodeEnvironment = require("jest-environment-node")

module.exports = class MongoEnvironment extends NodeEnvironment {
  async setup() {
    if (!this.global.trackerClient) {
      this.global.trackerClient = await MongoClient.connect(
        process.env.ATLAS_URI,
        { useNewUrlParser: true, useUnifiedTopology: true },
      )
      await super.setup()
    }
  }

  async teardown() {
    await this.global.trackerClient.close()
    await super.teardown()
  }

  runScript(script) {
    return super.runScript(script)
  }
}
