import { useContext, useState  } from "react";
import UserContext from "../UserContext/UserContext";

export default function UserHooks() {
  const [picture, setPicture] = useState<string>("")
  const [ name, setName ] = useState<object>({})

  return { picture, setPicture, name, setName };
}
