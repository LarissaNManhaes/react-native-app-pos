import { Flex, Heading, Icon, Input, Pressable } from "native-base";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../components/Button";
import { register } from "../../services/auth";
import { Alert } from "react-native";

export default function Register() {
  const [show, setShow] = React.useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    await setUsername(username.toLocaleLowerCase());
    register({ username, password })
      .then(function (response) {
        console.log(response);
        Alert.alert("Registro criado com sucesso!", "Faça seu Login.");
      })
      .catch(function (error) {
        Alert.alert(error.message);
      });
  };

  return (
    <Flex p={8} flex={1} justifyContent="center" alignItems="center">
      <Heading>Crie sua conta</Heading>

      <Input
        mt={"1.5"}
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
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
      />

      <Input
        w={{ base: "90%", md: "25%" }}
        mt={"1.5"}
        type={show ? "text" : "password"}
        InputRightElement={
          <Pressable onPress={() => setShow(!show)}>
            <Icon
              as={Ionicons}
              name={show ? "eye" : "eye-off-outline"}
              size={5}
              mr="2"
              color="muted.400"
            />
          </Pressable>
        }
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
      />

      <Flex width={"100%"}>
        <Button
          content="Cadastrar"
          handleClick={() => {
            handleRegister();
          }}
        />
      </Flex>
    </Flex>
  );
}
