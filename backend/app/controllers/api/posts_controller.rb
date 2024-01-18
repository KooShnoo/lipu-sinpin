# rubocop:disable Style/ClassAndModuleChildren
class Api::PostsController < ApplicationController
  def index
    @posts = Post.all
  end

  def create
    # TODO: post params
    @post = Post.new(post_params)
    if @post.save
      render :show
    else
      render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    @post = Post.find_by(id: params[:id])
    p @post
    p "wakla :)"
    render :show
  end

  def update
  end

  def destroy
  end

  def post_params
    params.require(:post).permit(:author_id, :body)
  end
end
# rubocop:enable Style/ClassAndModuleChildren
