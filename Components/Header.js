import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Entypo } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/core";

const Header = ({ title, callEnabled }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        //backgroundColor: "#DFDFDE",
        padding: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 3,
      }}
    >
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center", marginLeft: 5 }}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={require("../src/images/back-red-50.png")}
          style={{ height: 30, width: 30 }}
        />
        <Text style={{ fontWeight: "bold", fontSize: 25, marginLeft: 5 }}>
          {title}
        </Text>
      </TouchableOpacity>
      {callEnabled && (
        <TouchableOpacity>
          <Image
            source={require("../src/images/ringer-volume-96.png")}
            style={{ height: 40, width: 40, marginRight: 10 }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
