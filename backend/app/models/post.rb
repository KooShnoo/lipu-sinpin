class Post < ApplicationRecord
  validates :body, presence: true, length: { maximum: 1000 }

  belongs_to :author, class_name: 'User'
  has_many :comments, dependent: :destroy
end
