Module.register("MMM-FullCalendar", {
  defaults: {
    initialView: "dayGridMonth", // Default to month view
    updateInterval: 24 * 60 * 60 * 1000, // Update once a day
    icsUrl: "", // URL of the ICS file to fetch events from
  },

  start: function () {
    console.log("[MMM-FullCalendar] Module started.");
    // Load events from the ICS file if a URL is provided
    if (this.config.icsUrl) {
      console.log(
        "[MMM-FullCalendar] Fetching ICS data from URL:",
        this.config.icsUrl
      );
      this.sendSocketNotification("FETCH_ICS", this.config.icsUrl);
    } else {
      console.warn("[MMM-FullCalendar] No ICS URL provided in config.");
    }
  },

  getScripts: function () {
    return [
      "https://cdn.jsdelivr.net/npm/fullcalendar/index.global.min.js", // FullCalendar JS from CDN
    ];
  },

  getStyles: function () {
    return [
      this.file("css/styles.css"), // Local custom styles
      "https://cdn.jsdelivr.net/npm/fullcalendar@6.1.15/main.min.css", // FullCalendar CSS from CDN
    ];
  },

  getDom: function () {
    const wrapper = document.createElement("div");
    wrapper.id = "calendar";
    return wrapper;
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === "ICS_DATA") {
      console.log(
        "[MMM-FullCalendar] ICS data received. Rendering calendar with events:",
        payload.length
      );
      this.renderCalendar(payload);
    } else {
      console.log(
        "[MMM-FullCalendar] Unhandled socket notification:",
        notification
      );
    }
  },

  renderCalendar: function (events) {
    const calendarEl = document.getElementById("calendar");

    // Ensure FullCalendar is loaded and Calendar class is accessible
    if (typeof FullCalendar.Calendar !== "undefined") {
      const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: this.config.initialView,
        headerToolbar: {
          start: "title",
          center: "",
          end: "",
        },
        height: "auto",
        events: events,
      });

      calendar.render();
      console.log("[MMM-FullCalendar] Calendar rendered successfully.");
    } else {
      console.error(
        "[MMM-FullCalendar] FullCalendar Calendar class is not defined. Please check script loading."
      );
    }
  },
});
