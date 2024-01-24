# rubocop:disable Style/ClassAndModuleChildren
class Api::SessionsController < ApplicationController
  def show
    if current_user
      @user = current_user
      render 'api/users/show'
    else
      render json: nil
    end
  end

  def create
    @user = User.find_by_credentials(params[:email], params[:password])
    # debugger
    if @user
      signin!(@user)
      render 'api/users/show'
    else
      render json: { errors: ['The provided credentials were invalid.'] }, status: :unauthorized
    end
  end

  def destroy
    signout!
    render json: { message: 'success' }
  end
end
# rubocop:enable Style/ClassAndModuleChildren
