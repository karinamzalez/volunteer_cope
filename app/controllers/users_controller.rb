class UsersController < ApplicationController
  def show
    @lessons = LessonsFacade.new(current_user)
  end
end
