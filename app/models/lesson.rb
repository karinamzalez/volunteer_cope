class Lesson < ApplicationRecord
  has_many :user_lessons
  has_many :users, through: :user_lessons
  
  def self.service
    @@service ||= GithubService.new
  end

  def self.create_lesson(title, body)
    service.create_lesson(title, body)
  end

  def self.add_assignee(user, github_id)
    service.add_assignee(user, github_id)
  end

  def self.current_week_lessons_by_day(date)
    if date.class == String
      date = Date.parse(date)
    end
    monday = date.at_beginning_of_week + 1
    friday = date.at_end_of_week - 1
    current_week_lessons = Lesson.where(:date => monday..friday)
    lessons = current_week_lessons.group_by {|lesson| lesson.date.wday-1}
    (0..4).to_a.map do |num|
      if !lessons[num]
        lessons[num] = nil
      end
    end
    lessons.to_a.sort
  end
end
