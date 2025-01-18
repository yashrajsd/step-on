import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Install via expo install @expo/vector-icons
import { useState } from "react";
import { questions } from "@/constants/Home";



export default function Sec2() {
    const [question, setQuestion] = useState(0);
    const [data,setData] = useState<{question:string,options:string[]}|null>(questions[0]);
    return (
        <View style={styles.container}>
            <View style={{display:'flex',flexDirection:'row', gap:10,marginHorizontal:20,marginTop:40}}>
                <TouchableOpacity style={[{flex:1,backgroundColor:'#cdcdcd',height:5,borderRadius:50},question===0&&{backgroundColor:'#131313'}]}>
                    
                </TouchableOpacity>
                <TouchableOpacity style={[{flex:1,backgroundColor:'#cdcdcd',height:5,borderRadius:50},question===1&&{backgroundColor:'#131313'}]}>
                    
                </TouchableOpacity>
                <TouchableOpacity style={[{flex:1,backgroundColor:'#cdcdcd',height:5,borderRadius:50},question===2&&{backgroundColor:'#131313'}]}>
                    
                </TouchableOpacity>
            </View>
            {
                data &&
                <View style={{flex:1,display:'flex',justifyContent:'center',alignContent:"center",gap:50}}>
                    <Text style={{ textAlign: 'center', fontWeight: '700', fontSize: 20 }}>
                        {data?.question}
                    </Text>
                    <View style={{display:'flex',flexDirection:'row',justifyContent:'center',gap:20,flexWrap: 'wrap',}}>
                        {
                            data?.options.map((option,index)=>(
                                <TouchableOpacity key={index} style={{borderWidth:1,borderColor:'#CDCDCD',borderRadius:50,padding:15,paddingHorizontal:25}}>
                                    <Text>{option}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    // cardContainer: {
    //     flex: 1,
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     paddingHorizontal: 20,
    // },
    container: {
        flex: 1,
    },
    // card: {
    //     padding: 15,
    //     width: '100%',
    //     flex: 1,
    //     borderRadius: 16,
    //     backgroundColor: '#E7F4FB',
    // },
    // titleContainer: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     margin: 10,
    //     width: '100%',
    //     paddingVertical: 10,
    // },
    // title: {
    //     marginLeft: 8,
    //     fontSize: 16,
    //     fontWeight: 'bold',
    // },
});
