export const DEFAULT_PORT = 4000;
export const DEFAULT_HOST = `localhost`;

export interface User {
  user: User;
  id: string,
  username: string,
  age: number,
  hobbies: Array<string>
}
