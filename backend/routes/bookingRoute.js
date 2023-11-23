import express from "express";
const bookingRoute = express.Router();
import { Booking } from '../models/booking.js';
import { BookingMembers } from '../models/bookingMembers.js';

bookingRoute.post('/book', async (request, response) => {
  // response.send('CONFIDENTIAL');
  try {

    if (!request.body.packageId ||
      !request.body.noOfPeoples ||
      !request.body.travellers ||
      !request.body.totalAmount ||
      !request.body.bookedBy) {
      return response.status(400).send({
        message: 'Send all required fields: packageId,noOfPeoples,travellers[firstName,lastName,Age,Gender,Address,phone],totalAmount,bookedBy',
      });
    }
    if (request.body.travellers.length != request.body.noOfPeoples) {
      return response.status(200).send({
        message: 'The numberOfPeoples is not matching with the travellers details, sned exact number of traveller details', 'status': 2001,
      });
    }


    const newBooking = {
      packageId: request.body.packageId,
      noOfPeoples: request.body.noOfPeoples,
      totalAmount: request.body.totalAmount,
      bookedBy: request.body.bookedBy,

    };
    var members = [];
    const booking = await Booking.create(newBooking);
    request.body.travellers.forEach(async (traveller) => {
      // console.log('FIRSTNAME---',booking.id);
      const newBookingMember = {
        bookingId: booking.id,
        firstName: traveller.firstName,
        lastName: traveller.lastName,
        age: traveller.age,
        gender: traveller.gender,
        address: traveller.address,
        phone: traveller.phone,

      };
      const bookingMembers = await BookingMembers.create(newBookingMember);
      members.push(bookingMembers);
    });
    return response.status(201).send(booking);

  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
})
bookingRoute.get('/:bookedBy', async (request, response) => {

  try {
    const { bookedBy } = request.params;
    const booking = await Booking.find({ 'bookedBy': bookedBy });
    //console.log(booking);
    var members=[];
    let resp=new Array();
    if (booking) {
      booking.forEach(async (bookingItem) => {
        const bookingMembers = await BookingMembers.find({ 'bookingId': bookingItem.id });
        //console.log(bookingMembers);
        members.push(bookingMembers);


      });
       
console.log(members);

      return response.status(200).send(booking);
    } else {
      return response.status(200).send({ 'message': 'Booking details not found', 'status': 2002 });

    }

  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
})


export default bookingRoute;