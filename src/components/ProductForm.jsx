import { useEffect, useState } from "react";

const IMAGE_MAP = {
  Furniture: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
  Electronics: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
  Decor: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
  Default: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7"
};

export default function ProductForm({ saveProduct, editingProduct }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
    image: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingProduct) setForm(editingProduct);
  }, [editingProduct]);

  useEffect(() => {
    if (form.category) {
      setForm(f => ({
        ...f,
        image: IMAGE_MAP[f.category] || IMAGE_MAP.Default
      }));
    }
  }, [form.category]);

  const validate = () => {
    const e = {};
    if (!form.name) e.name = "Required";
    if (!form.price) e.price = "Required";
    if (!form.category) e.category = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    saveProduct(form);

    setForm({
      name: "",
      price: "",
      category: "",
      stock: "",
      description: "",
      image: ""
    });
  };

  return (
    <section className="product-form-section">
      <h3>{editingProduct ? "Edit Product" : "Add New Product"}</h3>

      <div className="product-form-wrapper">
        <div className="image-preview">
          <img src={form.image || IMAGE_MAP.Default} alt="Preview" />
          <small>Auto image based on category</small>
        </div>

        <form className="enhanced-form" onSubmit={submit}>
          <div className="field">
            <label>Product Name *</label>
            <input
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="field">
            <label>Price (₹) *</label>
            <input
              type="number"
              value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })}
            />
          </div>

          <div className="field">
            <label>Category *</label>
            <select
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
            >
              <option value="">Select</option>
              <option>Furniture</option>
              <option>Electronics</option>
              <option>Decor</option>
            </select>
          </div>

          <div className="field">
            <label>Stock</label>
            <input
              type="number"
              value={form.stock}
              onChange={e => setForm({ ...form, stock: e.target.value })}
            />
          </div>

          <div className="field full">
            <label>Description</label>
            <textarea
              value={form.description}
              onChange={e =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          <button className="primary-btn">
            {editingProduct ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>
    </section>
  );
}
