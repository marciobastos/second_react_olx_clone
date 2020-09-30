import Cookie from 'js-cookie';
import qs from 'qs';

const BASEURL = 'http://alunos.b7web.com.br:501';
const apiFetchFile = async(endpoint, body)=>{
    //verifica sem nao tem(existe) token;
    if(!body.token){
        // pega o token do cookie;
        let token = Cookie.get('token');
        if(token){
            //adiciona o token ao body;
            body.append('token',token);
        }
    }
    const res = await fetch(BASEURL+endpoint, {
        method: 'POST',
        body
    });
        const json = await res.json();
    
        if(json.notallowed){
            window.location.href = '/signin';
            return;
        }

        return json;
}
const apiFetchPost = async (endpoint, body)=>{
    //verifica sem nao tem(existe) token;
    if(!body.token){
        // pega o token do cookie;
        let token = Cookie.get('token');
        if(token){
            //adiciona o token ao body;
            body.token = token;
        }
    }
    const res = await fetch(BASEURL+endpoint, {
        method: 'POST',
        headers:{
            'Accpet': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(body)
    })
        const json = await res.json();
        if(json.notallowed){
            window.location.href = '/signin';
            return;
        }

        return json;
}
const apiFetchGet = async (endpoint, body = [])=>{
    //verifica sem nao tem(existe) token;
    if(!body.token){
        // pega o token do cookie;
        let token = Cookie.get('token');
        
        if(token){
            //adiciona o token ao body;
            body.token = token;
        }
    }
    const res = await fetch(`${BASEURL+endpoint}?${qs.stringify(body)}`)
    const json = await res.json();

        if(json.notallowed){
            window.location.href = '/signin';
            return;
        }

        return json;
}
const apiFetchPut = async (endpoint, body)=>{
    //verifica sem nao tem(existe) token;
    if(!body.token){
        // pega o token do cookie;
        let token = Cookie.get('token');
        if(token){
            //adiciona o token ao body;
            body.token = token;
        }
    }
    const res = await fetch(BASEURL+endpoint, {
        method: 'PUT',
        headers:{
            'Accpet': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(body)
    })
        const json = await res.json();
        if(json.notallowed){
            window.location.href = '/signin';
            return;
        }

        return json;
}
const OlxApi = {

    login: async (email, password ) =>{
        const json = await apiFetchPost(
            '/user/signin',
            {email, password}
        );

        return json;
    },
    register: async (name, email, password, stateLoc)=>{
        const json = await apiFetchPost(
            '/user/signup',
            {name, email, password, state:stateLoc}
        );
        return json;    
    },
    upload: async (name, email, password, stateLoc)=>{
        const json = await apiFetchPut(
            '/user/me',
            {name, email, password, state:stateLoc}
        );
        return json;    
    },
    getStates: async ()=>{
        const json = await apiFetchGet(
            '/states'
        );
        return json.states;
    },
    getCategories: async ()=>{
        const json = await apiFetchGet(
            '/categories'
        );
        return json.categories;
    },
    getAds: async (options)=> {
        const json = await apiFetchGet(
            '/ad/list',
            options
        );
        return json;
    },
    getAd: async(id , other = false)=>{
        const json = await apiFetchGet(
            '/ad/item',
            {id, other}
        );
        //console.log(json);
        return json;
    },
/*    getAdsUser: async (name)=> {
        const json = await apiFetchGet(
            '/ad/list',
            name
        );
        console.log(json);
        return json;
    }, */
    addAd: async (fData) => {
        const json = await apiFetchFile(
            '/ad/add',
            fData
        );
        return json;
    },
    getUser: async (options) => {
        const json = await apiFetchGet(
            '/user/me',
            options
        );
        return json;
        console.log(json);
    }

}

export default () => OlxApi;