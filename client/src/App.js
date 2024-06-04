import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreateProduct from "./pages/CreateProduct";
import Products from "./pages/Products";

function App() {
  return (
    <div className="App bg-black text-red-500 h-screen">
      <Router>
        <div className='bg-black flex justify-start p-5 border-b border-red-500'>
          <Link className="mr-4" to="/">Home</Link>
          <Link className="mr-4" to="/createproduct">Create a product</Link>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createproduct" element={<CreateProduct />} />
          <Route path="/products/:id" element={<Products />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
