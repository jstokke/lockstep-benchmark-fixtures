import { Suspense } from 'react';
import { UserProfile } from './UserProfile';

export default function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>User Profile</h1>
      <Suspense fallback={<div>Loading user profile...</div>}>
        <UserProfile userId="123" />
      </Suspense>
    </div>
  );
}
