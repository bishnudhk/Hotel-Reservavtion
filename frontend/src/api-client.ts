import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import { HotelType } from "../../backend/src/shared/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || " ";

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`http://127.0.0.1:7000/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  // Try to parse the JSON only if there is content
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    try {
      const body = await response.json();

      return body;
    } catch (error) {
      if (!response.ok) {
        throw new Error("Error parsing JSON response");
      }
    }
  } else {
    return null;
  }
};

export const validateToken = async () => {
  // const token =
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
  const response = await fetch(
    `http://127.0.0.1:7000/api/auth/validate-token`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Token invalid");
  }
  return response.json();
};

export const signOut = async () => {
  const response = await fetch(`http://127.0.0.1:7000/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Error during sign out");
  }
};

export const addMyHotel = async (hotelFormData: FormData) => {
  // console.log(hotelFormData);
  try {
    const response = await fetch(`http://127.0.0.1:7000/api/myHotels`, {
      credentials: "include",
      method: "POST",
      body: hotelFormData,
    });

    // console.log(FormData);
    // console.log(hotelFormData);
    if (!response.ok) {
      throw new Error("failed to add Hotel");
    }

    // Check for success status or handle accordingly
    if (response.status === 200) {
      // Handle success
      console.log("Hotel added successfully");
    } else {
      // Handle unexpected status
      console.error("Unexpected status:", response.status);
    }
  } catch (error) {
    // Handle API request error
    console.error("Error adding hotel:", error);
  }
  // return response.json();
};

export const fetchMyHotels = async (): Promise<HotelType[]> => {
  // const response = await fetch(`${API_BASE_URL}/api/myHotels`, {
  const response = await fetch(`http://127.0.0.1:7000/api/myHotels`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }

  return response.json();
};

export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(
    `http://127.0.0.1:7000/api/myHotels/${hotelId}`,
    {
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("error fetching hotels ");
  }
  return response.json();
};
