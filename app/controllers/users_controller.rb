class UsersController < ApplicationController
  def index
  end

  def show
    @user = current_user
    @issues = Issues.repo_issues(current_user)
  end
end
