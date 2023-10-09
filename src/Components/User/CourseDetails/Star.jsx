import { useState } from "react";

const StarRating = ({rating,setRating,size,disable}) => {
    const [hover, setHover] = useState(0);
    return (
      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                outline: 'none',
                cursor: 'pointer',
                color: index <= (!disable&&hover || rating) ? '#000' : '#ccc',}
              }
              className={`${index <= (hover || rating) ? "on" : "off"}`}
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
              disable={disable}
            >
                <span className={`star ${size}`}>&#9733;</span>
            </button>
          );
        })}
      </div>
    );
  };

export default StarRating