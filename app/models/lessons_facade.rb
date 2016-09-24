class LessonsFacade
  attr_reader :user

  def initialize(user)
   @_user = user
  end

  def issues
    Issues.repo_issues(user)
  end

  def current_week_lessons
    Lesson.current_week_lessons_by_day(Date.today)
  end

private
  def user
    @_user
  end
end
