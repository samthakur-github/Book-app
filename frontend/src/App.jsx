import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// Components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AllBooks from './pages/AllBooks';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Cart from './pages/Cart';
import Profile from './pages/Profile';

const App = () => {
  return (
    <>
      <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/all-books" element={<AllBooks />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Footer />
      </Router>
    </>
  )
}

export default App