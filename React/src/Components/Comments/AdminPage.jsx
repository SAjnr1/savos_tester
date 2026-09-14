import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../supabaseClient'
import './App.css'


export default function AdminPage() {
  const [session, setSession] = useState(null)
  const [checkingSession, setCheckingSession] = useState(true)
  const [email, setEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loggingIn, setLoggingIn] = useState(false)
  const [error, setError] = useState('')

  // Comments
  const [comments, setComments] = useState([])
  const [loadingComments, setLoadingComments] = useState(false)
  const [deletingCommentId, setDeletingCommentId] = useState(null)

  // Products
  const [products, setProducts] = useState([])
  const [loadingProducts, setLoadingProducts] = useState(false)
  const [deletingProductId, setDeletingProductId] = useState(null)
  const [file, setFile] = useState(null)
  const [productName, setProductName] = useState('')
  const [price, setPrice] = useState('')
  const [phone, setPhone] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [posting, setPosting] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setCheckingSession(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (session) {
      loadComments()
      loadProducts()
    }
  }, [session])

  // ---- Login ----

  async function handleLogin(e) {
    e.preventDefault()
    setLoggingIn(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: loginPassword,
    })

    if (error) {
      setError('Incorrect email or password.')
    }
    setLoggingIn(false)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
  }

  // ---- Comments ----

  async function loadComments() {
    setLoadingComments(true)
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) setError('Could not load comments.')
    else setComments(data)
    setLoadingComments(false)
  }

  async function handleDeleteComment(id) {
    setDeletingCommentId(id)
    setError('')

    const { error } = await supabase.from('comments').delete().eq('id', id)

    if (error) setError('Could not delete that comment.')
    else setComments((prev) => prev.filter((c) => c.id !== id))
    setDeletingCommentId(null)
  }

  // ---- Products ----

  async function loadProducts() {
    setLoadingProducts(true)
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) setError('Could not load products.')
    else setProducts(data)
    setLoadingProducts(false)
  }

  async function handlePostProduct(e) {
    e.preventDefault()
    if (!file || !productName.trim() || !price || !phone.trim() || !whatsapp.trim()) return

    setPosting(true)
    setError('')

    const fileExt = file.name.split('.').pop()
    const filePath = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file)

    if (uploadError) {
      setError('Could not upload the image.')
      setPosting(false)
      return
    }

    const { data: urlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath)

    const { error: insertError } = await supabase.from('products').insert({
      name: productName.trim(),
      price: parseFloat(price),
      image_url: urlData.publicUrl,
      phone: phone.trim(),
      whatsapp: whatsapp.trim(),
    })

    if (insertError) {
      setError('Could not post the product.')
    } else {
      setProductName('')
      setPrice('')
      setPhone('')
      setWhatsapp('')
      setFile(null)
      e.target.reset()
      loadProducts()
    }
    setPosting(false)
  }

  async function handleDeleteProduct(id) {
    setDeletingProductId(id)
    setError('')

    const { error } = await supabase.from('products').delete().eq('id', id)

    if (error) setError('Could not delete that product.')
    else setProducts((prev) => prev.filter((p) => p.id !== id))
    setDeletingProductId(null)
  }

  // ---- Render ----

  if (checkingSession) {
    return (
      <main>
        <p className="empty">Checking session…</p>
      </main>
    )
  }

  if (!session) {
    return (
      <main>
        <h1>Admin</h1>
        <p className="sub">Sign in to manage comments and products.</p>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loggingIn}>
            {loggingIn ? 'Signing in…' : 'Sign in'}
          </button>
          <div className="status">{error}</div>
        </form>
        <Link to="/" className="admin-link">Back to home</Link>
      </main>
    )
  }

  return (
    <main>
      <div className="admin-header-row">
        <h1>Admin</h1>
        <button type="button" className="logout-btn" onClick={handleLogout}>
          Log out
        </button>
      </div>
      {error && <div className="status">{error}</div>}

      <h2 className="admin-section-title">Post a product</h2>
      <form onSubmit={handlePostProduct}>
        <label htmlFor="image">Product photo</label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <label htmlFor="product-name">Product name</label>
        <input
          id="product-name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          maxLength={100}
          required
        />
        <label htmlFor="price">Price</label>
        <div className="price-input">
          <span className="currency-prefix">GH¢</span>
          <input
            id="price"
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <label htmlFor="phone">Seller phone number</label>
        <input
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+233 55 123 4567"
          required
        />
        <label htmlFor="whatsapp">Seller WhatsApp number</label>
        <input
          id="whatsapp"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          placeholder="+233 55 123 4567"
          required
        />
        <button type="submit" disabled={posting}>
          {posting ? 'Posting…' : 'Post product'}
        </button>
      </form>

      <h2 className="admin-section-title">Manage products</h2>
      <ul className="admin-list">
        {loadingProducts && <li className="empty">Loading products…</li>}
        {!loadingProducts && products.length === 0 && (
          <li className="empty">No products posted yet.</li>
        )}
        {!loadingProducts &&
          products.map((p) => (
            <li key={p.id} className="admin-row">
              <div className="admin-product-preview">
                <img src={p.image_url} alt={p.name} />
                <div>
                  <div className="comment-meta"><strong>{p.name}</strong></div>
                  <div className="comment-meta">GH¢ {Number(p.price).toFixed(2)}</div>
                </div>
              </div>
              <button
                type="button"
                className="delete-btn"
                onClick={() => handleDeleteProduct(p.id)}
                disabled={deletingProductId === p.id}
              >
                {deletingProductId === p.id ? 'Deleting…' : 'Delete'}
              </button>
            </li>
          ))}
      </ul>

      <h2 className="admin-section-title">Manage comments</h2>
      <ul className="admin-list">
        {loadingComments && <li className="empty">Loading comments…</li>}
        {!loadingComments && comments.length === 0 && (
          <li className="empty">No comments to manage.</li>
        )}
        {!loadingComments &&
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
                onClick={() => handleDeleteComment(c.id)}
                disabled={deletingCommentId === c.id}
              >
                {deletingCommentId === c.id ? 'Deleting…' : 'Delete'}
              </button>
            </li>
          ))}
      </ul>

      <Link to="/" className="admin-link">Back to home</Link>
    </main>
  )
}
