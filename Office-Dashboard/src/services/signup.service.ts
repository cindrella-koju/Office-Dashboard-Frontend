import { SIGNUP } from "../constants/urls";

export interface SignupData {
  fullname: string;
  username: string;
  email: string;
  password: string;
  confirmpassword: string;
}

export const signupUser = async (data: SignupData) => {
  const response = await fetch(SIGNUP, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || "Signup failed");
  }

  
  return result;
};
