class AddUrlToLesson < ActiveRecord::Migration[5.0]
  def change
    add_column :lessons, :url, :string
  end
end
