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

