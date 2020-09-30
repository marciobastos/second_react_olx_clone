import React from 'react';
import { Link } from 'react-router-dom';
import {Item } from './styled';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const url = 'http://alunos.b7web.com.br:501/media/';
export default ({data, onClick})=>{
    let price = '';
    //console.log(JSON.stringify(props.data.images));
    //let images = JSON.stringify(props.data.images);
    let teste = [{name: 'Marcio', age: 29}];
    const handleOpenModal = ()=> {
        onClick(data);
        //console.log(data);
    }
    if(data.priceNegotiabel){
        price = "Preço Negociável";
    }    
    else {
        price = `R$ ${data.price}`;
    }
    return (
        <Item className="adItem" onClick={handleOpenModal}>
            
            <Link to={`#`}>
                <div className="itemImage">
                    <Slide>
                        {data.images.map((img, k)=>
                        <div key={k} className="each-slide">
                            <img src={`${url}${img.url}`} alt="Not found"/>
                        </div>                   
                        )}
                    </Slide>
                    
                </div>
                <div className="itemName">{data.title}</div>
                <div className="itemPrice">{price}</div>
                <div className="hover-title">
                    <h2>Clique para editar</h2>
                </div>        
            </Link>
             
        </Item>
    );

}