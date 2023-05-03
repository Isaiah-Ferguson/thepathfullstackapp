let userData = {};


// interface User {
//     name: string;
//     email: string;
//     password: string;
//   }

interface userData {
    userId: number;
    publisherName: string;
  }

  interface eventData{
    Id: number,
    UserId: number,
    Date: number,
    PublisherName: string,
    Title: string,
    Address: string,
    Description: string,
    isPublish: true,
    isDeleted: boolean,
    image: string
  }

  let userInfoData = {}

  async function createAccount(CreatedUser : object) {
      //We want to target our User Controller
      const res = await fetch('https://thepathapi.azurewebsites.net/User/AddUser',{
          method:"POST",
          headers:{
              'Content-Type':"application/json"
          },
          body:JSON.stringify(CreatedUser)
      });
      if(!res.ok){
          const message = `An Error has Occured  ${res.status}`;
          throw new Error(message);
      }
      const data = await res.json();

      return data;
      //We are not writeing a return because this is a POST.
  }
  
  async function login(loginUser : object) {
      const res = await fetch('https://thepathapi.azurewebsites.net/User/Login',{
          method:"POST",
          headers:{
              'Content-Type':"application/json"
          },
          body:JSON.stringify(loginUser)
      });
      if(!res.ok){
          const message = `An Error has Occured  ${res.status}`;
          throw new Error(message);
      }
      const data = await res.json();
      //We are not writeing a return because this is a POST.
      return data;
  }
  
  async function GetLoggedInUserData(username: string) {
      let res = await fetch(`https://thepathapi.azurewebsites.net/User/userbyusername/${username}`)
      let data = await res.json();
      userData = data;
      return userData;
  }

  async function searchUser(username: string) {
    let res = await fetch(`https://thepathapi.azurewebsites.net/User/userbyusername/${username}`)
    let data = await res.json();
    return data;
}

  
  async function GetPublishedBlogItem() {
      let res = await fetch(`https://thepathapi.azurewebsites.net/Blog/getblogitems/`)
      let data = await res.json();
      return data;
  }

  async function GetAcademyList(academyname: string) {
    let res = await fetch(`https://thepathapi.azurewebsites.net/AcademyList/${academyname}`)
    let data = await res.json();
    return data;
}

async function GetAllUsers() {
    let res = await fetch(`https://thepathapi.azurewebsites.net/User/GetAllUsers/`)
    let data = await res.json();
    return data;
}
  
  function checkToken() {
      let result = false;
      let lsData = localStorage.getItem('Token');
      if(lsData != null){
          result = true;
      }
      return result;
  }
  
  function loggedInData(){
      return userData as userData;
      //this will consist of user ID and their Name.
  }
  

  
  async function getBlogItemsByUserId(userId: number) {
      let res = await fetch(`https://thepathapi.azurewebsites.net/blog/GetBlogItemById/${userId}`)
      let data = await res.json();
      return data;
  }

  async function addBlogItem(blogItem: object) {
    const res = await fetch('https://thepathapi.azurewebsites.net/blog/AddBlogItem',{
        method:"POST",
        headers:{
            'Content-Type':"application/json"
        },
        body:JSON.stringify(blogItem)
    });
    if(!res.ok){
        const message = `An Error has Occured  ${res.status}`;
        throw new Error(message);
    }
    const data = await res.json();
    return data;
}
  
  async function updateBlogItem(blogItem : object) {
      const res = await fetch('https://thepathapi.azurewebsites.net/blog/UpdateBlogitem',{
          method:"PUT",
          headers:{
              'Content-Type':"application/json"
          },
          body:JSON.stringify(blogItem)
      });
      if(!res.ok){
          const message = `An Error has Occured  ${res.status}`;
          throw new Error(message);
      }
      const data = await res.json();
      return data;
  }

  async function updateEventItem(blogItem : object) {
    const res = await fetch('https://thepathapi.azurewebsites.net/AcademyEvents/UpdateEvent',{
        method:"PUT",
        headers:{
            'Content-Type':"application/json"
        },
        body:JSON.stringify(blogItem)
    });
    if(!res.ok){
        const message = `An Error has Occured  ${res.status}`;
        throw new Error(message);
    }
    const data = await res.json();
    return data;
}

  async function updateUserInfo(userInfo : object, UserNumber: number) {
    const res = await fetch(`https://thepathapi.azurewebsites.net/User/UpdateUser/${UserNumber}`,{
        method:"put",
        headers:{
            'Content-Type':"application/json"
        },
        body:JSON.stringify(userInfo)
    });
    if(!res.ok){
        const message = `An Error has Occured  ${res.status}`;
        throw new Error(message);
    }
    const data = await res.json();
    return data;
}

