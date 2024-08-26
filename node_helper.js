const NodeHelper = require("node_helper");
const ical = require("ical");
const request = require("request");

module.exports = NodeHelper.create({
  start: function () {
    console.log("Starting node helper for: " + this.name);
  },

  // Handle incoming socket notifications
  socketNotificationReceived: function (notification, payload) {
    if (notification === "FETCH_ICS") {
      this.fetchICSData(payload);
    }
  },

  // Fetch and parse the ICS data
  fetchICSData: function (url) {
    request(url, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const parsedData = ical.parseICS(body);
        const events = [];

        for (let k in parsedData) {
          if (parsedData.hasOwnProperty(k)) {
            const ev = parsedData[k];
            if (ev.type === "VEVENT") {
              events.push({
                title: ev.summary,
                start: ev.start,
                end: ev.end,
                allDay: !ev.start.getHours() && !ev.end.getHours(),
              });
            }
          }
        }

        // Send the parsed events to the front end
        this.sendSocketNotification("ICS_DATA", events);
      } else {
        console.error("Error fetching ICS file:", error);
      }
    });
  },
});
