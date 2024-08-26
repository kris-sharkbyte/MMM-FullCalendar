const NodeHelper = require("node_helper");

module.exports = NodeHelper.create({
  // Called when the Magic Mirror server starts.
  start: function () {
    console.log("Starting node helper for: " + this.name);
  },

  // Handling notifications sent from the module
  socketNotificationReceived: function (notification, payload) {
    if (notification === "FETCH_ICS") {
      this.fetchICSData(payload);
    }
  },

  // Placeholder function for fetching ICS data
  fetchICSData: function (url) {
    // Here, you would implement fetching ICS data from a URL and parsing it.
    // Currently, it is just a placeholder.
    console.log("Fetching ICS data from URL: ", url);

    // Send a sample notification back to the front end
    this.sendSocketNotification("ICS_DATA", {
      message: "Sample ICS data processed",
    });
  },
});
