const Owner = require('../models/ownerModel');
const cloudinary = require('../config/cloudinaryConfig')
const upload = require('../config/multerConfig')

exports.createPosting = async (req, res, next ) => {
//Name of the Lodge
//Name of the Room 
//Pictures of the room
//Community i.e Eziobodo, Umuchima or Ihiagwa
//Address in particular
//Caretaker's phone number 
 
//const {lodge_name, state, lga, community, address, room_number } = req.body;
const image = req.files
if(!req.files|| req.files.length === 0){
    return res.status(400).json({ error: "No images uploaded"});
};
console.log(cloudinary);
try{
    const uploads = req.files.map(async (file) => {
    const base64EncodedImage = Buffer.from(file.buffer).toString('base64');
    const dataUri = `data:${file.mimetype};base64,${base64EncodedImage}`;
  
    const response = await cloudinary.uploader.upload(dataUri);
    return { publicId: response.url }; // Modify the response object if needed
  });

  const results = await Promise.all(uploads);
  return res.status(200).json(results);
}
catch(err){
    console.log(err)
  return res.status(400).json({"Error":err})
}

// console.log(`${lodge_name} lodge, room ${room_number} is available for rent `);

}