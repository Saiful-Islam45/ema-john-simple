import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import Header from './component/Header/Header';
import Shop from './component/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Review from './component/Review/Review';
import Errorpage from './component/Errorpage/Errorpage';
import Manage from './component/Manage/Manage';
import ProductDetails from './component/ProductDetails/ProductDetails';
import Login from './component/Login/Login';
import { AuthContextProvider, PrivateRoute } from './component/User-auth';
import Shipment from './component/Shipment/Shipment';


function App(props) {
  return (
    <div>
      <AuthContextProvider>
        <Header></Header>
        <Router>
          <Switch>
            <Route exact path="/">
              <Shop></Shop>
            </Route>
            <Route path="/shop">
              <Shop></Shop>
            </Route>
            <Route path="/review">
              <Review></Review>
            </Route>
            <Route path="/manage">
              <Manage></Manage>
            </Route>
            <Route path="/product/:productKey">
              <ProductDetails></ProductDetails>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <PrivateRoute path="/shipment">
              <Shipment></Shipment>
            </PrivateRoute>
            <Route path="*">
              <Errorpage></Errorpage>
            </Route>
          </Switch>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
