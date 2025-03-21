import React, { useState } from 'react';
import { getAccessToken, savetoSpotify, fetchSpotifyUserId } from '../../spotify';

function CreatePlaylist({ playlistName, playlistUri, setPlaylistId, handleCreatePlaylist }) {
    
  const [status, setStatus] = useState("");

  const handleClick = async () => {
      if (!playlistName) {
          setStatus("🚨 Playlist name cannot be empty.");
          return;
      }

      await handleCreatePlaylist(playlistName, playlistUri); // ✅ Call the function from App.js
  };

  return (
      <div>
          <button onClick={handleClick}>Create Playlist</button>
          <p>{status}</p>
      </div>
  );
}

export default CreatePlaylist;

