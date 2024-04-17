"use client";
import Btn from "@/components/Btn";
import FPI from "@/components/FPI";
import FormLayout from "@/components/FormLayout";
import TextInput from "@/components/TextInput";
import useForm from "@/hooks/useForm";
import { useSearchParams } from "next/navigation";
import { validator } from "@/utils/validator";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useRegisterUserMutation } from "@/store/api/authApi";
import { setLoginTime, setToken } from "@/utils/authHelpers";
import { registrationFormFields } from ".";
import { normalizeErrors } from "@/utils/helpers";

const InitialData = {
  first_name: "",
  company_name: "",
  company_location: "",
  last_name: "",
  otp: "__",
  company_role: "",
  address: "",
  phone: "",
  email: "__",
  password: "",
};


const CreateAccoutSuspenseBoundary = () => {
  const router = useRouter();
  const param = useSearchParams();
  const { formData, setFormData, handleChange } = useForm(InitialData);
  const [registerUser, { isLoading, isSuccess, isError, error, data }] =
    useRegisterUserMutation();

  console.log(data);

  const disableBtn = validator.whiteSpaces(formData);
  const email = param.get("email");
  const otp = param.get("otp");

  const handleRegisterUser = async () => {
    const isInValid = validator.whiteSpaces(formData);
    const payload = { ...formData, email, otp };
    console.log(payload);
    if (isInValid) {
      toast.error(validator.errorMessage, { autoClose: 30000 });
      return;
    }
    await registerUser(payload);
  };

  useEffect(() => {
    if (error) {
      const err = normalizeErrors(error);
      toast.error(err, { autoClose: 30000 });
    }
    if (isSuccess) {
      toast.success(data?.message, { autoClose: 1000 });
      router.replace("/user");
      setToken(data?.data?.token.token);
      setLoginTime();
    }
  }, [
    isSuccess,
    isError,
    data?.data?.token.token,
    data?.message,
    error,
    router,
  ]);

  return (
    <FormLayout>
      <div className="w-[60%] mx-auto max-w-[440px] mt-[25rem] ">
        <FPI length={3} shade={3} />

        <div className="bg-white rounded-[12px] py-[3rem] px-[2rem] border border-[#E6E8EC] mt-[1.5rem]  ">
          <h1 className="formHeader">Create Account</h1>

          <div className="flex flex-col space-y-[1.5rem]">
            {registrationFormFields.map((field) => (
              <TextInput
                key={field.id}
                label={field.label}
                placeholder={field.placeholder}
                type={field.type}
                value={formData[field.name]}
                handleChange={handleChange}
                name={field.name}
              />
            ))}
          </div>
          <div className="mt-[2.5rem] flex flex-col  space-y-[18px] w-full ">
            <Btn
              text="Next"
              handleClick={handleRegisterUser}
              loading={isLoading}
              loadingMsg="creating account..."
              disabled={disableBtn}
            />
            <h2 className="text-[12px] leading-[14px] text-[#3361FF] inter600 text-center ">
              Already have an account? <Link href="/login">Sign In </Link>{" "}
            </h2>
          </div>
        </div>
      </div>
    </FormLayout>
  );
};

export default CreateAccoutSuspenseBoundary;
