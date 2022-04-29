import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const RecieverMessage = ({ message }) => {
  return (
    <View style={{ flexDirection: "row", marginBottom: 10 }}>
      <Image
        source={{ uri: message.photoURL }}
        style={{
          height: 45,
          width: 45,
          marginLeft: 5,
          marginTop: 5,
          borderRadius: 22.5,
        }}
        //resizeMode="contain"
      />
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#FF5C8D",
          paddingTop: 12,
          paddingBottom: 12,
          paddingRight: 12,
          paddingLeft: 5,
          margin: 5,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          borderTopRightRadius: 8,
          alignSelf: "flex-start",
          justifyContent: "center",
          justifyContent: "center",
          //marginLeft: "auto",
        }}
      >
        <Text style={{ fontSize: 15, color: "white", marginLeft: 10 }}>
          {message.message}
        </Text>
      </View>
    </View>
  );
};

export default RecieverMessage;

const styles = StyleSheet.create({});
