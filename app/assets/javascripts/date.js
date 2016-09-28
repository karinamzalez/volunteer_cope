$(document).ready(function () {
  renderDayOfWeek("#0");
  renderDayOfWeek("#1");
  renderDayOfWeek("#2");
  renderDayOfWeek("#3");
  renderDayOfWeek("#4");
});

  function daysOfWeek(date) {
    var monday    = _getMonday(date);
    var tuesday   = _nextDay(monday);
    var wednesday = _nextDay(tuesday);
    var thursday  = _nextDay(wednesday);
    var friday    = _nextDay(thursday);

    return _formatDatesArray([monday, tuesday, wednesday, thursday, friday]);
  }

  function chosenDaysOfWeek(date) {
    var monday    = _getChosenMonday(date);
    var tuesday   = _nextDay(monday);
    var wednesday = _nextDay(tuesday);
    var thursday  = _nextDay(wednesday);
    var friday    = _nextDay(thursday);

    return _formatDatesArray([monday, tuesday, wednesday, thursday, friday]);
  }

  function unformattedDaysOfWeek(date) {
    var monday    = _getMonday(date);
    var tuesday   = _nextDay(monday);
    var wednesday = _nextDay(tuesday);
    var thursday  = _nextDay(wednesday);
    var friday    = _nextDay(thursday);

    return [monday, tuesday, wednesday, thursday, friday];
  }

  function unformattedChosenDaysOfWeek(date) {
    var monday    = _getChosenMonday(date);
    var tuesday   = _nextDay(monday);
    var wednesday = _nextDay(tuesday);
    var thursday  = _nextDay(wednesday);
    var friday    = _nextDay(thursday);

    return [monday, tuesday, wednesday, thursday, friday];
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
    var d = new Date();
    var day = d.getDay();
    var diff = d.getDate() - day + (day === 0 ? -6:1);
    return new Date(d.setDate(diff));
  }

  function _getChosenMonday(date) {
    var splitDate = date.split("-");
    date = new Date(splitDate[2], splitDate[1] - 1, splitDate[0]);
    var d = date;
    var day = d.getDay();
    var diff = d.getDate() - day + (day === 0 ? -6:1);
    return new Date(d.setDate(diff));
  }

 function renderDayOfWeek(dayID) {
   var date = daysOfWeek(new Date())[parseInt(dayID[1])];
   var unformattedDate = unformattedDaysOfWeek(new Date())[parseInt(dayID[1])];
   $(dayID).append(" " + date);
   $("." + dayMapper[dayID[1]][0]).attr("data-date", unformattedDate);
   $("." + dayMapper[dayID[1]][1]).attr("data-date", unformattedDate);
 }

 function renderChosenDayOfWeek(dayID, chosenDate) {
   var date = chosenDaysOfWeek(chosenDate)[parseInt(dayID[1])];
   var unformattedDate = unformattedChosenDaysOfWeek(chosenDate)[parseInt(dayID[1])];
   var weekday = $(dayID).text().split("y")[0] + "y";
   $(dayID).empty().append(weekday + " " + date);
   $("." + dayMapper[dayID[1]][0]).attr("data-date", unformattedDate);
   $("." + dayMapper[dayID[1]][1]).attr("data-date", unformattedDate);
 }

 var dayMapper = {
   "0": ["day_0_5", "monday_6"],
   "1": ["day_1_5", "tuesday_6"],
   "2": ["day_2_5", "wednesday_6"],
   "3": ["day_3_5", "thursday_6"],
   "4": ["day_4_5", "friday_6"]
 };

function updateCalendarDates(chosenDate) {
  renderChosenDayOfWeek("#0", chosenDate);
  renderChosenDayOfWeek("#1", chosenDate);
  renderChosenDayOfWeek("#2", chosenDate);
  renderChosenDayOfWeek("#3", chosenDate);
  renderChosenDayOfWeek("#4", chosenDate);
}
