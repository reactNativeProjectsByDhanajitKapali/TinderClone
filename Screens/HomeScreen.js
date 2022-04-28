import {
  Button,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import useAuth from "../hooks/useAuth";
import Swiper from "react-native-deck-swiper";
import { Entypo } from "react-native-vector-icons";
import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  where,
  query,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

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

    //Check if the User has a account on Our TinderClone app
    getUserDetails();
  });

  useEffect(() => {
    getAllProfiles();
    //getAllTheProfiles();
  });

  const getAllProfiles = async () => {
    //Get the Swiped Passed Profiles
    let swippedIds = [];
    const querySnapshotForSwippedLeftIds = await getDocs(
      collection(db, "users", user.uid, "leftSwiped")
    );
    querySnapshotForSwippedLeftIds.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      swippedIds.push(doc.data().id);
      //console.log(doc.id, " => ", doc.data());
    });
    //Get the Swiped Right Profiles
    const querySnapshotForSwippedRightsIds = await getDocs(
      collection(db, "users", user.uid, "rightSwiped")
    );
    querySnapshotForSwippedRightsIds.forEach((doc) => {
      swippedIds.push(doc.data().id);
    });
    swippedIds.push(user.uid);
    //console.log(swippedIds);

    const q = query(
      collection(db, "users"),
      where("id", "not-in", [...swippedIds])
    );
    const querySnapshotForUnswipedProfiles = await getDocs(q);
    let arr = [];
    querySnapshotForUnswipedProfiles.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      arr.push(doc.data());
      //console.log(doc.id, " => ", doc.data(), user.uid);
    });
    //console.log(arr);
    if (profiles.length != arr.length) {
      //console.log(arr);
      setProfiles(arr);
    }
  };

  const getUserDetails = async () => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      //console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      navigation.navigate("Modal");
    }
  };

  const getAllTheProfiles = async () => {
    let unsub;
    const fetchCards = async () => {
      //console.log("Boom");
      unsub = onSnapshot(collection(db, "users"), (snapshot) => {
        setProfiles(
          snapshot.docs
            .filter((doc) => doc.id !== user.uid)
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
        );
      });
    };
    fetchCards();
    return unsub;
  };

  const swipedLeft = (index) => {
    if (!profiles[index]) return;

    const userSwiped = profiles[index];
    //console.log("Left Swiped", userSwiped);

    pushSwipeInfoToFirestore("leftSwiped", userSwiped);
  };

  const swipedRight = (index) => {
    if (!profiles[index]) return;

    const userSwiped = profiles[index];

    //Get the details of the
    //const currentUser = getDoc(doc(db, "users", user.uid)).data();

    //Now check if the Person has already swiped on you or not
    getDoc(doc(db, "users", userSwiped.id, "rightSwiped", user.uid)).then(
      (documentSnapshot) => {
        if (documentSnapshot.exists()) {
          //User has already Right-Swiped on you
          console.log("Congrats, You Got a Match");

          //Create A Match
          setDoc(doc(db, "matches", generateId(user.uid, userSwiped.id)), {
            users: {
              [user.uid]: user.uid,
              [userSwiped.id]: userSwiped,
            },
            usersMatched: [user.uid, userSwiped.id],
            timeStamp: serverTimestamp(),
          })
            .then(() => {
              console.log("matches creation Sucess");
            })
            .catch(() => {
              console.log("matches creation Failure");
            });

          navigation.navigate("Match", { user, userSwiped });
        } else {
          //Current User has Right-Swiped as first interaction b/t the two person
        }
      }
    );

    //Added this Swiped User to current user's RightSwiped List
    pushSwipeInfoToFirestore("rightSwiped", userSwiped);
  };

  const generateId = (id1, id2) => (id1 > id2 ? id1 + id2 : id2 + id1);

  const pushSwipeInfoToFirestore = async (pushType, theData) => {
    await setDoc(doc(db, "users", user.uid, pushType, theData.id), theData)
      .then(() => {
        console.log("Swipe Push Sucess");
      })
      .catch((error) => {
        console.log("Swipe Push Failure");
      });
  };

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
          onSwipedLeft={(cardIndex) => {
            console.log("Swiped NOPE");
            swipedLeft(cardIndex);
          }}
          onSwipedRight={(cardIndex) => {
            console.log("Swiped MATCH");
            swipedRight(cardIndex);
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
                      {card.displayName}
                    </Text>
                    <Text style={{ fontSize: 15 }}>{card.job}</Text>
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
