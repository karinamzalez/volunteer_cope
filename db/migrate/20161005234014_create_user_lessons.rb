class CreateUserLessons < ActiveRecord::Migration[5.0]
  def change
    create_table :user_lessons do |t|
      t.references :user, index: true, foreign_key: true
      t.references :lesson, index: true, foreign_key: true

      t.timestamps 
    end
  end
end
