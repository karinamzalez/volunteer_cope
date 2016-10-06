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

  def user_volunteered(lesson)
    if lesson[0].users.first
      users = lesson[0].users.map do |volunteer|
        volunteer == user
      end
      return users.include?(true)
    else
      return false
    end
  end

private
  def user
    @_user
  end
end
