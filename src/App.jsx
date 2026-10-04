import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

function StreamList({ items, setItems }) {
  const handleSubmit = (event) => {
    event.preventDefault();

    const title = event.target.elements.title.value.trim();

    if (!title) return;

    const newItem = {
      id: Date.now(),
      title: title,
      watched: false,
    };

    console.log(newItem);
    event.target.reset();
  };

  const toggleWatched = (id) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, watched: !item.watched }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
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
          {items.length === 0 ? (
            <p className="empty-message">
              Your StreamList is empty. Add something above.
            </p>
          ) : (
            items.map((item) => (
              <div
                className={`stream-item ${item.watched ? "watched" : ""}`}
                key={item.id}
              >
                <div className="stream-info">
                  <span className="play-icon">▶</span>
                  <span className="stream-title">{item.title}</span>
                </div>

                <div className="stream-actions">
                  <button
                    type="button"
                    className="watch-button"
                    onClick={() => toggleWatched(item.id)}
                  >
                    {item.watched ? "✓ Watched" : "Mark Watched"}
                  </button>

                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}

function Movies({ items, setItems }) {
  const movies = [
    { id: 1, title: "The Batman", year: "2022", genre: "Action" },
    { id: 2, title: "Dune: Part Two", year: "2024", genre: "Sci-Fi" },
    { id: 3, title: "John Wick: Chapter 4", year: "2023", genre: "Action" },
    {
      id: 4,
      title: "Spider-Man: Across the Spider-Verse",
      year: "2023",
      genre: "Animation",
    },
    { id: 5, title: "Creed III", year: "2023", genre: "Drama" },
    { id: 6, title: "Godzilla x Kong", year: "2024", genre: "Action" },
  ];

  const addMovie = (movie) => {
    const alreadyAdded = items.some(
      (item) => item.title.toLowerCase() === movie.title.toLowerCase()
    );

    if (alreadyAdded) return;

    const newItem = {
      id: Date.now(),
      title: movie.title,
      watched: false,
    };

    setItems([...items, newItem]);
  };

  return (
    <main className="page">
      <div className="hero movies-hero">
        <p className="eyebrow">DISCOVER</p>
        <h1>Movies</h1>

        <p className="subtitle">
          Browse movies for your StreamList.
        </p>

        <div className="movie-grid">
          {movies.map((movie) => {
            const alreadyAdded = items.some(
              (item) =>
                item.title.toLowerCase() === movie.title.toLowerCase()
            );

            return (
              <div className="movie-card" key={movie.id}>
                <div className="movie-poster">
                  <span>▶</span>
                </div>

                <div className="movie-details">
                  <h2>{movie.title}</h2>
                  <p>
                    {movie.year} • {movie.genre}
                  </p>

                  <button
                    type="button"
                    onClick={() => addMovie(movie)}
                    disabled={alreadyAdded}
                  >
                    {alreadyAdded ? "✓ Added" : "+ Add to StreamList"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

function Cart() {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("streamList");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  const removeItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem("streamList", JSON.stringify(updatedItems));
  };
      const toggleWatched = (id) => {
  const updatedItems = items.map((item) =>
    item.id === id
      ? { ...item, watched: !item.watched }
      : item
  );

  setItems(updatedItems);
  localStorage.setItem("streamList", JSON.stringify(updatedItems));
};
  return (
    <main className="page">
      <div className="hero cart-hero">
        <p className="eyebrow">YOUR COLLECTION</p>
        <h1>My StreamList</h1>
        <p className="subtitle">
          {items.length === 0
            ? "Your StreamList is empty."
            : `${items.length} ${
                items.length === 1 ? "title" : "titles"
              } saved to your StreamList.`}
        </p>

        <div className="cart-list">
          {items.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="cart-info">
                <span className="play-icon">▶</span>
                <span className={item.watched ? "stream-title watched" : "stream-title"}>
                  {item.title}
                </span>
              </div>
                  <button
    type="button"
    className="watch-button"
    onClick={() => toggleWatched(item.id)}
  >
    {item.watched ? "✓ Watched" : "Mark Watched"}
  </button>
              <button
                type="button"
                className="cart-remove"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
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
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("streamList");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    localStorage.setItem("streamList", JSON.stringify(items));
  }, [items]);

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
        <Route
          path="/"
          element={<StreamList items={items} setItems={setItems} />}
        />

        <Route
          path="/movies"
          element={<Movies items={items} setItems={setItems} />}
        />

        <Route
          path="/cart"
          element={<Cart items={items} />}
        />

        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;