import {
  ActivityIndicator,
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useLayoutEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/core";

const LoginSreen = () => {
  const { signInWithGoogle, loading } = useAuth();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        resizeMode="cover"
        style={{ flex: 1 }}
        source={{ uri: "https://tinder.com/static/tinder.png" }}
      >
        <TouchableOpacity
          onPress={signInWithGoogle}
          style={{
            backgroundColor: "white",
            marginHorizontal: "25%",
            marginVertical: "160%",
            height: 45,
            padding: 5,
            borderRadius: 15,
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{ alignSelf: "center", fontSize: 20, fontWeight: "600" }}
          >
            Login
          </Text>
        </TouchableOpacity>
        {/* {!loading && <ActivityIndicator size="large" />} */}
      </ImageBackground>
    </View>
  );
};

export default LoginSreen;

const styles = StyleSheet.create({});
