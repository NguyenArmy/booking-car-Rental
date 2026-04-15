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

//api to get cars of owner
const getOwnerCars = async (req, res) =>{
    try {
        const {_id} = req.user;
        const cars = await Car.find({owner:_id});
        res.status(200).json(cars);
    } catch (error) {
        console.error("Error fetching owner's cars:", error);
        res.status(500).json({ message: "Server error" });
        
    }

}
//api to Toggle car availabilty
const toggleCarAvailability = async (req, res) => {
    try {
        const {_id} = req.user;
         const {carId} = req.body
         const car = await Car.findById(carId)

         //checking is car belongs to owner 

         if(car.owner.toString() !== _id.toString()){
            return res.status(403).json({message:"You are not authorized to change availability of this car"})
         }
         car.isAvailable = !car.isAvailable;
         await car.save();
         res.json(car)
}catch (error) {
    console.error("Error toggling car availability:", error);
    res.status(500).json({ message: "Server error" });
}
}

//api delete car
const deleteCar = async (req, res) => {
    try {
        const {_id} = req.user;
        const {carId} = req.body;
        const car = await Car.findById(carId);

        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }

        //checking if car belongs to owner
        if (car.owner.toString() !== _id.toString()) {
            return res.status(403).json({ message: "You are not authorized to delete this car" });
        }

       car.owner = null;
       car.isAvailable =false;
         await car.save();
        res.json({ message: "Car Remove" });
    } catch (error) {
        console.error("Error deleting car:", error);
        res.status(500).json({ message: "Server error" });
    }
};
//api to get dashboard data
const getDashboardData = async (req, res) =>{
    try{
        const {_id, role} = req.user;
        if(role !== "owner"){
            return res.status(403).json({message:"Access denied"});
        }
        const cars = await Car.find({owner:_id});
  

        
    }catch(error){
        console.error("Error fetching dashboard data:", error);
        res.status(500).json({ message: "Server error" });
    }
}


   

      

export { changeRoleToOwner, addCar, getOwnerCars, toggleCarAvailability, deleteCar, getDashboardData};