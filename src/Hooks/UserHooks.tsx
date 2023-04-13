import { useState } from "react";

import React from 'react'

export default function UserHooks() {
    const [picture, setPicture] = useState("");

  return {picture, setPicture};
  
}
