import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../supabaseClient'
import './App1.css'
import Title from '../Title/Title'


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

  // Editing a product
  const [editingProductId, setEditingProductId] = useState(null)
  const [editName, setEditName] = useState('')
  const [editPrice, setEditPrice] = useState('')
  const [editPhone, setEditPhone] = useState('')
  const [editWhatsapp, setEditWhatsapp] = useState('')
  const [editFile, setEditFile] = useState(null)
  const [savingEdit, setSavingEdit] = useState(false)

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

  function extractStoragePath(imageUrl) {
    // Public Storage URLs look like:
    // https://YOUR-PROJECT.supabase.co/storage/v1/object/public/product-images/<path>
    const marker = '/product-images/'
    const index = imageUrl.indexOf(marker)
    return index === -1 ? null : imageUrl.slice(index + marker.length)
  }

  async function handleDeleteProduct(product) {
    const { id, image_url } = product
    setDeletingProductId(id)
    setError('')

    // Best-effort: remove the photo from Storage too, so deleted
    // products don't leave orphaned files eating into the free
    // storage quota. If this fails, still proceed to delete the
    // row — a leftover file is a much smaller problem than a
    // product that won't delete at all.
    const storagePath = extractStoragePath(image_url)
    if (storagePath) {
      const { error: storageError } = await supabase.storage
        .from('product-images')
        .remove([storagePath])
      if (storageError) console.error('Could not remove image from storage:', storageError)
    }

    const { error } = await supabase.from('products').delete().eq('id', id)

    if (error) setError('Could not delete that product.')
    else setProducts((prev) => prev.filter((p) => p.id !== id))
    setDeletingProductId(null)
  }

  function handleStartEdit(p) {
    setEditingProductId(p.id)
    setEditName(p.name)
    setEditPrice(String(p.price))
    setEditPhone(p.phone)
    setEditWhatsapp(p.whatsapp)
    setEditFile(null)
    setError('')
  }

  function handleCancelEdit() {
    setEditingProductId(null)
    setEditFile(null)
  }

  async function handleSaveEdit(id) {
    if (!editName.trim() || !editPrice || !editPhone.trim() || !editWhatsapp.trim()) return

    setSavingEdit(true)
    setError('')

    const oldImageUrl = products.find((p) => p.id === id)?.image_url

    const updates = {
      name: editName.trim(),
      price: parseFloat(editPrice),
      phone: editPhone.trim(),
      whatsapp: editWhatsapp.trim(),
    }

    // Only touch the photo if the admin picked a new one
    if (editFile) {
      const fileExt = editFile.name.split('.').pop()
      const filePath = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, editFile)

      if (uploadError) {
        setError('Could not upload the new photo.')
        setSavingEdit(false)
        return
      }

      const { data: urlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath)

      updates.image_url = urlData.publicUrl
    }

    const { error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)

    if (error) {
      setError('Could not save changes.')
    } else {
      // The row now points at the new photo, so the old file in
      // Storage is safely orphaned — remove it. Best-effort: if
      // this fails, the edit itself has already succeeded, so we
      // just log it rather than surface an error to the admin.
      if (editFile && oldImageUrl) {
        const oldPath = extractStoragePath(oldImageUrl)
        if (oldPath) {
          const { error: removeError } = await supabase.storage
            .from('product-images')
            .remove([oldPath])
          if (removeError) console.error('Could not remove old image from storage:', removeError)
        }
      }

      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
      )
      setEditingProductId(null)
      setEditFile(null)
    }
    setSavingEdit(false)
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
      <main >
        <div className="login">
        <h1>Admin</h1>
        <p className="sub">Sign in to manage comments and products.</p>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='example@gmail.com'
            required
          />
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            placeholder='*********'
            required
          />
          <button type="submit" disabled={loggingIn}>
            {loggingIn ? 'Signing in…' : 'Sign in'}
          </button>
          
        </form>
        </div>
        <div className="status">{error}</div>
        <Link to="/" className="admin-link">Back to home</Link>
      </main>
    )
  }

  return (
    <main>
      <div className="admin-header-row">
        <h1>Admin Page</h1>
        <button type="button" className="logout-btn" onClick={handleLogout}>
          Log out
      </button>
      </div>
      

      <div className="post-product">
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
          placeholder='Name of product'
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
            placeholder='0.00'
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
      </div>

      {error && <div className="status">{error}</div>}

      <h2 className="admin-section-title">Manage products</h2>
      <ul className="admin-list">
        {loadingProducts && <li className="empty">Loading products…</li>}
        {!loadingProducts && products.length === 0 && (
          <li className="empty">No products posted yet.</li>
        )}
        {!loadingProducts &&
          products.map((p) =>
            editingProductId === p.id ? (
              <li key={p.id} className="admin-row admin-row-editing">
                <div className="edit-product-form">
                  <label>Current photo</label>
                  <img src={p.image_url} alt={p.name} className="edit-current-photo" />
                  <label htmlFor={`edit-photo-${p.id}`}>Replace photo (optional)</label>
                  <input
                    id={`edit-photo-${p.id}`}
                    type="file"
                    accept="image/*"
                    onChange={(e) => setEditFile(e.target.files[0])}
                  />
                  <label htmlFor={`edit-name-${p.id}`}>Product name</label>
                  <input
                    id={`edit-name-${p.id}`}
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    maxLength={100}
                  />
                  <label htmlFor={`edit-price-${p.id}`}>Price</label>
                  <div className="price-input">
                    <span className="currency-prefix">GH¢</span>
                    <input
                      id={`edit-price-${p.id}`}
                      type="number"
                      step="0.01"
                      min="0"
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                    />
                  </div>
                  <label htmlFor={`edit-phone-${p.id}`}>Seller phone number</label>
                  <input
                    id={`edit-phone-${p.id}`}
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                  />
                  <label htmlFor={`edit-whatsapp-${p.id}`}>Seller WhatsApp number</label>
                  <input
                    id={`edit-whatsapp-${p.id}`}
                    value={editWhatsapp}
                    onChange={(e) => setEditWhatsapp(e.target.value)}
                  />
                  <div className="edit-actions">
                    <button
                      type="button"
                      onClick={() => handleSaveEdit(p.id)}
                      disabled={savingEdit}
                    >
                      {savingEdit ? 'Saving…' : 'Save'}
                    </button>
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={handleCancelEdit}
                      disabled={savingEdit}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </li>
            ) : (
              <li key={p.id} className="admin-row">
                <div className="admin-product-preview">
                  <img src={p.image_url} alt={p.name} />
                  <div>
                    <div className="comment-meta"><strong>{p.name}</strong></div>
                    <div className="comment-meta">GH¢ {Number(p.price).toFixed(2)}</div>
                  </div>
                </div>
                <div className="admin-row-actions">
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={() => handleStartEdit(p)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => handleDeleteProduct(p)}
                    disabled={deletingProductId === p.id}
                  >
                    {deletingProductId === p.id ? 'Deleting…' : 'Delete'}
                  </button>
                </div>
              </li>
            )
          )}
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
