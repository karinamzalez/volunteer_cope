class HomepageController < ApplicationController
  def show
    if current_user
      redirect_to user_path(current_user.slug) 
    else
      render :show
    end
  end
end
