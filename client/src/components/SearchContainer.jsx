import { FormRow, FormRowSelect, SubmitBtn } from ".";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useSubmit, Link } from "react-router-dom";
import {
  PROPERTY_TYPE,
  PROPERTY_STATUS,
  PROPERTY_SORT_BY,
} from "../../../server/utils/constant.js";
import { useAllPropertiesContext } from "../pages/AllProperty";

const SearchContainer = () => {
  const { searchValues } = useAllPropertiesContext();
  const { search, propertyStatus, propertyType, sort } = searchValues;
  const submit = useSubmit();

  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 2000);
    };
  };

  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          {/* search position */}

          <FormRow
            type="search"
            name="search"
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
          <FormRowSelect
            labelText="property status"
            name="propertyStatus"
            list={["all", ...Object.values(PROPERTY_STATUS)]}
            defaultValue={propertyStatus}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            labelText="property type"
            name="propertyType"
            list={["all", ...Object.values(PROPERTY_TYPE)]}
            defaultValue={propertyType}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            name="sort"
            defaultValue={sort}
            list={[...Object.values(PROPERTY_SORT_BY)]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />

          <Link
            to="/dashboard/all-property"
            className="btn form-btn delete-btn"
          >
            Reset Search Values
          </Link>
          {/* TEMP!!!! */}
          {/* <SubmitBtn formBtn /> */}
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
