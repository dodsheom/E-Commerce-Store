import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg"; // استيراد الشعار

export default function Header({ cartCount }) {
  return (
    <header
      style={{
        background: "#02275f",
        padding: "15px 25px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#fff",
      }}
    >
      {/* الشعار */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img
          src={logo}
          alt="شعار القاضي"
          style={{ width: "45px", height: "45px", borderRadius: "6px" }}
        />
        <span style={{ fontSize: "22px", fontWeight: "bold" }}>
          متجر القاضي لقطع السيارات
        </span>
      </div>

      {/* الروابط */}
      <nav style={{ display: "flex", gap: "25px", fontSize: "16px" }}>
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
          الرئيسية
        </Link>

        <Link to="/products" style={{ color: "#fff", textDecoration: "none" }}>
          المنتجات
        </Link>

        <Link to="/cart" style={{ color: "#fff", textDecoration: "none" }}>
          السلة ({cartCount})
        </Link>

        {/* رابط إدارة المستخدمين 
        <Link to="/admin/users">إدارة المستخدمين</Link>*/}

        <Link
          to="/login"
          style={{
            color: "#fff",
            textDecoration: "none",
            padding: "8px 15px",
            background: "#1565c0",
            borderRadius: "6px",
          }}
        >
          تسجيل الدخول
        </Link>
      </nav>
    </header>
  );
}
