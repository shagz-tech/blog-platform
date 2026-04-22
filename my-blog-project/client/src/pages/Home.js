import { Link } from 'react-router-dom';

const posts = [
  {
    id: 1,
    category: 'Technology',
    title: 'AI se apni writing kaise behtar karein',
    excerpt: 'Aaj ke daur mein AI tools sirf engineers ke liye nahi — writers ke liye bhi equally powerful hain...',
    author: 'Priya Sharma',
    date: '12 Apr 2026',
    readTime: '5 min',
  },
  {
    id: 2,
    category: 'Design',
    title: 'Minimalism kyun zaroori hai',
    excerpt: 'Kam cheezein, zyada focus — minimalism sirf aesthetic nahi, ek way of life hai...',
    author: 'Rohan Verma',
    date: '8 Apr 2026',
    readTime: '8 min',
  },
  {
    id: 3,
    category: 'Life',
    title: 'Subah ki sahi routine jo kaam karti hai',
    excerpt: 'Successful logon ki subah alag hoti hai — aur yeh sirf myth nahi hai...',
    author: 'Neha Singh',
    date: '2 Apr 2026',
    readTime: '4 min',
  },
];

const categoryColors = {
  Technology: { bg: '#E6F1FB', color: '#0C447C' },
  Design: { bg: '#E1F5EE', color: '#085041' },
  Life: { bg: '#FAECE7', color: '#712B13' },
  Finance: { bg: '#EEEDFE', color: '#3C3489' },
};

const Home = () => {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>

      {/* Featured Post */}
      <div style={{ background: '#f8f8f8', borderRadius: '12px', padding: '2rem', marginBottom: '2rem' }}>
        <span style={{ fontSize: '11px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '3px 10px', borderRadius: '20px', background: '#E6F1FB', color: '#0C447C' }}>
          Technology
        </span>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', fontWeight: '700', margin: '0.75rem 0 0.5rem', lineHeight: '1.3' }}>
          AI se apni writing kaise behtar karein
        </h1>
        <p style={{ fontSize: '13px', color: '#888', marginBottom: '0.75rem' }}>
          Priya Sharma · 5 min padhai · 12 Apr 2026
        </p>
        <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.7', marginBottom: '1rem' }}>
          Aaj ke daur mein AI tools sirf engineers ke liye nahi — writers ke liye bhi equally powerful hain. Is guide mein hum step-by-step dekhenge...
        </p>
        <Link to="/post/1" style={{ fontSize: '13px', padding: '8px 20px', background: '#000', color: '#fff', borderRadius: '20px', textDecoration: 'none' }}>
          Padhein →
        </Link>
      </div>

      {/* Category Filter */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {['Sabhi', 'Technology', 'Design', 'Life', 'Finance'].map((cat) => (
          <span key={cat} style={{ fontSize: '12px', padding: '5px 14px', borderRadius: '20px', border: '1px solid #ddd', cursor: 'pointer', background: cat === 'Sabhi' ? '#000' : '#fff', color: cat === 'Sabhi' ? '#fff' : '#555' }}>
            {cat}
          </span>
        ))}
      </div>

      {/* Posts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
        {posts.map((post) => (
          <Link to={`/post/${post.id}`} key={post.id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ border: '1px solid #eee', borderRadius: '12px', overflow: 'hidden', transition: 'border-color 0.2s' }}>
              {/* Image placeholder */}
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
                  {post.author} · {post.readTime}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
};

export default Home;