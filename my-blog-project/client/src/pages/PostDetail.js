import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Dummy data — baad mein backend se aayega
const dummyPosts = [
  {
    _id: '1',
    category: 'Technology',
    title: 'AI se apni writing kaise behtar karein',
    content: `Aaj ke daur mein AI tools sirf engineers ke liye nahi raha — yeh writers, designers, aur creators ke liye bhi equally powerful ban gaye hain.

Is guide mein hum step-by-step dekhenge kaise tum apni daily writing mein AI ka use karke productivity badha sakte ho.

## 1. Sahi tool chunna

Sabse pehla sawaal — kaunsa AI tool use karein? ChatGPT, Claude, Gemini — sab ke apne fayde hain. Lekin writers ke liye Claude sabse zyada helpful hai kyunki yeh context ko bahut achhe se samajhta hai.

## 2. Prompt likhna seekho

AI se achha output lene ke liye achha input dena padta hai. Agar tum likhoge "ek article likho" toh output bhi generic hoga. Lekin agar tum likhoge "ek 500 word article likho Hindi mein, beginners ke liye, AI writing tools ke baare mein, friendly tone mein" — toh output kaafi better hoga.

## 3. Edit karna mat bhulo

AI ka output starting point hai — final draft nahi. Hamesha apni voice add karo, facts check karo, aur unnecessary parts hata do.

## Conclusion

AI ek powerful tool hai — lekin yeh tumhari creativity ko replace nahi kar sakta. Isko apna assistant banao, apna replacement nahi.`,
    author: { name: 'Priya Sharma', avatar: 'PS' },
    date: '12 Apr 2026',
    readTime: '5 min',
    views: 1204,
    tags: ['AI', 'Writing', 'Productivity'],
    comments: [
      { _id: '1', author: 'Rahul K', text: 'Bahut achha article hai! Mujhe Claude bahut helpful lagta hai.', date: '13 Apr' },
      { _id: '2', author: 'Sneha M', text: 'Yeh tips bahut helpful lagin, especially prompt wali baat.', date: '14 Apr' },
    ],
  },
];

const PostDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const post = dummyPosts.find((p) => p._id === id) || dummyPosts[0];

  const handleComment = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setComments([...comments, {
      _id: Date.now().toString(),
      author: user?.name || 'Anonymous',
      text: comment,
      date: 'Abhi'
    }]);
    setComment('');
  };

  const allComments = [...post.comments, ...comments];

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem 1rem' }}>

      {/* Back button */}
      <Link to="/" style={{ fontSize: '13px', color: '#888', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '1.5rem' }}>
        ← Wapas jaayein
      </Link>

      {/* Category */}
      <span style={{ fontSize: '11px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '3px 10px', borderRadius: '20px', background: '#E6F1FB', color: '#0C447C' }}>
        {post.category}
      </span>

      {/* Title */}
      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2.25rem', fontWeight: '700', lineHeight: '1.3', margin: '1rem 0 0.75rem', color: '#111' }}>
        {post.title}
      </h1>

      {/* Author & Meta */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #eee' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#E6F1FB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '600', color: '#0C447C' }}>
          {post.author.avatar}
        </div>
        <div>
          <div style={{ fontSize: '14px', fontWeight: '500', color: '#111' }}>{post.author.name}</div>
          <div style={{ fontSize: '12px', color: '#888' }}>{post.date} · {post.readTime} padhai · {post.views.toLocaleString()} views</div>
        </div>
      </div>

      {/* Cover Image */}
      <div style={{ height: '200px', background: '#E6F1FB', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', color: '#185FA5', marginBottom: '2rem' }}>
        Cover Image
      </div>

      {/* Content */}
      <div style={{ fontSize: '16px', lineHeight: '1.9', color: '#333', marginBottom: '2rem' }}>
        {post.content.split('\n\n').map((para, i) => (
          para.startsWith('## ') ? (
            <h2 key={i} style={{ fontFamily: 'Georgia, serif', fontSize: '1.4rem', fontWeight: '700', margin: '1.5rem 0 0.75rem', color: '#111' }}>
              {para.replace('## ', '')}
            </h2>
          ) : (
            <p key={i} style={{ marginBottom: '1rem' }}>{para}</p>
          )
        ))}
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid #eee' }}>
        {post.tags.map((tag) => (
          <span key={tag} style={{ fontSize: '12px', padding: '4px 12px', borderRadius: '20px', border: '1px solid #eee', color: '#555' }}>
            #{tag}
          </span>
        ))}
      </div>

      {/* Comments Section */}
      <div>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1.25rem', color: '#111' }}>
          Comments ({allComments.length})
        </h3>

        {/* Comment Form */}
        {user ? (
          <form onSubmit={handleComment} style={{ marginBottom: '1.5rem' }}>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Apna comment likhein..."
              rows={3}
              style={{ width: '100%', padding: '12px', border: '1px solid #eee', borderRadius: '12px', fontSize: '14px', outline: 'none', resize: 'none', fontFamily: 'inherit', marginBottom: '8px' }}
            />
            <button
              type="submit"
              style={{ padding: '8px 20px', background: '#000', color: '#fff', border: 'none', borderRadius: '20px', fontSize: '13px', cursor: 'pointer', fontWeight: '500' }}
            >
              Comment karein
            </button>
          </form>
        ) : (
          <div style={{ padding: '1rem', background: '#f8f8f8', borderRadius: '12px', marginBottom: '1.5rem', fontSize: '13px', color: '#888', textAlign: 'center' }}>
            Comment karne ke liye{' '}
            <Link to="/login" style={{ color: '#000', fontWeight: '500' }}>login karein</Link>
          </div>
        )}

        {/* Comments List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {allComments.map((c) => (
            <div key={c._id} style={{ padding: '1rem', background: '#f8f8f8', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#111' }}>{c.author}</span>
                <span style={{ fontSize: '11px', color: '#aaa' }}>{c.date}</span>
              </div>
              <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.6', margin: 0 }}>{c.text}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default PostDetail;