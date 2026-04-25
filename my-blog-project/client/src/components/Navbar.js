import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();

  const navStyle = {
    padding: '1rem 2rem',
    borderBottom: `1px solid ${darkMode ? '#333' : '#eee'}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: darkMode ? '#1a1a1a' : '#fff',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  };

  const linkStyle = {
    textDecoration: 'none',
    color: darkMode ? '#ccc' : '#555',
    fontSize: '14px',
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none', color: darkMode ? '#fff' : '#000' }}>
        Lekhak
      </Link>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          style={{ fontSize: '18px', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
          title={darkMode ? 'Light mode' : 'Dark mode'}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>

        {user ? (
          <>
            <span style={{ fontSize: '14px', color: darkMode ? '#ccc' : '#555' }}>
              Namaste, {user.name}! 👋
            </span>
            <Link to="/write" style={{ textDecoration: 'none', padding: '0.4rem 1rem', background: darkMode ? '#fff' : '#000', color: darkMode ? '#000' : '#fff', borderRadius: '20px', fontSize: '14px' }}>
              Write
            </Link>
            <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
            <button
              onClick={logout}
              style={{ fontSize: '14px', padding: '0.4rem 1rem', border: `1px solid ${darkMode ? '#444' : '#ddd'}`, borderRadius: '20px', cursor: 'pointer', background: 'transparent', color: darkMode ? '#ccc' : '#555' }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/register" style={linkStyle}>Register</Link>
            <Link to="/write" style={{ textDecoration: 'none', padding: '0.4rem 1rem', background: darkMode ? '#fff' : '#000', color: darkMode ? '#000' : '#fff', borderRadius: '20px', fontSize: '14px' }}>
              Write
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;