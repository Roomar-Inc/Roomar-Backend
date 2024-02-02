const sharp = require('sharp')
const Owner = require('../models/ownerModel');
const Post = require('../models/postModel')
const cloudinary = require('cloudinary').v2
const cloud = require('../config/cloudinaryConfig')//import cloud config 
//const upload = require('../config/multerConfig')


exports.createPosting = async (req, res, next ) => {
//Name of the Lodge
//Name of the Room 
//Pictures of the room
//Community i.e Eziobodo, Umuchima or Ihiagwa
//Address in particular
//Caretaker's phone number 

cloud(); //call the cloudinary config 
const {name, address, description, price, type, status} = req.body
//const {lodge_name, state, lga, community, address, room_number } = req.body;
const image = req.files
if(!req.files|| req.files.length === 0){
    return res.status(400).json({ error: "No images uploaded"});
};


console.log(req.body);

try{
  
    const uploads = req.files.map(async (file) => {
          const compressedBuffer = await sharp(file.buffer).webp().resize(450, 450, 'contain').webp({ compressionLevel: 9 }).toBuffer();
        const base64EncodedImage = compressedBuffer.toString('base64');
        const dataUri = `data:image/webp;base64,${base64EncodedImage}`;
        const response = await cloudinary.uploader.upload(dataUri);
        return response.url ; // Modify the response object if needed
  });

  const {results} = await Promise.all(uploads);
  console.log(results);
  Post.create({...req.body, ...results});
  return res.status(200).json(results);
}
catch(err){
    console.log(err)
  return res.status(400).json({"Error":err})
}

}