import React from 'react';
import './Track.css';

const Track = ({ playlist, removeSong, handleSaveToSpotify }) => {
  return (
    <div className="track-container">
      <ul>
        {playlist.map((song) => (
          <li key={song.id} className="track-item">
            {song.name} - {song.artist}
            <button onClick={() => removeSong(song.id)}>Remove</button>
          </li>
        ))}
      </ul>

      {/* Save to Spotify Button */}
      <button className="save-button" onClick={handleSaveToSpotify}>
        Save to Spotify
      </button>
    </div>
  );
};

export default Track;
