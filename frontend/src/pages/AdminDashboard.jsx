import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await api.get("/admin/products");
      setProducts(res.data);
    } catch (err) {
      console.log("غير مصرح لك بالدخول");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>لوحة تحكم المدير</h2>

      {/* روابط لوحة التحكم */}
      <div style={{ marginTop: "20px", marginBottom: "30px" }}>
        <Link
          to="/admin/products"
          style={{ marginRight: "20px", fontSize: "18px" }}
        >
          إدارة المنتجات
        </Link>

        <Link
          to="/admin/users"
          style={{ marginRight: "20px", fontSize: "18px" }}
        >
          إدارة المستخدمين
        </Link>

        <Link
          to="/admin/orders"
          style={{ marginRight: "20px", fontSize: "18px" }}
        >
          إدارة الطلبات
        </Link>
      </div>

      <h3>إدارة المنتجات</h3>

      <table border="1" width="100%" style={{ marginTop: "15px" }}>
        <thead>
          <tr>
            <th>الاسم</th>
            <th>السعر</th>
            <th>تحكم</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.price} ريال</td>
              <td>
                <button>تعديل</button>
                <button>حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
