import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  FlatList,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import useAuth from "../hooks/useAuth";
import { useRoute } from "@react-navigation/core";
import SenderMessage from "../Components/SenderMessage";
import RecieverMessage from "../Components/RecieverMessage";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";

const MessageScreen = () => {
  const { user } = useAuth();
  const { params } = useRoute();
  const { matchDetails } = params;
  const [inputMessage, setInputMessage] = useState();
  const [messages, setMessages] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matches", matchDetails?.id, "messages"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),
    [matchDetails, db]
  );

  const getMatchedUserInfo = (users, userLogedIn) => {
    const newUsers = { ...users };
    delete newUsers[userLogedIn];

    const [id, theUser] = Object.entries(newUsers).flat();
    return { id, ...theUser };
  };

  const sendMessage = () => {
    addDoc(collection(db, "matches", matchDetails.id, "messages"), {
      timestamp: serverTimestamp(),
      userId: user.uid,
      displayName: user.displayName,
      photoURL: matchDetails.users[user.uid].photoURL,
      message: inputMessage,
    });

    setInputMessage("");
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <Header
        title={getMatchedUserInfo(matchDetails?.users, user.uid)?.displayName}
        callEnabled
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, backgroundColor: "#F7F5F2" }}
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback>
          <FlatList
            inverted
            data={messages}
            style={{ padding: 4 }}
            keyExtractor={(item) => item.id}
            renderItem={({ item: message }) =>
              message.userId === user.uid ? (
                <SenderMessage key={message} message={message} />
              ) : (
                <RecieverMessage key={message} message={message} />
              )
            }
          />
        </TouchableWithoutFeedback>

        {/* Message Input */}
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "white",
            justifyContent: "space-between",
            padding: 5,
          }}
        >
          <TextInput
            style={{
              fontSize: 18,
              height: 45,
              borderColor: "black",
              borderWidth: 0.2,
              borderRadius: 10,
              marginLeft: 10,
              //marginRight: 5,
              paddingLeft: 10,
              paddingRight: 10,
              alignSelf: "flex-start",
              width: "80%",
            }}
            placeholder="Enter Your Message"
            onChangeText={setInputMessage}
            onSubmitEditing={sendMessage}
            value={inputMessage}
          />
          <TouchableOpacity
            style={{
              width: "20%",
              height: 45,
              borderRadius: 22.5,
              marginRight: 10,
              //backgroundColor: "black",
              alignSelf: "flex-end",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={sendMessage}
            title="Send"
          >
            <Image
              source={require("../src/images/send-letter-96.png")}
              style={{ height: 40 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({});
