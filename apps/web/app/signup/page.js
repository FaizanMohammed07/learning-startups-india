'use client';

/* ==========================================
   SIGNUP PAGE - Client Component
   
   CSS imported here to ensure proper loading on client-side navigation
   ========================================== */

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { signUp, initGoogleSignIn, resendVerificationEmail } from '@/lib/auth';
import '@/styles/signup.css';
// import '@/styles/signup-responsive.css';

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const googleBtnRef = useRef(null);

  // Carousel auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % 4);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Update carousel slides and indicators
  useEffect(() => {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');

    slides.forEach((slide, index) => {
      if (index === currentSlide) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    indicators.forEach((indicator, index) => {
      if (index === currentSlide) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }, [currentSlide]);

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      router.replace('/dashboard');
    }
  }, [router]);

  // Render Google Sign-In button
  useEffect(() => {
    if (googleBtnRef.current) {
      initGoogleSignIn(googleBtnRef.current, ({ data, error: err }) => {
        if (err) {
          setError(err.message);
          return;
        }
        if (data) {
          setSuccess(true);
          setTimeout(() => router.push('/dashboard'), 1500);
        }
      });
    }
  }, [router]);

  // Check password strength in real-time
  useEffect(() => {
    setPasswordStrength({
      hasMinLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  }, [password]);

  // Check if all password requirements are met
  const isPasswordStrong =
    passwordStrength.hasMinLength &&
    passwordStrength.hasUpperCase &&
    passwordStrength.hasLowerCase &&
    passwordStrength.hasNumber &&
    passwordStrength.hasSpecialChar;

  // Validate email in real-time
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(email));
  }, [email]);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validation
    if (!emailValid) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    if (!termsAccepted) {
      setError('Please accept the Terms & Conditions and Privacy Policy');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      setIsLoading(false);
      return;
    }

    if (
      !passwordStrength.hasUpperCase ||
      !passwordStrength.hasLowerCase ||
      !passwordStrength.hasNumber ||
      !passwordStrength.hasSpecialChar
    ) {
      setError('Password must contain uppercase, lowercase, number, and special character');
      setIsLoading(false);
      return;
    }

    try {
      console.log('Submitting signup...', { email, fullName });
      const { data, error } = await signUp(email, password, fullName);

      console.log('Signup response:', { data, error });

      if (error) {
        console.error('Signup error:', error);
        setError(error.message || 'Failed to create account. Please try again.');
        setIsLoading(false);
        return;
      }

      if (data) {
        console.log('Signup successful, showing success state');
        // Show success state (no redirect)
        setSuccess(true);
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  // Resend verification email
  const handleResendEmail = async () => {
    setResendLoading(true);
    setResendMessage('');

    try {
      const { error } = await resendVerificationEmail(email);

      if (error) {
        console.error('Resend error:', error);
        setResendMessage('Failed to resend email. Please try again.');
      } else {
        setResendMessage('✓ Verification email sent! Check your inbox.');
      }
    } catch (err) {
      console.error('Unexpected resend error:', err);
      setResendMessage('An error occurred. Please try again.');
    } finally {
      setResendLoading(false);
      // Clear message after 5 seconds
      setTimeout(() => setResendMessage(''), 5000);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        {/* Left Side - Premium Graphics */}
        <div className="signup-content">
          {/* Animated Background Grid */}
          <div className="auth-grid-bg"></div>

          {/* Floating 3D Shapes */}
          <div className="floating-shapes">
            <div className="shape-3d shape-cube"></div>
            <div className="shape-3d shape-sphere"></div>
            <div className="shape-3d shape-pyramid"></div>
          </div>

          {/* Logo */}
          <Link href="/" className="auth-logo">
            <Image
              src="/assets/images/Startupsina logo wight.png"
              alt="Startup India Incubation"
              width={220}
              height={65}
              priority
              className="auth-logo-image"
            />
          </Link>

          {/* Floating Graphic Cards */}
          <div className="auth-graphics-container">
            {/* Stats Card - Animated */}
            <div className="auth-card stats-card">
              <div className="card-glow"></div>
              <div className="card-header">
                <span className="card-label">Live Seats</span>
                <div className="pulse-indicator"></div>
              </div>
              <div className="card-value">2,051</div>
              <div className="card-trend">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M2 10L6 6L9 9L14 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span>↑ 24%</span>
              </div>
            </div>

            {/* Success Badge Card */}
            <div className="auth-card success-card">
              <div className="card-glow"></div>
              <div className="success-icon-wrapper">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path
                    d="M20 2L24 14L36 16L27 25L29 38L20 32L11 38L13 25L4 16L16 14L20 2Z"
                    fill="url(#starGradient)"
                  />
                  <defs>
                    <linearGradient id="starGradient" x1="4" y1="2" x2="36" y2="38">
                      <stop stopColor="#FFD700" />
                      <stop offset="1" stopColor="#FFA500" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="success-info">
                <div className="success-number">₹50L+</div>
                <div className="success-label">Avg Funding</div>
              </div>
            </div>

            {/* Mentor Avatars Card */}
            <div className="auth-card mentors-card">
              <div className="card-glow"></div>
              <div className="mentor-avatars-group">
                <div className="mentor-avatar">👨‍💼</div>
                <div className="mentor-avatar">👩‍💼</div>
                <div className="mentor-avatar">👨‍🎓</div>
                <div className="mentor-avatar-more">+47</div>
              </div>
              <div className="mentor-label">Expert Mentors</div>
            </div>

            {/* Growth Chart Card */}
            <div className="auth-card chart-card">
              <div className="card-glow"></div>
              <div className="chart-header">
                <span className="chart-label">Growth</span>
                <span className="chart-period">2025</span>
              </div>
              <div className="mini-chart">
                <div className="chart-bar" style={{ height: '40%' }}></div>
                <div className="chart-bar" style={{ height: '65%' }}></div>
                <div className="chart-bar" style={{ height: '45%' }}></div>
                <div className="chart-bar" style={{ height: '80%' }}></div>
                <div className="chart-bar" style={{ height: '95%' }}></div>
              </div>
            </div>

            {/* Success Rate Card */}
            <div className="auth-card success-rate-card">
              <div className="card-glow"></div>
              <div className="success-rate-circle">
                <svg className="progress-ring" width="64" height="64">
                  <circle
                    className="progress-ring-circle"
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="5"
                    fill="transparent"
                    r="27"
                    cx="32"
                    cy="32"
                  />
                  <circle
                    className="progress-ring-circle-animated"
                    stroke="url(#successGradient2)"
                    strokeWidth="5"
                    fill="transparent"
                    r="27"
                    cx="32"
                    cy="32"
                    strokeDasharray="169.646"
                    strokeDashoffset="16.965"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="successGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="success-rate-text">
                  <div className="success-rate-number">95%</div>
                </div>
              </div>
              <div className="success-rate-label">Success Rate</div>
            </div>

            {/* Funding Secured Card */}
            <div className="auth-card funding-card">
              <div className="card-glow"></div>
              <div className="funding-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path
                    d="M16 4L18 12L26 14L20 20L22 28L16 24L10 28L12 20L6 14L14 12L16 4Z"
                    fill="url(#fundingGradient)"
                  />
                  <circle cx="16" cy="16" r="3" fill="#fff" />
                  <defs>
                    <linearGradient id="fundingGradient" x1="6" y1="4" x2="26" y2="28">
                      <stop offset="0%" stopColor="#e63946" />
                      <stop offset="100%" stopColor="#ff6b9d" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="funding-amount">₹110Cr+</div>
              <div className="funding-label">Total Funding</div>
            </div>
          </div>

          {/* Text Carousel Section */}
          <div className="auth-carousel">
            <div className="carousel-content">
              <div className="carousel-slide active">
                <h3 className="carousel-title">Easy to Use Dashboard</h3>
                <p className="carousel-description">
                  Access your personalized dashboard with real-time analytics, course progress, and
                  mentorship tracking all in one place.
                </p>
              </div>
              <div className="carousel-slide">
                <h3 className="carousel-title">Learn from Industry Experts</h3>
                <p className="carousel-description">
                  Get access to premium courses, workshops, and masterclasses taught by successful
                  entrepreneurs and industry leaders.
                </p>
              </div>
              <div className="carousel-slide">
                <h3 className="carousel-title">Secure Funding Opportunities</h3>
                <p className="carousel-description">
                  Connect with investors, apply for grants, and access funding programs worth ₹50L+
                  to scale your startup.
                </p>
              </div>
              <div className="carousel-slide">
                <h3 className="carousel-title">Network & Collaborate</h3>
                <p className="carousel-description">
                  Join a vibrant community of 5,000+ entrepreneurs, find co-founders, and build
                  valuable partnerships.
                </p>
              </div>
            </div>
            <div className="carousel-indicators">
              <span className="indicator active"></span>
              <span className="indicator"></span>
              <span className="indicator"></span>
              <span className="indicator"></span>
            </div>
          </div>
        </div>

        {/* Right Side - Form or Success */}
        <div className="signup-form-container">
          <div className="form-card">
            {!success ? (
              <>
                <div className="form-header">
                  <div className="header-badge">
                    <span>Startup India Incubation</span>
                  </div>
                  <h2 className="form-title">Create Your Account</h2>
                  <p className="form-subtitle">
                    Join thousands of successful entrepreneurs and get access to exclusive
                    mentorship, funding opportunities, and a vibrant community of innovators.
                  </p>
                </div>

                {error && (
                  <div className="alert alert-error">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="signup-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="fullName" className="form-label">
                        Full Name
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        className="form-input"
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        required
                        disabled={isLoading}
                        aria-label="Full Name"
                        aria-required="true"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        Email Address
                      </label>
                      <div
                        className={`email-input-wrapper ${emailTouched && emailValid ? 'email-valid' : ''} ${emailTouched && !emailValid && email ? 'email-invalid' : ''}`}
                      >
                        <input
                          id="email"
                          type="email"
                          className="form-input"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          onBlur={() => setEmailTouched(true)}
                          placeholder="you@example.com"
                          required
                          disabled={isLoading}
                          aria-label="Email Address"
                          aria-invalid={emailTouched && !emailValid}
                          aria-describedby={emailTouched && !emailValid ? 'email-error' : undefined}
                        />
                        {emailTouched && emailValid && (
                          <span className="input-icon-success" aria-label="Valid email">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </span>
                        )}
                        {emailTouched && !emailValid && email && (
                          <span className="input-icon-error" aria-label="Invalid email">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <line x1="15" y1="9" x2="9" y2="15" />
                              <line x1="9" y1="9" x2="15" y2="15" />
                            </svg>
                          </span>
                        )}
                      </div>
                      {emailTouched && !emailValid && email && (
                        <div className="field-error" id="email-error" role="alert">
                          Please enter a valid email address
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <div
                        className={`password-input-wrapper ${isPasswordStrong ? 'password-strong' : ''}`}
                      >
                        <input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          className="form-input password-input"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          onFocus={() => setPasswordFocused(true)}
                          onBlur={() => setPasswordFocused(false)}
                          placeholder="Strong password"
                          required
                          disabled={isLoading}
                        />
                        {isPasswordStrong && <span className="input-legend">Strong Password</span>}
                        <button
                          type="button"
                          className="password-toggle"
                          onClick={() => setShowPassword(!showPassword)}
                          tabIndex="-1"
                        >
                          {showPassword ? (
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                              <line x1="1" y1="1" x2="23" y2="23" />
                            </svg>
                          ) : (
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                          )}
                        </button>
                      </div>

                      {/* Password Strength Indicator - Only show when focused and not all requirements met */}
                      {password && passwordFocused && !isPasswordStrong && (
                        <div className="password-strength">
                          <div className="strength-requirements">
                            <div
                              className={`requirement ${passwordStrength.hasMinLength ? 'met' : ''}`}
                            >
                              <span className="requirement-icon">
                                {passwordStrength.hasMinLength ? '✓' : '○'}
                              </span>
                              <span className="requirement-text">At least 8 characters</span>
                            </div>
                            <div
                              className={`requirement ${passwordStrength.hasUpperCase ? 'met' : ''}`}
                            >
                              <span className="requirement-icon">
                                {passwordStrength.hasUpperCase ? '✓' : '○'}
                              </span>
                              <span className="requirement-text">One uppercase letter</span>
                            </div>
                            <div
                              className={`requirement ${passwordStrength.hasLowerCase ? 'met' : ''}`}
                            >
                              <span className="requirement-icon">
                                {passwordStrength.hasLowerCase ? '✓' : '○'}
                              </span>
                              <span className="requirement-text">One lowercase letter</span>
                            </div>
                            <div
                              className={`requirement ${passwordStrength.hasNumber ? 'met' : ''}`}
                            >
                              <span className="requirement-icon">
                                {passwordStrength.hasNumber ? '✓' : '○'}
                              </span>
                              <span className="requirement-text">One number</span>
                            </div>
                            <div
                              className={`requirement ${passwordStrength.hasSpecialChar ? 'met' : ''}`}
                            >
                              <span className="requirement-icon">
                                {passwordStrength.hasSpecialChar ? '✓' : '○'}
                              </span>
                              <span className="requirement-text">
                                One special character (!@#$%^&*)
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="confirmPassword" className="form-label">
                        Confirm Password
                      </label>
                      <div
                        className={`password-input-wrapper ${confirmPassword && password !== confirmPassword ? 'password-mismatch' : ''} ${confirmPassword && password === confirmPassword && password ? 'password-match' : ''}`}
                      >
                        <input
                          id="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          className="form-input password-input"
                          value={confirmPassword}
                          onChange={e => setConfirmPassword(e.target.value)}
                          placeholder="Re-enter your password"
                          required
                          disabled={isLoading}
                        />
                        {confirmPassword && password !== confirmPassword && (
                          <span className="input-legend-error">Passwords Don't Match</span>
                        )}
                        {confirmPassword && password === confirmPassword && password && (
                          <span className="input-legend">Passwords Match</span>
                        )}
                        <button
                          type="button"
                          className="password-toggle"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          tabIndex="-1"
                        >
                          {showConfirmPassword ? (
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                              <line x1="1" y1="1" x2="23" y2="23" />
                            </svg>
                          ) : (
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Terms & Privacy Checkbox */}
                  <div className="terms-container">
                    <label className="terms-checkbox-label">
                      <input
                        type="checkbox"
                        className="terms-checkbox"
                        checked={termsAccepted}
                        onChange={e => setTermsAccepted(e.target.checked)}
                        disabled={isLoading}
                        aria-label="Accept terms and conditions"
                        required
                      />
                      <span className="checkbox-custom" aria-hidden="true"></span>
                      <span className="terms-text">
                        I agree to the{' '}
                        <Link
                          href="/terms"
                          className="terms-link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Terms & Conditions
                        </Link>{' '}
                        and{' '}
                        <Link
                          href="/privacy"
                          className="terms-link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Privacy Policy
                        </Link>
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className={`signup-btn ${isLoading ? 'btn-loading' : ''}`}
                    disabled={isLoading || !termsAccepted}
                    aria-busy={isLoading}
                    aria-label={isLoading ? 'Creating account, please wait' : 'Create account'}
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="spinner"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="12" cy="12" r="10" />
                        </svg>
                        Creating account...
                      </>
                    ) : (
                      <>
                        Create Account
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>

                <div className="form-divider">
                  <span>or continue with</span>
                </div>

                <div className="social-buttons social-buttons-single">
                  <div
                    ref={googleBtnRef}
                    style={{ display: 'flex', justifyContent: 'center' }}
                  ></div>
                </div>

                <div className="form-footer">
                  <p className="footer-text">
                    Already have an account?{' '}
                    <Link href="/login" className="footer-link">
                      Sign in
                    </Link>
                  </p>
                </div>
              </>
            ) : (
              /* Success State */
              <div className="success-container">
                {/* Animated Success Icon */}
                <div className="success-icon-wrapper">
                  <div className="success-circle">
                    <svg className="success-checkmark" width="80" height="80" viewBox="0 0 80 80">
                      <circle
                        className="checkmark-circle"
                        cx="40"
                        cy="40"
                        r="36"
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="4"
                      />
                      <path
                        className="checkmark-check"
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="4"
                        strokeLinecap="round"
                        d="M20 40 L35 55 L60 25"
                      />
                    </svg>
                  </div>
                </div>

                {/* Welcome Message */}
                <div className="success-content">
                  <h2 className="success-title">Welcome Aboard! 🎉</h2>
                  <p className="success-subtitle">Your account has been created successfully</p>

                  {/* Email Confirmation Box */}
                  <div className="confirmation-box">
                    <div className="confirmation-icon">
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="confirmation-content">
                      <h3 className="confirmation-title">Verify Your Email</h3>
                      <p className="confirmation-text">
                        We've sent a confirmation email to <strong>{email}</strong>
                      </p>
                      <p className="confirmation-instruction">
                        Please check your inbox and click the verification link to activate your
                        account.
                      </p>
                    </div>
                  </div>

                  {/* Next Steps */}
                  <div className="next-steps">
                    <h3 className="steps-title">What's Next?</h3>
                    <div className="steps-list">
                      <div className="step-item">
                        <div className="step-number">1</div>
                        <div className="step-content">
                          <h4 className="step-title">Check Your Email</h4>
                          <p className="step-description">
                            Open the confirmation email we just sent you
                          </p>
                        </div>
                      </div>
                      <div className="step-item">
                        <div className="step-number">2</div>
                        <div className="step-content">
                          <h4 className="step-title">Verify Your Account</h4>
                          <p className="step-description">
                            Click the verification link in the email
                          </p>
                        </div>
                      </div>
                      <div className="step-item">
                        <div className="step-number">3</div>
                        <div className="step-content">
                          <h4 className="step-title">Access Your Dashboard</h4>
                          <p className="step-description">
                            Log in with your credentials and start your journey
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="success-actions">
                    <Link href="/login" className="success-btn primary">
                      Go to Login
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <button
                      onClick={handleResendEmail}
                      className="success-btn secondary"
                      disabled={resendLoading}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                        <path d="M21 3v5h-5" />
                        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                        <path d="M3 21v-5h5" />
                      </svg>
                      {resendLoading ? 'Sending...' : 'Resend Email'}
                    </button>
                  </div>

                  {/* Resend Message */}
                  {resendMessage && (
                    <div
                      style={{
                        padding: '12px',
                        borderRadius: '8px',
                        marginBottom: '16px',
                        textAlign: 'center',
                        fontSize: '14px',
                        background: resendMessage.includes('Failed')
                          ? 'rgba(239, 68, 68, 0.1)'
                          : 'rgba(34, 197, 94, 0.1)',
                        color: resendMessage.includes('Failed') ? '#dc2626' : '#16a34a',
                        border: `1px solid ${resendMessage.includes('Failed') ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)'}`,
                      }}
                    >
                      {resendMessage}
                    </div>
                  )}

                  {/* Help Text */}
                  <div className="success-help">
                    <p className="help-text">
                      Didn't receive the email? Check your spam folder or{' '}
                      <a href="mailto:support@startupindia.com" className="help-link">
                        contact support
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
