/**
 * LoginBanner Component
 * 
 * Displays the left-side banner with background image and messaging
 * for the split-screen login layout. Hides on mobile devices.
 * 
 * Features:
 * - Full-height background image with dark gradient overlay
 * - Attractive headline and supporting text
 * - Responsive: hidden on screens below 768px
 */

import styles from './LoginBanner.module.css'

export default function LoginBanner() {
  return (
    <div className={styles.banner}>
      {/* Background image container with gradient overlay */}
      <div className={styles.imageWrapper}>
        {/* Dark gradient overlay for text readability */}
        <div className={styles.overlay}></div>
        
        {/* Content positioned on top of image */}
        <div className={styles.content}>
          <h1 className={styles.headline}>Where Great Teams Grow</h1>
          <p className={styles.subheadline}>
            We believe in empowering talented people to do their best work. 
            Together, we build solutions that matter.
          </p>
        </div>
      </div>
    </div>
  )
}
