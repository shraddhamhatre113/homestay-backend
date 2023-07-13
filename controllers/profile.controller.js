import Address from "../models/address.model.js";
import Image from "../models/images.model.js";
import User from "../models/user.model.js";
import Booking from "../models/booking.model.js"
import Property from "../models/property.model.js";

function getProfile(req, res) {
  User.get(req.params.userid).then((user) => {
    return res.json(user);
  });
}

async function updateProfile(req, res, next) {
  let savedUser = await User.get(req.params.userid);
  if (req.body.address) {
  console.log('saving address',req.body)
    Address.update(req.body.address, req.body.address._id)
    .then((address) => {
      savedUser.address = address;
      console.log('saving userdetails',savedUser)
      savedUser = {
        ...savedUser._doc,
        dob: req.body.dob,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        hobbies: req.body.hobbies,
        interest: req.body.interest,
        about: req.body.about,
      };
      return User.update(savedUser, savedUser._id);
    })
    .then((user) => {
      savedUser = {
        ...savedUser,
        ...user,
      };
      console.log('user updated')
      savedUser.password=undefined;
      return res.json({
        message:'profile update succesfully',
        user:savedUser
      });
    })
    .catch((e) => next(e));
  } else {
    console.log('saving only user')
    savedUser = {
      ...savedUser._doc,
      dob: req.body.dob,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      gender: req.body.gender,
      hobbies: req.body.hobbies,
      interest: req.body.interest,
      about: req.body.about,
    };

    const id =savedUser._id;
    delete savedUser._id;
    User.update(savedUser, id)
      .then((user) => {
        savedUser = {
          ...savedUser,
          ...user,
        };
        savedUser.password=undefined;
        console.log('user updated')
        return res.json({
          message:'profile update succesfully',
          user:savedUser
        });
      })
      .catch((e) => next(e));
  }
}

function uploadProfileImage(req, res, next) {
  if (req.files) {
    console.log(req.headers);
    let profilePic = req.files.profileImage.data;
    const base64Data = "data:image/jpeg;base64," + profilePic.toString("base64");
    let imageSaved = {};
    return new Image({
      picture_url: base64Data,
    })
      .save()
      .then((img) => {
        imageSaved = img;
        return User.get(req.params.userid);
      })
      .then((user) => {
        user.image = imageSaved;
        return user.save();
      })
      .then((user) => {user.password=undefined;
        return res.json(user)})
      .catch((e) => next(e));
  }
}


export default { getProfile, updateProfile, uploadProfileImage };

/* -------------------------------------------------------------------------- */
/*                        Get Host Bookings                                   */
/* -------------------------------------------------------------------------- */
export const getHostBookings = async(req, res, next) => {
  try {
    const { profileId } = req.params
    const user = await User.findById(profileId);
    if(!user.property_bookings || user.properties.length === 0){
      return res.status(404).json({ message: 'User is not a host'});
    }
    const { current_bookings = [], past_bookings = [], rejected_bookings = [] } = user.property_bookings;

    const bookingIds = [...current_bookings, ...past_bookings, ...rejected_bookings];

    const bookings = await Booking.find({ _id: { $in: bookingIds} }).populate('propertyB')
    
    res.status(200).json({ host_bookings: bookings })
  } catch (error) {
    next(error)
  }
}

/* -------------------------------------------------------------------------- */
/*                             Get a guest booking                            */
/* -------------------------------------------------------------------------- */
export const getGuestBookings = async(req, res, next) => {
  try {
    const { profileId } = req.params
    const user = await User.findById(profileId);


    const { past_booking = [], current_bookings = [], cancelled_bookings = [] } = user.guest_booking;
    const bookingIds = [...past_booking, ...current_bookings, ...cancelled_bookings]

    const bookings = await Booking.find({ _id: { $in: bookingIds} })

    res.json({guest_bookings: bookings})
  } catch (error) {
    next(error)
    
  }
}