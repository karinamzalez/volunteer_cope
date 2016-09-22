$(document).ready(function () {

  function toggleView (lessonID, formID){
    $(lessonID).on("click", function(e){
      var lesson = e.target;
      var date = lesson.getAttribute("data-date");
      $("#lesson_date").val(date);
      $(formID).toggleClass("hidden");
    });
  }

  var createLesson = function() {
    $("#create_lesson").on("click", function() {
      var title = $("#title").val();
      var body = $("#body").val();
      var date = $("#lesson_date").attr("value");
      console.log(title, body, date);
      $.ajax({
        method: "POST",
        url: "/api/v1/lessons",
        data: {lesson: {title: title, body: body, date: date}},
        dataType: "json",
        success: function(lesson) {
          console.log(lesson);
        }
      });
    });
  };

  createLesson();
  toggleView(".lesson", "#form");
});
