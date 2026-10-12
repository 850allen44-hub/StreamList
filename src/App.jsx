
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import "./App.css";

// Google's Material Symbols icon component
function Icon({ name }) {
  return (
    <span className="material-symbols-outlined" aria-hidden="true">
      {name}
    </span>
  );
}

function StreamList({ items, setItems }) {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const handleSubmit = (event) => {
    event.preventDefault();

    const title = event.target.elements.title.value.trim();
    if (!title) return;

    const newItem = {
      id: crypto.randomUUID(),
      title,
      watched: false,
    };

    setItems((previous) => [...previous, newItem]);
    event.target.reset();
  };

  const toggleWatched = (id) => {
    setItems((previous) =>
      previous.map((item) =>
        item.id === id
          ? { ...item, watched: !item.watched }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setItems((previous) =>
      previous.filter((item) => item.id !== id)
    );

    if (editingId === id) {
      setEditingId(null);
      setEditTitle("");
    }
  };

  const startEditing = (item) => {
    setEditingId(item.id);
    setEditTitle(item.title);
  };

  const saveEdit = (id) => {
    const updatedTitle = editTitle.trim();
    if (!updatedTitle) return;

    setItems((previous) =>
      previous.map((item) =>
        item.id === id
          ? { ...item, title: updatedTitle }
          : item
      )
    );

    setEditingId(null);
    setEditTitle("");
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "watched" && item.watched) ||
      (filter === "unwatched" && !item.watched);

    return matchesSearch && matchesFilter;
  });

  const watchedCount = items.filter((item) => item.watched).length;

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
            aria-label="Movie or show title"
            required
          />

          <button type="submit">
            <Icon name="add_circle" /> Add to StreamList
          </button>
        </form>

        <p className="subtitle">
          {items.length} saved • {watchedCount} watched
        </p>

        <div className="stream-form">
          <input
            type="search"
            placeholder="Search your StreamList..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search saved titles"
          />

          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            aria-label="Filter watchlist"
          >
            <option value="all">All Titles</option>
            <option value="unwatched">Not Watched</option>
            <option value="watched">Watched</option>
          </select>
        </div>

        <div className="stream-list">
          {filteredItems.length === 0 ? (
            <p className="empty-message">
              {items.length === 0
                ? "Your StreamList is empty. Add something above."
                : "No titles match your search or filter."}
            </p>
          ) : (
            filteredItems.map((item) => (
              <div
                className={`stream-item ${
                  item.watched ? "watched" : ""
                }`}
                key={item.id}
              >
                <div className="stream-info">
                  <span className="play-icon">
                    <Icon name="movie" />
                  </span>

                  {editingId === item.id ? (
                    <input
                      type="text"
                      value={editTitle}
                      aria-label="Edit movie title"
                      onChange={(event) =>
                        setEditTitle(event.target.value)
                      }
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          saveEdit(item.id);
                        }
                        if (event.key === "Escape") {
                          setEditingId(null);
                          setEditTitle("");
                        }
                      }}
                    />
                  ) : (
                    <span className="stream-title">
                      {item.title}
                    </span>
                  )}
                </div>

                <div className="stream-actions">
                  {editingId === item.id ? (
                    <>
                      <button
                        type="button"
                        onClick={() => saveEdit(item.id)}
                      >
                        <Icon name="save" /> Save
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(null);
                          setEditTitle("");
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => startEditing(item)}
                      >
                        <Icon name="edit" /> Edit
                      </button>

                      <button
                        type="button"
                        className="watch-button"
                        onClick={() => toggleWatched(item.id)}
                      >
                        <Icon
                          name={
                            item.watched
                              ? "check_circle"
                              : "visibility"
                          }
                        />
                        {item.watched
                          ? "Watched"
                          : "Mark Watched"}
                      </button>

                      <button
                        type="button"
                        className="remove-button"
                        onClick={() => removeItem(item.id)}
                      >
                        <Icon name="delete" /> Remove
                      </button>
                    </>
                  )}
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
    {
      id: 1,
      title: "The Batman",
      year: "2022",
      genre: "Action",
    },
    {
      id: 2,
      title: "Dune: Part Two",
      year: "2024",
      genre: "Sci-Fi",
    },
    {
      id: 3,
      title: "John Wick: Chapter 4",
      year: "2023",
      genre: "Action",
    },
    {
      id: 4,
      title: "Spider-Man: Across the Spider-Verse",
      year: "2023",
      genre: "Animation",
    },
    {
      id: 5,
      title: "Creed III",
      year: "2023",
      genre: "Drama",
    },
    {
      id: 6,
      title: "Godzilla x Kong",
      year: "2024",
      genre: "Action",
    },
  ];

  const addMovie = (movie) => {
    const alreadyAdded = items.some(
      (item) =>
        item.title.toLowerCase() === movie.title.toLowerCase()
    );

    if (alreadyAdded) return;

    setItems((previous) => [
      ...previous,
      {
        id: crypto.randomUUID(),
        title: movie.title,
        watched: false,
      },
    ]);
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
                item.title.toLowerCase() ===
                movie.title.toLowerCase()
            );

            return (
              <div className="movie-card" key={movie.id}>
                <div className="movie-poster">
                  <Icon name="theaters" />
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
                    <Icon
                      name={
                        alreadyAdded
                          ? "check_circle"
                          : "add_circle"
                      }
                    />
                    {alreadyAdded
                      ? "Added"
                      : "Add to StreamList"}
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

function Cart({ items, setItems }) {
  const removeItem = (id) => {
    setItems((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  const toggleWatched = (id) => {
    setItems((previous) =>
      previous.map((item) =>
        item.id === id
          ? { ...item, watched: !item.watched }
          : item
      )
    );
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
                <span className="play-icon">
                  <Icon name="movie" />
                </span>

                <span
                  className={
                    item.watched
                      ? "stream-title watched"
                      : "stream-title"
                  }
                >
                  {item.title}
                </span>
              </div>

              <button
                type="button"
                className="watch-button"
                onClick={() => toggleWatched(item.id)}
              >
                <Icon
                  name={
                    item.watched
                      ? "check_circle"
                      : "visibility"
                  }
                />
                {item.watched
                  ? "Watched"
                  : "Mark Watched"}
              </button>

              <button
                type="button"
                className="cart-remove"
                onClick={() => removeItem(item.id)}
              >
                <Icon name="delete" /> Remove
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
          A simple way to keep track of movies and shows
          you want to watch.
        </p>
      </div>
    </main>
  );
}

function App() {
  const [items, setItems] = useState(() => {
    try {
      const savedItems = localStorage.getItem("streamList");
      return savedItems ? JSON.parse(savedItems) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "streamList",
      JSON.stringify(items)
    );
  }, [items]);

  return (
    <BrowserRouter>
      <nav className="navbar">
        <Link className="logo" to="/">
          STREAMLIST
        </Link>

        <div className="nav-links">
          <NavLink to="/" end>
            <Icon name="home" /> Home
          </NavLink>

          <NavLink to="/movies">
            <Icon name="theaters" /> Movies
          </NavLink>

          <NavLink to="/cart">
            <Icon name="bookmark" /> My StreamList
          </NavLink>

          <NavLink to="/about">
            <Icon name="info" /> About
          </NavLink>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <StreamList
              items={items}
              setItems={setItems}
            />
          }
        />

        <Route
          path="/movies"
          element={
            <Movies
              items={items}
              setItems={setItems}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              items={items}
              setItems={setItems}
            />
          }
        />

        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
