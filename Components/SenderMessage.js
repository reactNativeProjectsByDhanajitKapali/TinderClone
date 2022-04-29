import { StyleSheet, Text, View } from "react-native";
import React from "react";

const SenderMessage = ({ message }) => {
  return (
    <View
      style={{
        backgroundColor: "#9900F0",
        padding: 12,
        margin: 5,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderTopLeftRadius: 8,
        alignSelf: "flex-end",
        //marginLeft: "auto",
      }}
    >
      <Text style={{ fontSize: 15, color: "white" }}>
        {message.message}Hi, There
      </Text>
    </View>
  );
};

export default SenderMessage;

const styles = StyleSheet.create({});
