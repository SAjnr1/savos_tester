import { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'
import './App.css'
import { Link } from 'react-router-dom'

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

export default function CommentCards() {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadComments()
  }, [])

  async function loadComments() {
    setLoading(true)
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error) setComments(data)
    setLoading(false)
  }

  return (
    <ul className="thread">
      {loading && <li className="empty">Loading comments…</li>}
      {!loading && comments.length === 0 && (
        <li className="empty"><Link to='/testimonials'>No comments yet — be the first.</Link></li>
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
  )
}
