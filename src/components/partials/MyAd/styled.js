import styled from 'styled-components';

export const Item = styled.div`
a { 
    position: relative;
    display: block;
    margin: 10px;
    text-decoration: none;
    padding: 10px;
    border-radius: 5px;
    color: #000;
    background-color: #fff;
    transition: all ease .2s;

    &:hover .hover-title{
        display: flex;
    }

    .itemImage img {
        width: 100%;
        border-radius: 5px;
        height: 300px;
    }
    .itemName {
        font-weight: bold;
    }
    .hover-title {
        position: absolute;
        display: none;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        background-color: rgba(0,0,0, .5);
        border-radius: inherit;
        width: inherit;
        height: 100%;
        color: #fff;
        top:0;
        right:0;
        left: 0;
        bottom: 0;
    }

}
`;