# rubocop:disable Style/ClassAndModuleChildren
class Api::PostsController < ApplicationController
  def index
    @posts = Post.all
  end

  def create
    require_signed_in
    # debugger
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
    unless @post.update(post_params)
      render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
      return
    end
    render :show
  end

  def destroy
    require_signed_in
    @post = Post.find_by(id: params[:id])
    render json: { errors: ["Cannot delete other user's post"] } if @post.author_id != current_user.id
    unless @post.destroy
      render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
      return
    end
    render :show
  end

  def post_params
    params.require(:post).permit(:body)
  end
end
# rubocop:enable Style/ClassAndModuleChildren
