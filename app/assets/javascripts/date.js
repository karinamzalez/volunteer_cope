$(document).ready(function () {
  function daysOfWeek(date) {
    var monday    = _getMonday(date);
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
   var date = daysOfWeek(new Date())[parseInt(dayID[1])];
   var unformattedDate = unformattedDaysOfWeek(new Date())[parseInt(dayID[1])];
   $(dayID).append(" " + date);
   $("." + dayMapper[dayID[1]][0]).attr("data-date", unformattedDate);
   $("." + dayMapper[dayID[1]][1]).attr("data-date", unformattedDate);
  //  add two more of the above for the view lesson button
 }

 var dayMapper = {
   "0": ["day_0_5", "monday_6"],
   "1": ["day_1_5", "tuesday_6"],
   "2": ["day_2_5", "wednesday_6"],
   "3": ["day_3_5", "thursday_6"],
   "4": ["day_4_5", "friday_6"]
 };

 renderDayOfWeek("#0");
 renderDayOfWeek("#1");
 renderDayOfWeek("#2");
 renderDayOfWeek("#3");
 renderDayOfWeek("#4");
});
