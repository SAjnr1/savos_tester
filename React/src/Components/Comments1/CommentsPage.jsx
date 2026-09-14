import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../supabaseClient'
import './App.css'
import Navbar from '../Navbar/Navbar'

function timeAgo(iso) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return new Date(iso).toLocaleDateString()
}

function initials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('')
}

export default function CommentsPage() {
  const [comments, setComments] = useState([])
  const [author, setAuthor] = useState('')
  const [location, setLocation] = useState('')
  const [body, setBody] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    loadComments()
  }, [])

  async function loadComments() {
    setLoading(true)
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error(error)
      setStatus('Could not load comments.')
    } else {
      setComments(data)
    }
    setLoading(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!author.trim() || !body.trim()) return

    setSubmitting(true)
    setStatus('Posting…')

    const { error } = await supabase.from('comments').insert({
      author: author.trim(),
      location: location.trim() || null,
      body: body.trim(),
    })

    if (error) {
      console.error(error)
      setStatus('Something went wrong. Try again.')
    } else {
      setStatus('')
      setAuthor('')
      setLocation('')
      setBody('')
      loadComments()
    }
    setSubmitting(false)
  }

  return (
    <main>
      <Navbar/>
      <h1>Comments</h1>
      <p className="sub">Leave a comment. Type your experiences with our products here. 
        We would love you here your thoughts of our products and make changes to make your experience a better one.
         Anyone can read or comment here.</p>

      

      <form onSubmit={handleSubmit}>
        <label htmlFor="author">Name</label>
        <input
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          maxLength={60}
          placeholder="Enter your name here"
          required
        />
        <label htmlFor="location">Location (optional)</label>
        <input
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          maxLength={80}
          placeholder="City, country"
        />
        <label htmlFor="body">Comment</label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={2000}
          placeholder="Enter your comments here"
          required
        />
        <button type="submit" disabled={submitting}>Post comment</button>
        <div className="status">{status}</div>
      </form>

      <ul className="thread">
        {loading && <li className="empty">Loading comments…</li>}
        {!loading && comments.length === 0 && (
          <li className="empty">No comments yet — be the first.</li>
        )}
        {!loading &&
          comments.map((c) => (
            <li key={c.id} className="comment-card">
              <div className="user-info">
                <div className="avatar">{initials(c.author)}</div>
                <div>
                  <h3>{c.author}</h3>
                  <span>{c.location ? `${c.location} · ` : ''}{timeAgo(c.created_at)}</span>
                </div>
              </div>
              <p className="comment-body">{c.body}</p>
            </li>
          ))}
      </ul>

      {/*<Link to="/"  className="admin-link">Home</Link>*/}
      <Link to="/admin" className="admin-link">Admin</Link>
    </main>
  )
}
