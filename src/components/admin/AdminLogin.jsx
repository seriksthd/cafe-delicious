import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginAdminMutation } from "../../store/slices/adminSlice";
import { loginSuccess } from "../../store/slices/authSlice";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginAdmin, { isLoading }] = useLoginAdminMutation();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  console.log("credentials: ", credentials);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginAdmin(credentials).unwrap();
      dispatch(
        loginSuccess({
          user: { username: credentials.username },
          token: response.access_token,
        })
      );
      navigate("/admin");
    } catch (error) {
      console.error("Кирүүдө ката:", error);
      alert("Туура эмес логин же пароль");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Админ панелине кирүү
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Логин
            </label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Пароль
            </label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? "Кирүү..." : "Кирүү"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/")}
            className="text-amber-600 hover:text-amber-700"
          >
            Башкы бетке кайтуу
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
