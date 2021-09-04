import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserRegisterService {

  collectionName: string = "ingresos";

  constructor(private af: AngularFirestore) { }

  userRegistrer(data:any){
    this.af.collection(this.collectionName).add(data);
  }

  
}
