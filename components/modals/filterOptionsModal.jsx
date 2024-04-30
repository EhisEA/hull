import { Cancel } from "@/svgs";
import Options from "../search/Options";
import { Input } from "../ui/input";
import DatePicker from "../search/DatePicker";
import { dateModified, filterStatus } from "../search/filters";
import { useEffect, useState } from "react";
import useForm from "@/hooks/useForm";
import {
  EnLocalDateFormat,
  getDateModified,
  removeEmptyFields,
} from "@/utils/helpers";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAfterDate,
  selectBeforeDate,
  selectPage,
  setAfterDate,
  setApplications,
  setBeforeDate,
  setLastPage,
  setPage,
} from "@/store/features/applicatonsSlice";
import { baseUrl } from "@/lib/configs";
import { getToken } from "@/utils/authHelpers";

const InitialData = {
  application_name: "",
  applicant_name: "",
  reference_id: "",
  date_modified: "",
};

const FilterOptionsModal = ({ setOpenFilter }) => {
  // const [beforeDate, setBeforeDate] = useState();
  // const [afterDate, setAfterDate] = useState();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const page = useSelector(selectPage);
  const beforeDate = useSelector(selectBeforeDate);
  const afterDate = useSelector(selectAfterDate);
  const token = getToken();

  console.log({ beforeDate, afterDate });

  // persist search options
  const initializer = () =>
    JSON.parse(localStorage.getItem("options")) || InitialData;
  const { formData, setFormData, handleChange } = useForm(initializer);
  const isCustomDate = formData.date_modified === "Custom";
  console.log(isCustomDate);

  // fetch persisted data from local storage
  useEffect(() => {
    const storedSearchOptions = localStorage.getItem("options");
    if (storedSearchOptions) {
      setFormData(JSON.parse(storedSearchOptions));
    }
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("options", JSON.stringify(formData));
  }, [formData]);

  const resetFilter = () => {
    setFormData(InitialData);
    setBeforeDate();
    setAfterDate();
  };

  const searchApplication = async () => {
    let payload;

    if (isCustomDate) {
      payload = {
        page: page === 0 ? 1 : page,
        limit: 20,
        application_name: formData.application_name,
        applicant_name: formData.applicant_name,
        start_date: EnLocalDateFormat(beforeDate),
        end_date: EnLocalDateFormat(afterDate),
        reference_id: formData.reference_id,
      };
    } else {
      const filterDate = getDateModified(formData.date_modified);
      console.log(filterDate);
      payload = {
        page: page === 0 ? 1 : page,
        limit: 20,
        application_name: formData.application_name,
        applicant_name: formData.applicant_name,
        start_date: filterDate.start_date,
        end_date: filterDate.end_date,
        reference_id: formData.reference_id,
      };
    }
    try {
      setIsLoading(true);
      console.log(payload);
      const response = await fetch(
        `${baseUrl}/application?${new URLSearchParams(payload)}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      // if (response.ok) {
      setIsSuccess(true);
      console.log(data);
      // }
      dispatch(setApplications(data?.data.applications?.data));
      dispatch(setLastPage(data?.data?.applications?.meta?.lastPage));

      dispatch(setFirstPage(data?.data?.applications?.meta?.firstPage));
      dispatch(setPage(data?.data?.applications?.meta?.currentPage));
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
      resetFilter();
      // setOpenFilter(false);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setOpenFilter(false);
      resetFilter();
    }
  }, [isSuccess]);

  console.log(formData);

  return (
    <div className="flex justify-center items-center fixed top bottom-0 left-0 right-0  inset-0 bg-[rgb(0,0,0,0.8)] overflow-y-auto bg-opacity-50 z-[9999] h-full">
      <div
        // onSubmit={submitForm}
        className="bg-white px-6 py-6 rounded shadow-md md:w-[500px] z-[9999] lg:space-y-6 space-y-6 w-[95%] lg:w-[40rem]"
      >
        <div className="flex justify-between items-center gap-4">
          <h1 className="lg:text-xl text-lg font-semibold">Filter</h1>
          <span onClick={() => setOpenFilter(false)} className="cursor-pointer">
            {Cancel}
          </span>
        </div>
        {/* <div className="flex justify-between gap-4 items-center">
          <p className="">Status</p>
          <Options
            options={filterStatus}
            selected={status}
            setSelected={setStatus}
          />
        </div> */}
        <div className="flex lg:flex-row flex-col lg:justify-between gap-4 lg:items-center w-full">
          <p className="text-sm font-semibold">Reference ID</p>
          <div className="lg:w-96">
            <Input
              type="text"
              id="search"
              placeholder="Enter words found in the ref id"
              name="reference_id"
              onChange={handleChange}
              value={formData.reference_id}
            />
          </div>
        </div>
        <div className="flex lg:flex-row flex-col lg:justify-between gap-4 lg:items-center">
          <p className="text-sm font-semibold">Application Name</p>
          <div className="lg:w-96">
            <Input
              type="text"
              id="search"
              placeholder="Enter words found in the name"
              name="application_name"
              onChange={handleChange}
              value={formData.application_name}
            />
          </div>
        </div>
        <div className="flex lg:flex-row flex-col lg:justify-between gap-4 lg:items-center">
          <p className="text-sm font-semibold">Applicant's Name</p>
          <div className="lg:w-96">
            <Input
              type="text"
              id="search"
              placeholder="Enter words found in the name"
              name="applicant_name"
              onChange={handleChange}
              value={formData.applicant_name}
            />
          </div>
        </div>
        <div className="flex lg:flex-row flex-col lg:justify-between gap-4 lg:items-center">
          <p className="text-sm font-semibold">Date Modified</p>
          <select
            name="date_modified"
            value={formData.date_modified}
            onChange={handleChange}
            id=""
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg lg:w-[65%] p-2.5"
          >
            <option selected className="">
              Select Date
            </option>
            {dateModified?.map((option) => (
              <option key={option.id} value={option.value}>
                {option.value.split("_").join(" ")}
              </option>
            ))}
          </select>
        </div>
        {isCustomDate && (
          <div className="flex flex-col gap-2 w-full">
            <p className="text-gray-500 lg:self-center lg:-ml-14 text-sm font-semibold">
              Between
            </p>
            <div className="flex lg:justify-end w-full gap-4 items-center">
              <DatePicker
                text="Before Date"
                date={beforeDate}
                setDate={(value)=> dispatch(setBeforeDate(value))}
              />
              <DatePicker
                text="After Date"
                date={afterDate}
                setDate={(value)=> dispatch(setAfterDate(value))}
              />
            </div>
          </div>
        )}
        <div className="flex lg:justify-end w-full gap-x-4">
          <button
            type="button"
            onClick={resetFilter}
            className="bg-white  px-10 py-4 text-sm rounded-md text-blue-700 font-semibold"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={searchApplication}
            className="flex items-center gap-2 justify-center bg-blue-700 w-36 py-4 px-4 text-sm rounded-md text-white hover:bg-blue-600"
          >
            {isLoading && <ClipLoader size={20} color="#fff" />}
            <span className="">{isLoading ? "Applying..." : "Apply"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterOptionsModal;
