import React from "react";
import Rating from "../../rating";

const RecentReviews = props => {
  let reviews = props.reviews.map((review, i) => {
    return (
      <li key={review.username + i} className="user-review">
        <h4 className="user-review__username">{review.username}</h4>
        <Rating className="user-review__star" rating={review.rating} />
        <p className="user-review__comment">
          {review.comment
            ? `"${review.comment}"`
            : `${review.username} didn't leave a comment for this recipe.`}
        </p>
      </li>
    );
  });
  return props.reviews.length ? (
    <div className="recent-reviews">
      <h3 className="recent-reviews__title">Recent Comments</h3>
      <ul className="recent-reviews__list">{reviews}</ul>
    </div>
  ) : null;
};

export default RecentReviews;
