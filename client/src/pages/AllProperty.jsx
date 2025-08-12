import { toast } from "react-toastify";
import { PropertiesContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async ({ request }) => {
  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    const { data } = await customFetch.get("/properties", { params });
    return {
      data,
      searchValues: { ...params },
    };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllPropertyContext = createContext();

const AllProperty = () => {
  const { data, searchValues } = useLoaderData();

  return (
    <AllPropertyContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <PropertiesContainer />
    </AllPropertyContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAllPropertiesContext = () => useContext(AllPropertyContext);

export default AllProperty;
