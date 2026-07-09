import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import MainArea from './components/MainArea/MainArea';
import Home from './pages/Home/Home';
import ProductsList from './pages/Products/ProductsList/ProductsList';
import ProductView from './pages/Products/ProductView/ProductView';
import CategoriesList from './pages/Categories/CategoriesList/CategoriesList';
import CategoryView from './pages/Categories/CategoryView/CategoryView';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar />
        <MainArea>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsList />} />
            <Route path="/products/new" element={<ProductView />} />
            <Route path="/products/:id" element={<ProductView />} />
            <Route path="/categories" element={<CategoriesList />} />
            <Route path="/categories/new" element={<CategoryView />} />
            <Route path="/categories/:id" element={<CategoryView />} />
          </Routes>
        </MainArea>
      </div>
    </BrowserRouter>
  );
}

export default App;