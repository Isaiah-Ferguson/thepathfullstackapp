let userData = {};
interface userData {
    userId: number;
    publishName: string;
  }


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
      console.log(data);
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
      console.log(data);
      //We are not writeing a return because this is a POST.
      return data;
  }
  
  async function GetLoggedInUserData(username: string) {
      let res = await fetch(`https://thepathapi.azurewebsites.net/User/userbyusername/${username}`)
      let data = await res.json();
      userData = data;
      return userData;
  }
  
  async function GetPublishedBlogItem() {
      let res = await fetch(`https://thepathapi.azurewebsites.net/Blog/getblogitems/`)
      let data = await res.json();
      console.log(data);
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
  
  function loggedInData() {
    console.log(userData);
      return userData;
      //this will consist of user ID and their Name.
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
  
  async function getBlogItemsByUserId(userId: number) {
      console.log(userId);
      let res = await fetch(`https://thepathapi.azurewebsites.net/blog/GetBlogItemById/${userId}`)
      let data = await res.json();
      return data;
  }
  
  async function updateBlogItem(blogItem : object) {
      const res = await fetch('https://thepathapi.azurewebsites.net/blog/UpdateBlogitem',{
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

  async function updateUserInfo(userInfo : object) {
    const res = await fetch('https://thepathapi.azurewebsites.net/User/UpdateUser',{
        method:"POST",
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
    console.log(data)
    return data;
}
  export { createAccount, login ,GetLoggedInUserData, GetPublishedBlogItem, checkToken, loggedInData, addBlogItem, getBlogItemsByUserId, updateBlogItem, updateUserInfo }