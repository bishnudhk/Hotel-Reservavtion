import { useForm } from "react-hook-form";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const {
    register,
    formState: { errors },
  } = useForm<SignInFormData>();

  return (
    <form action="post">
      <h2 className="formHeading">SignI n</h2>
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
    </form>
  );
};
export default SignIn;
