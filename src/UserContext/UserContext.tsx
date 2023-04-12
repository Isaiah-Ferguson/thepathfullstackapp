import { createContext } from "react";

interface UserContextData {
    myWord: string;
    setMyWord: (word: string) => void;
    time: string;
    setTime: (time: string) => void;
    selectedMonth: string;
    setSelectedMonth: (month: string) => void;
    selectedDay: number;
    setSelectedDay: (day: number) => void;
  }

const UserContext = createContext<UserContextData>({
    myWord: "",
    setMyWord: () => {},
    time: "",
    setTime: () => {},
    selectedMonth: "",
    setSelectedMonth: () => {},
    selectedDay: 1,
    setSelectedDay: () => {},
  });

export default UserContext