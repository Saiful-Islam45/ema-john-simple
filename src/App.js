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

function App() {
  return (
    <div>
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
          <Route path="*">
            <Errorpage></Errorpage>
          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
