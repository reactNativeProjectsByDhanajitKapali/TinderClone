import {
  Button,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useLayoutEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import useAuth from "../hooks/useAuth";
import Swiper from "react-native-deck-swiper";
import { Entypo } from "react-native-vector-icons";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logOut } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const swiperRef = useRef(null);

  const DUMMY_DATA = [
    {
      firstName: "Sonny",
      lastName: "Sangha",
      occupation: "Software Developer",
      photoURL: "https://avatars.githubusercontent.com/u/24712956?v=4",
      age: 27,
    },
    {
      firstName: "Elon",
      lastName: "Musk",
      occupation: "Tesla CEO",
      photoURL:
        "https://upload.wikimedia.org/wikipedia/commons/4/49/Elon_Musk_2015.jpg",
      age: 40,
    },
    {
      firstName: "Kylie",
      lastName: "Jenner",
      occupation: "Actress",
      photoURL:
        "https://upload.wikimedia.org/wikipedia/commons/6/65/Kylie_Jenner_in_2021.jpg",
      age: 24,
    },
    {
      firstName: "Kendall",
      lastName: "Jenner",
      occupation: "Actress",
      photoURL:
        "https://upload.wikimedia.org/wikipedia/commons/b/ba/Kendall_Jenner_Cannes_2017.jpg",
      age: 26,
    },
    {
      firstName: "Amber ",
      lastName: "Heard",
      occupation: "Actress",
      photoURL:
        "https://upload.wikimedia.org/wikipedia/commons/4/4c/Amber_Heard_%2843723454772%29.jpg",
      age: 36,
    },
    {
      firstName: "Chris ",
      lastName: "Evans",
      occupation: "Captain America",
      photoURL:
        "https://upload.wikimedia.org/wikipedia/commons/d/db/Chris_Evans_-_Captain_America_2_press_conference.jpg",
      age: 40,
    },
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* HeaderView Start*/}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity style={{ marginLeft: 10 }} onPress={logOut}>
          <Image
            source={{ uri: user.photoURL }}
            style={{ height: 40, width: 40, borderRadius: 20 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
          <Image
            source={require("../src/images/tinder-logo-96.png")}
            style={{ height: 60, width: 60 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={() => navigation.navigate("Chat")}
        >
          <Image
            source={require("../src/images/tinder-chat-90.png")}
            style={{ height: 40, width: 40 }}
          />
        </TouchableOpacity>
      </View>
      {/* HeaderView End */}

      {/* CardView Start*/}
      <View
        style={{
          flex: 1,
          height: "90%",
          backgroundColor: "black",
          flexDirection: "column-reverse",
        }}
      >
        <Swiper
          ref={swiperRef}
          cards={profiles}
          containerStyle={{ backgroundColor: "white" }}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity={true}
          verticalSwipe={false}
          onSwipedLeft={() => {
            console.log("Swiped NOPE");
          }}
          onSwipedRight={() => {
            console.log("Swiped MATCH");
          }}
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "MATCH",
              style: {
                label: {
                  color: "#4DED30",
                },
              },
            },
          }}
          renderCard={(card) =>
            card ? (
              <View
                key={card}
                style={{
                  backgroundColor: "#EC255A",
                  height: "75%",
                  borderRadius: 15,
                }}
              >
                <Image
                  source={{ uri: card.photoURL }}
                  style={{
                    height: "88%",
                    width: "100%",
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                  }}
                ></Image>
                <View
                  style={{
                    backgroundColor: "white",
                    height: "12%",
                    borderBottomLeftRadius: 15,
                    borderBottomRightRadius: 15,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignContent: "center",
                    alignItems: "center",
                    borderColor: "gray",
                    borderWidth: 0.2,
                  }}
                >
                  <View style={{ marginLeft: 10 }}>
                    <Text style={{ fontWeight: "600", fontSize: 20 }}>
                      {card.firstName} {card.lastName}
                    </Text>
                    <Text style={{ fontSize: 15 }}>{card.occupation}</Text>
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 25,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: 25,
                      }}
                    >
                      {card.age}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View
                key={card}
                style={{
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 15,
                  height: "75%",
                  borderColor: "gray",
                  borderWidth: 0.2,
                }}
              >
                <Text style={{ fontSize: 22, fontWeight: "500" }}>
                  No More Profiles
                </Text>
                <Image
                  source={require("../src/images/nothing-found-64.png")}
                  style={{ height: 100, width: 100, marginTop: 25 }}
                />
              </View>
            )
          }
        />

        <View
          style={{
            flexDirection: "row",
            //backgroundColor: "red",
            height: "10%",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => swiperRef.current.swipeLeft()}
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 55,
              width: 55,
              backgroundColor: "#FF9999",
              borderRadius: 27.5,
            }}
          >
            <Entypo name="cross" size={30} color="red" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => swiperRef.current.swipeRight()}
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 55,
              width: 55,
              backgroundColor: "#B4E197",
              borderRadius: 27.5,
            }}
          >
            <Entypo name="heart" size={30} color="green" />
          </TouchableOpacity>
        </View>
      </View>
      {/* CardView End*/}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
