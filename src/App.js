import './App.css';
import { Routes,Route,Link } from 'react-router-dom';
import Home from './Home';
import Post from './Post';
import About from './About';

function App() {
  return (
    <div className="App">
      <div className="header">
        <img src="/img/lg.jpg" alt="" />
        <h2>The Great App</h2>
      </div> <br /><br />
<br />
      <div className="navbar">
        <Link to="/">HOME</Link>
        <Link to="/post">POST</Link>
        <Link to="/about">ABOUT US</Link>
      </div>

      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/post' element={<Post/>} />
        <Route path='/about' element={<About/>} />
      </Routes>
    </div>
  );
}

export default App;
