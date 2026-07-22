import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import MainArea from './components/MainArea/MainArea';
import { registerSidebar } from './utils/sidebarController';
import Home from './pages/Home/Home';
import ProductsList from './pages/Products/ProductsList/ProductsList';
import ProductView from './pages/Products/ProductView/ProductView';
import CategoriesList from './pages/Categories/CategoriesList/CategoriesList';
import CategoryView from './pages/Categories/CategoryView/CategoryView';
import Profile from './pages/Profile/Profile';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    registerSidebar(() => setSidebarOpen(true));
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <MainArea>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsList />} />
            <Route path="/products/new" element={<ProductView />} />
            <Route path="/products/:id" element={<ProductView />} />
            <Route path="/categories" element={<CategoriesList />} />
            <Route path="/categories/new" element={<CategoryView />} />
            <Route path="/categories/:id" element={<CategoryView />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </MainArea>
      </div>
    </BrowserRouter>
  );
}

export default App;