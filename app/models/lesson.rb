class Lesson < ApplicationRecord
  def self.create_lesson(title, body)
    `curl -H "Content-Type: application/json" -H "Authorization: token #{ENV['ADMIN_TOKEN']}" --data '{"title":"#{title}", "body":"#{body}"}' https://api.github.com/repos/volunteercope/volunteer_cope/issues`
  end

  def self.add_assignees(users)
    `curl -H "Content-Type: application/json" -H "Authorization: token #{ENV['ADMIN_TOKEN']}" --data '{"assignees":["#{users}"]}' https://api.github.com/repos/volunteercope/volunteer_cope/issues/3`
  end

  def self.current_week_lessons_by_day(date)
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
