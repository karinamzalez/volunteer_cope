class HomepageController < ApplicationController
  def show
    if current_user
      redirect_to users_path 
    else
      render :show
    end
  end
end
