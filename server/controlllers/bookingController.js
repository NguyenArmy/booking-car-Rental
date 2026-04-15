import Booking from "../models/Booking";
import Car from "../models/Car";


const checkAvailability = async (car, pickupDate, returnDate) => {
    const bookings = await Booking.find({
        car,
        pickupDate: { $lt: returnDate },
        returnDate: { $gt: pickupDate },
        status: 'confirmed'
    });
    return bookings.length === 0;
}

//api to check availability of cars for the given data and location
const checkAvailabilityOfCar = async (req, res) => {
    try{
        const {location, pickupDate, returnDate} = req.body;
        const cars = await Car.find({location, isAvailable:true});

        const availableCarsPromises = cars.map(async (car)=>{
           const isAvailable = await checkAvailability(car._id, pickupDate, returnDate);
           return {...car._doc, isAvailable: isAvailable};
        });


        let availableCars = await Promise.all(availableCarsPromises);
        availableCars = availableCars.filter(car => car.isAvailable === true);   
        return res.status(200).json(availableCars);
    }catch(error){
        console.error("Error checking car availability:", error);
        res.status(500).json({ message: "Server error" });
    }
}
//api to create Bôking
const createBooking = async (req, res) => {
try{
    const {_id} = req.user;
    const{car, pickupDate, returnDate} = req.body;

    const isAvailable = await checkAvailability(car, pickupDate, returnDate);
    if(!isAvailable){
        return res.status(400).json({message: "Car is not available for the selected dates"});
    }
    const carData = await Car.findById(car);


    const picked = new Date(pickupDate);
    const returned = new Date(returnDate);
    const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24))
    const price = carData.pricePerDay * noOfDays;
    await Booking.create({car, owner: carData.owner, user:_id, pickupDate, returnDate, price})

    res.status(201).json({message: "Booking created successfully"});
    if(!carData){
        return res.status(404).json({message: "Car not found"});
    }

}catch(error){
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Server error" });


}
}
const getUserBookings = async (req, res) => {
    try{
        const{_id}   = req.user;
        const bookings = await Booking.find({user:_id}).populate('car').sort({createdAt: -1});
        res.status(200).json(bookings);

    }catch(error){
        console.error("Error fetching user bookings:", error);
        res.status(500).json({ message: "Server error" });
    }
}
const getOwnerBookings = async (req, res) => {
    try{
        if(req.user.role !== 'owner'){
            return res.status(403).json({message: "You are not authorized to view this data"});
        }
        const {_id} = req.user;
        const bookings = await Booking.find({owner:_id}).populate('car user').select("-user.password").sort({createdAt: -1});
        res.status(200).json(bookings);

    }catch(error){
        console.error("Error fetching owner bookings:", error);
        res.status(500).json({ message: "Server error" });
    }
}
const changeBookingStatus = async (req, res) => {
    try{
        const {_id} = req.user;
        const {bookingId, status} = req.body;
        const booking = await Booking.findById(bookingId)
        if(booking.owner.toString() !== _id.toString()){
            return res.status(403).json({message: "You are not authorized to change the status of this booking"});
        }
        if(!booking){
            return res.status(404).json({message: "Booking not found"});
        }

       booking.status = status;
       await booking.save();
       res.status(200).json({message: "Booking status updated successfully"});

    }catch(error){
        console.error("Error fetching owner bookings:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export { checkAvailabilityOfCar, getUserBookings, getOwnerBookings, createBooking,changeBookingStatus  };