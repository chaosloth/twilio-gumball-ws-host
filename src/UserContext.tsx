import React from "react";

export type UserInfo = {
  name: string;
  phone: string;
  email: string;
  userId: string;
};

const UserContext = React.createContext<UserInfo>({
  name: "unknown",
  phone: "",
  email: "",
  userId: "",
});

export const UserProvider = UserContext.Provider;

export default UserContext;

export const useUserContext = () => React.useContext(UserContext);
