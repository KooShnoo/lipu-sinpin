json.extract! post, :id, :author_id, :body, :created_at, :updated_at
json.author do
  json.partial! "api/users/user", user: post.author
  json.extract! post.author, :first_name, :last_name
end
json.photoUrl post.photo.attached? ? post.photo.url : nil
