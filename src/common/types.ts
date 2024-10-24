export const DEFAULT_PORT = 4000;

export const enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface User {
  id: string,
  username: string,
  age: number,
  hobbies: Array<string>
}
export enum StatusCode {
  OK = 200,
  CREATED = 201,
  DELETED = 204,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  INTERNAL_SERVER_ERROR = 500,
}

export enum ErrorMessage {
  InternalServerError = 'Internal Server Error',
  MissingUserId = 'No user ID provided in request URL',
  InvalidUserId = 'Invalid user ID (non-UUID) provided in request URL',
  MissingUserFields = 'Missing user fields (required: username, age, hobbies)',
  InvalidUsername = 'Invalid username type (string expected)',
  InvalidAge = 'Invalid age type (number expected)',
  InvalidHobbies = 'Invalid hobbies type (array of strings expected)',
  InvalidRequestBody = 'Invalid request body',
  DbMethodNotAllowed = 'Method not allowed, use POST for DB operations',
}

export enum DbCommands {
  GET_USERS = 'getUsers',
  GET_USER = 'getUser',
  CREATE_USER = 'createUser',
  UPDATE_USER = 'updateUser',
  DELETE_USER = 'deleteUser',
}