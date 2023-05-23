let userData = {};
interface userData {
    userId: number;
    publisherName: string;
  }
const url = 'https://thepathapi.azurewebsites.net';

  async function createAccount(CreatedUser : object) {
      //We want to target our User Controller
      const res = await fetch(url + '/User/AddUser',{
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

  async function forgotPassword(CreatedUser : object) {
    //We want to target our User Controller
    const res = await fetch(url + '/User/updatepassword',{
        method:"PUT",
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
      const res = await fetch(url + '/User/Login',{
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

  async function GetAllJoinedEvents() {
    let res = await fetch( url + `/joinevent/GetAllEventsJoined`)
    let data = await res.json();
    return data;
}

  
  async function GetLoggedInUserData(username: string) {
      let res = await fetch( url + `/User/userbyusername/${username}`)
      let data = await res.json();
      userData = data;
      return userData;
  }

  async function searchUser(username: string) {
    let res = await fetch( url + `/User/userbyusername/${username}`)
    let data = await res.json();
    return data;
}

  
  async function GetPublishedBlogItem() {
      let res = await fetch( url + `/Blog/getblogitems/`)
      let data = await res.json();
      return data;
  }

  async function GetAcademyList(academyname: string) {
    let res = await fetch( url + `/AcademyList/${academyname}`)
    let data = await res.json();
    return data;
}

async function GetAllUsers() {
    let res = await fetch( url + `/User/GetAllUsers/`)
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
      let res = await fetch( url + `/blog/GetBlogItemById/${userId}`)
      let data = await res.json();
      return data;
  }

  async function addBlogItem(blogItem: object) {
    const res = await fetch( url + '/blog/AddBlogItem',{
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
      const res = await fetch( url + '/blog/UpdateBlogitem',{
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

  async function updatePassword(blogItem : object) {
    const res = await fetch( url + '/blog/UpdateBlogitem',{
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
    const res = await fetch( url + '/AcademyEvents/UpdateEvent',{
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

async function joinEventItem(EventId : number, UserId: any) {
    const res = await fetch( url + `/joinevent/joinevent/${EventId}/${UserId}`,{
        method:"POST",
        headers:{
            'Content-Type':"application/json"
        },
        body:JSON.stringify(EventId, UserId)
    });
    if(!res.ok){
        const message = `An Error has Occured  ${res.status}`;
        throw new Error(message);
    }
    const data = await res.json();
    return data;
}

  async function updateUserInfo(userInfo : object, UserNumber: number) {
    const res = await fetch( url + `/User/UpdateUser/${UserNumber}`,{
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
    let res = await fetch( url + `/user/getuserbyid/${userId}`)
    let userInfoData = await res.json();
    return userInfoData;
}


async function eventBlogItem(blogItem: object) {
    const res = await fetch( url + '/AcademyEvents/CreateEvent',{
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
    let res = await fetch( url + `/AcademyEvents/GetEventItems/`)
    let eventData = await res.json();
    return eventData;
}

async function getFriendsList() {
    let res = await fetch( url + `/friends/getfriendslist/`)
    let eventData = await res.json();
    return eventData;
}

async function getMyFriendsList(id: number) {
    let res = await fetch( url + `/friends/getuserfriends/${id}`)
    let eventData = await res.json();
    return eventData;
}

async function AddFriend(myId: number, OtherId: (number | string)[] ) {
    const res = await fetch( url + `/friends/addafriend/${myId}/${OtherId}`,{
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


async function RemoveFriend(myId: number, friendUserID: (number | string)[] ) {
    const res = await fetch( url + `/friends/deletefriend/${myId}/${friendUserID}`,{
        method:"PUT",
        headers:{
            'Content-Type':"application/json"
        },
        body:JSON.stringify(myId, friendUserID)
    });
    if(!res.ok){
        const message = `An Error has Occured  ${res.status}`;
        throw new Error(message);
    }
    const eventData = await res.json();
    return eventData;
}


async function AddFriendResponse( id:number, myId: number, OtherId: (number | string)[]) {
    const iAccepted = true;
    const isDenied = false;
    const res = await fetch( url + `/friends/friendupdate/${id}/${myId}/${OtherId}/${iAccepted}/${isDenied}`,{
        method:"PUT",
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

async function denyFriendResponse( id:number, myId: number, OtherId: (number | string)[]) {
    const iAccepted = false;
    const isDenied = true;
    const res = await fetch( url + `/friends/friendupdate/${id}/${myId}/${OtherId}/${iAccepted}/${isDenied}`,{
        method:"PUT",
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



  export { RemoveFriend, forgotPassword, GetAllJoinedEvents, joinEventItem, getMyFriendsList, denyFriendResponse, AddFriendResponse, updateEventItem, getFriendsList, AddFriend, createAccount, login ,GetLoggedInUserData, GetPublishedBlogItem, checkToken, loggedInData, addBlogItem, getBlogItemsByUserId, updateBlogItem, updateUserInfo, eventBlogItem, getEventItemsByUserId, GetAcademyList, getUserInfoByID, searchUser, GetAllUsers }