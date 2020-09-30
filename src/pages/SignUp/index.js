import React, { useState, useEffect } from 'react';
import { PageArea } from './styled';
import useApi from '../../helpers/OlxApi';
import { doLogin } from '../../helpers/AuthHandler';
import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';



const Page = ()=> {
    const api = useApi();

    const [name, setName] = useState('');
    const [stateLoc, setStateLoc] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [stateList, setStateList] = useState([]);

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');
    
    useEffect(()=>{
        const getStates = async ()=> {
            const slist = await api.getStates();
            setStateList(slist);
        }
        getStates();
    }, []);

    //recebe o evento;
    const handleSubmit = async (e)=> {
        e.preventDefault(); // previne o envio
        setDisabled(false);
        setError('');

        if(password !== confirmPass){
            setError('Senhas não conferem');
            setDisabled(true);
            return;
        }

        const json = await api.register(name, email, password, stateLoc);

        if(json.error){
            setError(json.error);
        }else {
            doLogin(json.token);
            window.location.href = "/";
        }
        setDisabled(false);
    }
    return (
        <PageContainer>
            <PageTitle>Cadastro</PageTitle>
            <PageArea>
                {error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }
               <form onSubmit={handleSubmit}>
               <label className="area">
                        <div className="area--title">Nome completo</div>
                        <div className="area--input">
                            <input 
                                type="text" 
                                disabled={disabled}
                                value={name}
                                onChange={e=>setName(e.target.value)}
                                required
                                />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Estado</div>
                        <div className="area--input">
                            <select value={stateLoc} onChange={e=>setStateLoc(e.target.value)}>
                                <option></option>
                                {stateList.map((item, index)=>
                                    <option key={index} value={item._id}>{item.name}</option>
                                )}
                            </select>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">E-mail</div>
                        <div className="area--input">
                            <input 
                                type="email" 
                                disabled={disabled}
                                value={email}
                                onChange={e=>setEmail(e.target.value)}
                                required
                                />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Senha</div>
                        <div className="area--input">
                            <input 
                                type="password" 
                                disabled={disabled}
                                value={password}
                                onChange={e=>setPassword(e.target.value)}
                                required
                                />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Confirmar Senha</div>
                        <div className="area--input">
                            <input 
                                type="password" 
                                disabled={disabled}
                                value={confirmPass}
                                onChange={e=>setConfirmPass(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled={disabled}>Fazer cadastro</button>
                        </div>
                    </label>  
               </form>
            </PageArea>
        </PageContainer>
    )
}
export default Page;