import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/core";
import useAuth from "../hooks/useAuth";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { logOut } = useAuth();
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title="Chat" onPress={() => navigation.navigate("Chat")} />
      <Button title="Logout" onPress={logOut} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
