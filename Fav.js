import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from 'react-redux'
import { removeItemFromMusic, selectItems } from "./musicSlice";
import close from "./img/close.png";

function Fav({navigation, route}) {

    const linkedMusic = useSelector(selectItems)
    const dispatch = useDispatch();

    return (
        <>
        {linkedMusic.length > 0 ?
            <FlatList
                data={linkedMusic}
                contentContainerStyle={{
                    paddingTop: 20,
                    paddingBottom: 20,
                    gap: 20,
                    flexGrow: 1,
                }}
                keyExtractor={item => item.id}
                renderItem={({item}) =>
                    <View 
                        key={item.id}
                        style={{
                            justifyContent: "flex-start",
                            width: "90%",
                            height: 100,
                            alignSelf: 'center',
                            position: "relative",
                            flexDirection: "row",
                            overflow: "hidden",
                            gap: 10,
                            alignItems: "flex-end"
                        }}
                    >
                        <Image style={{width: "25%", height: "100%"}} source={{uri: item.uri}}/>
                        <View style={{width: "75%"}}>
                            <Text style={{fontSize: 20, fontWeight: "bold"}}>{item.name}</Text>
                            <Text numberOfLines={1} ellipsizeMode="tail" style={{fontSize: 14, opacity: 0.7}}>{item.author}</Text>
                        </View>
                        <TouchableOpacity style={{position: "absolute", top: 0, right: 0}} onPress={() => dispatch(removeItemFromMusic({id: item.id, uri: item.uri, name: item.name, author: item.author}))}>
                            <Image style={{width: 20, height: 20}} source={close}/>
                        </TouchableOpacity>
                    </View>
                }
            />
        :
                <Text style={{textAlign: "center", height: "100%", verticalAlign: "middle"}}>No favorite !</Text>
        }
        </>
    )
}

export default Fav