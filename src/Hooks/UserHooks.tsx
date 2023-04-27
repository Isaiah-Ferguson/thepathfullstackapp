import { useContext, useState  } from "react";
import UserContext from "../UserContext/UserContext";

export default function UserHooks() {
  const [picture, setPicture] = useState<string>("");
  const [ name, setName ] = useState<object>({});
  const [ userId, setUserId ] = useState<number>(0);
  const [ NotificationCount, setNotificationCount] = useState<number>(0);

  return { picture, setPicture, name, setName, userId, setUserId, NotificationCount, setNotificationCount };
}
