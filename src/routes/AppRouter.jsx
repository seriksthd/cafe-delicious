import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../pages/Home";
import { Gallery } from "../pages/Gallery";
import { Layout } from "../layout/Layout";
import NotFound from "../components/NotFound";
import Cart from "../components/cart/Cart";
import Products from "../components/Products";
import AdminLogin from "../components/admin/AdminLogin";
import AdminPanel from "../components/admin/AdminPanel";
import ProtectedRoute from "./ProtectedRoute";
export const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/menu",
          element: <Products />,
        },
        {
          path: "/gallery",
          element: <Gallery />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/admin/login",
          element: <AdminLogin />,
        },
      ],
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute>
          <AdminPanel />
        </ProtectedRoute>
      ),
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return <RouterProvider router={router} />;
};
