class CreateTables < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :first_name, null: false, index: { unique: true }
      t.string :last_name, null: false, index: { unique: true }
      t.string :email, null: false, index: { unique: true }
      t.string :password_digest, null: false
      t.string :session_token, null: false, index: { unique: true }
      t.string :birthday
      t.string :status
      t.string :location
      t.text :bio

      t.timestamps
    end

    create_table :posts do |t|
      t.belongs_to :author, null: false, index: true, foreign_key: { to_table: :users }
      t.text :body, null: false

      t.timestamps
    end

    create_table :comments do |t|
      t.belongs_to :author, null: false, index: true, foreign_key: { to_table: :users }
      t.belongs_to :post, null: false, index: true, foreign_key: true
      t.text :body, null: false

      t.timestamps
    end

    create_table :friends do |t|
      t.belongs_to :friender, null: false, index: true, foreign_key: { to_table: :users }
      t.belongs_to :friended, null: false, index: true, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
