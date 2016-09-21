class User < ApplicationRecord
  def self.from_riniauth(oauth)
    auth_info = oauth.get_user
    user = where(uid: auth_info[:id]).first_or_create do |new_user|
      new_user.uid                = auth_info[:id]
      new_user.name               = auth_info[:name]
      new_user.email              = auth_info[:email]
      new_user.username           = auth_info[:login]
      new_user.image              = auth_info[:avatar_url]
      new_user.github             = auth_info[:html_url]
    end
    user.oauth_token = oauth.access_token
    user.save
    user
  end

  def add_as_collaborator
    `curl -X PUT -H "Authorization: token #{ENV['ADMIN_TOKEN']}" -H "Cache-Control: no-cache" "https://api.github.com/repos/volunteercope/volunteer_cope/collaborators/#{username}"`
  end
end
