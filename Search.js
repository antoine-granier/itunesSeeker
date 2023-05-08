import axios from "axios";
import { useEffect, useState } from "react";
import { Image, Text, View, TouchableOpacity, TextInput, FlatList } from "react-native";
import { useDispatch } from 'react-redux'
import { addItemToMusic, removeItemFromMusic, selectItems } from './musicSlice'
import { useSelector } from 'react-redux'
import star from "./img/star.png"
import starFull from "./img/star_full.png"

function Search({ navigation, route }) {

    const [search, setSearch] = useState("");
    const [result, setResult] = useState([])

    const linkedMusic = useSelector(selectItems)
    const dispatch = useDispatch()

    const searchFunction = async () => {
        const searchValue = search.split(" ").join("+")
        axios.get(search === "" ? "https://itunes.apple.com/search?media=music&term=\"\"" : "https://itunes.apple.com/search?media=music&term=" + searchValue).then(res => setResult(res.data.results))
    }

    useEffect(() => {
        searchFunction()
    }, [search])

    const modifyLikedMusic = (item) => {
        if (linkedMusic.find(elem => elem.id === item.id)) {
            dispatch(removeItemFromMusic(item))
        } else {
            dispatch(addItemToMusic(item))
        }
    }

    return (
        <View>
            <View style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
                <TextInput style={{ width: "80%", padding: 10, backgroundColor: "#fff", elevation: 10, borderRadius: 10, margin: 15 }} placeholder="Search" onChangeText={(e) => setSearch(e)} />
                <TouchableOpacity onPress={() => navigation.navigate("Favorite")}>
                    <Image
                        style={{ width: 40, height: 40 }}
                        source={require("./img/favorite.png")}
                    />
                </TouchableOpacity>
            </View>
            {result.length > 0 ?
                <FlatList
                    style={{ height: "80%" }}
                    contentContainerStyle={{
                        paddingTop: 20,
                        gap: 20,
                        flexGrow: 1,
                    }}
                    data={result}
                    keyExtractor={item => item.trackId}
                    renderItem={({ item }) =>
                        <View
                            key={item.trackId}
                            style={{
                                justifyContent: "flex-start",
                                width: "90%",
                                height: 100,
                                alignSelf: 'center',
                                position: "relative",
                                flexDirection: "row",
                                overflow: "hidden",
                                gap: 10,
                            }}
                        >
                            <Image style={{ width: "25%", height: "100%" }} source={{ uri: item.artworkUrl100 }} />
                            <View style={{ width: "75%" }}>
                                <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.trackName}</Text>
                                <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 14, opacity: 0.7 }}>{item.artistName}</Text>
                            </View>
                            <TouchableOpacity style={{ position: "absolute", bottom: 0, right: 0 }} onPress={() => modifyLikedMusic({ id: item.trackId, uri: item.artworkUrl100, name: item.trackName, author: item.artistName })}>
                                <Image
                                    style={{ width: 25, height: 25 }}
                                    source={linkedMusic.find(music => music.id === item.trackId) ? starFull : star}
                                />
                            </TouchableOpacity>
                        </View>
                    }
                />
                :
                <Text style={{ textAlign: "center" }}>No result.</Text>
            }
        </View>
    )
}

export default Search