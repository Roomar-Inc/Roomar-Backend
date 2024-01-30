const Owner = require('../models/ownerModel');

exports.createPosting = async (req, res, next ) => {
//Name of the Lodge
//Name of the Room 
//Pictures of the room
//Community i.e Eziobodo, Umuchima or Ihiagwa
//Address in particular
//Caretaker's phone number 
 
const {lodge_name, state, lga, community, address, room_number } = req.body;
console.log(`${lodge_name} lodge, room ${room_number} is available for rent `);
return res.status(200).json("It works");
}