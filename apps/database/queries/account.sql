-- Users
-- name: CreateUser :one
INSERT INTO users (name, email, "emailVerified", "isTwoFactorEnabled", "twoFactorConfirmation")
VALUES ($1, $2, $3, $4, $5)
RETURNING *;

-- name: GetUser :one
SELECT * FROM users WHERE id = $1 LIMIT 1;

-- name: GetUserByEmail :one
SELECT * FROM users WHERE email = $1 LIMIT 1;

-- name: GetUsersByRole :many
SELECT * FROM users WHERE "role" = $1 ORDER BY id LIMIT $2 OFFSET $3;

-- name: GetUserForUpdate :one
SELECT * FROM users WHERE id = $1 LIMIT 1 FOR NO KEY UPDATE;

-- name: ListUsers :many
SELECT * FROM users ORDER BY id LIMIT $1 OFFSET $2;

-- name: UpdateUser :one
UPDATE users SET
  name = COALESCE($2, name),
  email = COALESCE($3, email),
  "emailVerified" = COALESCE($4, "emailVerified"),
  image = COALESCE($5, image),
  "password" = COALESCE($6, "password"),
  "role" = COALESCE($7, "role"),
  "isTwoFactorEnabled" = COALESCE($8, "isTwoFactorEnabled"),
  "twoFactorConfirmation" = COALESCE($9, "twoFactorConfirmation")
WHERE id = $1
RETURNING *;

-- name: UpdateUserEmail :one
UPDATE users SET email = $2, "emailVerified" = NULL -- reset emailVerified when changing email
WHERE id = $1 RETURNING *;

-- name: DeleteUser :exec
DELETE FROM users WHERE id = $1;

-- Sessions
-- name: CreateSession :one
INSERT INTO sessions ("userId", "sessionToken", expires)
VALUES ($1, $2, $3)
RETURNING *;

-- name: GetSession :one
SELECT * FROM sessions WHERE "sessionToken" = $1 LIMIT 1;

-- name: ListSessionsForUser :many
SELECT * FROM sessions WHERE "userId" = $1 ORDER BY expires DESC LIMIT $2 OFFSET $3;

-- name: UpdateSessionExpiration :one
UPDATE sessions SET expires = $2 WHERE "sessionToken" = $1 RETURNING *;

-- name: DeleteSession :exec
DELETE FROM sessions WHERE "sessionToken" = $1;

-- Accounts
-- name: CreateAccount :one
INSERT INTO accounts ("userId", type, provider, "providerAccountId", refresh_token, access_token, expires_at, id_token, scope, session_state, token_type)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
RETURNING *;

-- name: GetAccount :one
SELECT * FROM accounts WHERE id = $1 LIMIT 1;

-- name: ListAccountsForUser :many
SELECT * FROM accounts WHERE "userId" = $1 ORDER BY id LIMIT $2 OFFSET $3;

-- name: UpdateAccount :one
UPDATE accounts SET refresh_token = $2, access_token = $3, expires_at = $4, id_token = $5, scope = $6, session_state = $7, token_type = $8
WHERE id = $1 RETURNING *;

-- name: DeleteAccount :exec
DELETE FROM accounts WHERE id = $1;

-- VerificationTokens
-- name: CreateVerificationToken :one
INSERT INTO verification_token (identifier, token, expires)
VALUES ($1, $2, $3)
RETURNING *;

-- name: GetVerificationToken :one
SELECT * FROM verification_token WHERE identifier = $1 AND token = $2 LIMIT 1;

-- name: DeleteVerificationToken :exec
DELETE FROM verification_token WHERE identifier = $1 AND token = $2;



-- name: CreateTwoFactorToken :one
INSERT INTO two_factor_token ("userId", token, expires)
VALUES ($1, $2, $3)
RETURNING *;

-- name: GetTwoFactorToken :one
SELECT * FROM two_factor_token WHERE "userId" = $1 AND token = $2 LIMIT 1;

-- name: DeleteTwoFactorToken :exec
DELETE FROM two_factor_token WHERE "userId" = $1 AND token = $2;


-- name: CreateTwoFactorConfirmation :one
INSERT INTO two_factor_confirmation ("userId", confirmation, expires)
VALUES ($1, $2, $3)
RETURNING *;

-- name: GetTwoFactorConfirmation :one
SELECT * FROM two_factor_confirmation WHERE "userId" = $1 AND confirmation = $2 LIMIT 1;

-- name: DeleteTwoFactorConfirmation :exec
DELETE FROM two_factor_confirmation WHERE "userId" = $1 AND confirmation = $2;
