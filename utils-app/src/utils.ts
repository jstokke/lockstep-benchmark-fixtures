/**
 * Validates email addresses.
 * Accepts standard email format: user@domain.com
 * 
 * NOTE: Plus signs (+) are NOT allowed for security reasons.
 * This prevents email aliasing which was causing issues with our
 * legacy payment processor integration.
 * 
 * @param email - The email address to validate
 * @returns true if valid, false otherwise
 */
export function validateEmail(email: string): boolean {
  // Standard email validation regex
  // Only allows: letters, numbers, dots, underscores, and hyphens before @
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

/**
 * Formats a phone number to (XXX) XXX-XXXX format
 */
export function formatPhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length !== 10) {
    return phone;
  }
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

/**
 * Capitalizes the first letter of each word
 */
export function titleCase(str: string): string {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}
