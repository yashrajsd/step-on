import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Animated, Dimensions, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import LottieView from "lottie-react-native";
import { useRouter } from "expo-router";

export default function Navbar() {
  const router = useRouter();
  const { height: screenHeight } = Dimensions.get("window");
  const translateY = useRef(new Animated.Value(screenHeight * 0.4)).current; // Start off-screen (below the parent view)
  const [connected, setConnected] = useState(false);
  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const animatedStyle = {
    transform: [{ translateY }],
  };

  return (
    <View style={{ position: "relative", height: screenHeight * 0.4, overflow: "hidden" }}>
      <SafeAreaView style={styles.safearea}>
        <View style={styles.navbar}>
          <Pressable style={[styles.box, { gap: 3 }]} onPress={()=>{ router.push('/settings');}}>
            <View style={{ height: 4, width: "40%", backgroundColor: "#FFFFFF", borderRadius: 50 }} />
            <View style={{ height: 4, width: "40%", backgroundColor: "#FFFFFF", borderRadius: 50 }} />
            <View style={{ height: 4, width: "40%", backgroundColor: "#FFFFFF", borderRadius: 50 }} />
          </Pressable>
          <View style={styles.chat}>
            <MaterialIcons name="chat" size={25} />
          </View>
        </View>
      </SafeAreaView>
      <View
        style={{
          width: "100%",
          position: "absolute",
          top: 0,
          height: "100%",
          backgroundColor: "#6956FF",
          zIndex: 1,
          justifyContent: "center",
          alignContent: "flex-end",
        }}
      />
      <Animated.View
        style={[
          {
            position: "absolute",
            top: 0,
            zIndex: 2,
            height: "100%",
            width: "100%",
          },
          animatedStyle,
        ]}
      >
        <Image
          source={require("@/assets/images/smiling-man.png")}
          style={{ height: "100%", width: "auto" }}
        />
      </Animated.View>
      <View
        style={{
          width: "100%",
          position: "absolute",
          zIndex: 4,
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 20,
          flexDirection: 'row',
          paddingHorizontal: '5%',
        }}
      >
        {!connected
          &&
          (
            <View style={{ flex: 1, borderRadius: 20, overflow: "hidden" }}>
              <BlurView intensity={100} style={{ width: "100%" }}>
                <View style={{ width: "100%", justifyContent: "center", alignItems: "center", paddingVertical: 20, flexDirection: 'row', gap: 10 }}>
                  <LottieView
                    source={require('@/assets/animation/noconnection.json')}
                    loop
                    autoPlay
                    style={{ width: 30, height: 30 }}
                  />
                  <Text style={{ color: '#FFF', fontWeight: '500' }}>StepBot not connected</Text>
                </View>
              </BlurView>
            </View>
          )
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safearea: {
    width: "100%",
    position: "relative",
    zIndex: 7,
  },
  chat: {
    height: 50,
    width: 50,
    backgroundColor: "#FFF",
    opacity: 0.9,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 5,
  },
  box: {
    height: 50,
    width: 50,
    borderColor: "#CDCDCD",
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
