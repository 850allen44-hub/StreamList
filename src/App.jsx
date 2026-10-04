import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

function StreamList() {
  const [items, setItems] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const title = event.target.elements.title.value;

    setItems([...items, title]);

    event.target.reset();
  };

  return (
    <main className="page">
      <div className="hero">
        <p className="eyebrow">YOUR PERSONAL WATCHLIST</p>

        <h1>Build Your StreamList</h1>

        <p className="subtitle">
          Keep track of the movies and shows you don't want to miss.
        </p>

        <form className="stream-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Enter a movie or show..."
            required
          />

          <button type="submit">+ Add to StreamList</button>
        </form>

        <div className="stream-list">
          {items.map((item, index) => (
            <div className="stream-item" key={index}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

function Movies() {
  return (
    <main className="page">
      <div className="hero">
        <p className="eyebrow">DISCOVER</p>
        <h1>Movies</h1>
        <p className="subtitle">Browse movies for your StreamList.</p>
      </div>
    </main>
  );
}

function Cart() {
  return (
    <main className="page">
      <div className="hero">
        <p className="eyebrow">YOUR COLLECTION</p>
        <h1>Cart</h1>
        <p className="subtitle">Your saved selections will appear here.</p>
      </div>
    </main>
  );
}

function About() {
  return (
    <main className="page">
      <div className="hero">
        <p className="eyebrow">ABOUT</p>
        <h1>StreamList</h1>
        <p className="subtitle">
          A simple way to keep track of movies and shows you want to watch.
        </p>
      </div>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <Link className="logo" to="/">
          STREAMLIST
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/about">About</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<StreamList />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;