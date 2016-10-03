class SessionsController < ApplicationController
  def create
    oauth = GithubOauthService.new(params[:code])
    if params[:code] && oauth.authenticated?
      if user = User.from_riniauth(oauth)
         session[:user_id] = user.id
         user.add_as_collaborator
       else
        flash[:danger] = "hmm... sign in went awry :/"
      end
    end
    redirect_to user_path(user.slug)
  end

  def destroy
    session[:user_id] = nil
    flash[:success] = "Goodbye!"
    redirect_to root_path
  end
end
