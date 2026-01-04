export default function ProductCard({ products, onEdit }) {
  return (
    <div className="card-grid">
      {products.map(p => (
        <div className="product-card" key={p.id}>
          <img
            src={p.image || "https://images.unsplash.com/photo-1586023492125-27b2c045efd7"}
            alt={p.name}
          />

          <div className="card-body">
            <span className="category-badge">{p.category}</span>
            <h4>{p.name}</h4>
            <p className="price">₹{p.price}</p>
            <p className="stock">Stock: {p.stock || "N/A"}</p>

            <button onClick={() => onEdit(p)}>Edit</button>
          </div>
        </div>
      ))}
    </div>
  );
}
