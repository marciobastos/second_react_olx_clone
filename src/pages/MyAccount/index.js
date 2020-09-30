import React, { useState, useEffect } from 'react';
import { PageArea, AdsUser } from './styled';
import useApi from '../../helpers/OlxApi';
import { doLogin } from '../../helpers/AuthHandler';
import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';
import MyAd from '../../components/partials/MyAd';
import Modal from '../../components/partials/Modal';
import ModalProduct from '../../components/partials/ModalProduct';


const Page = ()=> {
    const api = useApi();

    const [name, setName] = useState('');
    const [stateLoc, setStateLoc] = useState('');
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [stateList, setStateList] = useState([]);
    //pegar usuario
    const [user, setUser] = useState([]);
    //const [idUser, setId]
    const [modalStatus, setModalStatus] = useState(false);
    const [modalData, setModalData] = useState({});

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');
    //console.log(stateLoc);
    useEffect(()=>{
        const getStates = async ()=> {
            const slist = await api.getStates();
            setStateList(slist);
        }
        getStates();
    }, []);
    useEffect(()=>{
        const getingUser = async ()=>{
            const userj = await api.getUser();
            setUser(userj);
            setName(userj.name);
            setEmail(userj.email);
            setStateLoc(userj.state);
            //console.log(userj.ads);
        }
        getingUser();
    },[]);
    const handleSubmit = async (e)=> {
        e.preventDefault(); // previne o envio
        setDisabled(false);
        setError('');

        if(password !== confirmPass){
            setError('Senhas não conferem');
            setDisabled(true);
            return;
        }

        const json = await api.upload(name, email, password, stateLoc);

        if(json.error){
            setError(json.error);
        }else {
            doLogin(json.token);
            window.location.href = "/";
        }
        setDisabled(false);
    }
    const handleOpenModal = ()=>{
        setModalStatus(true);
    }
    const handleProductData = (data)=> {
        setModalData(data);
        console.log(data);

        handleOpenModal(true);

}
    return (
        <PageContainer>
            <PageTitle>Minha Conta</PageTitle>
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
                            <select name="state" value={stateLoc} onChange={e=>setStateLoc(e.target.value)}>
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
            <AdsUser>
                {user.ads && 
                    <>
                    <h2>Meus Anúncios</h2>
                    <div className="list">
                                {user.ads.map((i,k)=>
                                   <MyAd key={k} data={i} onClick={handleProductData}/>
                                )}
                            </div>
                    </>
                }
            </AdsUser>
            <Modal status={modalStatus} setStatus={setModalStatus}>
                
                <ModalProduct data={modalData} setStatus={setModalStatus}/>
            
            </Modal>
        </PageContainer>
    )
}
export default Page;