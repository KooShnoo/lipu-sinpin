# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

require "open-uri"

User.destroy_all
Post.destroy_all

demo_user = User.create!(
  first_name: 'Demo',
  last_name: 'User',
  email: 'demo@user.com',
  password: 'password'
)

test_post = Post.create!(author_id: demo_user.id, body: "blah blah! i love lipu sinpin!! :D")
test_post.photo.attach(io: URI.open("https://lipu-sinpin-seeds.s3.us-west-1.amazonaws.com/Screenshot+2023-12-19+at+18.23.32.png"), filename: "squirt.png")

Analytic.create! page_serves: 0
