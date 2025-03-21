import React from 'react';
import './SearchResults.css';

function SearchResults({ results = [], addSong }) {  
  return (
    <div>
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul>
          {results.map((song) => (
            <li key={song.id} className="search-result-item">
              <span>{song.name} by {song.artist}</span>
              <button onClick={() => addSong(song)}>+</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchResults;
