import React from 'react';


function Playlist({ playlist, removeSong, saveToSpotify, playlistName }) {
  return (
    <div className="playlist-container">
      <h2>{playlistName}</h2>
      <ul>
        {playlist.map((song) => (
          <li key={song.id} className="song-item">
            {song.name} by {song.artist}
            <button onClick={() => removeSong(song.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <button className="save-button" onClick={saveToSpotify}>Save to Spotify</button>
    </div>
  );
}

export default Playlist;
