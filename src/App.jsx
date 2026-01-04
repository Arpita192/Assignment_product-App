import { useEffect, useState } from "react";
import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductTable";
import ProductCard from "./components/ProductCard";
import Pagination from "./components/Pagination";

const PRODUCT_IMAGE_MAP = {
  laptop: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
  watch: "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f",
  phone: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
  chair: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
  table: "https://images.unsplash.com/photo-1493666438817-866a91353ca9"
};


const CATEGORY_IMAGE_MAP = {
  Electronics: "https://images.unsplash.com/photo-1518770660439-4636190af475",
  Furniture: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
  Decor: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
  Default: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7"
};

export default function App() {
  const [products, setProducts] = useState([]);
  const [view, setView] = useState("card");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [page, setPage] = useState(1);

  const limit = 6;


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.toLowerCase());
      setPage(1); 
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);


  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(debouncedSearch)
  );


  const start = (page - 1) * limit;
  const paginatedProducts = filteredProducts.slice(start, start + limit);

  const saveProduct = (product) => {
    const nameKey = product.name.toLowerCase();

    const matchedKey = Object.keys(PRODUCT_IMAGE_MAP)
      .find(key => nameKey.includes(key));

    const image =
      matchedKey
        ? PRODUCT_IMAGE_MAP[matchedKey]
        : CATEGORY_IMAGE_MAP[product.category] ||
          CATEGORY_IMAGE_MAP.Default;

    const finalProduct = {
      ...product,
      image
    };

    if (product.id) {
      setProducts(products.map(p =>
        p.id === product.id ? finalProduct : p
      ));
    } else {
      setProducts([...products, { ...finalProduct, id: Date.now() }]);
    }

    setEditingProduct(null);
  };

  return (
    <>
      
      <header className="header">
        <h1>Product Management Dashboard</h1>


        <div className="header-actions">
          <div className="search-box">
            <input
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <button onClick={() => setView(view === "card" ? "table" : "card")}>
            {view === "card" ? "Table View" : "Card View"}
          </button>
        </div>
      </header>

     
      <main className="container">
        <ProductForm
          saveProduct={saveProduct}
          editingProduct={editingProduct}
        />

        {filteredProducts.length === 0 ? (
          <p style={{ marginTop: "20px", textAlign: "center" }}>
            No products found.
          </p>
        ) : view === "card" ? (
          <ProductCard
            products={paginatedProducts}
            onEdit={setEditingProduct}
          />
        ) : (
          <ProductTable
            products={paginatedProducts}
            onEdit={setEditingProduct}
          />
        )}

        <Pagination
          total={filteredProducts.length}
          page={page}
          limit={limit}
          setPage={setPage}
        />
      </main>

      
      <footer className="footer">
        © 2026 Grey Scientific Labs · Frontend Assignment
      </footer>
    </>
  );
}
