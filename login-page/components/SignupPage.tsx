/**
 * SignupPage Component
 *
 * Split-screen layout mirroring LoginPage:
 * - Left side: Image banner
 * - Right side: Signup form
 */
'use client';

import React from 'react';
import SignupForm from './SignupForm';
import LoginBanner from './LoginBanner';
import styles from './LoginPage.module.css';

export default function SignupPage() {
  return (
    <div className={styles.pageContainer}>
      <LoginBanner />

      <div className={styles.formContainer}>
        <SignupForm />
      </div>
    </div>
  );
}
