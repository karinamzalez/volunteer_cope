class UsersController < ApplicationController
  def index
  end

  def show
    @lessons = LessonsFacade.new(current_user)
  end
end
