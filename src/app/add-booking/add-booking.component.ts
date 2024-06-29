import { Component, OnInit } from '@angular/core';
import { BookingRequest,IBooking } from '../models/booking.model'; 
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { BookingService } from '../Services/booking.service'; 
import { ActivatedRoute } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-add-booking',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './add-booking.component.html',
  styleUrl: './add-booking.component.css'
})
export class AddBookingComponent implements OnInit {
booking:IBooking[]=[]
form!: FormGroup
tourId:string=''
hotelId:string=''
userId:string=''
constructor(private data:BookingService, private route:ActivatedRoute){}
onSubmit(){
  if(this.form.valid){
    const newBooking: BookingRequest = {
      tourId: this.tourId,
      hotelId: this.hotelId,
      userId: this.userId,
      bstartdate: this.form.get('sdate')?.value.toString(),
      benddate: this.form.get('edate')?.value.toString(),
      bookingdate: this.form.get('bdate')?.value.toString(),
    };
    this.data.addBooking(newBooking).subscribe(()=>{
      console.log("Booking added successfully")
    })
  }
}
ngOnInit(): void {
  this.tourId=this.route.snapshot.paramMap.get('tourId')!;
this.hotelId=this.route.snapshot.paramMap.get('hotelId')!;
const token = localStorage.getItem('token')
if(token){
  const decode:any= jwtDecode(token)
this.userId= decode.SUB
console.log(this.userId)
}
  this.form = new FormGroup({
    sdate: new FormControl(null, Validators.required),
    edate: new FormControl(null, Validators.required),
    bdate: new FormControl(null, Validators.required)
  })
}
}
