export default function Footer() {
   return (
    <footer
      style={{
        padding: "25px",
        textAlign: "center",
        background: "#02142e",
        color: "#fff",
      }}
    >
      <div style={{ marginBottom: "15px" }}>
    
        <a
          href="#"
          style={{ color: "#bbdefb", margin: "0 10px", textDecoration: "none" }}
        >
          تواصل معنا
        </a>
        <a
          href="#"
          style={{ color: "#bbdefb", margin: "0 10px", textDecoration: "none" }}
        >
          سياسة الخصوصية
        </a>
        <a
          href="#"
          style={{ color: "#bbdefb", margin: "0 10px", textDecoration: "none" }}
        >
          شروط الاستخدام
        </a>
      </div>

      <div>
        © {new Date().getFullYear()} متجر القاضي — جميع الحقوق محفوظة
      </div>
    </footer>
  );
}
