import { useState } from 'react';
import { validateEmail } from './utils';

function App() {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const handleValidate = () => {
    const isValid = validateEmail(email);
    setResult(isValid ? '✅ Valid email' : '❌ Invalid email');
  };

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto', padding: '1rem' }}>
      <h1>Email Validator</h1>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email address"
          style={{ flex: 1, padding: '0.5rem' }}
        />
        <button onClick={handleValidate} style={{ padding: '0.5rem 1rem' }}>
          Validate
        </button>
      </div>
      {result && (
        <div style={{ padding: '1rem', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
          {result}
        </div>
      )}
    </div>
  );
}

export default App;
