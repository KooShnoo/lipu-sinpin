class ApplicationController < ActionController::API
  include ActionController::RequestForgeryProtection

  protect_from_forgery with: :exception
  before_action :attach_authenticity_token

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def signin!(user)
    session[:session_token] = user.reset_session_token!
  end

  def signout!
    current_user&.reset_session_token!
    session[:session_token] = nil
    @current_user = nil
  end

  def require_signed_in
    # rubocop:disable Style/GuardClause, Style/IfUnlessModifier
    unless current_user
      render json: { message: 'Must be signed in.' }, status: :unauthorized
    end
    # rubocop:enable Style/GuardClause, Style/IfUnlessModifier
  end

  private

  def attach_authenticity_token
    headers['X-CSRF-Token'] = masked_authenticity_token
  end
end
