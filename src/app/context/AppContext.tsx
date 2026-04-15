import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, Settings, defaultSettings } from '../data/products';
import * as productService from '../../services/productService';
import * as settingsService from '../../services/settingsService';
import * as authService from '../../services/authService';

interface AppContextType {
  products: Product[];
  settings: Settings;
  isAdmin: boolean;
  loading: boolean;
  darkMode: boolean;
  toggleDarkMode: () => void;
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => Promise<string>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  updateSettings: (settings: Settings) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  // Subscribe to auth state changes
  useEffect(() => {
    const unsubscribe = authService.subscribeToAuthState((user) => {
      setIsAdmin(!!user);
    });

    return () => unsubscribe();
  }, []);

  // Subscribe to products in real-time
  useEffect(() => {
    const unsubscribe = productService.subscribeToProducts((updatedProducts) => {
      setProducts(updatedProducts);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Load settings
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const loadedSettings = await settingsService.getSettings();
        setSettings(loadedSettings);
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };

    loadSettings();
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prev: boolean) => {
      const newValue = !prev;
      localStorage.setItem('darkMode', JSON.stringify(newValue));
      if (newValue) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newValue;
    });
  };

  // Apply dark mode on mount
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const addProduct = async (
    product: Omit<Product, 'id' | 'createdAt'>
    ): Promise<string> => {
    return await productService.addProduct(product);
  };

  const updateProduct = async (
    id: string,
    updatedProduct: Partial<Product>
  ): Promise<void> => {
    return await productService.updateProduct(id, updatedProduct);
  };

  const deleteProduct = async (id: string) => {
    await productService.deleteProduct(id);
  };

  const updateSettingsHandler = async (newSettings: Settings) => {
    await settingsService.updateSettings(newSettings);
    setSettings(newSettings);
  };

  const login = async (email: string, password: string) => {
    await authService.signIn(email, password);
  };

  const logout = async () => {
    await authService.signOut();
  };

  return (
    <AppContext.Provider
      value={{
        products,
        settings,
        isAdmin,
        loading,
        darkMode,
        toggleDarkMode,
        addProduct,
        updateProduct,
        deleteProduct,
        updateSettings: updateSettingsHandler,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
