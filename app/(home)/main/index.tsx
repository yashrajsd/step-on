
import Streak from "@/components/main/streaks";
import { useUser } from "@clerk/clerk-expo";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";

export default function Page() {
    //contants below
    const { user } = useUser();

    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <Text style={{ color: '#FFF', fontWeight: '700', fontSize: 20 }}>Yashraj Deshmukh</Text>
                {/* <Text style={{ color: '#FFF', marginVertical: 5 }}>- {user?.emailAddresses[0].emailAddress}</Text> */}
            </View>
            <View style={{justifyContent:'space-between',flexDirection:'row',marginVertical:20}}>
                <View>
                    <Text style={{fontWeight:'600',color:'#FFFF',marginBottom:5}}>182 cm</Text>
                    <Text style={{color:'#FFF',opacity:0.6}}>Height</Text>
                </View>
                <View style={{borderWidth:1,borderColor:'#CDCDCD',opacity:0.2}}/>
                <View>
                    <Text style={{fontWeight:'600',color:'#FFFF',marginBottom:5}}>21 yrs</Text>
                    <Text style={{color:'#FFF',opacity:0.6}}>Age</Text>
                </View>
                <View style={{borderWidth:1,borderColor:'#CDCDCD',opacity:0.2}}/>
                <View>
                    <Text style={{fontWeight:'600',color:'#FFFF',marginBottom:5}}>64.4 kg</Text>
                    <Text style={{color:'#FFF',opacity:0.6}}>Weight</Text>
                </View>
            </View>
            <View style={{width:'100%',marginTop:30}}>
                <TouchableOpacity style={{backgroundColor:'#FFFF',width:'100%',paddingVertical:18,borderRadius:7,borderBottomWidth:4,borderBottomColor:'#CDCDCD'}}>
                    <Text style={{textAlign:'center',fontWeight:'500',color:'#131313'}}>Update profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{borderWidth:1,borderColor:'#225466',marginTop:15,width:'100%',paddingVertical:15,borderRadius:7}}>
                    <Text style={{textAlign:'center',fontWeight:'500',color:'#FFF'}}>Bot Settings</Text>
                </TouchableOpacity>
            </View>
            <Streak/>
        </View>
    )
}

//styles below
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 20
    },
    info: {
    }
}
)