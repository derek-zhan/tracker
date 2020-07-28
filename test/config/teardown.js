module.exports = async function() {
    console.log("Teardown Mongo Connection")
    delete global.trackerClient
    delete global.DB_NAME
  }