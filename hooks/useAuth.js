import { View, Text } from "react-native";
import React, { createContext, useContext } from "react";
import * as Google from "expo-google-app-auth";
import { IOS_CLIENT_ID, ADNROID_CLIENT_ID } from "@env";

const AuthContext = createContext();

const config = {
  iosClientId: IOS_CLIENT_ID,
  scopes: ["profile", "email"],
  permission: ["public_profile", "email", "gender", "location"],
};

export const AuthProvider = ({ children }) => {
  const signInWithGoogle = async () => {
    Google.logInAsync(config).then(async (loginResult) => {
      if (loginResult.type === "success") {
        console.log("Login Hogaya");
      }
    });
  };

  return (
    <AuthContext.Provider value={{ user: null, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
