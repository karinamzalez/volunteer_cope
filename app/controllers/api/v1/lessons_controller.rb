class Api::V1::LessonsController < ApplicationController
  skip_before_filter  :verify_authenticity_token

  def create
    lesson = Lesson.create_lesson(lesson_params[:title], lesson_params[:body])
    @lesson = Lesson.new(body: lesson_params[:body], title: lesson_params[:title], date: lesson_params[:date], github_id: lesson[:number])
    if @lesson.save
      flash.now[:success] = "Lesson successfully created!"
    else
      flash.now[:warning] = "Please fill in the title and description."
    end
    render json: @lesson
  end

  def show
    @lesson = Lesson.find(params[:id])
    render json: @lesson
  end

  def index
    @lessons = Lesson.current_week_lessons_by_day(params[:date])
    render json: @lessons
  end

  def find_lesson_by_date
    date = params[:date].to_datetime
    @lesson = Lesson.where(date: date.beginning_of_day..date.end_of_day).last
    render json: @lesson
  end

  def add_assignee
    @lesson = Lesson.add_assignee(current_user.username, params[:github_id])
    render json: @lesson
  end

private

  def lesson_params
    params.require(:lesson).permit(:title, :body, :date)
  end
end
