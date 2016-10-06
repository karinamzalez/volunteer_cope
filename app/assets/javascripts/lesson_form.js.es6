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
    $(".count_me").on('click', function(e){
      e.preventDefault();
      var button = $(this);
      var date = button.siblings().children()[0].getAttribute('data-date');
      $.ajax({
        method: "GET",
        url: "/api/v1/lessons/find_by/" + date,
        success: function(lesson) {
          if(!lesson) {
            alert("Please add a lesson first :)");
          }
          else {
            addAssigneeToIssue(lesson.github_id);
            toggleCountMeIn(button);
            console.log(lesson.github_id);
          }
        }
      });
    });
  };

  var removeAssignees = function() {
    $(".remove").on('click', function(e){
      e.preventDefault();
      var button = $(this);
      var date = button.siblings().children()[0].getAttribute('data-date');
      $.ajax({
        method: "GET",
        url: "/api/v1/lessons/find_by/" + date,
        success: function(lesson) {
          removeLessonAssignee(lesson);
          removeAssigneeFromIssue(lesson.github_id);
          toggleCountMeIn(button);
        }
      });
    });
  };

  var addAssigneeToIssue = function(githubId) {
    $.ajax({
      method: "GET",
      url: "/api/v1/lessons/add_assignee/" + githubId,
      success: function(lesson){
        appendLessonAssignee(lesson);
      }
    });
  };

  var removeAssigneeFromIssue = function(githubId) {
    $.ajax({
      method: "GET",
      url: "/api/v1/lessons/remove/" + githubId,
      success: function(lesson){
        console.log(lesson);
      }
    });
  };

  var toggleCountMeIn = function(button) {
    if(button.attr('class') === "remove") {
      button.replaceWith('<button class="count_me">Count me in! <span class="glyphicon glyphicon-plus-sign"></span></button>');
      addAssignees();
    }
    else {
      button.replaceWith("<button class='remove'>Can't go</button>");
      removeAssignees();
    }
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
            renderAssigneeButtons(lessons);
          }
        });
      }
    });
  }

  function renderAssigneeButtons(lessons) {
    lessons.forEach(function(lesson){
      if(lesson[1] !== null){
        $.ajax({
          method: "GET",
          url: "/api/v1/lessons/user_volunteered/" + lesson[1][0].id,
          data: {lesson_postion: lesson[0]},
          success: function(volunteered){
            var vol = volunteered.lesson_postion;
            var button = $(`.day_${vol}_5`).parent().siblings()[0];
            if(volunteered.yes === true){
              if(button.getAttribute('class') !== 'remove'){
                button.removeAttribute('class');
                button.setAttribute('class', "remove");
                button.innerHtml = "";
                var html = button.innerHTML = "Can't go";
                removeAssignees();
              }
            }
          }
        });
      }
      else {
        var button = $(`.day_${lesson[0]}_5`).parent().siblings()[0];
        if(button.getAttribute('class') === 'remove'){
          button.removeAttribute('class');
          button.setAttribute('class', "count_me");
          button.innerHtml = "";
          var html = button.innerHTML = "Count me in! ";
          var sp1 = document.createElement("span");
          sp1.setAttribute('class', "glyphicon glyphicon-plus-sign");
          button.appendChild(sp1);
          addAssignees();
        }
      }
    });
  }

  function renderViewLessonButtons(lessons) {
    lessons.forEach(function(lesson){
      if(lesson[1] !== null){
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
        if($(".assignees").children()[0] === null) {
          $(".assignees").append(`<img class="volunteer ${assignee.username}" src="${assignee.image}"></img>`);
        }
        else {
          $(".assignees").append(`<img class="volunteer ${assignee.username}" src="${assignee.image}"></img>`);
          if ($(".lesson-title").is(":hidden")) {
            $(".assignees").hide();
          }
        }
      }
    });
  }

  function appendLessonAssignees(lesson) {
    $.ajax({
      method: "GET",
      url: "/api/v1/lessons/assignees/" + lesson.id,
      success: function(assignees){
        for (var i = 0; i < assignees.length; i++) {
          if($(".assignees").children()[0] === null) {
            $(".assignees").append(`<img class="volunteer ${assignees[i].username}" src="${assignees[i].image}"></img>`);
            var user_link = document.createElement("div");
            user_link.setAttribute('class', "user-link");
            user_link.setAttribute('href', "user-link");
            user_link.innerHTML(`assignees[i].username`);
          }
          else {
            var avatar = $(".assignees").append(`<img class="volunteer ${assignees[i].username}" src="${assignees[i].image}"></img>`);
            if ($(".lesson-title").is(":hidden")) {
              $(".assignees").hide();
            }
            var link = document.createElement("div");
            link.setAttribute('class', "user-link");
            var user = `${assignees[i].username}`;
            link.innerHTML = `<a href="${assignees[i].github}">${user}</li>`;
            (avatar[0]).appendChild(link);
          }
        }
      }
    });
  }

  function removeLessonAssignee(lesson) {
    $.ajax({
      method: "GET",
      url: "/api/v1/lessons/assignee/" + lesson.id,
      success: function(assignee){
        $(`.${assignee.username}`).remove();
      }
    });
  }

  function renderLessonAssignees(lesson){
    if($(".assignees").children("IMG").length > 0) {
      $(".assignees").toggle();
    }
    else {
      $.ajax({
        method: "GET",
        url: "/api/v1/all_lessons",
        success: function(lessons){
          console.log(lessons);
          for (var i = 0; i < lessons.length; i++) {
            appendLessonAssignees(lesson);
          }
        }
      });
    }
  }

  calendarWeekLessons();
  viewLesson();
  toggleView(".lesson", "#form");
  addAssignees();
  removeAssignees();
});
