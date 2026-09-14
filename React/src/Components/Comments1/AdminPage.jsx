import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../supabaseClient'
import './App.css'
import Navbar from '../Navbar/Navbar'

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    if (unlocked) loadComments()
  }, [unlocked])

  async function loadComments() {
    setLoading(true)
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      setError('Could not load comments.')
    } else {
      setComments(data)
    }
    setLoading(false)
  }

  function handleUnlock(e) {
    e.preventDefault()
    if (!password.trim()) return
    // The password itself is verified server-side on each delete call,
    // not here — this just moves the UI into the admin view.
    setUnlocked(true)
  }

  async function handleDelete(id) {
    setDeletingId(id)
    setError('')

    const { error } = await supabase.rpc('delete_comment_as_admin', {
      comment_id: id,
      admin_password: password,
    })

    if (error) {
      setError(
        error.message?.includes('Incorrect password')
          ? 'Incorrect password.'
          : 'Could not delete that comment.'
      )
      if (error.message?.includes('Incorrect password')) {
        setUnlocked(false)
        setPassword('')
      }
    } else {
      setComments((prev) => prev.filter((c) => c.id !== id))
    }
    setDeletingId(null)
  }

  if (!unlocked) {
    return (
      <main>
        <Navbar/>
        <h1>Admin</h1>
        <p className="sub">Enter the admin password to manage comments.</p>
        <form onSubmit={handleUnlock}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter the admin password"
            required
          />
          <button type="submit">Unlock</button>
          <div className="status">{error}</div>
        </form>
        <Link to="/" className="admin-link">Back to comments</Link>
      </main>
    )
  }

  return (
    <main>
      <h1>Admin</h1>
      <p className="sub">Delete comments below. Changes are permanent.</p>
      {error && <div className="status">{error}</div>}

      <ul className="admin-list">
        {loading && <li className="empty">Loading comments…</li>}
        {!loading && comments.length === 0 && (
          <li className="empty">No comments to manage.</li>
        )}
        {!loading &&
          comments.map((c) => (
            <li key={c.id} className="admin-row">
              <div>
                <div className="comment-meta">
                  <strong>{c.author}</strong>
                  {c.location ? ` · ${c.location}` : ''}
                </div>
                <div className="comment-body">{c.body}</div>
              </div>
              <button
                type="button"
                className="delete-btn"
                onClick={() => handleDelete(c.id)}
                disabled={deletingId === c.id}
              >
                {deletingId === c.id ? 'Deleting…' : 'Delete'}
              </button>
            </li>
          ))}
      </ul>

      <Link to="/" className="admin-link">Back to comments</Link>
    </main>
  )
}
