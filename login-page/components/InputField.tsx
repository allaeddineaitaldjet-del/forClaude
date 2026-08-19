/**
 * InputField Component
 * Reusable input component with:
 * - Top-aligned labels
 * - Error message display
 * - Show/hide password toggle for password inputs
 * - Accessibility features (aria labels, etc)
 */
'use client';

import React, { useState } from 'react';
import styles from './InputField.module.css';

interface InputFieldProps {
  name: string;
  type: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
  disabled?: boolean;
  hasToggle?: boolean; // Show/hide password toggle
}

export default function InputField({
  name,
  type,
  label,
  value,
  onChange,
  error,
  placeholder,
  autoComplete,
  disabled,
  hasToggle,
}: InputFieldProps) {
  // Toggle state for showing/hiding password
  const [showPassword, setShowPassword] = useState(false);

  // Determine input type: show password if toggle is active, otherwise use provided type
  const inputType = hasToggle && showPassword ? 'text' : type;

  return (
    <div className={styles.fieldContainer}>
      {/* Top-aligned label */}
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>

      {/* Input wrapper with toggle icon positioning */}
      <div className={styles.inputWrapper}>
        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          className={`${styles.input} ${error ? styles.inputError : ''}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        />

        {/* Show/hide password toggle button (only for password fields) */}
        {hasToggle && (
          <button
            type="button"
            className={styles.toggleButton}
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            disabled={disabled}
            tabIndex={0}
          >
            {showPassword ? (
              // Eye icon (showing password)
              <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            ) : (
              // Eye-off icon (hiding password)
              <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* Error message displayed below input */}
      {error && (
        <p id={`${name}-error`} className={styles.errorText}>
          {error}
        </p>
      )}
    </div>
  );
}
