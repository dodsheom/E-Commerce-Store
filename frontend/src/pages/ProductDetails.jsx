import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.log("Error loading product");
    }
  };

  const addToCart = async () => {
    try {
      await api.post("/cart", { productId: id, quantity: 1 });
      alert("تمت إضافة المنتج للسلة");
    } catch (err) {
      console.log("Error adding to cart");
    }
  };

  if (!product) return <p>جاري التحميل...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{product.name}</h2>

      <img
        src={product.image || "https://via.placeholder.com/300"}
        alt={product.name}
        style={{
          width: "300px",
          height: "300px",
          objectFit: "cover",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      />

      <p style={{ fontSize: "20px", fontWeight: "bold" }}>
        السعر: {product.price} ريال
      </p>

      <p>{product.description || "لا يوجد وصف لهذا المنتج"}</p>

      <button
        onClick={addToCart}
        style={{
          padding: "10px 20px",
          background: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        إضافة للسلة
      </button>

      <br /><br />

      <Link to="/products">العودة للمنتجات</Link>
    </div>
  );
}
