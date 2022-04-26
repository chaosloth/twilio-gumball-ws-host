import React from "react";

export type UserInfo = {
  name: string;
  phone: string;
  email: string;
};

const UserContext = React.createContext<UserInfo>({
  name: "unknown",
  phone: "",
  email: "",
});

export const UserProvider = UserContext.Provider;

export default UserContext;

export const useUserContext = () => React.useContext(UserContext);
