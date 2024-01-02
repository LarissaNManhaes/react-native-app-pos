import { Text, Image, Flex } from "native-base";
import { TouchableOpacity } from "react-native";

interface Props {
    id: string;
    name: string,
    img : string,
}

export default function Stories({ id, name, img }: Props) {

    return (
        <TouchableOpacity >
            <Image source={{ uri: img }} borderColor={"primary.200"} borderWidth={"4"} borderRadius={100} alt="Alternate Text" size="md" ml={2} mr={2} />
            <Flex alignItems={"center"}>
                <Text color={"secondary.100"}>{name}</Text>
            </Flex>
        </TouchableOpacity>
    );
}