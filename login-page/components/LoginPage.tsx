/**
 * LoginPage Component
 * 
 * Split-screen layout with:
 * - Left side (60%): Image banner with headline and supporting text
 * - Right side (40%): Login form
 * 
 * Responsive: stacks to full-width form on mobile (< 768px)
 */
'use client';

import React from 'react';
import LoginForm from './LoginForm';
import LoginBanner from './LoginBanner';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  return (
    <div className={styles.pageContainer}>
      {/* Left side: Image banner with headline and overlay text */}
      <LoginBanner />
      
      {/* Right side: Login form centered vertically and horizontally */}
      <div className={styles.formContainer}>
        <LoginForm />
      </div>
    </div>
  );
}
