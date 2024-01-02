import { createContext } from "react";
import { MMKV } from "react-native-mmkv";


export type RootStackParamList = {
    Wrapper: { id: number } | undefined;
    Home: { id: number } | undefined;
    Albums: { id: number } | undefined;
    Artist: { id : string, name : string, img : string } | undefined;
  };
  
export type IUser = {
    name : string;
    email: string | null;
    password: string;
    token : string | null;
}
type IUserContext = {
    user: IUser | null
    setUser : (userData : IUser | null) => void 
}

export const storage = new MMKV({
    id: 'movieapp'
  });


const UserContext = createContext<IUserContext>({ user: null, setUser: () => {} });

export default UserContext
