export interface ContactFormState {
  message: string;
  success: boolean;
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Basic validation
  if (!name || !email || !message) {
    return {
      message: 'Eror submitting form. All fields are required.',
      success: false,
    };
  }

  if (!email.includes('@')) {
    return {
      message: 'Please enter a valid email address.',
      success: false,
    };
  }

  // Simulate successful submission
  console.log('Form submitted:', { name, email, message });

  return {
    message: `Thank you, ${name}! Your message has been sent.`,
    success: true,
  };
}
