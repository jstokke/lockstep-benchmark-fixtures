export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Simulated API delay
const API_DELAY = 100;

// Mock user database
const users: Record<string, User> = {
  '123': {
    id: '123',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'Administrator',
  },
  '456': {
    id: '456',
    name: 'Bob Smith',
    email: 'bob@example.com',
    role: 'User',
  },
};

/**
 * Fetches a user by ID from the API.
 * Returns a promise that resolves to the user data.
 */
export function fetchUser(userId: string): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users[userId];
      if (user) {
        resolve(user);
      } else {
        reject(new Error(`User ${userId} not found`));
      }
    }, API_DELAY);
  });
}
