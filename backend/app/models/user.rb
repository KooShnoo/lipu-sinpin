class User < ApplicationRecord
  has_secure_password
  has_one_attached :pfp
  has_one_attached :cover
  before_validation :ensure_session_token

  validates :first_name, presence: true, length: { maximum: 40 }
  validates :last_name, presence: true, length: { maximum: 40 }
  validates :email,
            presence: true,
            uniqueness: true,
            length: { in: 3..100 },
            format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { in: 6..40 }, allow_nil: true
  validates :password_digest, presence: true

  has_many :posts, foreign_key: :author_id, dependent: :destroy
  has_many :comments, foreign_key: :author_id, dependent: :destroy

  has_many :friendships, foreign_key: :friender_id, class_name: :Friend, dependent: :destroy
  has_many :friends, through: :friendships, source: :friended

  has_many :likes, foreign_key: :liker_id, dependent: :destroy
  has_many :liked, through: :likes, dependent: :destroy

  def self.find_by_credentials(email, password)
    user = User.find_by_email(email)
    # from has_secure_password
    user&.authenticate(password)
  end

  def reset_session_token!
    update!(session_token: generate_unique_session_token)
    session_token
  end

  private

  def generate_unique_session_token
    # rubocop:disable all
    token = SecureRandom.base64
    until !User.exists?(session_token: token)
      token = SecureRandom.base64
    end
    token
    # rubocop:enable all
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end
end
