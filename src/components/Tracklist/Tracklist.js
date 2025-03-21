import React from 'react';

function Tracklist({songs, addSong}) {
    return (
       <ul>
        {songs.map((song) => (
            <li key={song.id}> {song.name} By {song.artist} - {song.album} <button onClick={()=> addSong(song)}  >+</button></li>
            
        ))}
       </ul>
    )
}

export default Tracklist;

