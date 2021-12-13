// import logo from './logo.svg';
import './App.css';
import {Routes,Route} from 'react-router-dom';
import HomeScreen from './pages/Home';
import SignInPage from './pages/SignIn';
import ProductPage from './pages/Product.page';
import Cart from './pages/Cart.page';
import Orderspage from './pages/Orders';
import UserInfo from './pages/UserInfo';
function App() {
  return (
    <div>
      <Routes>
        <Route exact={true} path ="/" element={<HomeScreen/>}></Route>
        <Route exact={true} path ="/signin" element={<SignInPage/>}></Route>
        <Route exact={true} path ="/product" element={<ProductPage/>}>
          <Route path=":productid" element={<ProductPage/>} />
        </Route>
        <Route exact={true} path ="/cart" element={<Cart/>}></Route>
        <Route exact={true} path ="/orders" element={<Orderspage/>}></Route>
        <Route exact={true} path ="/info" element={<UserInfo/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
