function daysOfWeek(date) {
  var curr = date;
  var monday    = curr.getDate() - curr.getDay() + 1;
  var tuesday   = monday + 1;
  var wednesday = tuesday + 1;
  var thursday  = wednesday + 1;
  var friday    = thursday + 1;

  return [monday, tuesday, wednesday, thursday, friday];
}
