# 🎵 Spotify Playlist Maker  

A **React-based web app** that allows users to search for songs on Spotify, create custom playlists, and save them directly to their Spotify account.  

## 🚀 Features  

- 🔍 **Search for songs** using the Spotify API  
- ➕ **Add songs** to a playlist  
- 📝 **Edit the playlist title** directly  
- 💾 **Save the playlist** to your Spotify account  



## 🛠 Installation & Setup  

1. **Clone the repository**  
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
   cd YOUR_REPOSITORY
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Create a `.env` file** and add your **Spotify API credentials**  
   ```plaintext
   REACT_APP_SPOTIFY_CLIENT_ID=your_client_id
   REACT_APP_SPOTIFY_REDIRECT_URI=http://localhost:3000
   ```

4. **Start the development server**  
   ```bash
   npm start
   ```

## 🔑 Spotify API Setup  

To use this app, you'll need to:  

1. Register on **[Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)**  
2. Create an **app** and get a **Client ID**  
3. Add `http://localhost:3000` as a redirect URI in the app settings  

## 📌 Technologies Used  

- **React.js** - Frontend framework  
- **Spotify Web API** - Fetching song data and saving playlists  
- **CSS** - Custom styling  

## 🛠 Future Improvements  

- 🎶 Allow users to preview song clips  
- 📌 Drag-and-drop reordering of tracks  
- 🌙 Dark mode support  

## 📜 License  

This project is **open-source** and available under the [MIT License](LICENSE).  
