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

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password)
  end
end
# rubocop:enable Style/ClassAndModuleChildren
