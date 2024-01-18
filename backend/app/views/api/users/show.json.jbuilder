json.user do
  # json.extract! @user, *User.column_names - %w[password_digest session_token]
  json.partial! "api/users/user", user: @user
end
