import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.log("غير مصرح لك بالدخول");
    }
  };

  const changeRole = async (id, role) => {
    try {
      await api.put(`/admin/users/${id}/role`, { role });
      loadUsers(); // تحديث القائمة بعد التغيير
    } catch (err) {
      console.log("خطأ في تغيير الدور");
    }
  };

  const deleteUser = async (id) => {
    try {
      await api.delete(`/admin/users/${id}`);
      loadUsers(); // تحديث القائمة بعد الحذف
    } catch (err) {
      console.log("خطأ في حذف المستخدم");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>إدارة المستخدمين</h2>

      <table border="1" width="100%" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>البريد الإلكتروني</th>
            <th>الدور</th>
            <th>تحكم</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                {u.role === "user" ? (
                  <button onClick={() => changeRole(u._id, "admin")}>
                    جعله مدير
                  </button>
                ) : (
                  <button onClick={() => changeRole(u._id, "user")}>
                    جعله مستخدم
                  </button>
                )}

                <button
                  onClick={() => deleteUser(u._id)}
                  style={{ marginLeft: "10px", color: "red" }}
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
