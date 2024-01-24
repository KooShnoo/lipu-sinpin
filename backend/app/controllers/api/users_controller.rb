# rubocop:disable Style/ClassAndModuleChildren
class Api::UsersController < ApplicationController
  def index
    @users = User.order(created_at: :desc).limit(100)
  end

  def create
    @user = User.new(user_params)
    if @user.save
      signin!(@user)
      render :show
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    return if require_signed_in
    @user = current_user
    p 'hehe'
    # debugger
    p params
    if @user.update(user_params)
      render :show
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :birthday, :status, :location, :bio, :pfp, :cover)
  end
end
# rubocop:enable Style/ClassAndModuleChildren
