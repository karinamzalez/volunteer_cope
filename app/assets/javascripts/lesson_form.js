$(document).ready(function () {

  function toggleView (lessonID, formID){
    $(lessonID).on("click", function(e){
      var lesson = e.target;
      var date = lesson.getAttribute("data-date");
      $("#lesson_date").val(date);
      $(formID).toggleClass("hidden");
    });
  }

  toggleView(".lesson", "#form");
});
