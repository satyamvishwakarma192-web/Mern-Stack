import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#f4f7fb', padding: '24px' }}>
      <div style={{ maxWidth: '480px', width: '100%', background: '#ffffff', borderRadius: '20px', padding: '32px', boxShadow: '0 18px 45px rgba(15, 23, 42, 0.12)' }}>
        <p style={{ margin: 0, color: '#f97316', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.8rem' }}>Welcome</p>
        <h1 style={{ margin: '10px 0 12px', fontSize: '2rem', color: '#0f172a' }}>You are now on the home page</h1>
        <p style={{ margin: '0 0 20px', color: '#475569', lineHeight: 1.6 }}>
          Your login credentials were accepted and the app has moved you into the main dashboard experience.
        </p>
        <button
          type="button"
          onClick={() => navigate('/user/login')}
          style={{ border: 'none', borderRadius: '999px', padding: '12px 20px', background: '#f97316', color: '#fff', cursor: 'pointer', fontWeight: 600 }}
        >
          Back to login
        </button>
      </div>
    </div>
  );
};

export default HomePage;
