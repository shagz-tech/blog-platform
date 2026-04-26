import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const stats = [
    { label: 'Total Views', value: '2,847', delta: '+12% this week', bg: '#E6F1FB', color: '#0C447C' },
    { label: 'Followers', value: '142', delta: '+8 naye', bg: '#E1F5EE', color: '#085041' },
    { label: 'Posts', value: posts.length, delta: '', bg: '#EEEDFE', color: '#3C3489' },
    { label: 'Comments', value: '94', delta: '6 pending', bg: '#FAEEDA', color: '#633806' },
  ];

  useEffect(() => {
    const fetchMyPosts = async () => {
      if (!user) return;
      try {
        const { data } = await axios.get(
          'http://localhost:5000/api/posts/user/myposts',
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        setPosts(data);
      } catch (error) {
        console.error('Posts fetch nahi huyi:', error);
      }
      setLoading(false);
    };
    fetchMyPosts();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm('Kya aap sach mein yeh post delete karna chahte hain?')) return;
    try {
      await axios.delete(
        `http://localhost:5000/api/posts/${id}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setPosts(posts.filter((p) => p._id !== id));
    } catch (error) {
      console.error('Delete nahi hua:', error);
    }
  };

  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem', color: '#888' }}>
        <h2>Pehle login karein!</h2>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '1.75rem', fontWeight: '700', marginBottom: '4px' }}>
            Namaste, {user.name}! 👋
          </h1>
          <p style={{ color: '#888', fontSize: '14px' }}>Aapka writing dashboard</p>
        </div>
        <Link
          to="/write"
          style={{ padding: '10px 20px', background: '#000', color: '#fff', borderRadius: '20px', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}
        >
          + Nayi post likhein
        </Link>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {stats.map((stat) => (
          <div key={stat.label} style={{ background: stat.bg, borderRadius: '12px', padding: '1.25rem' }}>
            <div style={{ fontSize: '24px', fontWeight: '600', color: stat.color }}>{stat.value}</div>
            <div style={{ fontSize: '12px', color: stat.color, marginTop: '4px', opacity: 0.8 }}>{stat.label}</div>
            {stat.delta && <div style={{ fontSize: '11px', color: stat.color, marginTop: '4px', fontWeight: '500' }}>{stat.delta}</div>}
          </div>
        ))}
      </div>

      {/* Posts Table */}
      <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: '16px', overflow: 'hidden' }}>

        {/* Table Header */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '1rem 1.5rem', borderBottom: '1px solid #eee', background: '#f8f8f8' }}>
          <span style={{ fontSize: '11px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#888' }}>
            Aapke Posts
          </span>
          <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#888' }}>{posts.length} posts</span>
        </div>

        {/* Posts */}
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>
            Loading...
          </div>
        ) : posts.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#888' }}>
            <p style={{ marginBottom: '1rem' }}>Abhi tak koi post nahi likhi!</p>
            <Link to="/write" style={{ color: '#000', fontWeight: '500' }}>Pehli post likhein →</Link>
          </div>
        ) : (
          posts.map((post, index) => (
            <div
              key={post._id}
              style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.5rem', borderBottom: index < posts.length - 1 ? '1px solid #eee' : 'none', flexWrap: 'wrap' }}
            >
              {/* Status */}
              <span style={{
                fontSize: '10px', fontWeight: '500', padding: '3px 10px', borderRadius: '20px', whiteSpace: 'nowrap',
                background: post.status === 'published' ? '#EAF3DE' : '#F1EFE8',
                color: post.status === 'published' ? '#3B6D11' : '#5F5E5A'
              }}>
                {post.status === 'published' ? 'Published' : 'Draft'}
              </span>

              {/* Title */}
              <Link to={`/post/${post._id}`} style={{ fontSize: '14px', fontWeight: '500', color: '#111', flex: 1, textDecoration: 'none' }}>
                {post.title}
              </Link>

              {/* Views */}
              <span style={{ fontSize: '12px', color: '#888', minWidth: '70px', textAlign: 'right' }}>
                {post.views > 0 ? `${post.views.toLocaleString()} views` : '—'}
              </span>

              {/* Date */}
              <span style={{ fontSize: '12px', color: '#888', minWidth: '80px', textAlign: 'right' }}>
                {new Date(post.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
              </span>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <Link
                  to={`/edit/${post._id}`}
                  style={{ fontSize: '12px', padding: '4px 12px', border: '1px solid #eee', borderRadius: '20px', background: '#fff', cursor: 'pointer', color: '#555', textDecoration: 'none' }}
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post._id)}
                  style={{ fontSize: '12px', padding: '4px 12px', border: '1px solid #ffcccc', borderRadius: '20px', background: '#fff0f0', cursor: 'pointer', color: '#cc0000' }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Logout */}
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <button
          onClick={logout}
          style={{ fontSize: '13px', padding: '8px 20px', border: '1px solid #ddd', borderRadius: '20px', background: '#fff', cursor: 'pointer', color: '#888' }}
        >
          Logout
        </button>
      </div>

    </div>
  );
};

export default Dashboard;