import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({

    date: {
        $date: {
          $numberLong: {
            type: String
          }
        }
      },
      property:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property'
      },
      reviewer:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      reviewer_name: {
        type: String
      },
      comments: {
        type: String
      },
      review_scores_accuracy: {
        type: Number
      },
      review_scores_cleanliness: {
        type: Number
      },
      review_scores_checkin: {
        type: Number
      },
      review_scores_communication: {
        type: Number
      },
      review_scores_location: {
        type: Number
      },
      review_scores_value: {
        type: Number
      },
      review_scores_rating: {
        type: Number
      }
});

export default mongoose.model('Review', reviewSchema);
