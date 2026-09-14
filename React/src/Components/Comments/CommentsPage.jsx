import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../supabaseClient'
import CommentCards from '../CommentCards/CommentCards'
import './App.css'
import Navbar from '../Navbar/Navbar'
import Title from '../Title/Title'


export default function CommentsPage() {
  const [author, setAuthor] = useState('')
  const [location, setLocation] = useState('')
  const [body, setBody] = useState('')
  const [status, setStatus] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

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
      setRefreshKey((k) => k + 1) // remounts CommentCards so it refetches
    }
    setSubmitting(false)
  }

  return (
    <main>
      <Navbar/>
      <Title title='TESTIMONIAL' subTitle='Write  down a COMMENT'/>
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
        <label htmlFor="location">Location </label>
        <input
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          maxLength={80}
          placeholder="City, country (optional)"
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

      <CommentCards key={refreshKey} />

      <Link to="/" className="admin-link">Back to home</Link>
    </main>
  )
}
