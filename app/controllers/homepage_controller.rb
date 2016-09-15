class HomepageController < ApplicationController
  def show
    if current_user
      redirect_to user_index_path 
    else
      render :show
    end
  end
end
