import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const categoryColors = {
  Technology: { bg: '#E6F1FB', color: '#0C447C' },
  Design: { bg: '#E1F5EE', color: '#085041' },
  Life: { bg: '#FAECE7', color: '#712B13' },
  Finance: { bg: '#EEEDFE', color: '#3C3489' },
  Travel: { bg: '#FEF3E6', color: '#7A3B00' },
  Food: { bg: '#FDE8F0', color: '#7A0033' },
};

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Sabhi');

  useEffect(() => {
    fetchPosts();
  }, [activeCategory]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/posts${activeCategory !== 'Sabhi' ? `?category=${activeCategory}` : ''}`
      );
      setPosts(data);
    } catch (error) {
      console.error('Posts fetch nahi huyi:', error);
    }
    setLoading(false);
  };

  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>

      {/* Category Filter */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {['Sabhi', 'Technology', 'Design', 'Life', 'Finance', 'Travel', 'Food'].map((cat) => (
          <span
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{ fontSize: '12px', padding: '5px 14px', borderRadius: '20px', border: '1px solid #ddd', cursor: 'pointer', background: activeCategory === cat ? '#000' : '#fff', color: activeCategory === cat ? '#fff' : '#555' }}
          >
            {cat}
          </span>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#888' }}>
          Posts load ho rahi hain...
        </div>
      ) : posts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#888' }}>
          <p style={{ marginBottom: '1rem' }}>Abhi koi post nahi hai!</p>
          <Link to="/write" style={{ color: '#000', fontWeight: '500' }}>Pehli post likhein →</Link>
        </div>
      ) : (
        <>
          {/* Featured Post */}
          {featuredPost && (
            <div style={{ background: '#f8f8f8', borderRadius: '12px', padding: '2rem', marginBottom: '2rem' }}>
              <span style={{ fontSize: '11px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '3px 10px', borderRadius: '20px', background: categoryColors[featuredPost.category]?.bg || '#eee', color: categoryColors[featuredPost.category]?.color || '#555' }}>
                {featuredPost.category}
              </span>
              <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', fontWeight: '700', margin: '0.75rem 0 0.5rem', lineHeight: '1.3' }}>
                {featuredPost.title}
              </h1>
              <p style={{ fontSize: '13px', color: '#888', marginBottom: '0.75rem' }}>
                {featuredPost.author?.name} · {new Date(featuredPost.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
              <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.7', marginBottom: '1rem' }}>
                {featuredPost.content.substring(0, 200)}...
              </p>
              <Link to={`/post/${featuredPost._id}`} style={{ fontSize: '13px', padding: '8px 20px', background: '#000', color: '#fff', borderRadius: '20px', textDecoration: 'none' }}>
                Padhein →
              </Link>
            </div>
          )}

          {/* Posts Grid */}
          {otherPosts.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              {otherPosts.map((post) => (
                <Link to={`/post/${post._id}`} key={post._id} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ border: '1px solid #eee', borderRadius: '12px', overflow: 'hidden' }}>
                    <div style={{ height: '140px', background: categoryColors[post.category]?.bg || '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', color: categoryColors[post.category]?.color || '#888' }}>
                      Cover Image
                    </div>
                    <div style={{ padding: '1rem' }}>
                      <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#888' }}>
                        {post.category}
                      </span>
                      <h3 style={{ fontSize: '15px', fontWeight: '600', margin: '4px 0 8px', lineHeight: '1.4' }}>
                        {post.title}
                      </h3>
                      <p style={{ fontSize: '12px', color: '#888' }}>
                        {post.author?.name} · {new Date(post.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;