class LessonsController < ApplicationController
  def create
    if params[:title] && params[:body]
      Lesson.create_lesson(params[:title], params[:body])
      flash[:success] = "Lesson successfully created!"
    else
      flash[:warning] = "Please fill in the title and description."
    end
    redirect_to user_path(current_user)
  end
end
