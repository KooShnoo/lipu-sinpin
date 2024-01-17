# rubocop:disable Style/ClassAndModuleChildren
class Api::PostsController < ApplicationController
  def index
  end

  def create
    # TODO: post params
    @post = Post.new(post_params)
    if @post.save
      signin!(@post)
      render :show
    else
      render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
  end

  def update
  end

  def destroy
  end
end
# rubocop:enable Style/ClassAndModuleChildren
