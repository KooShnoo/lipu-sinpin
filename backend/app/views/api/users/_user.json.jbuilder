json.extract! user, *User.column_names - %w[password_digest session_token]