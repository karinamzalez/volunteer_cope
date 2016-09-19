class GithubService
  attr_reader :user

  def initialize(user)
    @user = user
    @_conn = Faraday.new(:url => "https://api.github.com")
    @_conn.headers['Authorization'] = "token #{user.oauth_token}"
  end

  def repo_issues
    parse(conn.get("/repos/volunteercope/volunteer_cope/issues"))
  end

private

  def conn
    @_conn
  end

  def parse(response)
    JSON.parse(response.body, symbolize_names: true)
  end
end
