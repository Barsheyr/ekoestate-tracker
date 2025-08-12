import {
  FaLocationArrow,
  FaCalendarAlt,
  FaBed,
  FaBath,
  // FaNairaSign,
} from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { Link, Form } from "react-router-dom";
import Wrapper from "../assets/wrappers/Job";
import PropertyInfo from "./PropertyInfo";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const Property = ({
  _id,
  address,
  tenantName,
  city,
  propertyStatus,
  propertyType,
  rentAmount,
  bedrooms,
  bathrooms,
  leaseStartDate,
  leaseEndDate,
  createdAt,
}) => {
  const date = day(createdAt).format("MMM Do, YYYY");
  const leaseStart = leaseStartDate
    ? day(leaseStartDate).format("MMM Do, YYYY")
    : null;
  const leaseEnd = leaseEndDate
    ? day(leaseEndDate).format("MMM Do, YYYY")
    : null;

  // Get first letter of address for avatar
  const addressInitial = address.charAt(0).toUpperCase();

  // Format rent amount with Nigerian Naira
  const formattedRent = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(rentAmount);

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{addressInitial}</div>
        <div className="info">
          <h5>{address}</h5>
          <p className={`status ${propertyStatus}`}>{propertyType}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <PropertyInfo icon={<IoPerson />} text={tenantName} />
          <PropertyInfo icon={<FaLocationArrow />} text={city} />
          <PropertyInfo icon={<FaCalendarAlt />} text={date} />

          <PropertyInfo
            icon={<FaBed />}
            text={`${bedrooms} bed${bedrooms !== 1 ? "s" : ""}`}
          />
          <PropertyInfo
            icon={<FaBath />}
            text={`${bathrooms} bath${bathrooms !== 1 ? "s" : ""}`}
          />
          <PropertyInfo text={formattedRent} />
          {leaseStart && (
            <PropertyInfo
              icon={<FaCalendarAlt />}
              text={`Start: ${leaseStart}`}
            />
          )}
          {leaseEnd && (
            <PropertyInfo icon={<FaCalendarAlt />} text={`End: ${leaseEnd}`} />
          )}
          <div className={`status ${propertyStatus}`}>{propertyStatus}</div>
        </div>
        <footer className="actions">
          <Link to={`../edit-property/${_id}`} className="btn edit-btn">
            Edit
          </Link>
          <Form method="post" action={`../delete-property/${_id}`}>
            <button type="submit" className="btn delete-btn">
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Property;
