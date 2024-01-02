import { Box, Flex, HStack, IconButton, Text } from "native-base";
import { useContext, useEffect, useState } from "react";
import UserContext, { RootStackParamList, storage } from "../../context/user";
import { FlatList } from "react-native";
import Card from "../../components/Card";
import Selected from "../../components/Selected";

import { getAlbums, getStories } from "../../services/album";
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import AlbumContext, { albumsContext } from "../../context/album";
import Stories from "../../components/Storie";

export default function Home() {

    const userContext = useContext(UserContext);
    const albumContext = useContext(AlbumContext);

    
    const [getId, setgetId] = useState("0");
    const [selectedAlbum, setSelectedAlbum] = useState("");
    const [albums, setAlbums] = useState([] as any);
    const [stories, setStories] = useState();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    useEffect(() => {
        if (getId !== "0" && albums) {
            const album = albums.find((element:any) => element.id === getId);
            navigation.navigate("Albums", { album: album });           
        }        
        
    }, [getId]);

    useEffect(() => {
        if(albums && albums != undefined){
            if(albumsContext.length !== albums.length){
                albumsContext.splice(0, albumsContext.length)
                albumsContext.push(...albums);
            }
        }
    }, [albums]); 

    useEffect(() => {
        if (userContext && userContext.user && userContext.user.token) {
            getAlbums(userContext.user.token).then(r => setAlbums(r.data)).catch(e => console.log("erro", e));
            getStories(userContext.user.token).then(r => setStories(r.data)).catch(e => console.log("erro", e));      
        }
    }, []);

    const logout = () => {
        const user = storage.getString("user");
        storage.delete("user");
        userContext.setUser(null);
    }

    useEffect(() => {
        if (!userContext || !userContext.user || !userContext.user.token) {
            navigation.navigate('Wrapper');
        }
    }, [userContext])


    return (
        <Flex safeAreaTop p={5} flex={1} justifyContent='center' alignItems='center' bg={"primary.100"}>
            <HStack px="1" py="3" justifyContent="space-between" alignItems="center" w="100%" maxW="350">
                <HStack alignItems="center">
                    <Text color="white" fontSize="20" fontWeight="bold">
                        Oi, {userContext.user!.name}
                    </Text>
                </HStack>
                <HStack>
                    <IconButton alignSelf={"flex-end"} ml={4} style={{ backgroundColor: "#FFF", borderRadius: 100 }} onPress={logout} 
                        _icon={{as: MaterialIcons,name: "logout",color: "primary.100"}} />
                </HStack>
            </HStack>

            <Box h={"3xs"}>
                <Text style={{ color: "#FFF" }} fontSize={'xs'} alignSelf={"flex-start"}>Artistas</Text>
                <FlatList style={{ marginTop: "5%" }} horizontal={true} data={stories} renderItem={({ item }) => <Stories id={item.id} name={item.name} img={item.img} />} />
            </Box>
            
            <Text style={{ color: "#FFF" }} mt={"12"} fontSize={'xs'} alignSelf={"flex-start"}>Albuns</Text>

            <FlatList horizontal={true}
                data={albums}
                renderItem={({ item }) => <Card setSelectedId={setgetId} id={item.id} music={item.music} img={item.img} />}
                keyExtractor={(item) => item.id}
            />
            {
                selectedAlbum && selectedAlbum.toString() !== "" ? (<Selected text={selectedAlbum} />) : <></>
            }
        </Flex>
    );
}