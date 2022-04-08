// better way to organize it would just have songs have a song[] and the song have playlist attribute
export interface playlist {
  name: string,
  image: string,
  songs: song[]
}

export interface song {
    name: string,
    artistName: string,
    album: {
      albumArt: string,
      albumName: string
    }
}

