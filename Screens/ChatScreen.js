import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import Header from "../Components/Header";

const ChatScreen = () => {
  return (
    <SafeAreaView>
      <Header title="Chat" callEnabled={true} />
      <Text>ChatScreen</Text>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
