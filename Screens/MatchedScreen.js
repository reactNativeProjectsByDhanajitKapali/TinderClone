import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/core";

const MatchedScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { user, userSwiped } = params;

  return (
    <View
      style={{
        backgroundColor: "#D82148",
        flex: 1,
        opacity: 0.92,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={{ uri: "https://links.papareact.com/mg9" }}
        style={{ height: 100, width: "80%", marginBottom: 0 }}
        resizeMode="contain"
      />
      <Text
        style={{
          fontWeight: "500",
          fontSize: 15,
          color: "white",
          marginBottom: 20,
        }}
      >
        You and {userSwiped.displayName} has liked each other
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: 10,
        }}
      >
        <Image
          source={{ uri: user.photoURL }}
          style={{ height: 120, width: 120, borderRadius: 60, margin: 15 }}
        />
        <Image
          source={{ uri: userSwiped.photoURL }}
          style={{ height: 120, width: 120, borderRadius: 60, margin: 15 }}
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "white",
          height: 80,
          width: "80%",
          marginTop: 60,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 40,
        }}
        onPress={() => {
          navigation.goBack();
          navigation.navigate("Chat");
        }}
      >
        <Text
          style={{
            color: "black",
            fontSize: 18,
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Send a Message
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MatchedScreen;

const styles = StyleSheet.create({});
