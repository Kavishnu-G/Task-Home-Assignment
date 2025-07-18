import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    fetch("/api/movies")  
      .then(res => res.json())
      .then(setMovies);
  }, []);

  const showDetails = (id) => {
    fetch(`/api/movies/${id}`)
      .then(res => res.json())
      .then(setSelected);
  };

  if (selected) {
    return (
      <div className="App">
        <button onClick={() => setSelected(null)}>← Back</button>
        <h2>{selected.title}</h2>
        <p>{selected.tagline}</p>
        <p>{selected.overview}</p>
        <p>{selected.vote_average}</p>
        <p>{new Date(selected.release_date).toLocaleDateString()}</p>
        <p>{selected.runtime} mins</p>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>🎬 Movie List</h1>
      <div className="grid">
        {movies.map(m => (
          <div key={m.id} className="card" onClick={() => showDetails(m.id)}>
            <h3>{m.title}</h3>
            <p>{m.tagline}</p>
            <p>{m.vote_average}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;