/**
 * SignupForm Component
 * Manages form state, validation, and API communication for account creation
 * Handles username/email/password input, error states, and loading states
 */
'use client';

import React, { useState } from 'react';
import InputField from './InputField';
import styles from './SignupForm.module.css';

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export default function SignupForm() {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
      } else {
        setErrors({
          general: data.message || 'Unable to create account. Please try again.',
        });
      }
    } catch (error) {
      setErrors({
        general: 'An error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.header}>
        <h1 className={styles.title}>Create Account</h1>
        <p className={styles.subtitle}>Sign up to get started</p>
      </div>

      {isSuccess && (
        <div className={styles.successMessage}>
          ✓ Account created! You can now sign in.
        </div>
      )}

      {errors.general && !isSuccess && (
        <div className={styles.errorMessage}>
          {errors.general}
        </div>
      )}

      <div className={styles.fieldsContainer}>
        <InputField
          name="username"
          type="text"
          label="Username"
          value={formData.username}
          onChange={handleInputChange}
          error={errors.username}
          placeholder="yourusername"
          autoComplete="username"
          disabled={isLoading || isSuccess}
        />

        <InputField
          name="email"
          type="email"
          label="Email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          placeholder="name@example.com"
          autoComplete="email"
          disabled={isLoading || isSuccess}
        />

        <InputField
          name="password"
          type="password"
          label="Password"
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
          placeholder="Create a password"
          autoComplete="new-password"
          disabled={isLoading || isSuccess}
          hasToggle
        />

        <InputField
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          error={errors.confirmPassword}
          placeholder="Re-enter your password"
          autoComplete="new-password"
          disabled={isLoading || isSuccess}
          hasToggle
        />
      </div>

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isLoading || isSuccess}
      >
        {isLoading ? (
          <>
            <span className={styles.spinner}></span>
            Creating account...
          </>
        ) : (
          'Sign Up'
        )}
      </button>

      <div className={styles.signupContainer}>
        <span>Already have an account?</span>
        <a href="/" className={styles.signupLink}>
          Sign in
        </a>
      </div>
    </form>
  );
}
