import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../context/AppContext";
const SignOutButton = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      // show toast
      showToast({ message: "signed out ", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      // show toast
      showToast({ message: error.message, type: "Error" });
    },
  });
  const handleClick = () => {
    // console.log("ljflksakjkdjfjsaklflk");
    mutation.mutate();
  };
  return (
    <button onClick={handleClick} className="btn">
      sign out
    </button>
  );
};
export default SignOutButton;
