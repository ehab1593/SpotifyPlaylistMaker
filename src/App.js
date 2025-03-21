import React, { useState } from 'react';
import './index.css';
import './App.css';
import SearchResults from './components/SearchResults/SearchResults';
import SearchBar from './components/SearchBar/SearchBar';
import Track from './components/Track/Track';
import { getAccessToken, fetchSpotifyUserId, savetoSpotify, addTracksToPlaylist } from './spotify';

// Import function to fetch search results
import { searchSpotify } from './spotify';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [playlistId, setPlaylistId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  //Fetch data from Spotify API
  const handleSearch = async (query) => {
    try {
      console.log("🔍 Searching for:", query);
      const results = await searchSpotify(query);
      setSearchResults(results);
    } catch (error) {
      console.error("🚨 Error fetching search results:", error);
    }
  };

  //  Add song to playlist
  const handleAddToPlaylist = (song) => {
    if (!playlist.some((t) => t.id === song.id)) {
      setPlaylist((prev) => [...prev, song]);
    }
  };

  //  Remove song from playlist
  const handleRemoveFromPlaylist = (id) => {
    setPlaylist((prev) => prev.filter((song) => song.id !== id));
  };

  //  Create and save playlist
  const handleSaveToSpotify = async () => {
    if (playlist.length === 0) {
      alert("🚨 Playlist is empty! Add songs before saving.");
      return;
    }

    try {
      const accessToken = getAccessToken();
      const userId = await fetchSpotifyUserId(accessToken);

      // Step 1: Create Playlist
      const newPlaylistId = await savetoSpotify(accessToken, playlistName, userId);
      if (!newPlaylistId) {
        console.error("🚨 Failed to create playlist.");
        return;
      }

      setPlaylistId(newPlaylistId);
      console.log(`✅ Playlist "${playlistName}" created!`);

      // Step 2: Add Songs to Playlist
      const trackUris = playlist.map((song) => song.uri);
      await addTracksToPlaylist(accessToken, newPlaylistId, trackUris);
      console.log("✅ Tracks added successfully!");
      setPlaylist([]);
      setPlaylistName("New Playlist");

    } catch (error) {
      console.error("🚨 Error saving playlist:", error);
    }
  };

  return (
    <div className="App">
      <h1>Spotify Playlist Maker</h1>
      <SearchBar onSearch={handleSearch} />

      <div className="main-container">
        {/* 🎵 Left Side: Search Results */}
        <div className="results-container">
          <h2>Search Results</h2>
          <SearchResults results={searchResults} addSong={handleAddToPlaylist} />
        </div>

        {/* 🎶 Right Side: Playlist */}
        <div className="playlist-container">
          {/* ✅ Editable Playlist Title */}
          {isEditing ? (
            <input
              type="text"
              className="playlist-title-input"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              onBlur={() => setIsEditing(false)}
              onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)}
              autoFocus
            />
          ) : (
            <h2 className="playlist-title" onClick={() => setIsEditing(true)}>
              {playlistName}
            </h2>
          )}

          {/* 🎧 Track List & Save Button */}
          <Track
            playlist={playlist}
            removeSong={handleRemoveFromPlaylist}
            handleSaveToSpotify={handleSaveToSpotify}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
