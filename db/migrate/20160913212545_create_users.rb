class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :uid
      t.string :name
      t.string :email
      t.string :username
      t.string :image
      t.string :oauth_token
      t.string :github

      t.timestamps
    end
  end
end
