import React from 'react';
import { Link } from 'react-router-dom';
import {Item } from './styled';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

export default (props)=>{
    let price = '';
    let images = JSON.stringify(props.data.images);
    alert(images);
    if(props.data.priceNegotiabel){
        price = "Preço Negociável";
    }    
    else {
        price = `R$ ${props.data.price}`;
    }
    return (
        <Item className="adItem">
            <Link to={`/ad/${props.data.id}`}>
                <div className="itemImage">
                    <Slide>
                        {[...images].map((img, k)=>
                        <div key={k} className="each-slide">
                            <img src={img} alt="Not found"/>
                        </div>                   
                        )}
                    </Slide>
                </div>
                <div className="itemName">{props.data.title}</div>
                <div className="itemPrice">{price}</div>
            </Link>
        </Item>
    );
}