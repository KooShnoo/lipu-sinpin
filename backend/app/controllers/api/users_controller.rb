# rubocop:disable Style/ClassAndModuleChildren
class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    p @user
    p "ata saka o:"
    p @user.password
    p user_params[:password]
    # debugger
    p ":/"
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
