class Lesson < ApplicationRecord
  def self.create_lesson(title, body)
    `curl -H "Content-Type: application/json" -H "Authorization: token #{ENV['ADMIN_TOKEN']}" --data '{"title":"#{title}", "body":"#{body}"}' https://api.github.com/repos/volunteercope/volunteer_cope/issues`
  end

  def self.add_assignees(users)
    `curl -H "Content-Type: application/json" -H "Authorization: token #{ENV['ADMIN_TOKEN']}" --data '{"assignees":["#{users}"]}' https://api.github.com/repos/volunteercope/volunteer_cope/issues/3`
  end
end
