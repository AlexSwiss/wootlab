const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Car schema
const CarSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
  },
    car_model: {
      type: String,
      required: [true, "Please input the car model"],
    },
    car_year: {
        type: String,
        required: [true, "Please input the car year"],
    },
    license_plate: {
        type: String,
        required: [true, "Please input license"],
    },
    current_km: {
        type: String,
    },
    max_load_km: {
        type: String,
    },
    fuel_type: {
      type: String,
      required: [true, "Please input time from birth to maturity"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cars", CarSchema);
