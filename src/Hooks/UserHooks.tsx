import { useState } from "react";

export default function UserHooks() {
  const [picture, setPicture] = useState<string>("");
  const [ name, setName ] = useState<object>({});
  const [ myName, setMyName ] = useState<string>("");
  const [ userId, setUserId ] = useState<number>(0);
  const [ myId, setMyId ] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [shouldReload, setShouldReload] = useState<boolean>(false);
  const [eventReload, setEventReload] = useState<boolean>(false);
  const [friendsReload, setFriendsReload] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<boolean>(false);


  return {newUser, setNewUser, friendsReload, setFriendsReload, eventReload, setEventReload, shouldReload, setShouldReload, picture, setPicture, name, setName, userId, setUserId, count, setCount, myId, setMyId };
}
