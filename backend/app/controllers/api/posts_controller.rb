# rubocop:disable Style/ClassAndModuleChildren
class Api::PostsController < ApplicationController
  def index
    @posts = Post.order(created_at: :desc).limit(100)
  end

  def create
    require_signed_in
    @post = Post.new(post_params.merge(author_id: current_user.id))
    if @post.save
      render :show
    else
      render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    @post = Post.find_by(id: params[:id])
    render :show
  end

  def update
    require_signed_in
    @post = Post.find_by(id: params[:id])
    render json: { errors: ["Cannot edit other user's post"] } if @post.author_id != current_user.id
    if @post.update(post_params)
      render :show
    else
      render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    require_signed_in
    @post = Post.find_by(id: params[:id])
    render json: { errors: ["Cannot delete other user's post"] } if @post.author_id != current_user.id
    if @post.destroy
      render :show
    else
      render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def post_params
    params.require(:post).permit(:body, :photo)
  end
end
# rubocop:enable Style/ClassAndModuleChildren
