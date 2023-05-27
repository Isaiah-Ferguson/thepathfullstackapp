import React from 'react'
import { useState, useEffect, useContext } from "react";
import UserContext from "../../UserContext/UserContext";
import {  getMyFriendsList, getEventItemsByUserId, getUserInfoByID } from "../../DataServices/DataServices";

type eventID = {
    userId: number;
  }
export default function FriendEventIcon(props: eventID) {
    const data = useContext<any>(UserContext);
    const friend = require('../../assets/friends.png');
    const [isFriends, setIsFriends] = useState(false);

    
    useEffect(() => {
        const getLoggedInData = async () => {
          const storedValue = sessionStorage.getItem("loggedIn");
          const loggedIn = storedValue ? JSON.parse(storedValue) : data;
          const allUserData = await getMyFriendsList(loggedIn.userId);
          console.log(allUserData)
          const filteredList = allUserData.includes(props.userId)
        if(filteredList){
            setIsFriends(true)
        }else{
            setIsFriends(false)
        }
        };
        getLoggedInData()
      }, []);

  return (
    <>
    {isFriends ? <img title='Friends' src={friend}/> : null}
    </>
  )
}
