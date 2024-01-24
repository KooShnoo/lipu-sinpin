class Like < ApplicationRecord
  validates :liker_id, uniqueness: { scope: [:liked_id] }

  belongs_to :liked, class_name: :Post
  belongs_to :liker, class_name: :User
end
