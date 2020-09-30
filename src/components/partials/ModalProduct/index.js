import React, {useEffect, useState, useRef } from 'react';
import 'react-slideshow-image/dist/styles.css';
import MaskedInput from 'react-text-mask';
import CreateNumberMask from 'text-mask-addons/dist/createNumberMask';
import useApi from '../../../helpers/OlxApi';
import { PageContainer, PageTitle, ErrorMessage } from '../../MainComponents';
import { createNumberMask } from 'text-mask-addons';
import { useHistory } from 'react-router-dom';

import { Container,
        ProductArea,
        ProductPhoto
} from './styled';
const url = 'http://alunos.b7web.com.br:501/media/';

export default ({ data, setStatus }) => {
    console.log(data);
    const api = useApi();
    const filefiled = useRef();
    const history = useHistory();

    const [categories, setCategories] = useState([]);

    const [title, setTitle] = useState(data.title);
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [priceNegotiable, setPriceNegotiable] = useState('');
    const [desc, setDesc] = useState('');

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    
    useEffect(()=>{
        const getCategories = async ()=>{
            const cats = await api.getCategories();
            setCategories(cats);

            //alert(JSON.stringify(data));
        }
        getCategories();

    }, []);
    //recebe o evento;
    const handleSubmit = async (e)=> {
        e.preventDefault(); // previne o envio
        setDisabled(true);
        setError('');

        let errors = [];

        if(!title.trim()){
            errors.push('Sem titulo');
        }
        if(!category){
            errors.push('Sem categoria');
        }
        if(errors.length === 0){
            const fData = new FormData();
            fData.append('title', title);
            fData.append('price', price);
            fData.append('priceneg', priceNegotiable);
            fData.append('desc', desc);
            fData.append('cat', category);

            if(filefiled.current.files.length > 0){
                for (let i = 0; i < filefiled.current.files.length; i++) {
                    fData.append('img', filefiled.current.files[i]);
                    
                }
            }
            const json = await api.addAd(fData);

            if(!json.error){
                history.push(`/ad/${json.id}`);
                return;
            }else{
                setError(json.error);
            }


        }else {
            setError(errors.join("\n"));
        }
        setDisabled(false);
    }
    const priceMask = createNumberMask({
        prefix:'R$ ',
        includeThousandsSeparator:true,
        thousandsSeparatorSymbol:'.',
        allowDecimal:true,
        decimalSymbol:','
    });

    return (
        <Container>
            {error &&
                    <ErrorMessage>{error}</ErrorMessage>
            }
            <ProductArea>
               <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area--title">Título</div>
                        <div className="area--input">
                            <input 
                                type="text" 
                                disabled={disabled}
                                value={title}
                                onChange={e=>setTitle(e.target.value)}
                                required
                                />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Categoria</div>
                        <div className="area--input">
                            <select
                                disabled={disabled}
                                onChange={e=>setCategory(e.target.value)} value={data.category}
                            >
                                <option></option>
                                {categories && categories.map(i=>
                                    <option key={i._id} value={i._id}>{i.name}</option>
                                    )}
                            </select>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Preço</div>
                        <div className="area--input">
                            <MaskedInput 
                                mask={priceMask}
                                placeholder="R$ "
                                disabled={disabled || priceNegotiable}
                                value={price}
                                onChange={e=>setPrice(e.target.value)}
                            
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Preço Negociável</div>
                        <div className="area--input">
                            <input 
                                type="checkbox"
                                disabled={disabled}
                                checked={priceNegotiable}
                                onChange={e=>setPriceNegotiable(!priceNegotiable)}
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Descrição</div>
                        <div className="area--input">
                            <textarea
                                 disabled={disabled}
                                 value={desc}
                                 onChange={e=>setDesc(e.target.value)}   
                            >
                            </textarea>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Imagens (1 ou mais)</div>
                        <div className="area--input">
                            <input 
                                type="file"
                                disabled={disabled}
                                ref={filefiled}
                                multiple
                            />    
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled={disabled}>Adicionar Anúncio</button>
                        </div>
                    </label>  
               </form>
            </ProductArea>
        </Container>

    );
}