Module.register("MMM-FullCalendar", {
  // Default module config.
  defaults: {
    initialView: "dayGridMonth", // Default to month view
    updateInterval: 24 * 60 * 60 * 1000, // Update once a day
  },

  start: function () {
    this.renderCalendar();
  },

  renderCalendar: function () {
    const wrapper = document.createElement("div");
    wrapper.id = "calendar";
    this.getDom().appendChild(wrapper);

    // Initialize FullCalendar using CDN
    const calendar = new FullCalendar.Calendar(wrapper, {
      initialView: this.config.initialView, // Use the configured initial view
      headerToolbar: {
        start: "title", // Show the calendar title (month, year)
        center: "", // Empty for simplicity, but you can add navigation buttons here if desired
        end: "dayGridMonth,timeGridWeek,timeGridDay", // Buttons to switch between views
      },
    });

    calendar.render();
  },

  getStyles: function () {
    return [
      this.file("css/style.css"), // Custom styles for the module
      "https://cdn.jsdelivr.net/npm/fullcalendar@6.1.8/main.min.css", // FullCalendar CSS from CDN
    ];
  },

  getScripts: function () {
    return [
      "https://cdn.jsdelivr.net/npm/fullcalendar@6.1.8/main.min.js", // FullCalendar JS from CDN
    ];
  },

  getDom: function () {
    const wrapper = document.createElement("div");
    wrapper.id = "calendar";
    return wrapper;
  },
});
