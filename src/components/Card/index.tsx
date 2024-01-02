import { Image, Card as CardNative  } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";

interface Props {
  id: string,
  album?: string;
  img?: string;
  description?: string,
  music?: string,

  setSelectedAlbum?: (album: string) => void;
  setSelectedId: (id : string) => void,

}

export default function Card({img, music, id, album, setSelectedAlbum, setSelectedId}: Props) {
  
  return (
    <CardNative>
      <TouchableOpacity onPress={() => setSelectedId(id)}>
        <Image  m={2} source={{  uri: img }}  alt="Alternate Text"  size="xl"/>
      </TouchableOpacity>
    </CardNative>
  );
}
