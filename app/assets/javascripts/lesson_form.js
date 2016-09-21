$(document).ready(function () {

  function toggleView (lessonID, formID){
    $(lessonID).on("click", function(){
      $(formID).toggleClass("hidden");
    });
  }

  toggleView("#lesson", "#form");
});
