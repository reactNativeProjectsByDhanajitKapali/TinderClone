import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/core";
import useAuth from "../hooks/useAuth";

const ChatRow = ({ matchDetails }) => {
  const navigation = useNavigation();
  const user = useAuth();
  return (
    <View>
      <Text>{matchDetails.users.displayName}Boom</Text>
    </View>
  );
};

export default ChatRow;

const styles = StyleSheet.create({});
