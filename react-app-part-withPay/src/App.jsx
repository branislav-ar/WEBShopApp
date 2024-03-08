import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Pay from "./pages/Pay";
import {  BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from 'react-redux';
import ScrollToTop from './scrollToTop';

const App = () => {

  const user = useSelector((state) => state.user.currentUser);

  console.log(user);

  return (
    <Router>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<Home/>}> </Route>
          <Route path="/products/:category" element={<ProductList/>}> </Route>
          <Route path="/product/:id" element={<Product/>}> </Route>
          <Route path="/cart" element={<Cart/>}> </Route>
          { user ? 
            <Route path="/login" element={<Navigate replace to="/" />} />
            :
            <Route path="/login" element={<Login/>}/> 
          }
          { user ? 
            <Route path="/register" element={<Navigate replace to="/" />} />
            :
            <Route path="/register" element={<Register/>}/> 
          }
          <Route path="/success" element={<Success/>}> </Route>
          <Route path="/pay" element={<Pay/>}> </Route>
        </Routes>
      </ScrollToTop>
    </Router>
  );
};

export default App;


/*

<Home/>
<ProductList/> 
<Product/>
<Register/>
<Login/>
<Cart/>
<Pay/>

*/