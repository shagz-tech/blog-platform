import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const categories = ['Technology', 'Design', 'Life', 'Finance', 'Travel', 'Food'];

const Write = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Technology');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (status) => {
    if (!title || !content) {
      setError('Title aur content zaroori hai!');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await axios.post(
        'http://localhost:5000/api/posts',
        { title, content, category, tags: tags.split(',').map(t => t.trim()), status },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      navigate('/dashboard');
    } catch (err) {
      setError('Post save nahi hui, dobara try karein!');
    }
    setLoading(false);
  };

  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem', color: '#888' }}>
        <h2>Pehle login karein!</h2>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '1.75rem', fontWeight: '700' }}>
          Nayi post likhein
        </h1>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={() => handleSubmit('draft')}
            disabled={loading}
            style={{ padding: '8px 20px', border: '1px solid #ddd', borderRadius: '20px', background: '#fff', color: '#555', cursor: 'pointer', fontSize: '13px' }}
          >
            Draft save karein
          </button>
          <button
            onClick={() => handleSubmit('published')}
            disabled={loading}
            style={{ padding: '8px 20px', border: 'none', borderRadius: '20px', background: '#000', color: '#fff', cursor: 'pointer', fontSize: '13px', fontWeight: '500' }}
          >
            {loading ? 'Save ho raha hai...' : 'Publish karein ↗'}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ background: '#fff0f0', border: '1px solid #ffcccc', borderRadius: '8px', padding: '10px 14px', marginBottom: '1rem', fontSize: '13px', color: '#cc0000' }}>
          {error}
        </div>
      )}

      {/* Title */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post ka title likhein..."
        style={{ width: '100%', fontSize: '1.5rem', fontFamily: 'Georgia, serif', fontWeight: '700', border: 'none', borderBottom: '1px solid #eee', padding: '0.75rem 0', outline: 'none', marginBottom: '1rem', color: '#111' }}
      />

      {/* Toolbar */}
      <div style={{ display: 'flex', gap: '4px', padding: '8px', background: '#f8f8f8', borderRadius: '8px', marginBottom: '1rem', flexWrap: 'wrap' }}>
        {['B', 'I', 'U', 'H1', 'H2', 'List', 'Quote', 'Link'].map((tool) => (
          <button key={tool} style={{ fontSize: '12px', padding: '4px 10px', border: 'none', background: 'transparent', borderRadius: '4px', cursor: 'pointer', fontWeight: tool === 'B' ? '700' : tool === 'I' ? '400' : '500', fontStyle: tool === 'I' ? 'italic' : 'normal', color: '#555' }}>
            {tool}
          </button>
        ))}
      </div>

      {/* Content Editor */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Yahan apni story likhein... Apne ideas, experiences ya kuch bhi jo share karna chahte hain."
        rows={15}
        style={{ width: '100%', border: '1px solid #eee', borderRadius: '12px', padding: '1rem', fontSize: '15px', lineHeight: '1.8', outline: 'none', resize: 'vertical', fontFamily: 'inherit', color: '#333' }}
      />

      {/* Meta */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: '500', color: '#888', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: '100%', padding: '10px 14px', border: '1px solid #eee', borderRadius: '8px', fontSize: '14px', outline: 'none', background: '#fff' }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: '500', color: '#888', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Tags (comma se alag karein)
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="AI, writing, tips"
            style={{ width: '100%', padding: '10px 14px', border: '1px solid #eee', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
          />
        </div>
      </div>

    </div>
  );
};

export default Write;