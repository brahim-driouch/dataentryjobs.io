export const EmailVerificationTemplate = ({ verificationUrl }: { verificationUrl: string }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(to right, #2563eb, #1d4ed8)', padding: '2rem 1.5rem', textAlign: 'center' as const }}>
        <div style={{ width: '4rem', height: '4rem', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
          <svg style={{ width: '2rem', height: '2rem', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>Verify Your Email Address</h1>
        <p style={{ color: '#bfdbfe', fontSize: '1.125rem' }}>Welcome to DataEntryJobs.io</p>
      </div>

      {/* Content */}
      <div style={{ padding: '2.5rem 2rem' }}>
        <div style={{ textAlign: 'center' as const, marginBottom: '2rem' }}>
          <p style={{ color: '#374151', fontSize: '1.125rem', marginBottom: '1.5rem' }}>
            Thank you for signing up! To complete your registration and start exploring data entry opportunities, please verify your email address by clicking the button below:
          </p>
          
          {/* Verification Button */}
          <div style={{ margin: '2rem 0' }}>
            <a 
              href={verificationUrl}
              style={{ display: 'inline-flex', alignItems: 'center', padding: '1rem 2rem', background: 'linear-gradient(to right, #2563eb, #1d4ed8)', color: 'white', fontWeight: '600', borderRadius: '0.5rem', textDecoration: 'none' }}
            >
              <svg style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.75rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Verify Email Address
            </a>
          </div>

          {/* Alternative Link */}
          <p style={{ color: '#4b5563', fontSize: '0.875rem', marginBottom: '2rem' }}>
            Or copy and paste this link in your browser:
          </p>
          <div style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1rem', marginBottom: '2rem', wordBreak: 'break-all' as const }}>
            <code style={{ color: '#2563eb', fontSize: '0.875rem' }}>{verificationUrl}</code>
          </div>
        </div>

        {/* Additional Info Sections */}
        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '2rem' }}>
          {/* Why Verify Section */}
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <div style={{ flexShrink: 0, width: '3rem', height: '3rem', backgroundColor: '#dcfce7', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '1rem' }}>
              <svg style={{ width: '1.5rem', height: '1.5rem', color: '#16a34a' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>Why verify your email?</h3>
              <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                Email verification ensures the security of your account and allows us to send you important updates about data entry job opportunities.
              </p>
            </div>
          </div>

          {/* Need Help Section */}
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <div style={{ flexShrink: 0, width: '3rem', height: '3rem', backgroundColor: '#f3e8ff', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '1rem' }}>
              <svg style={{ width: '1.5rem', height: '1.5rem', color: '#9333ea' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h3 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>Need help?</h3>
              <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                If you didn't create an account with us, please ignore this email. If you're having trouble verifying your email, contact our support team.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ backgroundColor: '#f9fafb', padding: '1.5rem 2rem', borderTop: '1px solid #e5e7eb' }}>
        <div style={{ textAlign: 'center' as const }}>
          {/* Logo and Brand */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <div style={{ width: '2rem', height: '2rem', backgroundColor: '#2563eb', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '0.75rem' }}>
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '0.75rem' }}>DE</span>
            </div>
            <span style={{ color: '#1f2937', fontWeight: 'bold', fontSize: '1.25rem' }}>DataEntryJobs.io</span>
          </div>
          
          {/* Tagline */}
          <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem' }}>
            Connecting talented data entry professionals with great opportunities
          </p>
          
          {/* Links */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1rem', fontSize: '0.875rem' }}>
            <a href="#" style={{ color: '#6b7280', textDecoration: 'none' }}>Help Center</a>
            <a href="#" style={{ color: '#6b7280', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ color: '#6b7280', textDecoration: 'none' }}>Terms of Service</a>
          </div>
          
          {/* Copyright */}
          <p style={{ color: '#9ca3af', fontSize: '0.75rem' }}>
            © {currentYear} DataEntryJobs.io. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};