json.extract! user, *User.column_names - %w[password_digest session_token]
json.pfpUrl user.pfp.attached? ? user.pfp.url : nil
json.coverUrl user.cover.attached? ? user.cover.url : nil
