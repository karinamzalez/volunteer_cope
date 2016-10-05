class AddGithubidToLesson < ActiveRecord::Migration[5.0]
  def change
    add_column :lessons, :github_id, :integer
  end
end
