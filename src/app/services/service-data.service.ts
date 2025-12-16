import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Service } from '../models/service.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceDataService {
  // Mock services data
  private mockServices: Service[] = [
    {
      id: '1',
      name: 'Basic Tune-Up',
      description: 'Complete bike tune-up including brake adjustment, gear tuning, and chain lubrication',
      price: 50,
      duration: 60,
      imageUrl: 'assets/images/tune-up.jpg'
    },
    {
      id: '2',
      name: 'Flat Tire Repair',
      description: 'Quick flat tire repair with tube replacement or patching',
      price: 20,
      duration: 30,
      imageUrl: 'assets/images/flat-tire.jpg'
    },
    {
      id: '3',
      name: 'Brake Service',
      description: 'Complete brake inspection, adjustment, and pad replacement if needed',
      price: 40,
      duration: 45,
      imageUrl: 'assets/images/brake-service.jpg'
    },
    {
      id: '4',
      name: 'Chain & Drivetrain Service',
      description: 'Chain cleaning, lubrication, and drivetrain inspection',
      price: 35,
      duration: 40,
      imageUrl: 'assets/images/chain-service.jpg'
    },
    {
      id: '5',
      name: 'Wheel Truing',
      description: 'Professional wheel truing and spoke tension adjustment',
      price: 30,
      duration: 45,
      imageUrl: 'assets/images/wheel-truing.jpg'
    },
    {
      id: '6',
      name: 'Full Overhaul',
      description: 'Complete bike overhaul including all components disassembly, cleaning, and reassembly',
      price: 200,
      duration: 240,
      imageUrl: 'assets/images/overhaul.jpg'
    }
  ];

  constructor() { }

  getServices(): Observable<Service[]> {
    return of(this.mockServices).pipe(delay(300)); // Simulate network delay
  }

  getServiceById(id: string): Observable<Service | undefined> {
    const service = this.mockServices.find(s => s.id === id);
    return of(service).pipe(delay(300));
  }
}
