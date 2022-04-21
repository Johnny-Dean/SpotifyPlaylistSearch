export interface Song {
    name: string,
    artistName: string,
    album: {
      albumArt: string,
      albumName: string
    },
    playlists: string[];
}

