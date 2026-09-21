import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function Products({ updateCartCount }) {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.log("Error loading products");
    }
  };

  // ✅ دالة إضافة للسلة
  const addToCart = async (productId) => {
  try {
    await api.post("/cart", { productId });
    alert("تمت إضافة المنتج للسلة");

    // تحديث عداد السلة في App.jsx
    if (window.updateCartCount) {
      window.updateCartCount();
    }

  } catch (err) {
    alert("حدث خطأ أثناء الإضافة للسلة");
  }
};



  return (
    <div style={{ padding: "20px" }}>
      <h2>المنتجات</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((p) => (
          <div
            key={p._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              background: "#fff",
            }}
           >
            <Link
              to={`/product/${p._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <h3>{p.name || "بدون اسم"}</h3>
            </Link>

              <p>السعر: {p.price} ريال</p>

            {/* ✅ زر إضافة للسلة */}
            <button
              onClick={() => addToCart(p._id)}
              style={{
                marginTop: "10px",
                width: "100%",
                padding: "10px",
                background: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              إضافة للسلة
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}
