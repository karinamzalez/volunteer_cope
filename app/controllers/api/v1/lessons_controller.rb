class Api::V1::LessonsController < ApplicationController
  skip_before_filter  :verify_authenticity_token

  def create
    @lesson = Lesson.new(lesson_params)
    if @lesson.save
      Lesson.create_lesson(lesson_params[:title], lesson_params[:body])
      flash[:success] = "Lesson successfully created!"
    else
      flash[:warning] = "Please fill in the title and description."
    end
    render json: @lesson
  end

  def show
    @lesson = Lesson.find(params[:id])
    render json: @lesson
  end

private

  def lesson_params
    params.require(:lesson).permit(:title, :body, :date)
  end
end