async function getUserInfoByID(userId: number) {
    let res = await fetch(`https://thepathapi.azurewebsites.net/user/getuserbyid/${userId}`)
    let userInfoData = await res.json();
    return userInfoData;
}


async function eventBlogItem(blogItem: object) {
    const res = await fetch('https://thepathapi.azurewebsites.net/AcademyEvents/CreateEvent',{
        method:"POST",
        headers:{
            'Content-Type':"application/json"
        },
        body:JSON.stringify(blogItem)
    });
    if(!res.ok){
        const message = `An Error has Occured  ${res.status}`;
        throw new Error(message);
    }
    const eventData = await res.json();
    return eventData;
}

async function getEventItemsByUserId(userId: number) {
    let res = await fetch(`https://thepathapi.azurewebsites.net/AcademyEvents/GetEventItems/`)
    let eventData = await res.json();
    return eventData;
}

async function getFriendsList() {
    let res = await fetch(`https://thepathapi.azurewebsites.net/friends/getfriendslist/`)
    let eventData = await res.json();
    return eventData;
}

async function AddFriend(myId: number, OtherId: (number | string)[] ) {
    const res = await fetch(`https://thepathapi.azurewebsites.net/friends/addafriend/${myId}/${OtherId}`,{
        method:"POST",
        headers:{
            'Content-Type':"application/json"
        },
        body:JSON.stringify(myId, OtherId)
    });
    if(!res.ok){
        const message = `An Error has Occured  ${res.status}`;
        throw new Error(message);
    }
    const eventData = await res.json();
    return eventData;
}

// async function AddFriend(myId: number, OtherId: (number | string)[], isAccepted: boolean, isDeleted: boolean ) {
//     const res = await fetch(`https://thepathapi.azurewebsites.net/friends/addafriend/${myId}/${OtherId}/${isAccepted}/${isDeleted}`,{
//         method:"POST",
//         headers:{
//             'Content-Type':"application/json"
//         },
//         body:JSON.stringify(myId, OtherId, isAccepted, isDeleted)
//     });
//     if(!res.ok){
//         const message = `An Error has Occured  ${res.status}`;
//         throw new Error(message);
//     }
//     const eventData = await res.json();
//     return eventData;
// }

async function AddFriendResponse(myId: number, OtherId: (number | string)[], isAccepted: any) {
    const res = await fetch(`https://thepathapi.azurewebsites.net/friends/addafriend/${myId}/${OtherId}/${isAccepted}`,{
        method:"PUT",
        headers:{
            'Content-Type':"application/json"
        },
        body:JSON.stringify(myId, OtherId, isAccepted)
    });
    if(!res.ok){
        const message = `An Error has Occured  ${res.status}`;
        throw new Error(message);
    }
    const eventData = await res.json();
    return eventData;
}

  export { AddFriendResponse, updateEventItem, getFriendsList, AddFriend, createAccount, login ,GetLoggedInUserData, GetPublishedBlogItem, checkToken, loggedInData, addBlogItem, getBlogItemsByUserId, updateBlogItem, updateUserInfo, eventBlogItem, getEventItemsByUserId, GetAcademyList, getUserInfoByID, searchUser, GetAllUsers }