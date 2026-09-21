import { useEffect, useState } from "react";
import api from "../services/api";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const res = await api.get("/cart");
      setCart(res.data.items);
    } catch (err) {
      console.log("Error loading cart");
    }
  };

  const increaseQty = async (productId) => {
    await api.put(`/cart/increase/${productId}`);
    loadCart();
  };

  const decreaseQty = async (productId) => {
    await api.put(`/cart/decrease/${productId}`);
    loadCart();
  };

  const removeItem = async (productId) => {
    await api.delete(`/cart/${productId}`);
    loadCart();
  };

  const totalPrice = cart.reduce(
  (sum, item) =>
    item.productId ? sum + item.productId.price * item.quantity : sum,
  0
);

  return (
    <div style={{ padding: "20px", background: "#f7f7f7", minHeight: "100vh" }}>
      <h2 style={{ marginBottom: "20px" }}>السلة</h2>

      {cart.length === 0 ? (
        <p>السلة فارغة</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
             key={item.productId?._id || Math.random()}

              style={{
                display: "flex",
                background: "#fff",
                padding: "15px",
                borderRadius: "10px",
                marginBottom: "15px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                alignItems: "center",
              }}
            >
              {/* صورة المنتج */}
              <img
                src={item.productId?.image || "https://via.placeholder.com/120"}
                alt={item.productId?.name}
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "10px",
                  objectFit: "cover",
                  marginRight: "15px",
                }}
              />

              {/* معلومات المنتج */}
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: "0 0 10px" }}>{item.productId?.name || "منتج غير متوفر"}</h3>
                <p style={{ margin: "0 0 10px" }}>
                  السعر: {item.productId?.price || 0} ريال
                </p>

                {/* التحكم بالكمية */}
                <div style={{ display: "flex", alignItems: "center" }}>
                  <button
                    onClick={() => item.productId && decreaseQty(item.productId._id)}
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      border: "none",
                      background: "#ddd",
                      fontSize: "20px",
                      cursor: "pointer",
                    }}
                  >
                    –
                  </button>

                  <span style={{ margin: "0 15px", fontSize: "18px" }}>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => item.productId && increaseQty(item.productId._id)}
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      border: "none",
                      background: "#007bff",
                      color: "#fff",
                      fontSize: "20px",
                      cursor: "pointer",
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* زر الحذف */}
              <button
                onClick={() => item.productId && removeItem(item.productId._id)}
                style={{
                  background: "red",
                  color: "#fff",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                حذف
              </button>
            </div>
          ))}

          {/* الإجمالي */}
          <div
            style={{
              marginTop: "20px",
              padding: "20px",
              background: "#fff",
              borderRadius: "10px",
              fontSize: "20px",
              fontWeight: "bold",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            الإجمالي: {totalPrice} ريال
          </div>
        </>
      )}
    </div>
  );
}
