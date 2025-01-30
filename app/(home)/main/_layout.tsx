import BottomNavbar from "@/components/bottombar";
import Navbar from "@/components/navbar";
import { Slot, Stack } from "expo-router";
import { View, ScrollView } from "react-native";

export default function MainLayout() {
    return (
        <View style={{ backgroundColor: '#1A4656', flex: 1 }}>
                        <ScrollView 
                contentContainerStyle={{ flexGrow: 1 }} 
                showsVerticalScrollIndicator={false}
            >
            <Navbar />
            {/* Make the Slot content scrollable */}
                <Slot />
            </ScrollView>
            <BottomNavbar/>
        </View>
    );
}
