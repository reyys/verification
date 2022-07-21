import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Review from "../pages/Review";
import ExportPdfSPMT from "../pages/ExportPdfSPMT";
import Layout from "../layout";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home/index.jsx";

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          {/* <Route index element={<Dashboard />} /> */}
          <Route path="review/:id" element={<Review />} />
          <Route path="spmt/:id" element={<ExportPdfSPMT />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const ProtectedRoute = ({ user, children }) => {
  const login = localStorage.getItem("isLogin");
  if (login !== "true") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoutesApp;
