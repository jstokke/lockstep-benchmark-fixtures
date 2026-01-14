// @ts-nocheck
// Note: useFormState is deprecated in React 19, should use useActionState from 'react'
import { useFormState } from 'react-dom';
import { submitContactForm, type ContactFormState } from './actions';

const initialState: ContactFormState = {
  message: '',
  success: false,
};

export function ContactForm() {
  const [state, formAction] = useFormState(submitContactForm, initialState);

  return (
    <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
        />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
        />
      </div>

      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
        />
      </div>

      <button type="submit" style={{ padding: '0.75rem', cursor: 'pointer' }}>
        Send Message
      </button>

      {state.message && (
        <div
          style={{
            padding: '1rem',
            borderRadius: '4px',
            backgroundColor: state.success ? '#d4edda' : '#f8d7da',
            color: state.success ? '#155724' : '#721c24',
          }}
        >
          {state.message}
        </div>
      )}
    </form>
  );
}
