import { useState } from "react";

import React from 'react'

export default function UserHooks() {
    const [myWord, setMyWord] = useState("");
    const [time, setTime] = useState("")
    const [selectedMonth, setSelectedMonth] = useState('January');
    const [selectedDay, setSelectedDay] = useState(1);

  return {myWord, setMyWord, time, setTime, selectedMonth, setSelectedMonth, selectedDay, setSelectedDay };
  
}
