import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  // Mock users database
  private mockUsers: User[] = [
    {
      id: '1',
      email: 'customer@example.com',
      name: 'John Doe',
      phone: '123-456-7890',
      role: 'customer'
    },
    {
      id: '2',
      email: 'admin@example.com',
      name: 'Admin User',
      phone: '098-765-4321',
      role: 'admin'
    }
  ];

  constructor() {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, _password: string): Observable<User> {
    // Mock login - in real app, this would call an API
    const user = this.mockUsers.find(u => u.email === email);
    
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return of(user).pipe(delay(500)); // Simulate network delay
    }
    
    throw new Error('Invalid credentials');
  }

  register(name: string, email: string, phone: string, _password: string): Observable<User> {
    // Mock registration
    const newUser: User = {
      id: (this.mockUsers.length + 1).toString(),
      email,
      name,
      phone,
      role: 'customer'
    };
    
    this.mockUsers.push(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    this.currentUserSubject.next(newUser);
    
    return of(newUser).pipe(delay(500));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.currentUserValue !== null;
  }

  isAdmin(): boolean {
    return this.currentUserValue?.role === 'admin';
  }
}
