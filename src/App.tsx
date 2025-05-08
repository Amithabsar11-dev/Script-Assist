import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/Signup';
import ResourceList from './pages/ResourceList';
import ResourceDetail from './pages/ResourceDetail';
import { useAppStore } from './store/app.store';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/resources" />} />
        <Route path="/login" element={<Login />} />
		<Route path="/signup" element={<Signup />} />
        <Route
          path="/resources"
          element={<PrivateRoute><ResourceList /></PrivateRoute>}
        />
        <Route
          path="/resources/:id"
          element={<PrivateRoute><ResourceDetail /></PrivateRoute>}
        />
      </Routes>
    </BrowserRouter>
  );
}
