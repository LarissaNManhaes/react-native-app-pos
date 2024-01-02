import { Flex, Heading, Icon, Input } from "native-base";
import { Ionicons } from '@expo/vector-icons';
import { Alert } from "react-native";
import { useContext, useState } from "react";
import Button from "../../components/Button";
import UserContext from "../../context/user";
import { login } from "../../services/auth";
import React from "react";

export default function Login() {
 
  const userData = useContext(UserContext);

  userData.user?.token;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isWaiting, setIsWaiting] = React.useState(false);

  const handleLogin = () => {
    setUsername(username.toLocaleLowerCase());
    setIsWaiting(true);
    login({username, password})
        .then(function (response) {
          userData.setUser({name: username, password:password, email: null, token: response.data.token});
        })
        .catch(function (error) {           
          Alert.alert("Error", error.message);
        });
     setIsWaiting(false);
  }

  return (
    <Flex p={8} flex={1} justifyContent="center" alignItems="center">
      <Heading>Login</Heading>
      <Input 
       mt={2}
       w={{ base: "90%", md: "25%" }}
       InputLeftElement={
         <Icon
           as={Ionicons}
           name={"person"}
           size={5}
           ml="2"
           color="muted.400"
         />
       }  
      onChangeText={(value) => setUsername(value)} />
      <Input w={{ base: "90%", md: "25%" }} mt={2} onChangeText={(value) => setPassword(value)} />
      <Flex width="100%">
        <Button content="Sign in" handleClick={handleLogin} />
      </Flex>
    </Flex>
  );
}
