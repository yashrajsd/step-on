import LottieView from "lottie-react-native";
import { Text, TouchableOpacity, View } from "react-native";

export default function Streak(){
    return(
        <TouchableOpacity style={{width:'100%',backgroundColor:'#1E5163',borderRadius:15,paddingVertical:30,justifyContent:'center',alignItems:'center',marginVertical:20,paddingBottom:45}}>
            <LottieView
                    source={require('@/assets/animation/streak.json')}
                    autoPlay
                    loop
                    style={{height:90,width:90,margin:0}}
                />
            <Text style={{textAlign:'center',fontWeight:'600',color:'#FFF',fontSize:20}}>
                4 
            </Text>
            {/* <Text style={{color:'#FFF',fontWeight:'600',opacity:0.7}}>
                Days Streak
            </Text> */}
        </TouchableOpacity>
    )
}