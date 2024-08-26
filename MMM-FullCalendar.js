Module.register("MMM-FullCalendar", {
  // Default module config.
  defaults: {
    initialView: "dayGridMonth", // Default to month view
    updateInterval: 24 * 60 * 60 * 1000, // Update once a day
    icsUrl: "", // URL of the ICS file to fetch events from
  },

  start: function () {
    // Load events from the ICS file if a URL is provided
    if (this.config.icsUrl) {
      this.sendSocketNotification("FETCH_ICS", this.config.icsUrl);
    }
  },

  getScripts: function () {
    return [
      "https://cdn.jsdelivr.net/npm/fullcalendar@6.1.8/main.min.js", // FullCalendar JS from CDN
    ];
  },

  getStyles: function () {
    return [
      this.file("css/style.css"), // Custom styles for the module
      "https://cdn.jsdelivr.net/npm/fullcalendar@6.1.8/main.min.css", // FullCalendar CSS from CDN
    ];
  },

  getDom: function () {
    const wrapper = document.createElement("div");
    wrapper.id = "calendar";
    return wrapper;
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === "ICS_DATA") {
      this.renderCalendar(payload);
    }
  },

  renderCalendar: function (events) {
    const wrapper = document.getElementById("calendar");

    // Clear any existing calendar
    wrapper.innerHTML = "";

    // Initialize FullCalendar with events
    const calendar = new FullCalendar.Calendar(wrapper, {
      initialView: this.config.initialView, // Use the configured initial view
      headerToolbar: {
        start: "title", // Show the calendar title (month, year)
        center: "", // Empty for simplicity, but you can add navigation buttons here if desired
        end: "dayGridMonth,timeGridWeek,timeGridDay", // Buttons to switch between views
      },
      events: events, // Load events from the ICS data
    });

    calendar.render();
  },
});
