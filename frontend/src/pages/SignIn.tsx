// gjymv3nRWUWlB6ku
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Sign in successful|", type: "SUCCESS" });
      navigate("/");
      // console.log("user has been signed in ");
      // show the toast
      // navigate to the home page
    },
    onError: (error: Error) => {
      // console.log(error);
      showToast({ message: error.message, type: "Error" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    // console.log(data);
    mutation.mutate(data);
  });

  return (
    <form action="post" onSubmit={onSubmit}>
      <h2 className="formHeading">Sign In</h2>
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
      <span className="button flex items-center justify-between">
        <span className="text-sm">
          Not Registered?{" "}
          <Link className="underline" to="/register">
            Create an account here
          </Link>
        </span>
        <button type="submit" className="btn">
          Login
        </button>
      </span>
    </form>
  );
};
export default SignIn;
