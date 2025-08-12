import Wrapper from "../assets/wrappers/JobInfo";

const PropertyInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className="jo-icon">{icon}</span>
      <span className="job-text">{text}</span>
    </Wrapper>
  );
};
export default PropertyInfo;
