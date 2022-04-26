import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect } from "react";
import useAuth from "../hooks/useAuth";

const ModalScreen = () => {
  const { user } = useAuth();

  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={{ uri: "https://links.papareact.com/2pf" }}
        resizeMode="contain"
        style={{ height: 70, width: "100%" }}
      />
      <Text style={{ fontSize: 20, fontWeight: "600" }}>
        Welcome {user.displayName}
      </Text>

      <View style={{ margin: 20 }} />
      <Text style={{ fontSize: 18, fontWeight: "500", color: "red" }}>
        Step 1 : The Profile Pic
      </Text>
      <TextInput
        style={{
          textAlign: "center",
          height: 40,
          width: "50%",
          borderColor: "gray",
          borderWidth: 0.2,
          margin: 5,
          padding: 5,
          borderRadius: 10,
          fontSize: 18,
        }}
        placeholder="Enter a Profile Pic URL"
      />
      <View style={{ margin: 10 }} />
      <Text style={{ fontSize: 18, fontWeight: "500", color: "red" }}>
        Step 1 : The Job
      </Text>
      <TextInput
        style={{
          textAlign: "center",
          height: 40,
          width: "50%",
          borderColor: "gray",
          borderWidth: 0.2,
          margin: 5,
          padding: 5,
          borderRadius: 10,
          fontSize: 18,
        }}
        placeholder="Enter Your Occupation"
      />
      <View style={{ margin: 10 }} />
      <Text style={{ fontSize: 18, fontWeight: "500", color: "red" }}>
        Step 1 : The Age
      </Text>
      <TextInput
        style={{
          textAlign: "center",
          height: 40,
          width: "50%",
          borderColor: "gray",
          borderWidth: 0.2,
          margin: 5,
          padding: 5,
          borderRadius: 10,
          fontSize: 18,
        }}
        placeholder="Enter Your Age"
      />
      <View style={{ margin: 10 }} />
      <TouchableOpacity
        style={{
          backgroundColor: "#FF8080",
          height: 45,
          width: "75%",
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "500", fontSize: 22 }}>
          Update Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalScreen;

const styles = StyleSheet.create({});
