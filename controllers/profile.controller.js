import Address from"../models/address.model.js";
import Image from"../models/images.model.js";
import User from"../models/user.model.js";

function getProfile(req, res) {
  let profile = {};
  User.get(req.params.userid).then((user) => {
    return res.json(user);
  });
}

function updateProfile(req, res, next) {
  let savedUser = User.get(req.params.userid);

  Address.update(req.body.address, req.body.address._id)
    .then((address) => {
      savedUser.address = address;

      savedUser = {
        ...savedUser,
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
      return res.json(savedUser);
    })
    .catch((e) => next(e));
}

function uploadProfileImage(req, res, next) {
  if (req.files) {
    let profilePic = req.files.profileImage.data;

    const base64Data = profilePic.toString("base64");
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
      .then((user) => res.json(user))
      .catch((e) => next(e));
  }
}

export default  { getProfile, updateProfile, uploadProfileImage };