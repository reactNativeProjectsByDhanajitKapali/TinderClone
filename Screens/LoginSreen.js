import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import useAuth from "../hooks/useAuth";

const LoginSreen = () => {
  const { signInWithGoogle } = useAuth();
  return (
    <View>
      <Text>LoginSreen</Text>
      <Button title="Login" onPress={signInWithGoogle} />
    </View>
  );
};

export default LoginSreen;

const styles = StyleSheet.create({});
