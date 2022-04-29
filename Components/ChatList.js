import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { onSnapshot, collection, query, where } from "@firebase/firestore";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";
import ChatRow from "./ChatRow";

const ChatList = () => {
  const { user, logOut } = useAuth();
  const [matches, setMatches] = useState();
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matches"),
          where("usersMatched", "array-contains", user.uid)
        ),
        (snapshot) =>
          setMatches(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),
    [user]
  );

  //console.log("Boom", matches);
  return matches && matches.length > 0 ? (
    <FlatList
      style={{
        backgroundColor: "white",
        height: "100%",
      }}
      data={matches}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ChatRow matchDetails={item} />}
    />
  ) : (
    <View>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default ChatList;

const styles = StyleSheet.create({});
