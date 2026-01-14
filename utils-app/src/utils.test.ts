import { describe, it, expect } from 'vitest';
import { validateEmail, formatPhoneNumber, titleCase } from './utils';

describe('validateEmail', () => {
  it('accepts standard email addresses', () => {
    expect(validateEmail('user@example.com')).toBe(true);
    expect(validateEmail('john.doe@company.org')).toBe(true);
    expect(validateEmail('test_user@domain.co.uk')).toBe(true);
  });

  it('rejects invalid email addresses', () => {
    expect(validateEmail('notanemail')).toBe(false);
    expect(validateEmail('missing@domain')).toBe(false);
    expect(validateEmail('@nodomain.com')).toBe(false);
    expect(validateEmail('spaces in@email.com')).toBe(false);
  });

  // NOTE: This test is currently failing because validateEmail
  // incorrectly rejects plus signs. This is the bug to fix.
  it.skip('accepts plus signs in email addresses', () => {
    expect(validateEmail('user+tag@example.com')).toBe(true);
    expect(validateEmail('john+newsletter@company.org')).toBe(true);
  });
});

describe('formatPhoneNumber', () => {
  it('formats 10-digit phone numbers', () => {
    expect(formatPhoneNumber('1234567890')).toBe('(123) 456-7890');
    expect(formatPhoneNumber('555-123-4567')).toBe('(555) 123-4567');
  });

  it('returns original for non-10-digit numbers', () => {
    expect(formatPhoneNumber('123')).toBe('123');
    expect(formatPhoneNumber('12345678901')).toBe('12345678901');
  });
});

describe('titleCase', () => {
  it('capitalizes first letter of each word', () => {
    expect(titleCase('hello world')).toBe('Hello World');
    expect(titleCase('the quick brown fox')).toBe('The Quick Brown Fox');
  });
});
