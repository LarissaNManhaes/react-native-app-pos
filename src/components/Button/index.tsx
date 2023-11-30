import { Button as NativeButton } from "native-base";

interface Props {
    content: string;
    variantion: string;
    handleClick: () => void
}

export default function Button({content, variantion, handleClick}: Props) {
    return (
        <NativeButton bg={`${variantion}.100`} mt={3} onPress={handleClick}>
            {content}
        </NativeButton>
    );
}