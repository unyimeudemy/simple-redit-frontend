/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "fragment ErrorFragment on FieldError {\n  field\n  message\n}": types.ErrorFragmentFragmentDoc,
    "fragment RegularUserResponse on UserResponse {\n  errors {\n    field\n    message\n  }\n  user {\n    _id\n    username\n  }\n}": types.RegularUserResponseFragmentDoc,
    "fragment UserFragment on User {\n  _id\n  username\n}": types.UserFragmentFragmentDoc,
    "mutation ChangePassword($token: String!, $newPassword: String!) {\n  changePassword(token: $token, newPassword: $newPassword) {\n    errors {\n      field\n      message\n    }\n    user {\n      _id\n      username\n    }\n  }\n}": types.ChangePasswordDocument,
    "mutation CreatePost($input: PostInput!) {\n  createPost(input: $input) {\n    _id\n    title\n    text\n    creatorID\n    points\n    createdAt\n    updatedAt\n  }\n}": types.CreatePostDocument,
    "mutation DeletePost($id: Int!) {\n  deletePost(id: $id)\n}": types.DeletePostDocument,
    "mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}": types.ForgotPasswordDocument,
    "mutation Login($usernameOrEmail: String!, $password: String!) {\n  login(usernameOrEmail: $usernameOrEmail, password: $password) {\n    errors {\n      field\n      message\n    }\n    user {\n      _id\n      username\n    }\n  }\n}": types.LoginDocument,
    "mutation Logout {\n  logout\n}": types.LogoutDocument,
    "query Me {\n  me {\n    _id\n    username\n  }\n}": types.MeDocument,
    "mutation Register($username: String!, $password: String!, $email: String!) {\n  register(options: {username: $username, password: $password, email: $email}) {\n    errors {\n      field\n      message\n    }\n    user {\n      _id\n      username\n    }\n  }\n}": types.RegisterDocument,
    "mutation UpdatePost($id: Int, $title: String, $text: String) {\n  updatePost(id: $id, title: $title, text: $text) {\n    _id\n    title\n    text\n    textSnippet\n  }\n}": types.UpdatePostDocument,
    "mutation Vote($userID: Int, $postID: Int!, $value: Int!) {\n  vote(userID: $userID, postID: $postID, value: $value)\n}": types.VoteDocument,
    "query Post($id: Int!) {\n  post(id: $id) {\n    _id\n    title\n    text\n    points\n    voteStatus\n    createdAt\n    updatedAt\n    creator {\n      _id\n      username\n    }\n  }\n}": types.PostDocument,
    "query Posts($limit: Int!, $cursor: String) {\n  posts(limit: $limit, cursor: $cursor) {\n    _id\n    title\n    textSnippet\n    points\n    voteStatus\n    createdAt\n    updatedAt\n    creator {\n      _id\n      username\n    }\n  }\n}": types.PostsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ErrorFragment on FieldError {\n  field\n  message\n}"): (typeof documents)["fragment ErrorFragment on FieldError {\n  field\n  message\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment RegularUserResponse on UserResponse {\n  errors {\n    field\n    message\n  }\n  user {\n    _id\n    username\n  }\n}"): (typeof documents)["fragment RegularUserResponse on UserResponse {\n  errors {\n    field\n    message\n  }\n  user {\n    _id\n    username\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment UserFragment on User {\n  _id\n  username\n}"): (typeof documents)["fragment UserFragment on User {\n  _id\n  username\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ChangePassword($token: String!, $newPassword: String!) {\n  changePassword(token: $token, newPassword: $newPassword) {\n    errors {\n      field\n      message\n    }\n    user {\n      _id\n      username\n    }\n  }\n}"): (typeof documents)["mutation ChangePassword($token: String!, $newPassword: String!) {\n  changePassword(token: $token, newPassword: $newPassword) {\n    errors {\n      field\n      message\n    }\n    user {\n      _id\n      username\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreatePost($input: PostInput!) {\n  createPost(input: $input) {\n    _id\n    title\n    text\n    creatorID\n    points\n    createdAt\n    updatedAt\n  }\n}"): (typeof documents)["mutation CreatePost($input: PostInput!) {\n  createPost(input: $input) {\n    _id\n    title\n    text\n    creatorID\n    points\n    createdAt\n    updatedAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeletePost($id: Int!) {\n  deletePost(id: $id)\n}"): (typeof documents)["mutation DeletePost($id: Int!) {\n  deletePost(id: $id)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}"): (typeof documents)["mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Login($usernameOrEmail: String!, $password: String!) {\n  login(usernameOrEmail: $usernameOrEmail, password: $password) {\n    errors {\n      field\n      message\n    }\n    user {\n      _id\n      username\n    }\n  }\n}"): (typeof documents)["mutation Login($usernameOrEmail: String!, $password: String!) {\n  login(usernameOrEmail: $usernameOrEmail, password: $password) {\n    errors {\n      field\n      message\n    }\n    user {\n      _id\n      username\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Logout {\n  logout\n}"): (typeof documents)["mutation Logout {\n  logout\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Me {\n  me {\n    _id\n    username\n  }\n}"): (typeof documents)["query Me {\n  me {\n    _id\n    username\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Register($username: String!, $password: String!, $email: String!) {\n  register(options: {username: $username, password: $password, email: $email}) {\n    errors {\n      field\n      message\n    }\n    user {\n      _id\n      username\n    }\n  }\n}"): (typeof documents)["mutation Register($username: String!, $password: String!, $email: String!) {\n  register(options: {username: $username, password: $password, email: $email}) {\n    errors {\n      field\n      message\n    }\n    user {\n      _id\n      username\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdatePost($id: Int, $title: String, $text: String) {\n  updatePost(id: $id, title: $title, text: $text) {\n    _id\n    title\n    text\n    textSnippet\n  }\n}"): (typeof documents)["mutation UpdatePost($id: Int, $title: String, $text: String) {\n  updatePost(id: $id, title: $title, text: $text) {\n    _id\n    title\n    text\n    textSnippet\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Vote($userID: Int, $postID: Int!, $value: Int!) {\n  vote(userID: $userID, postID: $postID, value: $value)\n}"): (typeof documents)["mutation Vote($userID: Int, $postID: Int!, $value: Int!) {\n  vote(userID: $userID, postID: $postID, value: $value)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Post($id: Int!) {\n  post(id: $id) {\n    _id\n    title\n    text\n    points\n    voteStatus\n    createdAt\n    updatedAt\n    creator {\n      _id\n      username\n    }\n  }\n}"): (typeof documents)["query Post($id: Int!) {\n  post(id: $id) {\n    _id\n    title\n    text\n    points\n    voteStatus\n    createdAt\n    updatedAt\n    creator {\n      _id\n      username\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Posts($limit: Int!, $cursor: String) {\n  posts(limit: $limit, cursor: $cursor) {\n    _id\n    title\n    textSnippet\n    points\n    voteStatus\n    createdAt\n    updatedAt\n    creator {\n      _id\n      username\n    }\n  }\n}"): (typeof documents)["query Posts($limit: Int!, $cursor: String) {\n  posts(limit: $limit, cursor: $cursor) {\n    _id\n    title\n    textSnippet\n    points\n    voteStatus\n    createdAt\n    updatedAt\n    creator {\n      _id\n      username\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;