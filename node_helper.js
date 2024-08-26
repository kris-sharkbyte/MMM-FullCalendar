const NodeHelper = require("node_helper");
const ical = require("ical");
const axios = require("axios"); // Use axios instead of node-fetch

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

  // Fetch and parse the ICS data using axios
  fetchICSData: async function (url) {
    try {
      const response = await axios.get(url);
      const body = response.data;

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
    } catch (error) {
      console.error("Error fetching ICS file:", error);
    }
  },
});
