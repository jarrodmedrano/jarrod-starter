-- name: CreateUser :one
INSERT INTO users (
    id,
    email,
    password
) VALUES (
    $1, $2, $3
) RETURNING *;

-- name: GetUser :one
SELECT * FROM users
WHERE id = $1 LIMIT 1;

-- name: GetUserForUpdate :one
SELECT * FROM users
WHERE id = $1 LIMIT 1
FOR NO KEY UPDATE;

-- name: ListUsers :many
SELECT * FROM users
ORDER BY id
LIMIT $1
OFFSET $2;

-- name: UpdateUserEmail :one
UPDATE users
SET email = $2
WHERE id = $1
RETURNING *;

-- name: DeleteUser :exec
DELETE FROM users
WHERE id = $1;

-- Sessions

-- name: CreateSession :one
INSERT INTO sessions (
    user_id,
    session_token,
    expires_at
) VALUES (
    $1, $2, $3
) RETURNING *;

-- name: GetSession :one
SELECT * FROM sessions
WHERE session_token = $1 LIMIT 1;

-- name: ListSessionsForUser :many
SELECT * FROM sessions
WHERE user_id = $1
ORDER BY expires_at DESC
LIMIT $2
OFFSET $3;

-- name: UpdateSessionExpiration :one
UPDATE sessions
SET expires_at = $2
WHERE session_token = $1
RETURNING *;

-- name: DeleteSession :exec
DELETE FROM sessions
WHERE session_token = $1;
