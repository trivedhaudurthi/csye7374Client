// import logo from './logo.svg';
import './App.css';
import {Routes,Route} from 'react-router-dom';
import HomeScreen from './pages/Home';
import SignInPage from './pages/SignIn';
function App() {
  return (
    <div>
      <Routes>
        <Route exact={true} path ="/" element={<HomeScreen/>}></Route>
        <Route exact={true} path ="/signin" element={<SignInPage/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
