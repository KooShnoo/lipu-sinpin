class Post < ApplicationRecord
  has_one_attached :photo
  validates :body, presence: true, length: { maximum: 1000 }

  belongs_to :author, class_name: :User
  has_many :comments, dependent: :destroy

  has_many :likes, foreign_key: :liked_id, dependent: :destroy
  has_many :likers, through: :likes, dependent: :destroy
end
