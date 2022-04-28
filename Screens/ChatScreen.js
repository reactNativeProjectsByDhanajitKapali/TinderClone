import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import Header from "../Components/Header";
import ChatList from "../Components/ChatList";

const ChatScreen = () => {
  return (
    <SafeAreaView>
      <Header title="Chat" callEnabled={true} />
      <ChatList />
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
