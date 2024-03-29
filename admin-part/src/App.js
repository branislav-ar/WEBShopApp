import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector } from 'react-redux';

const App = () => {

    const admin = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.isAdmin;
    const user = useSelector((state) => state.user.currentUser);
    console.log(user, admin);

    return (
        <Router>
            <Switch>
                {admin && (
                <>
                    <Topbar />
                    <div className="container">
                    <Sidebar />
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/users">
                        <UserList />
                    </Route>
                    <Route path="/user/:userId">
                        <User />
                    </Route>
                    <Route path="/newUser">
                        <NewUser />
                    </Route>
                    <Route path="/products">
                        <ProductList />
                    </Route>
                    <Route path="/product/:productId">
                        <Product />
                    </Route>
                    <Route path="/newproduct">
                        <NewProduct />
                    </Route>
                    </div>
                </>
                )}
            </Switch>
        </Router>
      );
}

export default App;
