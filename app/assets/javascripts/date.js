$(document).ready(function () {
  function daysOfWeek(date) {
    var monday    = _getMonday(date);
    var tuesday   = _nextDay(monday);
    var wednesday = _nextDay(tuesday);
    var thursday  = _nextDay(wednesday);
    var friday    = _nextDay(thursday);

    return _formatDatesArray([monday, tuesday, wednesday, thursday, friday]);
  }

  function _formatDatesArray(days) {
    var formattedDates = [];

      for (var i = 0; i < days.length; i++) {
        formattedDates.push(_formatDate(days[i]));
      }
      return formattedDates;
  }

  function _formatDate(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    return month + " ● " + day + " ● " + year;
  }

  function _nextDay(currentDate) {
    return new Date(currentDate.getTime() + 24 * 60 * 60 * 1000 );
  }

  function _getMonday(date) {
    d = new Date(date);
    var day = d.getDay();
    diff = d.getDate() - day + (day === 0 ? -6:1);
    return new Date(d.setDate(diff));
  }

 function renderDayOfWeek(dayID) {
   $(dayID).append("<p>" + daysOfWeek(new Date())[parseInt(dayID[1])] + "</p>");
 }

 renderDayOfWeek("#0");
 renderDayOfWeek("#1");
 renderDayOfWeek("#2");
 renderDayOfWeek("#3");
 renderDayOfWeek("#4");
});
