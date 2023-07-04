import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  property: {

    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
  },
  start_date: {
    type: Date,
  },
  end_date: {
    type: Date,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },


  traveler: {
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    occupancy: {
      adults: {
        type: Number,
      },
      children: {
        type: Number,
      },
    },
  },
  room_rate: {
    amount: {
      type: Number,
    },
    additional_charges: {
      type: Number,
    },
    deposit: {
      type: Number,
    },
    currency: {
      type: String,
    },
    VAT: {
      type: Number,
    },
  },
  status: {
    type: String,
  },
  payment: {
    type: String,
    payment_card_parameters: {
      card_type: {
        type: String,
      },
      customer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      guest_name: {
        first_name: {
          type: String
        },
        last_name: {
          type: String
        },
        occupancy: {
          adults: {
            type: Number
          },
          children: {
            type: Number
          }
        }
      },
      room_rate: {
        amount: {
          type: Number
        },
        additional_charges: {
          type: Number
        },
        deposit: {
          type: Number
        },
        currency: {
          type: String
        },
      },
      status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'accepted', 'rejected'],
        default: 'pending',
      },
      billing_address: {
        street: {
          type: String
        },
        city: {
          type: String
        },
        province: {
          type: String
        },
        postal_code: {
          type: Date
        },
        country: {
          type: String
        }
      }
    }
  }
}
);

export default mongoose.model("Booking", bookingSchema);
