import Property from "./Property";
import Wrapper from "../assets/wrappers/JobsContainer";
import PageBtnContainer from "./PageBtnContainer";
import { useAllPropertiesContext } from "../pages/AllProperty";

const PropertiesContainer = () => {
  const { data } = useAllPropertiesContext();
  const { properties, totalProperties, numOfPages } = data;
  if (properties.length === 0) {
    return (
      <Wrapper>
        <h2>No property to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalProperties} properties {properties.length > 1 && "s"} found
      </h5>
      <div className="properties">
        {properties.map((property) => {
          return <Property key={property._id} {...property} />;
        })}
      </div>

      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default PropertiesContainer;
