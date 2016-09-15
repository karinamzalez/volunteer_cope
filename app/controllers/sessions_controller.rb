class SessionsController < ApplicationController
  def create
    oauth = GithubOauthService.new(params[:code])
    if params[:code] && oauth.authenticated?
      if user = User.from_riniauth(oauth)
         session[:user_id] = user.id
       else
        flash[:danger] = "sorry, there was an error"
      end
    end
    redirect_to user_path(user)
  end

  def destroy
    session[:user_id] = nil
    flash[:success] = "Goodbye!"
    redirect_to root_path
  end
end
