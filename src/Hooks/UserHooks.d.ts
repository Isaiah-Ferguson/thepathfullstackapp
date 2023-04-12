declare module './UserHooks' {
    const value: {
      myWord: string;
      setMyWord: (word: string) => void;
      time: string;
      setTime: (time: string) => void;
      selectedMonth: string;
      setSelectedMonth: (month: string) => void;
      selectedDay: number;
      setSelectedDay: (day: number) => void;
    };
    export default value;
  }
  