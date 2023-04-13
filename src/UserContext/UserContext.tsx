import { createContext } from "react";

interface UserContextData {
  picture: string;
  setPicture: (word: string) => void;
}

const UserContext = createContext<UserContextData>({
  picture: "",
  setPicture: () => { },
});

export default UserContext