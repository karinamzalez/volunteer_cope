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
    date = 
    Lesson.add_assignees(user)
    flash[:success] = "successfully assigned to volunteer on #{date}!"
    redirect_to user_path(current_user)
  end

  private

  # def lesson_params
  #   require(:lesson).permit(:title, :body, :date)
  # end
end
