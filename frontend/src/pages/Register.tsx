import { useForm } from "react-hook-form";
import "./styles/register.css";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  // pick a user back to home page after register
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  // npm i react query  //any time you use post or delete req use mutation
  // /it makes easier to fetch req easily
  const mutation = useMutation(apiClient.register, {
    onSuccess: () => {
      showToast({ message: "Registration Success", type: "SUCCESS" });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "Error" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    // console.log(data);
    mutation.mutate(data);
  });
  return (
    <form className="form" onSubmit={onSubmit}>
      <h2 className="formHeading">Create a Account</h2>
      <div className="formsName">
        <label className="formName">
          First Name
          <input
            type="text"
            className="formInput"
            {...register("firstName", { required: "this field is required" })}
          ></input>
          {errors.firstName && (
            <span className="formError">{errors.firstName.message}</span>
          )}
        </label>
        <label className="formName">
          Last Name
          <input
            type="text"
            className="formInput"
            {...register("lastName", { required: "this field is required" })}
          ></input>
          {errors.lastName && (
            <span className="formError">{errors.lastName.message}</span>
          )}
        </label>
        <label className="formName">
          Email
          <input
            type="email"
            className="formInput"
            {...register("email", { required: "this field is required" })}
          ></input>
          {errors.email && (
            <span className="formError">{errors.email.message}</span>
          )}
        </label>
        <label className="formName">
          Password
          <input
            type="password"
            className="formInput"
            {...register("password", {
              required: "this field is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 character",
              },
            })}
          ></input>
          {errors.password && (
            <span className="formError">{errors.password.message}</span>
          )}
        </label>
        <label className="formName">
          Confirm password
          <input
            type="password"
            className="formInput"
            {...register("confirmPassword", {
              validate: (val) => {
                if (!val) {
                  return "This field is required";
                } else if (watch("password") !== val) {
                  return "Your password donot match";
                }
              },
            })}
          ></input>
          {errors.confirmPassword && (
            <span className="formError">{errors.confirmPassword.message}</span>
          )}
        </label>
      </div>
      <span className="button">
        <button type="submit" className="btn">
          Create Account
        </button>
      </span>
    </form>
  );
};
export default Register;
