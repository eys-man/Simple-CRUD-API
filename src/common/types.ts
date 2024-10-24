export const DEFAULT_PORT = 4000;

export const enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface User {
  user: User;
  id: string,
  username: string,
  age: number,
  hobbies: Array<string>
}
