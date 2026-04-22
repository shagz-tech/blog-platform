import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '1rem 2rem', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none', color: '#000' }}>
        Lekhak
      </Link>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/login" style={{ textDecoration: 'none', color: '#555' }}>Login</Link>
        <Link to="/register" style={{ textDecoration: 'none', color: '#555' }}>Register</Link>
        <Link to="/write" style={{ textDecoration: 'none', padding: '0.4rem 1rem', background: '#000', color: '#fff', borderRadius: '20px' }}>Write</Link>
      </div>
    </nav>
  );
};

export default Navbar;