import "./BikeList.css";
import { Link } from "react-router-dom";

const BikeList = ({ name, availablility, price, bikeId,image,type }) => {
  return (
    <div className="product">
      <img src={image} alt={name} />

      <div className="product__info">
        <p className="info__name">{name}</p>

        <p className="info__description">Available : {availablility?'Yes':'No'}</p>

        <p className="info__price">${price}</p>

        <Link to ={`/bike/${bikeId}`} className="info__button">
          View
        </Link>
      </div>
    </div>
  );
};

export default BikeList;
