/**
 * LoginForm Component
 * Manages form state, validation, and API communication
 * Handles email/password input, error states, and loading states
 */
'use client';

import React, { useState } from 'react';
import InputField from './InputField';
import styles from './LoginForm.module.css';

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export default function LoginForm() {
  // Form state - tracks email, password, and remember me checkbox
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  // Error state - tracks validation errors and API errors
  const [errors, setErrors] = useState<FormErrors>({});

  // Loading state - true while API request is in progress
  const [isLoading, setIsLoading] = useState(false);

  // Success state - true when login is successful
  const [isSuccess, setIsSuccess] = useState(false);

  /**
   * Validates form data
   * Checks email format and password requirement
   * Returns true if form is valid, false otherwise
   */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation: check if empty and valid format
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation: check if empty
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles form submission
   * Validates input, makes API call, and handles response/errors
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    // Validate form before sending
    if (!validateForm()) {
      return;
    }

    // Set loading state to show spinner/disabled button
    setIsLoading(true);

    try {
      // Make POST request to login API endpoint (proxied to the Java backend)
      const response = await fetch('/api/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      // Parse response JSON
      const data = await response.json();

      if (response.ok) {
        // Success: session cookie is set by the backend
        if (formData.rememberMe) {
          localStorage.setItem('rememberEmail', formData.email);
        }
        console.log('[v0] Login successful:', data.responseMessage);
        setIsSuccess(true);

        // Optional: redirect after brief delay (user can implement)
        setTimeout(() => {
          // User can implement redirect here
          console.log('[v0] Ready for redirect to dashboard');
        }, 1500);
      } else {
        // Error: show error message from API or generic message
        setErrors({
          general: data.message || 'Invalid email or password',
        });
      }
    } catch (error) {
      // Network or other error
      console.error('[v0] Login error:', error);
      setErrors({
        general: 'An error occurred. Please try again.',
      });
    } finally {
      // Clear loading state
      setIsLoading(false);
    }
  };

  /**
   * Handles input changes
   * Updates form state for email and password fields
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {/* Form header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>Sign in to your account</p>
      </div>

      {/* Success message */}
      {isSuccess && (
        <div className={styles.successMessage}>
          ✓ Login successful! Redirecting...
        </div>
      )}

      {/* General error message (API errors, network errors) */}
      {errors.general && !isSuccess && (
        <div className={styles.errorMessage}>
          {errors.general}
        </div>
      )}

      {/* Form fields container */}
      <div className={styles.fieldsContainer}>
        {/* Email input field */}
        <InputField
          name="email"
          type="email"
          label="Email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          placeholder="name@example.com"
          autoComplete="email"
          disabled={isLoading}
        />

        {/* Password input field with show/hide toggle */}
        <InputField
          name="password"
          type="password"
          label="Password"
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
          placeholder="Enter your password"
          autoComplete="current-password"
          disabled={isLoading}
          hasToggle
        />
      </div>

      {/* Remember me and Forgot password section */}
      <div className={styles.optionsContainer}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleInputChange}
            disabled={isLoading}
            className={styles.checkbox}
          />
          <span>Remember me</span>
        </label>

        <a href="/forgot-password" className={styles.forgotLink}>
          Forgot password?
        </a>
      </div>

      {/* Submit button with loading state */}
      <button
        type="submit"
        className={styles.submitButton}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className={styles.spinner}></span>
            Signing in...
          </>
        ) : (
          'Sign In'
        )}
      </button>

      {/* Sign up link */}
      <div className={styles.signupContainer}>
        <span>Don&apos;t have an account?</span>
        <a href="/signup" className={styles.signupLink}>
          Sign up
        </a>
      </div>
    </form>
  );
}
