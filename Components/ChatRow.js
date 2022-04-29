import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import useAuth from "../hooks/useAuth";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";

const ChatRow = ({ matchDetails }) => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);
  const [lastMessage, setLastMessage] = useState("Say Ho");

  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid));
    // setTimeout(() => {
    //   console.log("MatchedUserInfo", matchedUserInfo);
    // }, 500);
  }, [matchDetails, user]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matches", matchDetails?.id, "messages"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setLastMessage(snapshot.docs[0]?.data()?.message)
      ),
    [matchDetails, db]
  );

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
          <Text style={{ fontSize: 15 }}>{lastMessage}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ChatRow;

const styles = StyleSheet.create({});
