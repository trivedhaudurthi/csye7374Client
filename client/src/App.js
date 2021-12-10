// import logo from './logo.svg';
import './App.css';
import {Routes,Route} from 'react-router-dom';
import HomeScreen from './pages/Home';
import SignInPage from './pages/SignIn';
import ProductPage from './pages/Product.page';
import Cart from './pages/Cart.page';
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
      </Routes>
    </div>
  );
}

export default App;
