import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './Components/Home/Home';
import Orders from './Components/Orders/Orders';
import Admin from './Components/Admin/Admin';
import Header from './Components/Header/Header';
import Login from './Components/Login/Login';
import { createContext, useState } from 'react';
import SpecificProduct from './Components/SpecificProduct/SpecificProduct';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
export const UserContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState({});
  const [products, setProducts] = useState([]);
  return (
    <UserContext.Provider value={{ log: [loggedIn, setLoggedIn], productsData: [products, setProducts] }}>
      <Router>
        <Header></Header>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/home'>
            <Home />
          </Route>
          <PrivateRoute path='/orders'>
            <Orders />
          </PrivateRoute>
          <PrivateRoute path='/admin'>
            <Admin />
          </PrivateRoute>
          <Route path='/login'>
            <Login />
          </Route>
          <PrivateRoute path='/product/:_id'>
            <SpecificProduct />
          </PrivateRoute>
        </Switch>
      </Router>
    </UserContext.Provider >
  );
}

export default App;
