class Lesson < ApplicationRecord
  def self.create_lesson(title, body)
    `curl -H "Content-Type: application/json" -H "Authorization: token #{ENV['ADMIN_TOKEN']}" --data '{"title":"#{title}", "body":"#{body}"}' https://api.github.com/repos/volunteercope/volunteer_cope/issues`
  end
end
