import { useState } from "react";

import React from 'react'

export default function UserHooks() {
    const [myWord, setMyWord] = useState("");


  return {myWord, setMyWord};
  
}
