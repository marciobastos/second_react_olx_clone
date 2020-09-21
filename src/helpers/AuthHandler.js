import Cookie from 'js-cookie';

export const isLogged = ()=> {
    let token = Cookie.get('token');
    return (token) ? true : false;
    console.log(token);
} 
export const doLogin = (token, rememberPass = false) => {
    if(rememberPass){
        Cookie.set('token', token, {expires:999});
    }else{
        // expira se o browser for fechado;
        Cookie.set('token', token);
    }
}
export const doLogout = ()=>{
    Cookie.remove('token');
}