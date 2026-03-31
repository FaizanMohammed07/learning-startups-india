// Mentor Dashboard - No Header/Footer Layout
export default function MentorLayout({ children }) {
  return (
    <div style={{ minHeight: '100vh' }}>
      {children}
    </div>
  );
}
