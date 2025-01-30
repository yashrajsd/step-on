import { useClerk } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Dimensions, Linking, Pressable, SafeAreaView, Text, TouchableOpacity, View } from "react-native";

export default function Page() {
    const router= useRouter();
    const {signOut} = useClerk();
    const handleSignOut = async () => {
        try {
          await signOut()
          router.replace('/(home)')
        } catch (err) {
          console.error(JSON.stringify(err, null, 2))
        }
      }

    return (
        <View style={{flex:1,backgroundColor:'#1A4656'}}>
            
            <SafeAreaView style={{width:"100%"}}>
                <View style={{paddingHorizontal:20,gap:20}}>
                <Text style={{fontWeight:'600',color:'#FFF',fontSize:20}}>
                    Settings
                </Text>
                <TouchableOpacity style={{width:'100%',borderBottomWidth:4,borderBottomColor:'#FC2F2F',borderRadius:7,paddingVertical:15,backgroundColor:'#FF5E5E'}} onPress={handleSignOut}>
                    <Text style={{textAlign:'center',fontWeight:'500',color:'#FFF'}}>Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width:'100%',borderWidth:1,borderColor:'#CDCDCD',opacity:0.7,borderRadius:7,paddingVertical:15}} onPress={handleSignOut}>
                    <Text style={{textAlign:'center',fontWeight:'500',color:'#FFF'}}>Delete Account</Text>
                </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}