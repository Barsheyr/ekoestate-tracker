import { FormRow, FormRowSelect } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData } from "react-router-dom";
import {
  PROPERTY_TYPE,
  PROPERTY_STATUS,
} from "../../../server/utils/constant.js";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/properties/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error.response.data.msg);
    return redirect("/dashboard/all-property");
  }
};

// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.patch(`/properties/${params.id}`, data);
    toast.success("Property edited successfully");
    return redirect("/dashboard/all-property");
  } catch (error) {
    toast.error(error.response.data.msg);
    return error;
  }
};
const EditProperty = () => {
  const { property } = useLoaderData();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit property</h4>
        <div className="form-center">
          <FormRow type="text" name="address" defaultValue={property.address} />
          <FormRow
            type="text"
            name="tenantName"
            defaultValue={property.tenantName}
          />
          <FormRow
            type="text"
            labelText="city"
            name="city"
            defaultValue={property.city}
          />

          <FormRowSelect
            name="propertyStatus"
            labelText="property status"
            defaultValue={property.propertyStatus}
            list={Object.values(PROPERTY_STATUS)}
          />
          <FormRowSelect
            name="propertyType"
            labelText="property type"
            defaultValue={property.propertyType}
            list={Object.values(PROPERTY_TYPE)}
          />
          <FormRow
            type="number"
            name="rentAmount"
            defaultValue={property.rentAmount}
          />
          <FormRow
            type="number"
            name="bathrooms"
            defaultValue={property.bathrooms}
          />
          <FormRow
            type="number"
            name="bedrooms"
            defaultValue={property.bathrooms}
          />

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

export default EditProperty;
