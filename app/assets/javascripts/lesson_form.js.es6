/*jshint esversion: 6 */
$(document).ready(function () {
  function toggleView (lessonID, formID){
    $(lessonID).on("click", function(e){
      console.log("apple");
      var lesson = e.target;
      var date = lesson.getAttribute("data-date");
      $("#lesson_date").val(date);
      $("#form").toggle();
      createLesson(e.target);
    });
  }

  var addAssignees = function() {
    //cant volunteer if no lesson present
    //if they try to count themselve in add pop up that urges you to create lesson first
    //
    $(".count_me").on('click', function(e){
      e.preventDefault();
      var button = $(this);
      var date = button.siblings().children()[0].getAttribute('data-date');
      $.ajax({
        method: "GET",
        url: "/api/v1/lessons/find_by/" + date,
        success: function(lesson) {
          addAssigneeToIssue(lesson.github_id);
          toggleCountMeIn(button);
          console.log(lesson.github_id);
        }
      });
    });
  };

  var addAssigneeToIssue = function(githubId) {
    $.ajax({
      method: "GET",
      url: "/api/v1/lessons/add_assignee/" + githubId,
      success: function(lesson){
        console.log(lesson);
        appendLessonAssignee(lesson);
      }
    });
  };

  var toggleCountMeIn = function(button) {
    button.replaceWith("<p>yay!</p>");
};

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
      var id = this.getAttribute("data-id");
      $.ajax({
        method: "GET",
        url: "/api/v1/lessons/" + id,
        success: function(lesson) {
          renderLesson(lesson);
          renderLessonBody(lesson);
          renderLessonAssignees(lesson);
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
          }
        });
      }
    });
  }

  function renderViewLessonButtons(lessons) {
    lessons.forEach(function(lesson){
      if(lesson[1] !== null){
        console.log(lesson[1]);
        if ($(`.day_${lesson[0]}_5`).length === 1) {
          var viewLesson = $(`.day_${lesson[0]}_5`)[0];
          viewLesson.removeAttribute("data-id");
          viewLesson.setAttribute("data-id", lesson[1][lesson[1].length - 1].id);
        }
        else {
          var viewLesson2 = $(`.day_${lesson[0]}_5`)[1];
          viewLesson2.setAttribute("data-id", lesson[1][lesson[1].length - 1].id);
          viewLesson2.style.display = "";
          $(`.day_${lesson[0]}_5`)[0].remove();
        }
      }
      else {
        var lessonButton = $(`.day_${lesson[0]}_5`)[0];
        lessonButton.removeAttribute("data-id");
        lessonButton.style.display = "none";
        var date = $(lessonButton).data("date");
        $(lessonButton).before('<button type="button" class="day_' + lesson[0] + '_5 btn btn-lesson btn-sm lesson" data-date="'+ date +'">Add Lesson</button>');
        toggleView(".lesson", "#form");
      }
    });
  }

  function renderLesson(lesson) {
    $(".lesson-title").toggle();
    $(".lesson-title").text(lesson.title);
    $(".lesson-link").attr("href", lesson.url);
  }

  function renderLessonBody(lesson) {
    $(".lesson-body").toggle();
    $(".lesson-body").text(lesson.body);
  }

  function appendLessonAssignee(lesson) {
    $.ajax({
      method: "GET",
      url: "/api/v1/lessons/assignee/" + lesson.id,
      success: function(assignee){
        $(".assignees").append(`<img src="${assignee.image}"></img>`);
        $(".assignees").toggle();
      }
    });
  }

  function renderLessonAssignees(){
    $(".assignees").toggle();
  }

  calendarWeekLessons();
  viewLesson();
  toggleView(".lesson", "#form");
  addAssignees();
});
