# rubocop:disable Style/ClassAndModuleChildren
class Api::LikesController < ApplicationController
  def create
    return if require_signed_in
    # debugger
    @like = Like.new(like_params.merge(liker_id: current_user.id))
    if @like.save
      @post = @like.liked
      render 'api/posts/show'
    else
      render json: { errors: @like.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @like = Like.includes(:liked).find_by(liked_id: params[:postId], liker_id: current_user.id)
    # debugger
    if @like.destroy
      @post = @like.liked
      render 'api/posts/show'
    else
      render json: { errors: @like.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def like_params
    params.require(:like).permit(:liked_id)
  end
end
# rubocop:enable Style/ClassAndModuleChildren
