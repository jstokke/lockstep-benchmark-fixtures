// This component uses React 19's use() hook to read async data
// See: https://react.dev/reference/react/use

import { use } from 'react';
import { fetchUser } from './api';

interface UserProfileProps {
  userId: string;
}

/**
 * UserProfile component that displays user information.
 * Uses React 19's use() hook to read the user data promise.
 * 
 * KNOWN ISSUE: The component sometimes causes infinite loading or
 * crashes with "Maximum update depth exceeded" in development.
 * This seems to happen randomly and is hard to reproduce consistently.
 */
export function UserProfile({ userId }: UserProfileProps) {
  // Fetch the user data using the new use() hook
  const userPromise = fetchUser(userId);
  const user = use(userPromise);

  return (
    <div style={{ 
      border: '1px solid #ccc', 
      borderRadius: '8px', 
      padding: '1rem',
      maxWidth: '300px'
    }}>
      <h2 style={{ margin: '0 0 0.5rem 0' }}>{user.name}</h2>
      <p style={{ margin: '0.25rem 0', color: '#666' }}>
        <strong>Email:</strong> {user.email}
      </p>
      <p style={{ margin: '0.25rem 0', color: '#666' }}>
        <strong>Role:</strong> {user.role}
      </p>
      <p style={{ margin: '0.25rem 0', color: '#999', fontSize: '0.8rem' }}>
        ID: {user.id}
      </p>
    </div>
  );
}
