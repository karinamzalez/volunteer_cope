$(document).ready(function () {
  function daysOfWeek(date) {
    var monday    = _getMonday(date);
    var tuesday   = _nextDay(monday);
    var wednesday = _nextDay(tuesday);
    var thursday  = _nextDay(wednesday);
    var friday    = _nextDay(thursday);

    return _formatDatesArray([monday, tuesday, wednesday, thursday, friday]);
  }

  function hashDates(daysArray) {
    return {
            monday: daysArray[0], tuesday: daysArray[1],
            wednesday: daysArray[2], thursday: daysArray[3],
            friday: daysArray[4]
          };
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
    return month + "/" + day + " ●";
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
   $(dayID).append(" " + daysOfWeek(new Date())[parseInt(dayID[1])]);
 }

 renderDayOfWeek("#0");
 renderDayOfWeek("#1");
 renderDayOfWeek("#2");
 renderDayOfWeek("#3");
 renderDayOfWeek("#4");
});
