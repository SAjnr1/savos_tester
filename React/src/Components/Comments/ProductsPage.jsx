import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../supabaseClient'


function waLink(number) {
  return `https://wa.me/${number.replace(/\D/g, '')}`
}

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loadingProducts, setLoadingProducts] = useState(true)

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    setLoadingProducts(true)
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error) setProducts(data)
    setLoadingProducts(false)
  }

  return (
    <main>
      <h1>Products</h1>
      {!loadingProducts && products.length > 0 && (
        <div className="products-grid">
          {products.map((p) => (
            <div key={p.id} className="product-card">
              <img src={p.image_url} alt={p.name} className="product-image" />
              <div className="product-info">
                <div className="product-name">{p.name}</div>
                <div className="product-price">GH¢ {Number(p.price).toFixed(2)}</div>
                <div className="product-actions">
                  <a href={`tel:${p.phone}`} className="btn-call">Call Seller</a>
                  <a
                    href={waLink(p.whatsapp)}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-whatsapp"
                  >
                    WhatsApp Seller
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {!loadingProducts && products.length === 0 && (
        <p className="empty">No products posted yet.</p>
      )}

      <Link to="/" className="admin-link">Back to home</Link>
    </main>
  )
}
