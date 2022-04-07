import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticateUser(hash: string): void {
    localStorage.clear();
    localStorage.setItem("access_token", hash)
  }

  constructor() { }
}
