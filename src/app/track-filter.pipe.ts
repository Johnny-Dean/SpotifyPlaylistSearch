import { Pipe, PipeTransform } from '@angular/core';
import {Song} from "./songs/song";

@Pipe({
  name: 'trackFilter',
  pure: false
})
export class TrackFilterPipe implements PipeTransform {

  trackMatchesFilter(track: Song, filter: string): boolean{
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

  transform(tracks: Song[], filter?: string): Song[] {
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
