import {
  FaTag,
  FaHome,
  FaKey,
  FaTools,
  FaSignInAlt,
  FaWrench,
} from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";
import StatItem from "./StatItem";
const StatsContainer = ({ defaultStats }) => {
  const stats = [
    {
      title: "occupied properties",
      count: defaultStats?.occupied || 0,
      icon: <FaHome />, // or <FaBuilding />
      color: "#10b981", // green
      bcg: "#d1fae5",
    },
    {
      title: "vacant properties",
      count: defaultStats?.vacant || 0,
      icon: <FaKey />, // or <FaHouseUser />
      color: "#f59e0b", // amber
      bcg: "#fef3c7",
    },
    {
      title: "maintenance required",
      count: defaultStats?.maintenance || 0,
      icon: <FaTools />, // or <FaWrench />
      color: "#e11d48", // red
      bcg: "#ffe4e6",
    },
    {
      title: "for rent",
      count: defaultStats?.forRent || 0,
      icon: <FaSignInAlt />, // or <FaTag />
      color: "#3b82f6", // blue
      bcg: "#dbeafe",
    },
    {
      title: "unavailable",
      count: defaultStats?.unavailable || 0,
      icon: <FaTag />, // or <FaTag />
      color: "#6b7280", // red
      bcg: "#e5e7eb",
    },
    {
      title: "for sale",
      count: defaultStats?.forSale || 0,
      icon: <FaWrench />,
      color: "#c026d3", // red
      bcg: "#f5d0fe",
    },
  ];
  return (
    <Wrapper>
      {stats.map((item) => {
        return <StatItem key={item.title} {...item} />;
      })}
    </Wrapper>
  );
};
export default StatsContainer;
