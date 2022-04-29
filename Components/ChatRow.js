import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import useAuth from "../hooks/useAuth";

const ChatRow = ({ matchDetails }) => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);

  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid));
    setTimeout(() => {
      console.log("MatchedUserInfo", matchedUserInfo);
    }, 500);
  }, [matchDetails, user]);

  const getMatchedUserInfo = (users, userLogedIn) => {
    const newUsers = { ...users };
    delete newUsers[userLogedIn];

    const [id, theUser] = Object.entries(newUsers).flat();
    return { id, ...theUser };
  };
  return (
    <View style={{ backgroundColor: "white" }}>
      <TouchableOpacity
        style={{
          height: 80,
          backgroundColor: "#FFF8F3",
          margin: 10,
          borderRadius: 10,
          justifyContent: "center",
          flexDirection: "row",
          borderWidth: 0.2,
          borderColor: "gray",
        }}
        onPress={() => navigation.navigate("Message", { matchDetails })}
      >
        <Image
          source={{ uri: matchedUserInfo?.photoURL }}
          style={{ height: 60, width: 60, borderRadius: 30, margin: 10 }}
        />
        <View
          style={{ width: "80%", justifyContent: "space-evenly", padding: 5 }}
        >
          <Text style={{ fontWeight: "600", fontSize: 22 }}>
            {matchedUserInfo?.displayName}
          </Text>
          <Text style={{ fontSize: 15 }}>Say Hi</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ChatRow;

const styles = StyleSheet.create({});
