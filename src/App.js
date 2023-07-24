import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ReRoute from './components/ReRoute';
import ProductsPage from "./pages/ProductsPage";

function App() {

  return (
    <div className="w-full">

      <div className="w-full">
        <Routes>
           <Route path="/" element={<Layout/>}>
              <Route index element = {<ReRoute><ProductsPage type={'All'}/></ReRoute>} />
              <Route path="products/:category" element={<ProductsPage type={'Category'} />}/>
           </Route>

           <Route path="/cart">
              <Route index element = {<CartPage/>} />
              <Route path="/cart/checkout" element={<CheckoutPage/>}/>
           </Route>
           <Route path="*" element={<div>404 Not Found</div>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
