class UserFacade
  attr_reader :user

  def initialize(user)
   @user = user
  end

  def issues
    Issues.repo_issues(user)
  end
end
