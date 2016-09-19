class UsersController < ApplicationController
  def index
  end

  def show
    @user = UserFacade.new(current_user)
  end
end
