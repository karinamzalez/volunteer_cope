require 'net/http'

class GithubOauthService
  attr_reader :access_token

  def initialize(code)
    @token_response  = get_access_token(code)
    @access_token    = parse_access_token
  end

  def authenticated?
    @token_response.body.include?("access_token") ? true : false
  end

  def get_user
    uri = URI('https://api.github.com/user')
    params = { :access_token => access_token }
    uri.query = URI.encode_www_form(params)

    res = Net::HTTP.get_response(uri)
    user = res.body if res.is_a?(Net::HTTPSuccess)
    parse_user(user)
  end

  private

  def get_access_token(code)
    uri = URI('https://github.com/login/oauth/access_token')

    login_request = Net::HTTP::Post.new(uri)
    login_request.set_form_data(token_params(code))
    login_request.basic_auth ENV["GITHUB_CLIENT_ID"], ENV["GITHUB_CLIENT_SECRET"]

    Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == "https") do |http|
      http.request(login_request)
    end
  end

  def parse_user(user)
    JSON.parse(user, symbolize_names: true)
  end

  def parse_access_token
    @token_response.body.split("=")[1].split("&")[0]
  end

  def token_params(code)
    { "grant_type" => "authorization_code",
      "code" => code,
      "redirect_uri" => "http://127.0.0.1:3000/auth/github/callback",
      "Content-Type" => "application/x-www-form-urlencoded"
    }
  end
end
