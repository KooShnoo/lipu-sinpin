class User < ApplicationRecord
  has_secure_password

  validates :first_name, length: { maximum: 40 }
  validates :last_name, length: { maximum: 40 }
  validates :email, uniqueness: true, length: { in: 3..100 }, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { in: 6..40 }, allow_nil: true

  before_validation :ensure_session_token

  has_many :posts, foreign_key: :author_id, dependent: :destroy
  has_many :comments, foreign_key: :author_id, dependent: :destroy

  has_many :friendships, foreign_key: :friender_id, class_name: 'Friend', dependent: :destroy
  has_many :friends, through: :friendships, source: :friended

  def self.find_by_email(email, password)
    user = User.find_by(email)
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
    until !User.exists?(session_token: token)
      token = SecureRandom.base64
    end
    # rubocop:enable all
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end
end
