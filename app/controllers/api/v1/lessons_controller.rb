class Api::V1::LessonsController < ApplicationController
  skip_before_filter  :verify_authenticity_token

  def create
    lesson = Lesson.create_lesson(lesson_params[:title], lesson_params[:body])
    @lesson = Lesson.new(body: lesson_params[:body], title: lesson_params[:title], date: lesson_params[:date], github_id: lesson[:number], url: lesson[:html_url])
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
    @lesson = Lesson.find_by(github_id: params[:github_id])
    Lesson.add_assignee(current_user.username, params[:github_id])
    user_lesson = UserLesson.create(user: current_user, lesson: @lesson)
    render json: @lesson
  end

  def assignee
    lesson = Lesson.find(params[:id])
    @assignees = lesson.users.last
    render json: @assignees
  end

private

  def lesson_params
    params.require(:lesson).permit(:title, :body, :date)
  end
end
