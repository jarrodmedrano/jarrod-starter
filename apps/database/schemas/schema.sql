CREATE TABLE verification_token (
    identifier TEXT NOT NULL,
    expires TIMESTAMPTZ NOT NULL,
    token TEXT NOT NULL,
    PRIMARY KEY (identifier, token)
);

CREATE TABLE accounts (
    id SERIAL,
    "userId" INTEGER NOT NULL,
    type VARCHAR(255) NOT NULL,
    provider VARCHAR(255) NOT NULL,
    "providerAccountId" VARCHAR(255) NOT NULL,
    refresh_token TEXT,
    access_token TEXT,
    expires_at BIGINT,
    id_token TEXT,
    scope TEXT,
    session_state TEXT,
    token_type TEXT,
    PRIMARY KEY (id)
);

CREATE TABLE sessions (
    id SERIAL,
    "userId" INTEGER NOT NULL,
    expires TIMESTAMPTZ NOT NULL,
    "sessionToken" VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE users (
    id SERIAL,
    name VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE,
    "emailVerified" TIMESTAMPTZ,
    image TEXT,
    "password" TEXT,
    "role" TEXT,
    "isTwoFactorEnabled" BOOLEAN,
    "twoFactorConfirmation" TEXT,
    "isAdmin" BOOLEAN,
    PRIMARY KEY (id)
);

-- Create a new type for Role
CREATE TYPE "Role" AS ENUM ('admin', 'user');

-- Add a CHECK constraint to ensure role is either 'admin' or 'user'
ALTER TABLE users ADD CONSTRAINT "user_role_check" CHECK ("role" IN ('admin', 'user'));


-- TwoFactorConfirmations
CREATE TABLE two_factor_confirmation (
    "userId" INTEGER NOT NULL,
    confirmation TEXT NOT NULL,
    expires TIMESTAMPTZ NOT NULL,
    PRIMARY KEY ("userId", confirmation)
);


-- TwoFactorTokens
CREATE TABLE two_factor_token (
    "userId" INTEGER NOT NULL,
    token TEXT NOT NULL,
    expires TIMESTAMPTZ NOT NULL,
    PRIMARY KEY ("userId", token)
);
