class LessonsController < ApplicationController


  

  def create
    if params[:title] && params[:body]
      Lesson.new(params)
      Lesson.create_lesson(params[:title], params[:body])
      flash[:success] = "Lesson successfully created!"
    else
      flash[:warning] = "Please fill in the title and description."
    end
    redirect_to user_path(current_user)
  end

  def update
    user = current_user.username
    Lesson.add_assignees(user)
    flash[:success] = "Lesson successfully created!"
    redirect_to user_path(current_user)
  end

  private

  def lesson_params

  end
end
