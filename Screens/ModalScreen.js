import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { setDoc, addDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigation } from "@react-navigation/core";

const ModalScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [imageUrl, setImageUrl] = useState();
  const [job, setJob] = useState();
  const [age, setAge] = useState();

  const isFormComplete = !imageUrl || !job || !age;

  const updateUserProfile = async () => {
    const collectionRef = doc(db, "users");
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      displayName: user.displayName,
      photoURL: imageUrl,
      job: job,
      age: age,
      timeStamp: serverTimestamp(),
    })
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={{ uri: "https://links.papareact.com/2pf" }}
        resizeMode="contain"
        style={{ height: 70, width: "100%" }}
      />
      <Text style={{ fontSize: 20, fontWeight: "600" }}>
        Welcome {user.displayName}
      </Text>

      <View style={{ margin: 20 }} />
      <Text style={styles.steps}>Step 1 : The Profile Pic</Text>
      <TextInput
        value={imageUrl}
        onChangeText={(text) => setImageUrl(text)}
        style={styles.textInput}
        placeholder="Enter a Profile Pic URL"
      />
      <View style={{ margin: 10 }} />
      <Text style={styles.steps}>Step 2 : The Job</Text>
      <TextInput
        value={job}
        onChangeText={(text) => setJob(text)}
        style={styles.textInput}
        placeholder="Enter Your Occupation"
      />
      <View style={{ margin: 10 }} />
      <Text style={styles.steps}>Step 3 : The Age</Text>
      <TextInput
        value={age}
        onChangeText={(text) => setAge(text)}
        style={styles.textInput}
        placeholder="Enter Your Age"
        keyboardType="numeric"
      />
      <View style={{ margin: 10 }} />
      <TouchableOpacity
        onPress={updateUserProfile}
        disabled={isFormComplete}
        style={isFormComplete ? styles.disableButton : styles.enabledButton}
      >
        <Text style={[{ color: "white", fontWeight: "500", fontSize: 22 }]}>
          Update Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalScreen;

const styles = StyleSheet.create({
  steps: {
    fontSize: 18,
    fontWeight: "500",
    color: "red",
  },
  textInput: {
    textAlign: "center",
    height: 40,
    width: "50%",
    borderColor: "gray",
    borderWidth: 0.2,
    margin: 5,
    padding: 5,
    borderRadius: 10,
    fontSize: 18,
  },
  disableButton: {
    backgroundColor: "gray",
    height: 45,
    width: "75%",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  enabledButton: {
    backgroundColor: "#FF8080",
    height: 45,
    width: "75%",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
