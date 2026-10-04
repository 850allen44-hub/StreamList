import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'

function StreamList() {
  const handleSubmit = (event) => {
    event.preventDefault()

    const title = event.target.elements.title.value
    console.log('Added to StreamList:', title)

    event.target.reset()
  }

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
      </div>
    </main>
  )
}

function Movies() {
  return (
    <main className="page">
      <h1>Movies</h1>
      <p>Your movies will appear here.</p>
    </main>
  )
}

function Cart() {
  return (
    <main className="page">
      <h1>Cart</h1>
      <p>Your saved selections will appear here.</p>
    </main>
  )
}

function About() {
  return (
    <main className="page">
      <h1>About StreamList</h1>
      <p>StreamList helps you organize what you want to watch.</p>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <header>
        <div className="logo">STREAMLIST</div>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<StreamList />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App