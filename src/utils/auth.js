export const authenticate = (data, next) =>{
    if(typeof window !== "undefined"){
        localStorage.setItem("foodshala", JSON.stringify(data));
        next();
}
};

export const logout = () =>{
    if(typeof window !== "undefined"){
        localStorage.removeItem("foodshala");
        return fetch(`${process.env.REACT_APP_LIVE}/api/auth/signout`, {
            method:"GET"
        })
        .then(res=>{
            console.log("signout success");
        })
        .catch(err=>console.log(err));
    }
};

export const isAuthenticated = () =>{
    if(typeof window == "undefined"){
        return false
    }
    if (localStorage.getItem("foodshala")){
        return JSON.parse(localStorage.getItem("foodshala"));
    }else{
        return false;
    }
};
