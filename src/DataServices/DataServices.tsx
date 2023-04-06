let userData = {};
interface User {
    name: string;
    email: string;
    password: string;
  }

async function createAccount(CreatedUser: string) {
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

async function login(loginUser: string) {
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
    console.log(userData);
}

async function GetPublishedBlogItem() {
    let res = await fetch(`https://isaiahblogtest.azurewebsites.net/Blog/GetPublishedItems/`)
    let data = await res.json();
    return data;
}

export { createAccount, login,GetLoggedInUserData }