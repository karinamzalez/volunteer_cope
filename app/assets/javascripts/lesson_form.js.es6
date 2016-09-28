/*jshint esversion: 6 */
$(document).ready(function () {
  function toggleView (lessonID, formID){
    $(lessonID).on("click", function(e){
      var lesson = e.target;
      var date = lesson.getAttribute("data-date");
      $("#lesson_date").val(date);
      $("#form").toggle();
      createLesson(e.target);
    });
  }

  var createLesson = function(addButton) {
    $("#create_lesson").on("click", function(e) {
      var title = $("#title").val();
      var body = $("#body").val();
      var date = $("#lesson_date").attr("value");
      $.ajax({
        method: "POST",
        url: "/api/v1/lessons",
        data: {lesson: {title: title, body: body, date: date}},
        dataType: "json",
        success: function(lesson) {
          $("#form").toggle();
          addButton.style.display = "none";
          addButton.nextSibling.nextSibling.style.display = "";
          addButton.nextSibling.nextSibling.setAttribute("data-id", lesson.id);
        }
      });
    });
  };

  var viewLesson = function(){
    $(".view-lesson").on("click", function(){
      var id = $(this).data("id");
      $.ajax({
        method: "GET",
        url: "/api/v1/lessons/" + id,
        success: function(lesson) {
          renderLesson(lesson);
          renderLessonBody(lesson);
        }
      });
    });
  };

  function calendarWeekLessons() {
    $("#datepicker").datepicker({
      onSelect: function(dateText) {
        $(this).change();
        var dateTypeVar = $('#datepicker').datepicker('getDate');
        var date = $.datepicker.formatDate('dd-mm-yy', dateTypeVar);
        $.ajax({
          method: "GET",
          url: "/api/v1/lessons/",
          data: {date: date},
          success: function(lessons){
            updateCalendarDates(date);
            renderViewLessonButtons(lessons);
            console.log(lessons);
          }
        });
      }
    });
  }

  function renderViewLessonButtons(lessons) {
    lessons.forEach(function(lesson){
      if(lesson[1] !== null){
        dayLesson = lesson[0] + 1;
        $(`.day_${dayLesson}_5`).removeAttr("data-id");
      }
    });
  }

  function renderLesson(lesson) {
    $(".lesson-title").toggle();
    $(".lesson-title").text(lesson.title);
  }

  function renderLessonBody(lesson) {
    $(".lesson-body").toggle();
    $(".lesson-body").text(lesson.body);
  }

  calendarWeekLessons();
  viewLesson();
  toggleView(".lesson", "#form");
});
