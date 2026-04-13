import { createBrowserRouter } from 'react-router';
import Root from './pages/Root';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminSettings from './pages/admin/AdminSettings';
import NotFound from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'products', Component: ProductListing },
      { path: 'products/:id', Component: ProductDetail },
      { path: 'admin/login', Component: AdminLogin },
      { path: 'admin', Component: AdminDashboard },
      { path: 'admin/products', Component: AdminProducts },
      { path: 'admin/settings', Component: AdminSettings },
      { path: '*', Component: NotFound },
    ],
  },
]);
