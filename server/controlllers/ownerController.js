import User from "../models/User.js";
import fs from "fs";
import imagekit from "../configs/imageKit.js"
import  Car from "../models/Car.js";


//api to change role  of user
const changeRoleToOwner = async (req, res) => {
try{
    const {_id} =req.user;
    await User.findByIdAndUpdate(_id, { role: "owner" });
    res.status(200).json({ message: "Role changed to owner successfully" });



}catch(error){
    console.error("Error changing role to owner:", error);
    res.status(500).json({ message: "Now you can list cars" });  


}

}

//api to list car
const addCar = async (req, res) => {
    try {
        const {_id} = req.user;
        let car = JSON.parse(req.body.carData);
        const imageFile = req.file;

        //upload image to imagekit

        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/car'
        })
        console.log("Image uploaded to ImageKit:", response);


        //optimization through imagekit URL transformation
        var optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                {
                    width: '1280'},
                    {quality: 'auto'}, //auto compression
                    {format: 'webp'}  //convert to modern format

                    
            ]
        });

        const image = optimizedImageUrl;
        await Car.create({...car, owner:_id, image})
        
        res.status(201).json({ message: "Car added successfully" });



    }catch(error){
        console.error("Error adding car:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export { changeRoleToOwner, addCar };