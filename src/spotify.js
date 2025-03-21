const clientId = '9e422d5e7a994967b2d2055d9209394c'; 
const redirectUri = 'http://localhost:3000'; 
const scopes = [
  'playlist-modify-public',
  'playlist-modify-private',
  'user-library-read',
  'user-read-private',
].join('%20'); // Join scopes with %20 (URL encoding for space)

let accessToken;

export const getAccessToken = () => {
  if (accessToken) return accessToken; // If token already exists, return it.

  // Check if token is in the URL
  const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
  const expiresMatch = window.location.href.match(/expires_in=([^&]*)/);

  if (tokenMatch && expiresMatch) {
    accessToken = tokenMatch[1];
    const expiresIn = Number(expiresMatch[1]);

    // Clear the token from the URL after getting it
    window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
    window.history.pushState('Access Token', null, '/');
    return accessToken;
  } else {
    // Redirect to Spotify login
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${scopes}&redirect_uri=${redirectUri}`;
    window.location = authUrl;
  }
};

export const searchSpotify = async (query) => {
    const token = getAccessToken(); // Get the access token

    const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${query}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  
    if(response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri

        }));
      }
    else {
      throw new Error('Failed to fetch tracks from Spotify.');
    }
  };
  
  export const savetoSpotify = async (accessToken, playlistName, userId, description = "") => {
    const url = `https://api.spotify.com/v1/users/${userId}/playlists`;
    const data = {
      name: playlistName,
      description: description,
      public: true,
    };
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { 
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log("Playlist Created Successfully:", jsonResponse);
        return jsonResponse.id; // Ensure it returns ONLY the playlist ID
      } else {
        const errorResponse = await response.json();
        console.error("Failed to create playlist:", errorResponse);
        return null; // Explicitly return null if creation fails
      }
    } catch (error) {
      console.error("Error in savetoSpotify:", error);
      return null; // Ensure a return value in case of error
    }
  };
  
  

  export const fetchSpotifyUserId = async (token) => {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse.id; // Return the user's Spotify ID
    } else {
      throw new Error('Failed to fetch user ID');
    }
  };

  export const addTracksToPlaylist = async (token, playlistId, trackUris) => {
    playlistId = playlistId.trim(); // Ensure no spaces
    console.log(" Extracted Playlist ID (Before Clean):", playlistId);

    console.log(" Tracks being added:", trackUris);
  
  // Validate that the playlistId is Base62 format
  if (!playlistId.match(/^[a-zA-Z0-9]+$/)) { 
    console.error(" Invalid Playlist ID (should be alphanumeric Base62):", playlistId);
    return;
  }
  
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uris: trackUris }),
      });
  
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log("Tracks added to playlist:", jsonResponse);
        return jsonResponse;
      } else {
        const errorResponse = await response.json();
        console.error("Failed to add tracks:", errorResponse);
      }
    } catch (error) {
      console.error("Error in addTracksToPlaylist:", error);
    }
  };
  


  export const savetoSpotifyPlaylistWithTracks = async (playlistName, trackUris) => {
    try {
        const token = getAccessToken();
        console.log("Token:", token);
        
        const userId = await fetchSpotifyUserId(token);
        console.log("Fetched User ID:", userId);

        const playlistId = await savetoSpotify(token, playlistName, userId);
        
        if (!playlistId) {  // Fix: Check if `playlistId` is null or undefined
            throw new Error(" Playlist creation failed! No ID received.");
        }

        console.log("Extracted Playlist ID:", playlistId);

        // Ensure the ID is properly formatted
        const cleanedPlaylistId = playlistId.trim(); 
        console.log("Cleaned Playlist ID:", cleanedPlaylistId);

        await addTracksToPlaylist(token, cleanedPlaylistId, trackUris);
        console.log("Playlist and tracks saved successfully!");

    } catch (error) {
        console.error("Error saving playlist and tracks!", error);
    }
};

  
  