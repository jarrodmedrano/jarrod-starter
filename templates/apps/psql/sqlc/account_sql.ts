import { QueryArrayConfig, QueryArrayResult } from "pg";

interface Client {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    query: (config: QueryArrayConfig) => Promise<QueryArrayResult>;
}

export const createUserQuery = `-- name: CreateUser :one
INSERT INTO users (name, email, "emailVerified", "isTwoFactorEnabled", "twoFactorConfirmation", "password", "role", "locale")
VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING id, name, email, "emailVerified", image, password, role, "isTwoFactorEnabled", "twoFactorConfirmation", "isAdmin", locale`;

export interface CreateUserArgs {
    name: string | null;
    email: string | null;
    emailverified: Date | null;
    istwofactorenabled: boolean | null;
    twofactorconfirmation: string | null;
    password: string | null;
    role: string | null;
    locale: string | null;
}

export interface CreateUserRow {
    id: number;
    name: string | null;
    email: string | null;
    emailverified: Date | null;
    image: string | null;
    password: string | null;
    role: string | null;
    istwofactorenabled: boolean | null;
    twofactorconfirmation: string | null;
    isadmin: boolean | null;
    locale: string | null;
}

export async function createUser(client: Client, args: CreateUserArgs): Promise<CreateUserRow | null> {
    const result = await client.query({
        text: createUserQuery,
        values: [args.name, args.email, args.emailverified, args.istwofactorenabled, args.twofactorconfirmation, args.password, args.role, args.locale],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        id: row[0],
        name: row[1],
        email: row[2],
        emailverified: row[3],
        image: row[4],
        password: row[5],
        role: row[6],
        istwofactorenabled: row[7],
        twofactorconfirmation: row[8],
        isadmin: row[9],
        locale: row[10]
    };
}

export const getUserQuery = `-- name: GetUser :one
SELECT id, name, email, "emailVerified", image, password, role, "isTwoFactorEnabled", "twoFactorConfirmation", "isAdmin", locale FROM users WHERE id = $1 LIMIT 1`;

export interface GetUserArgs {
    id: number;
}

export interface GetUserRow {
    id: number;
    name: string | null;
    email: string | null;
    emailverified: Date | null;
    image: string | null;
    password: string | null;
    role: string | null;
    istwofactorenabled: boolean | null;
    twofactorconfirmation: string | null;
    isadmin: boolean | null;
    locale: string | null;
}

export async function getUser(client: Client, args: GetUserArgs): Promise<GetUserRow | null> {
    const result = await client.query({
        text: getUserQuery,
        values: [args.id],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        id: row[0],
        name: row[1],
        email: row[2],
        emailverified: row[3],
        image: row[4],
        password: row[5],
        role: row[6],
        istwofactorenabled: row[7],
        twofactorconfirmation: row[8],
        isadmin: row[9],
        locale: row[10]
    };
}

export const getUserByEmailQuery = `-- name: GetUserByEmail :one
SELECT id, name, email, "emailVerified", image, password, role, "isTwoFactorEnabled", "twoFactorConfirmation", "isAdmin", locale FROM users WHERE email = $1 LIMIT 1`;

export interface GetUserByEmailArgs {
    email: string | null;
}

export interface GetUserByEmailRow {
    id: number;
    name: string | null;
    email: string | null;
    emailverified: Date | null;
    image: string | null;
    password: string | null;
    role: string | null;
    istwofactorenabled: boolean | null;
    twofactorconfirmation: string | null;
    isadmin: boolean | null;
    locale: string | null;
}

export async function getUserByEmail(client: Client, args: GetUserByEmailArgs): Promise<GetUserByEmailRow | null> {
    const result = await client.query({
        text: getUserByEmailQuery,
        values: [args.email],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        id: row[0],
        name: row[1],
        email: row[2],
        emailverified: row[3],
        image: row[4],
        password: row[5],
        role: row[6],
        istwofactorenabled: row[7],
        twofactorconfirmation: row[8],
        isadmin: row[9],
        locale: row[10]
    };
}

export const getUsersByRoleQuery = `-- name: GetUsersByRole :many
SELECT id, name, email, "emailVerified", image, password, role, "isTwoFactorEnabled", "twoFactorConfirmation", "isAdmin", locale FROM users WHERE "role" = $1 ORDER BY id LIMIT $2 OFFSET $3`;

export interface GetUsersByRoleArgs {
    role: string | null;
    limit: string;
    offset: string;
}

export interface GetUsersByRoleRow {
    id: number;
    name: string | null;
    email: string | null;
    emailverified: Date | null;
    image: string | null;
    password: string | null;
    role: string | null;
    istwofactorenabled: boolean | null;
    twofactorconfirmation: string | null;
    isadmin: boolean | null;
    locale: string | null;
}

export async function getUsersByRole(client: Client, args: GetUsersByRoleArgs): Promise<GetUsersByRoleRow[]> {
    const result = await client.query({
        text: getUsersByRoleQuery,
        values: [args.role, args.limit, args.offset],
        rowMode: "array"
    });
    return result.rows.map(row => {
        return {
            id: row[0],
            name: row[1],
            email: row[2],
            emailverified: row[3],
            image: row[4],
            password: row[5],
            role: row[6],
            istwofactorenabled: row[7],
            twofactorconfirmation: row[8],
            isadmin: row[9],
            locale: row[10]
        };
    });
}

export const getUserForUpdateQuery = `-- name: GetUserForUpdate :one
SELECT id, name, email, "emailVerified", image, password, role, "isTwoFactorEnabled", "twoFactorConfirmation", "isAdmin", locale FROM users WHERE id = $1 LIMIT 1 FOR NO KEY UPDATE`;

export interface GetUserForUpdateArgs {
    id: number;
}

export interface GetUserForUpdateRow {
    id: number;
    name: string | null;
    email: string | null;
    emailverified: Date | null;
    image: string | null;
    password: string | null;
    role: string | null;
    istwofactorenabled: boolean | null;
    twofactorconfirmation: string | null;
    isadmin: boolean | null;
    locale: string | null;
}

export async function getUserForUpdate(client: Client, args: GetUserForUpdateArgs): Promise<GetUserForUpdateRow | null> {
    const result = await client.query({
        text: getUserForUpdateQuery,
        values: [args.id],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        id: row[0],
        name: row[1],
        email: row[2],
        emailverified: row[3],
        image: row[4],
        password: row[5],
        role: row[6],
        istwofactorenabled: row[7],
        twofactorconfirmation: row[8],
        isadmin: row[9],
        locale: row[10]
    };
}

export const listUsersQuery = `-- name: ListUsers :many
SELECT id, name, email, "emailVerified", image, password, role, "isTwoFactorEnabled", "twoFactorConfirmation", "isAdmin", locale FROM users ORDER BY id LIMIT $1 OFFSET $2`;

export interface ListUsersArgs {
    limit: string;
    offset: string;
}

export interface ListUsersRow {
    id: number;
    name: string | null;
    email: string | null;
    emailverified: Date | null;
    image: string | null;
    password: string | null;
    role: string | null;
    istwofactorenabled: boolean | null;
    twofactorconfirmation: string | null;
    isadmin: boolean | null;
    locale: string | null;
}

export async function listUsers(client: Client, args: ListUsersArgs): Promise<ListUsersRow[]> {
    const result = await client.query({
        text: listUsersQuery,
        values: [args.limit, args.offset],
        rowMode: "array"
    });
    return result.rows.map(row => {
        return {
            id: row[0],
            name: row[1],
            email: row[2],
            emailverified: row[3],
            image: row[4],
            password: row[5],
            role: row[6],
            istwofactorenabled: row[7],
            twofactorconfirmation: row[8],
            isadmin: row[9],
            locale: row[10]
        };
    });
}

export const updateUserQuery = `-- name: UpdateUser :one
UPDATE users SET
  name = COALESCE($2, name),
  email = COALESCE($3, email),
  "emailVerified" = COALESCE($4, "emailVerified"),
  image = COALESCE($5, image),
  "password" = COALESCE($6, "password"),
  "role" = COALESCE($7, "role"),
  "isTwoFactorEnabled" = COALESCE($8, "isTwoFactorEnabled"),
  "twoFactorConfirmation" = COALESCE($9, "twoFactorConfirmation"),
  "locale" = COALESCE($10, 'en')
WHERE id = $1
RETURNING id, name, email, "emailVerified", image, password, role, "isTwoFactorEnabled", "twoFactorConfirmation", "isAdmin", locale`;

export interface UpdateUserArgs {
    id: number;
    name: string | null;
    email: string | null;
    emailverified: Date | null;
    image: string | null;
    password: string | null;
    role: string | null;
    istwofactorenabled: boolean | null;
    twofactorconfirmation: string | null;
    locale: string | null;
}

export interface UpdateUserRow {
    id: number;
    name: string | null;
    email: string | null;
    emailverified: Date | null;
    image: string | null;
    password: string | null;
    role: string | null;
    istwofactorenabled: boolean | null;
    twofactorconfirmation: string | null;
    isadmin: boolean | null;
    locale: string | null;
}

export async function updateUser(client: Client, args: UpdateUserArgs): Promise<UpdateUserRow | null> {
    const result = await client.query({
        text: updateUserQuery,
        values: [args.id, args.name, args.email, args.emailverified, args.image, args.password, args.role, args.istwofactorenabled, args.twofactorconfirmation, args.locale],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        id: row[0],
        name: row[1],
        email: row[2],
        emailverified: row[3],
        image: row[4],
        password: row[5],
        role: row[6],
        istwofactorenabled: row[7],
        twofactorconfirmation: row[8],
        isadmin: row[9],
        locale: row[10]
    };
}

export const updateUserLocaleQuery = `-- name: UpdateUserLocale :exec
UPDATE users
SET "locale" = COALESCE($2, 'en')
WHERE id = $1`;

export interface UpdateUserLocaleArgs {
    id: number;
    locale: string | null;
}

export async function updateUserLocale(client: Client, args: UpdateUserLocaleArgs): Promise<void> {
    await client.query({
        text: updateUserLocaleQuery,
        values: [args.id, args.locale],
        rowMode: "array"
    });
}

export const updateUserEmailQuery = `-- name: UpdateUserEmail :one
UPDATE users SET email = $2, "emailVerified" = NULL -- reset emailVerified when changing email
WHERE id = $1 RETURNING id, name, email, "emailVerified", image, password, role, "isTwoFactorEnabled", "twoFactorConfirmation", "isAdmin", locale`;

export interface UpdateUserEmailArgs {
    id: number;
    email: string | null;
}

export interface UpdateUserEmailRow {
    id: number;
    name: string | null;
    email: string | null;
    emailverified: Date | null;
    image: string | null;
    password: string | null;
    role: string | null;
    istwofactorenabled: boolean | null;
    twofactorconfirmation: string | null;
    isadmin: boolean | null;
    locale: string | null;
}

export async function updateUserEmail(client: Client, args: UpdateUserEmailArgs): Promise<UpdateUserEmailRow | null> {
    const result = await client.query({
        text: updateUserEmailQuery,
        values: [args.id, args.email],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        id: row[0],
        name: row[1],
        email: row[2],
        emailverified: row[3],
        image: row[4],
        password: row[5],
        role: row[6],
        istwofactorenabled: row[7],
        twofactorconfirmation: row[8],
        isadmin: row[9],
        locale: row[10]
    };
}

export const deleteUserQuery = `-- name: DeleteUser :exec
DELETE FROM users WHERE id = $1`;

export interface DeleteUserArgs {
    id: number;
}

export async function deleteUser(client: Client, args: DeleteUserArgs): Promise<void> {
    await client.query({
        text: deleteUserQuery,
        values: [args.id],
        rowMode: "array"
    });
}

export const createSessionQuery = `-- name: CreateSession :one
INSERT INTO sessions ("userId", "sessionToken", expires)
VALUES ($1, $2, $3)
RETURNING id, "userId", expires, "sessionToken"`;

export interface CreateSessionArgs {
    userid: number;
    sessiontoken: string;
    expires: Date;
}

export interface CreateSessionRow {
    id: number;
    userid: number;
    expires: Date;
    sessiontoken: string;
}

export async function createSession(client: Client, args: CreateSessionArgs): Promise<CreateSessionRow | null> {
    const result = await client.query({
        text: createSessionQuery,
        values: [args.userid, args.sessiontoken, args.expires],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        id: row[0],
        userid: row[1],
        expires: row[2],
        sessiontoken: row[3]
    };
}

export const getSessionQuery = `-- name: GetSession :one
SELECT id, "userId", expires, "sessionToken" FROM sessions WHERE "sessionToken" = $1 LIMIT 1`;

export interface GetSessionArgs {
    sessiontoken: string;
}

export interface GetSessionRow {
    id: number;
    userid: number;
    expires: Date;
    sessiontoken: string;
}

export async function getSession(client: Client, args: GetSessionArgs): Promise<GetSessionRow | null> {
    const result = await client.query({
        text: getSessionQuery,
        values: [args.sessiontoken],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        id: row[0],
        userid: row[1],
        expires: row[2],
        sessiontoken: row[3]
    };
}

export const listSessionsForUserQuery = `-- name: ListSessionsForUser :many
SELECT id, "userId", expires, "sessionToken" FROM sessions WHERE "userId" = $1 ORDER BY expires DESC LIMIT $2 OFFSET $3`;

export interface ListSessionsForUserArgs {
    userid: number;
    limit: string;
    offset: string;
}

export interface ListSessionsForUserRow {
    id: number;
    userid: number;
    expires: Date;
    sessiontoken: string;
}

export async function listSessionsForUser(client: Client, args: ListSessionsForUserArgs): Promise<ListSessionsForUserRow[]> {
    const result = await client.query({
        text: listSessionsForUserQuery,
        values: [args.userid, args.limit, args.offset],
        rowMode: "array"
    });
    return result.rows.map(row => {
        return {
            id: row[0],
            userid: row[1],
            expires: row[2],
            sessiontoken: row[3]
        };
    });
}

export const updateSessionExpirationQuery = `-- name: UpdateSessionExpiration :one
UPDATE sessions SET expires = $2 WHERE "sessionToken" = $1 RETURNING id, "userId", expires, "sessionToken"`;

export interface UpdateSessionExpirationArgs {
    sessiontoken: string;
    expires: Date;
}

export interface UpdateSessionExpirationRow {
    id: number;
    userid: number;
    expires: Date;
    sessiontoken: string;
}

export async function updateSessionExpiration(client: Client, args: UpdateSessionExpirationArgs): Promise<UpdateSessionExpirationRow | null> {
    const result = await client.query({
        text: updateSessionExpirationQuery,
        values: [args.sessiontoken, args.expires],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        id: row[0],
        userid: row[1],
        expires: row[2],
        sessiontoken: row[3]
    };
}

export const deleteSessionQuery = `-- name: DeleteSession :exec
DELETE FROM sessions WHERE "sessionToken" = $1`;

export interface DeleteSessionArgs {
    sessiontoken: string;
}

export async function deleteSession(client: Client, args: DeleteSessionArgs): Promise<void> {
    await client.query({
        text: deleteSessionQuery,
        values: [args.sessiontoken],
        rowMode: "array"
    });
}

export const createAccountQuery = `-- name: CreateAccount :one
INSERT INTO accounts ("userId", type, provider, "providerAccountId", refresh_token, access_token, expires_at, id_token, scope, session_state, token_type)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
RETURNING id, "userId", type, provider, "providerAccountId", refresh_token, access_token, expires_at, id_token, scope, session_state, token_type`;

export interface CreateAccountArgs {
    userid: number;
    type: string;
    provider: string;
    provideraccountid: string;
    refreshToken: string | null;
    accessToken: string | null;
    expiresAt: string | null;
    idToken: string | null;
    scope: string | null;
    sessionState: string | null;
    tokenType: string | null;
}

export interface CreateAccountRow {
    id: number;
    userid: number;
    type: string;
    provider: string;
    provideraccountid: string;
    refreshToken: string | null;
    accessToken: string | null;
    expiresAt: string | null;
    idToken: string | null;
    scope: string | null;
    sessionState: string | null;
    tokenType: string | null;
}

export async function createAccount(client: Client, args: CreateAccountArgs): Promise<CreateAccountRow | null> {
    const result = await client.query({
        text: createAccountQuery,
        values: [args.userid, args.type, args.provider, args.provideraccountid, args.refreshToken, args.accessToken, args.expiresAt, args.idToken, args.scope, args.sessionState, args.tokenType],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        id: row[0],
        userid: row[1],
        type: row[2],
        provider: row[3],
        provideraccountid: row[4],
        refreshToken: row[5],
        accessToken: row[6],
        expiresAt: row[7],
        idToken: row[8],
        scope: row[9],
        sessionState: row[10],
        tokenType: row[11]
    };
}

export const getAccountQuery = `-- name: GetAccount :one
SELECT id, "userId", type, provider, "providerAccountId", refresh_token, access_token, expires_at, id_token, scope, session_state, token_type FROM accounts WHERE id = $1 LIMIT 1`;

export interface GetAccountArgs {
    id: number;
}

export interface GetAccountRow {
    id: number;
    userid: number;
    type: string;
    provider: string;
    provideraccountid: string;
    refreshToken: string | null;
    accessToken: string | null;
    expiresAt: string | null;
    idToken: string | null;
    scope: string | null;
    sessionState: string | null;
    tokenType: string | null;
}

export async function getAccount(client: Client, args: GetAccountArgs): Promise<GetAccountRow | null> {
    const result = await client.query({
        text: getAccountQuery,
        values: [args.id],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        id: row[0],
        userid: row[1],
        type: row[2],
        provider: row[3],
        provideraccountid: row[4],
        refreshToken: row[5],
        accessToken: row[6],
        expiresAt: row[7],
        idToken: row[8],
        scope: row[9],
        sessionState: row[10],
        tokenType: row[11]
    };
}

export const listAccountsForUserQuery = `-- name: ListAccountsForUser :many
SELECT id, "userId", type, provider, "providerAccountId", refresh_token, access_token, expires_at, id_token, scope, session_state, token_type FROM accounts WHERE "userId" = $1 ORDER BY id LIMIT $2 OFFSET $3`;

export interface ListAccountsForUserArgs {
    userid: number;
    limit: string;
    offset: string;
}

export interface ListAccountsForUserRow {
    id: number;
    userid: number;
    type: string;
    provider: string;
    provideraccountid: string;
    refreshToken: string | null;
    accessToken: string | null;
    expiresAt: string | null;
    idToken: string | null;
    scope: string | null;
    sessionState: string | null;
    tokenType: string | null;
}

export async function listAccountsForUser(client: Client, args: ListAccountsForUserArgs): Promise<ListAccountsForUserRow[]> {
    const result = await client.query({
        text: listAccountsForUserQuery,
        values: [args.userid, args.limit, args.offset],
        rowMode: "array"
    });
    return result.rows.map(row => {
        return {
            id: row[0],
            userid: row[1],
            type: row[2],
            provider: row[3],
            provideraccountid: row[4],
            refreshToken: row[5],
            accessToken: row[6],
            expiresAt: row[7],
            idToken: row[8],
            scope: row[9],
            sessionState: row[10],
            tokenType: row[11]
        };
    });
}

export const updateAccountQuery = `-- name: UpdateAccount :one
UPDATE accounts SET refresh_token = $2, access_token = $3, expires_at = $4, id_token = $5, scope = $6, session_state = $7, token_type = $8
WHERE id = $1 RETURNING id, "userId", type, provider, "providerAccountId", refresh_token, access_token, expires_at, id_token, scope, session_state, token_type`;

export interface UpdateAccountArgs {
    id: number;
    refreshToken: string | null;
    accessToken: string | null;
    expiresAt: string | null;
    idToken: string | null;
    scope: string | null;
    sessionState: string | null;
    tokenType: string | null;
}

export interface UpdateAccountRow {
    id: number;
    userid: number;
    type: string;
    provider: string;
    provideraccountid: string;
    refreshToken: string | null;
    accessToken: string | null;
    expiresAt: string | null;
    idToken: string | null;
    scope: string | null;
    sessionState: string | null;
    tokenType: string | null;
}

export async function updateAccount(client: Client, args: UpdateAccountArgs): Promise<UpdateAccountRow | null> {
    const result = await client.query({
        text: updateAccountQuery,
        values: [args.id, args.refreshToken, args.accessToken, args.expiresAt, args.idToken, args.scope, args.sessionState, args.tokenType],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        id: row[0],
        userid: row[1],
        type: row[2],
        provider: row[3],
        provideraccountid: row[4],
        refreshToken: row[5],
        accessToken: row[6],
        expiresAt: row[7],
        idToken: row[8],
        scope: row[9],
        sessionState: row[10],
        tokenType: row[11]
    };
}

export const deleteAccountQuery = `-- name: DeleteAccount :exec
DELETE FROM accounts WHERE id = $1`;

export interface DeleteAccountArgs {
    id: number;
}

export async function deleteAccount(client: Client, args: DeleteAccountArgs): Promise<void> {
    await client.query({
        text: deleteAccountQuery,
        values: [args.id],
        rowMode: "array"
    });
}

export const createVerificationTokenQuery = `-- name: CreateVerificationToken :one
INSERT INTO verification_token (identifier, token, expires)
VALUES ($1, $2, $3)
RETURNING identifier, expires, token`;

export interface CreateVerificationTokenArgs {
    identifier: string;
    token: string;
    expires: Date;
}

export interface CreateVerificationTokenRow {
    identifier: string;
    expires: Date;
    token: string;
}

export async function createVerificationToken(client: Client, args: CreateVerificationTokenArgs): Promise<CreateVerificationTokenRow | null> {
    const result = await client.query({
        text: createVerificationTokenQuery,
        values: [args.identifier, args.token, args.expires],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        identifier: row[0],
        expires: row[1],
        token: row[2]
    };
}

export const getVerificationTokenQuery = `-- name: GetVerificationToken :one
SELECT identifier, expires, token FROM verification_token WHERE token = $1 LIMIT 1`;

export interface GetVerificationTokenArgs {
    token: string;
}

export interface GetVerificationTokenRow {
    identifier: string;
    expires: Date;
    token: string;
}

export async function getVerificationToken(client: Client, args: GetVerificationTokenArgs): Promise<GetVerificationTokenRow | null> {
    const result = await client.query({
        text: getVerificationTokenQuery,
        values: [args.token],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        identifier: row[0],
        expires: row[1],
        token: row[2]
    };
}

export const deleteVerificationTokenQuery = `-- name: DeleteVerificationToken :exec
DELETE FROM verification_token WHERE identifier = $1`;

export interface DeleteVerificationTokenArgs {
    identifier: string;
}

export async function deleteVerificationToken(client: Client, args: DeleteVerificationTokenArgs): Promise<void> {
    await client.query({
        text: deleteVerificationTokenQuery,
        values: [args.identifier],
        rowMode: "array"
    });
}

export const createTwoFactorTokenQuery = `-- name: CreateTwoFactorToken :one
INSERT INTO two_factor_token ("userId", token, expires)
VALUES ($1, $2, $3)
RETURNING "userId", token, expires`;

export interface CreateTwoFactorTokenArgs {
    userid: number;
    token: string;
    expires: Date;
}

export interface CreateTwoFactorTokenRow {
    userid: number;
    token: string;
    expires: Date;
}

export async function createTwoFactorToken(client: Client, args: CreateTwoFactorTokenArgs): Promise<CreateTwoFactorTokenRow | null> {
    const result = await client.query({
        text: createTwoFactorTokenQuery,
        values: [args.userid, args.token, args.expires],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        userid: row[0],
        token: row[1],
        expires: row[2]
    };
}

export const getTwoFactorTokenQuery = `-- name: GetTwoFactorToken :one
SELECT "userId", token, expires FROM two_factor_token WHERE "userId" = $1 AND token = $2 LIMIT 1`;

export interface GetTwoFactorTokenArgs {
    userid: number;
    token: string;
}

export interface GetTwoFactorTokenRow {
    userid: number;
    token: string;
    expires: Date;
}

export async function getTwoFactorToken(client: Client, args: GetTwoFactorTokenArgs): Promise<GetTwoFactorTokenRow | null> {
    const result = await client.query({
        text: getTwoFactorTokenQuery,
        values: [args.userid, args.token],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        userid: row[0],
        token: row[1],
        expires: row[2]
    };
}

export const deleteTwoFactorTokenQuery = `-- name: DeleteTwoFactorToken :exec
DELETE FROM two_factor_token WHERE "userId" = $1 AND token = $2`;

export interface DeleteTwoFactorTokenArgs {
    userid: number;
    token: string;
}

export async function deleteTwoFactorToken(client: Client, args: DeleteTwoFactorTokenArgs): Promise<void> {
    await client.query({
        text: deleteTwoFactorTokenQuery,
        values: [args.userid, args.token],
        rowMode: "array"
    });
}

export const createTwoFactorConfirmationQuery = `-- name: CreateTwoFactorConfirmation :one
INSERT INTO two_factor_confirmation ("userId", confirmation, expires)
VALUES ($1, $2, $3)
RETURNING "userId", confirmation, expires`;

export interface CreateTwoFactorConfirmationArgs {
    userid: number;
    confirmation: string;
    expires: Date;
}

export interface CreateTwoFactorConfirmationRow {
    userid: number;
    confirmation: string;
    expires: Date;
}

export async function createTwoFactorConfirmation(client: Client, args: CreateTwoFactorConfirmationArgs): Promise<CreateTwoFactorConfirmationRow | null> {
    const result = await client.query({
        text: createTwoFactorConfirmationQuery,
        values: [args.userid, args.confirmation, args.expires],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        userid: row[0],
        confirmation: row[1],
        expires: row[2]
    };
}

export const getTwoFactorConfirmationQuery = `-- name: GetTwoFactorConfirmation :one
SELECT "userId", confirmation, expires FROM two_factor_confirmation WHERE "userId" = $1 AND confirmation = $2 LIMIT 1`;

export interface GetTwoFactorConfirmationArgs {
    userid: number;
    confirmation: string;
}

export interface GetTwoFactorConfirmationRow {
    userid: number;
    confirmation: string;
    expires: Date;
}

export async function getTwoFactorConfirmation(client: Client, args: GetTwoFactorConfirmationArgs): Promise<GetTwoFactorConfirmationRow | null> {
    const result = await client.query({
        text: getTwoFactorConfirmationQuery,
        values: [args.userid, args.confirmation],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        userid: row[0],
        confirmation: row[1],
        expires: row[2]
    };
}

export const deleteTwoFactorConfirmationQuery = `-- name: DeleteTwoFactorConfirmation :exec
DELETE FROM two_factor_confirmation WHERE "userId" = $1 AND confirmation = $2`;

export interface DeleteTwoFactorConfirmationArgs {
    userid: number;
    confirmation: string;
}

export async function deleteTwoFactorConfirmation(client: Client, args: DeleteTwoFactorConfirmationArgs): Promise<void> {
    await client.query({
        text: deleteTwoFactorConfirmationQuery,
        values: [args.userid, args.confirmation],
        rowMode: "array"
    });
}

export const createStoryQuery = `-- name: CreateStory :one
INSERT INTO stories ("userId", title, content)
VALUES ($1, $2, $3)
RETURNING id, "userId", title, content, created_at, updated_at`;

export interface CreateStoryArgs {
    userid: number;
    title: string;
    content: string;
}

export interface CreateStoryRow {
    id: number;
    userid: number;
    title: string;
    content: string;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export async function createStory(client: Client, args: CreateStoryArgs): Promise<CreateStoryRow | null> {
    const result = await client.query({
        text: createStoryQuery,
        values: [args.userid, args.title, args.content],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        id: row[0],
        userid: row[1],
        title: row[2],
        content: row[3],
        createdAt: row[4],
        updatedAt: row[5]
    };
}

export const getStoryQuery = `-- name: GetStory :one
SELECT id, "userId", title, content, created_at, updated_at FROM stories WHERE id = $1 LIMIT 1`;

export interface GetStoryArgs {
    id: number;
}

export interface GetStoryRow {
    id: number;
    userid: number;
    title: string;
    content: string;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export async function getStory(client: Client, args: GetStoryArgs): Promise<GetStoryRow | null> {
    const result = await client.query({
        text: getStoryQuery,
        values: [args.id],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        id: row[0],
        userid: row[1],
        title: row[2],
        content: row[3],
        createdAt: row[4],
        updatedAt: row[5]
    };
}

export const listStoriesForUserQuery = `-- name: ListStoriesForUser :many
SELECT id, "userId", title, content, created_at, updated_at FROM stories WHERE "userId" = $1 ORDER BY id LIMIT $2 OFFSET $3`;

export interface ListStoriesForUserArgs {
    userid: number;
    limit: string;
    offset: string;
}

export interface ListStoriesForUserRow {
    id: number;
    userid: number;
    title: string;
    content: string;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export async function listStoriesForUser(client: Client, args: ListStoriesForUserArgs): Promise<ListStoriesForUserRow[]> {
    const result = await client.query({
        text: listStoriesForUserQuery,
        values: [args.userid, args.limit, args.offset],
        rowMode: "array"
    });
    return result.rows.map(row => {
        return {
            id: row[0],
            userid: row[1],
            title: row[2],
            content: row[3],
            createdAt: row[4],
            updatedAt: row[5]
        };
    });
}

export const updateStoryQuery = `-- name: UpdateStory :one
UPDATE stories SET title = $2, content = $3
WHERE id = $1 RETURNING id, "userId", title, content, created_at, updated_at`;

export interface UpdateStoryArgs {
    id: number;
    title: string;
    content: string;
}

export interface UpdateStoryRow {
    id: number;
    userid: number;
    title: string;
    content: string;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export async function updateStory(client: Client, args: UpdateStoryArgs): Promise<UpdateStoryRow | null> {
    const result = await client.query({
        text: updateStoryQuery,
        values: [args.id, args.title, args.content],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        id: row[0],
        userid: row[1],
        title: row[2],
        content: row[3],
        createdAt: row[4],
        updatedAt: row[5]
    };
}

export const deleteStoryQuery = `-- name: DeleteStory :exec
DELETE FROM stories WHERE id = $1`;

export interface DeleteStoryArgs {
    id: number;
}

export async function deleteStory(client: Client, args: DeleteStoryArgs): Promise<void> {
    await client.query({
        text: deleteStoryQuery,
        values: [args.id],
        rowMode: "array"
    });
}

export const createCharacterQuery = `-- name: CreateCharacter :one
INSERT INTO characters ("userId", name, description)
VALUES ($1, $2, $3)
RETURNING id, "userId", name, description, created_at, updated_at`;

export interface CreateCharacterArgs {
    userid: number;
    name: string;
    description: string | null;
}

export interface CreateCharacterRow {
    id: number;
    userid: number;
    name: string;
    description: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export async function createCharacter(client: Client, args: CreateCharacterArgs): Promise<CreateCharacterRow | null> {
    const result = await client.query({
        text: createCharacterQuery,
        values: [args.userid, args.name, args.description],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        id: row[0],
        userid: row[1],
        name: row[2],
        description: row[3],
        createdAt: row[4],
        updatedAt: row[5]
    };
}

export const getCharacterQuery = `-- name: GetCharacter :one
SELECT id, "userId", name, description, created_at, updated_at FROM characters WHERE id = $1 LIMIT 1`;

export interface GetCharacterArgs {
    id: number;
}

export interface GetCharacterRow {
    id: number;
    userid: number;
    name: string;
    description: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export async function getCharacter(client: Client, args: GetCharacterArgs): Promise<GetCharacterRow | null> {
    const result = await client.query({
        text: getCharacterQuery,
        values: [args.id],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        id: row[0],
        userid: row[1],
        name: row[2],
        description: row[3],
        createdAt: row[4],
        updatedAt: row[5]
    };
}

export const listCharactersForUserQuery = `-- name: ListCharactersForUser :many
SELECT id, "userId", name, description, created_at, updated_at FROM characters WHERE "userId" = $1 ORDER BY id LIMIT $2 OFFSET $3`;

export interface ListCharactersForUserArgs {
    userid: number;
    limit: string;
    offset: string;
}

export interface ListCharactersForUserRow {
    id: number;
    userid: number;
    name: string;
    description: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export async function listCharactersForUser(client: Client, args: ListCharactersForUserArgs): Promise<ListCharactersForUserRow[]> {
    const result = await client.query({
        text: listCharactersForUserQuery,
        values: [args.userid, args.limit, args.offset],
        rowMode: "array"
    });
    return result.rows.map(row => {
        return {
            id: row[0],
            userid: row[1],
            name: row[2],
            description: row[3],
            createdAt: row[4],
            updatedAt: row[5]
        };
    });
}

export const updateCharacterQuery = `-- name: UpdateCharacter :one
UPDATE characters SET name = $2, description = $3
WHERE id = $1 RETURNING id, "userId", name, description, created_at, updated_at`;

export interface UpdateCharacterArgs {
    id: number;
    name: string;
    description: string | null;
}

export interface UpdateCharacterRow {
    id: number;
    userid: number;
    name: string;
    description: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export async function updateCharacter(client: Client, args: UpdateCharacterArgs): Promise<UpdateCharacterRow | null> {
    const result = await client.query({
        text: updateCharacterQuery,
        values: [args.id, args.name, args.description],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        id: row[0],
        userid: row[1],
        name: row[2],
        description: row[3],
        createdAt: row[4],
        updatedAt: row[5]
    };
}

export const deleteCharacterQuery = `-- name: DeleteCharacter :exec
DELETE FROM characters WHERE id = $1`;

export interface DeleteCharacterArgs {
    id: number;
}

export async function deleteCharacter(client: Client, args: DeleteCharacterArgs): Promise<void> {
    await client.query({
        text: deleteCharacterQuery,
        values: [args.id],
        rowMode: "array"
    });
}

export const createLocationQuery = `-- name: CreateLocation :one
INSERT INTO locations ("userId", name, description)
VALUES ($1, $2, $3)
RETURNING id, "userId", name, description, created_at, updated_at`;

export interface CreateLocationArgs {
    userid: number;
    name: string;
    description: string | null;
}

export interface CreateLocationRow {
    id: number;
    userid: number;
    name: string;
    description: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export async function createLocation(client: Client, args: CreateLocationArgs): Promise<CreateLocationRow | null> {
    const result = await client.query({
        text: createLocationQuery,
        values: [args.userid, args.name, args.description],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        id: row[0],
        userid: row[1],
        name: row[2],
        description: row[3],
        createdAt: row[4],
        updatedAt: row[5]
    };
}

export const getLocationQuery = `-- name: GetLocation :one
SELECT id, "userId", name, description, created_at, updated_at FROM locations WHERE id = $1 LIMIT 1`;

export interface GetLocationArgs {
    id: number;
}

export interface GetLocationRow {
    id: number;
    userid: number;
    name: string;
    description: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export async function getLocation(client: Client, args: GetLocationArgs): Promise<GetLocationRow | null> {
    const result = await client.query({
        text: getLocationQuery,
        values: [args.id],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        id: row[0],
        userid: row[1],
        name: row[2],
        description: row[3],
        createdAt: row[4],
        updatedAt: row[5]
    };
}

export const listLocationsForUserQuery = `-- name: ListLocationsForUser :many
SELECT id, "userId", name, description, created_at, updated_at FROM locations WHERE "userId" = $1 ORDER BY id LIMIT $2 OFFSET $3`;

export interface ListLocationsForUserArgs {
    userid: number;
    limit: string;
    offset: string;
}

export interface ListLocationsForUserRow {
    id: number;
    userid: number;
    name: string;
    description: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export async function listLocationsForUser(client: Client, args: ListLocationsForUserArgs): Promise<ListLocationsForUserRow[]> {
    const result = await client.query({
        text: listLocationsForUserQuery,
        values: [args.userid, args.limit, args.offset],
        rowMode: "array"
    });
    return result.rows.map(row => {
        return {
            id: row[0],
            userid: row[1],
            name: row[2],
            description: row[3],
            createdAt: row[4],
            updatedAt: row[5]
        };
    });
}

export const updateLocationQuery = `-- name: UpdateLocation :one
UPDATE locations SET name = $2, description = $3
WHERE id = $1 RETURNING id, "userId", name, description, created_at, updated_at`;

export interface UpdateLocationArgs {
    id: number;
    name: string;
    description: string | null;
}

export interface UpdateLocationRow {
    id: number;
    userid: number;
    name: string;
    description: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export async function updateLocation(client: Client, args: UpdateLocationArgs): Promise<UpdateLocationRow | null> {
    const result = await client.query({
        text: updateLocationQuery,
        values: [args.id, args.name, args.description],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        id: row[0],
        userid: row[1],
        name: row[2],
        description: row[3],
        createdAt: row[4],
        updatedAt: row[5]
    };
}

export const deleteLocationQuery = `-- name: DeleteLocation :exec
DELETE FROM locations WHERE id = $1`;

export interface DeleteLocationArgs {
    id: number;
}

export async function deleteLocation(client: Client, args: DeleteLocationArgs): Promise<void> {
    await client.query({
        text: deleteLocationQuery,
        values: [args.id],
        rowMode: "array"
    });
}

export const createTimelineQuery = `-- name: CreateTimeline :one
INSERT INTO timelines ("userId", name, description)
VALUES ($1, $2, $3)
RETURNING id, "userId", name, description, created_at, updated_at`;

export interface CreateTimelineArgs {
    userid: number;
    name: string;
    description: string | null;
}

export interface CreateTimelineRow {
    id: number;
    userid: number;
    name: string;
    description: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export async function createTimeline(client: Client, args: CreateTimelineArgs): Promise<CreateTimelineRow | null> {
    const result = await client.query({
        text: createTimelineQuery,
        values: [args.userid, args.name, args.description],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        id: row[0],
        userid: row[1],
        name: row[2],
        description: row[3],
        createdAt: row[4],
        updatedAt: row[5]
    };
}

export const getTimelineQuery = `-- name: GetTimeline :one
SELECT id, "userId", name, description, created_at, updated_at FROM timelines WHERE id = $1 LIMIT 1`;

export interface GetTimelineArgs {
    id: number;
}

export interface GetTimelineRow {
    id: number;
    userid: number;
    name: string;
    description: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export async function getTimeline(client: Client, args: GetTimelineArgs): Promise<GetTimelineRow | null> {
    const result = await client.query({
        text: getTimelineQuery,
        values: [args.id],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        id: row[0],
        userid: row[1],
        name: row[2],
        description: row[3],
        createdAt: row[4],
        updatedAt: row[5]
    };
}

export const listTimelinesForUserQuery = `-- name: ListTimelinesForUser :many
SELECT id, "userId", name, description, created_at, updated_at FROM timelines WHERE "userId" = $1 ORDER BY id LIMIT $2 OFFSET $3`;

export interface ListTimelinesForUserArgs {
    userid: number;
    limit: string;
    offset: string;
}

export interface ListTimelinesForUserRow {
    id: number;
    userid: number;
    name: string;
    description: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export async function listTimelinesForUser(client: Client, args: ListTimelinesForUserArgs): Promise<ListTimelinesForUserRow[]> {
    const result = await client.query({
        text: listTimelinesForUserQuery,
        values: [args.userid, args.limit, args.offset],
        rowMode: "array"
    });
    return result.rows.map(row => {
        return {
            id: row[0],
            userid: row[1],
            name: row[2],
            description: row[3],
            createdAt: row[4],
            updatedAt: row[5]
        };
    });
}

export const updateTimelineQuery = `-- name: UpdateTimeline :one
UPDATE timelines SET name = $2, description = $3
WHERE id = $1 RETURNING id, "userId", name, description, created_at, updated_at`;

export interface UpdateTimelineArgs {
    id: number;
    name: string;
    description: string | null;
}

export interface UpdateTimelineRow {
    id: number;
    userid: number;
    name: string;
    description: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export async function updateTimeline(client: Client, args: UpdateTimelineArgs): Promise<UpdateTimelineRow | null> {
    const result = await client.query({
        text: updateTimelineQuery,
        values: [args.id, args.name, args.description],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        id: row[0],
        userid: row[1],
        name: row[2],
        description: row[3],
        createdAt: row[4],
        updatedAt: row[5]
    };
}

export const deleteTimelineQuery = `-- name: DeleteTimeline :exec
DELETE FROM timelines WHERE id = $1`;

export interface DeleteTimelineArgs {
    id: number;
}

export async function deleteTimeline(client: Client, args: DeleteTimelineArgs): Promise<void> {
    await client.query({
        text: deleteTimelineQuery,
        values: [args.id],
        rowMode: "array"
    });
}

