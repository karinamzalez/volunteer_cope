class GithubService
  attr_reader :user

  def initialize
    @_conn = Faraday.new(:url => "https://api.github.com")
    @_conn.headers['Authorization'] = "token #{ENV['ADMIN_TOKEN']}"
  end

  def repo_issues
    parse(conn.get("/repos/volunteercope/volunteer_cope/issues"))
  end

  def create_lesson(title, body)
    lesson = conn.post do |req|
      req.url '/repos/volunteercope/volunteer_cope/issues'
      req.headers['Content-Type'] = 'application/json'
      req.body = '{ "title": "'"#{title}"'", "body": "'"#{body}"'" }'
    end
    parse(lesson)
  end

  def add_assignee(user, issue_id)
    JSON.parse(`curl -H "Content-Type: application/json" -H "Authorization: token #{ENV['ADMIN_TOKEN']}" --data '{"assignees":["#{user}"]}' https://api.github.com/repos/volunteercope/volunteer_cope/issues/#{issue_id}`, symbolize_names: true)
  end

private

  def conn
    @_conn
  end

  def parse(response)
    JSON.parse(response.body, symbolize_names: true)
  end
end
