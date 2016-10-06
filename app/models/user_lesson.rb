class UserLesson < ApplicationRecord
  before_create :lesson_not_associated_w_user?

  belongs_to :user
  belongs_to :lesson

  private

  def lesson_not_associated_w_user?
    if UserLesson.find_by(user_id: user_id)
      return false
    else
      return true
    end
  end
end
