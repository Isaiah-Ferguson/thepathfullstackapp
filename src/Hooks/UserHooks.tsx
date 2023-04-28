import { useState } from "react";

export default function UserHooks() {
  const [picture, setPicture] = useState<string>("");
  const [ name, setName ] = useState<object>({});
  const [ userId, setUserId ] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  return { picture, setPicture, name, setName, userId, setUserId, count, setCount };
}
