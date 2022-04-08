import { Pipe, PipeTransform } from '@angular/core';
import {song} from "./songs/Playlist";

@Pipe({
  name: 'trackFilter',
  pure: false
})
export class TrackFilterPipe implements PipeTransform {

  trackMatchesFilter(track: song, filter: string): boolean{
    if (track.name.toLowerCase().includes(filter.toLowerCase())){
      return true;
    }
    if (track.album.albumName.toLowerCase().includes(filter.toLowerCase())){
      return true;
    }
    if (track.artistName.toLowerCase().includes(filter.toLowerCase())){
      return true;
    }
    return false;
  }

  transform(tracks: song[], filter?: string): song[] {
    if(!filter){
      return tracks;
    }

    return tracks.filter(track => {
      if(this.trackMatchesFilter(track, filter)){
        return track;
      }
      return;
    })
  }

}
