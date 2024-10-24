import { v4 } from 'uuid';
import { User } from '../common/types';
import { isValid } from '../utils/utils';

export const users: User[] = [];

export function addUser(user: User): void {
  if (isValid(user)) {
    const newUser: User = {
      id: v4(),
      username: user.username,
      age: user.age,
      hobbies: [...user.hobbies],
    }

    users.push(newUser);
  }
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

// export function updateUser(id: string, updUser: User): void {
  // users.forEach((user) => {
  //   if( user.id == id ) {
  //     user.age = updUser.age;
  //     user.id = updUser.id;
  //     user.hobbies = updUser.hobbies.slice(0); 
  //   }
  // });

  // throw new Error(`Can't find that user!`);
// }
