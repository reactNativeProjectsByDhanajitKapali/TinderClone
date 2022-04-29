import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import Header from "../Components/Header";
import useAuth from "../hooks/useAuth";
import { useRoute } from "@react-navigation/core";

const MessageScreen = () => {
  const { user } = useAuth();
  const { params } = useRoute();
  const { matchDetails } = params;

  const getMatchedUserInfo = (users, userLogedIn) => {
    const newUsers = { ...users };
    delete newUsers[userLogedIn];

    const [id, theUser] = Object.entries(newUsers).flat();
    return { id, ...theUser };
  };

  return (
    <SafeAreaView>
      <Header
        title={getMatchedUserInfo(matchDetails?.users, user.uid)?.displayName}
        callEnabled
      />
      <Text>MessageScreen</Text>
    </SafeAreaView>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({});
