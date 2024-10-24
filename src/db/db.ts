import { v4 } from 'uuid';
import { User } from '../common/types';

export const users: User[] = [];

export function addUser(user: User): User {
  const newUser: User = structuredClone<User>(user);
  newUser.id = v4();

  users.push(newUser);

  return newUser;
}

export function getUser(id: string): User | null {
  const foundUser = users.find((i) => i.id === id);
  if (foundUser) return foundUser;

  return null;
}

export function deleteUser(id: string): boolean {
  let indexFound = -1;
  let isFound = false;
  users.forEach((i, index) => {
    if(i.id === id) {
      isFound = true;
      indexFound = index;
    }
  });

  if(indexFound != -1 ) users.splice(indexFound, 1);

  return isFound;
}

export function updateUser(id: string, updUser: User): boolean {
  let isFound = false;
  users.forEach((user) => {
    if( user.id == id ) {
      user.username = updUser.username;
      user.age = updUser.age;
      user.hobbies = updUser.hobbies.slice(0); 
      isFound = true;
    }
  });

  return isFound;
}
