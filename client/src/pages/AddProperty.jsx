import { FormRow, FormRowSelect } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext } from "react-router-dom";
import {
  PROPERTY_TYPE,
  PROPERTY_STATUS,
} from "../../../server/utils/constant.js";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // Convert empty date strings to null
  if (data.leaseStartDate === "") data.leaseStartDate = null;
  if (data.leaseEndDate === "") data.leaseEndDate = null;

  try {
    await customFetch.post("/properties", data);
    toast.success("Property added successfully");
    return redirect("all-property");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AddProperty = () => {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add property</h4>
        <div className="form-center">
          <FormRow type="text" name="address" />
          <FormRow type="text" name="tenantName" />
          <FormRow
            type="text"
            labelText="property location"
            name="city"
            defaultValue={user.location}
          />

          <FormRowSelect
            labelText="property status"
            name="propertyStatus"
            defaultValue={PROPERTY_STATUS.VACANT}
            list={Object.values(PROPERTY_STATUS)}
          />
          <FormRowSelect
            name="propertyType"
            labelText="property type"
            defaultValue={PROPERTY_TYPE.MINI_FLAT}
            list={Object.values(PROPERTY_TYPE)}
          />
          <FormRow type="number" name="rentAmount" />
          <FormRow type="number" name="bathrooms" />
          <FormRow type="number" name="bedrooms" />

          {/* Add Lease Date Fields */}
          <FormRow
            type="date"
            name="leaseStartDate"
            labelText="lease start date"
          />
          <FormRow type="date" name="leaseEndDate" labelText="lease end date" />

          <button
            type="submit"
            className="btn btn-block form-btn "
            disabled={isSubmitting}
          >
            {isSubmitting ? "submitting..." : "submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddProperty;
