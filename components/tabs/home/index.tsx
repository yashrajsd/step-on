import { useUser } from "@clerk/clerk-expo";
import { SafeAreaView, StyleSheet, Text, View, ScrollView, Animated } from "react-native";
import BotStatus from "./bot-connection-status";
import { useState, useEffect, useRef } from "react";
import Sec2 from "./sec2";

export default function Home() {
    const { user } = useUser();
    const [connected, setConnected] = useState(true);

    // Animated value for height
    const animatedHeight = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animatedHeight, {
            toValue: connected ? 700 : 900, // Fixed height values
            duration: 300, 
            useNativeDriver: false, 
        }).start();
    }, [connected]);

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ flex: 1, backgroundColor: "#23272A" }}>
                <Animated.View
                    style={[
                        styles.topContainer,
                        {
                            height: animatedHeight, // Directly use the animated height
                        },
                    ]}
                >
                    <SafeAreaView style={{ flex: 1 }}>
                        <View style={styles.header}>
                            <View style={styles.headerContent}>
                                <Text style={{ fontSize: 18 }}>Hi</Text>
                                <View style={styles.divider} />
                                <Text>{user?.emailAddresses[0]?.emailAddress}</Text>
                            </View>
                        </View>
                        <BotStatus setConnected={setConnected} connected={connected} />
                    </SafeAreaView>
                </Animated.View>
                {connected && (
                    <View style={styles.sec2}>
                        <Sec2/>
                    </View>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    topContainer: {
        backgroundColor: "#FFFFFF",
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    header: {
        borderColor: "#CDCDCD",
        borderWidth: 1,
        width: "100%",
        borderRadius: 50,
        justifyContent: "space-between",
        paddingHorizontal: 25,
        flexDirection: "row",
        alignContent: "center",
        paddingVertical: 20,
    },
    headerContent: {
        display: "flex",
        gap: 20,
        alignItems: "center",
        flexDirection: "row",
    },
    divider: {
        borderWidth: 1,
        height: 30,
        borderColor: "#CDCDCD",
        width: 1,
    },
    sec2: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        width: "100%",
        minHeight: 300,
        borderWidth: 1,
        borderColor: "#CDCDCD",
    },
});
