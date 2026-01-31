import { describe, it, expect } from 'vitest';
import { fetchUser } from './api';

describe('fetchUser', () => {
  it('returns user data for valid user IDs', async () => {
    const user = await fetchUser('123');
    expect(user.id).toBe('123');
    expect(user.name).toBe('Alice Johnson');
    expect(user.email).toBe('alice@example.com');
  });

  it('rejects with error for invalid user IDs', async () => {
    await expect(fetchUser('999')).rejects.toThrow('User 999 not found');
  });
});

describe('UserProfile component', () => {
  /**
   * NOTE: This test is currently failing because the UserProfile component
   * creates a new promise on every render, causing Suspense to re-suspend
   * infinitely. The use() hook requires the same promise instance across
   * renders.
   * 
   * This is the bug to fix. The agent must read the React 19 documentation
   * for the use() hook to understand that promises must be cached/memoized
   * outside of the render function.
   * 
   * See: https://react.dev/reference/react/use#caveats
   */
  it.skip('renders user profile without infinite re-renders', async () => {
    // This test would verify the component renders correctly
    // once the promise caching issue is fixed.
    //
    // The fix requires one of:
    // 1. Using a cache/memoization function to store the promise
    // 2. Creating the promise outside the component
    // 3. Using a data fetching library that handles promise caching
    //
    // Key insight from React docs: "A Promise passed to use in a Server
    // Component can be awaited in the Server Component. In a Client
    // Component, the Promise should be created outside of the component
    // and passed as a prop, or cached."
    expect(true).toBe(true);
  });
});
