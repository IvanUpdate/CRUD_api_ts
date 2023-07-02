import { User } from "../types/User";
import { v4 as uuidv4 } from 'uuid';

const users: User[] = [];

export const get_users = (): User[] => {
  return users;
};

export const get_user_by_id = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

export const add_user = (username: string, age: number, hobbies: string[]): void => {
  const new_user: User = {
    id: uuidv4(),
    username,
    age,
    hobbies
  };
  users.push(new_user);
};

export const update_user = (id: string, username?: string, age?: number, hobbies?: string[]): User | undefined => {
  const user = get_user_by_id(id);
  if (user) {
    user.username = username || user.username;
    user.age = age || user.age;
    user.hobbies = hobbies || user.hobbies;
    return user;
  }
  return undefined;
};

export const delete_user = (id: string): User | undefined => {
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
  return undefined;
};
