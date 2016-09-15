class User < ApplicationRecord
  def self.from_riniauth(oauth)
    auth_info = oauth.get_user
    where(uid: auth_info[:id]).first_or_create do |new_user|
      new_user.uid                = auth_info[:id]
      new_user.name               = auth_info[:name]
      new_user.screen_name        = auth_info[:login]
      new_user.image              = auth_info[:avatar_url]
      new_user.email              = auth_info[:email]
      new_user.github             = auth_info[:html_url]
      new_user.oauth_token        = oauth.access_token
    end
  end
end
