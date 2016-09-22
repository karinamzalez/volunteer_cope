class LessonsController < ApplicationController

  def create
    @lesson = Lesson.new(date: params[:date], body: params[:body], title: params[:title] )
    if @lesson.save
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
    flash[:success] = "successfully assigned to volunteer on!"
    redirect_to user_path(current_user)
  end
end
