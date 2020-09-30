import styled from 'styled-components';

export const Container = styled.div`
    width: 750px;
    height: auto;
    display: flex;
    justify-content: center;
    padding: 20px;
`;

export const ProductArea = styled.div`
    height: auto;
    display: flex;

    form {
        background-color: #fff;
        border-radius: 3px;
        padding: 10px;
        box-shadow: 0px 0px 3px #999;
    
        .area {
            display: flex;
            align-items: center;
            padding: 10px;
            max-width: 500px;
    
            .area--title {
                width: 200px;
                text-align: right;
                padding-right: 20px;
                font-weight: bold;
                font-size: 14px;
            }
            .area--input {
                flex: 1;
                
    
                input, select, textarea {
                    width: 100%;
                    font-size: 14px;
                    padding: 5px;
                    border: 1px solid #ddd;
                    border-radius: 3px;
                    outline: 0;
                    transition: all ease .4s;
    
                    &:focus {
                        border: 1px solid #333;
                        color: #333;
                    }
                    
                }
                textarea {
                    height: 150px;
                    resize: none;
                }
                    button {
                        background-color: #0089FF;
                        border: 0;
                        outline: 0;
                        padding: 5px 10px;
                        border-radius: 4px;
                        color: #fff;
                        font-size: 15px;
                        cursor: pointer;
    
                        &:hover {
                            background-color: #006FCE;
                        }
                    }
            }
        }
    }
`;
export const ProductButtons = styled.div`
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
`;
export const ProductPhoto = styled.img`
    width: 410px;
    height: 300px;
    border-radius: 10px;
`;
export const ProductInfoArea = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 10px;
`;
export const ProductDetails = styled.div`
    
`;
export const ProductQuantityArea = styled.div`
    height: 50px;
    display: flex;
    justify-content: space-between;
`;
export const ProductName = styled.input`
    font-size: 30px;
    font-weight: bold;
    color: #999;
    margin-bottom: 20px;
`;
export const ProductData = styled.input`
    font-size: 14px;
`;
export const ProductButton = styled.button`
    background-color: #0089FF;
    border: 0;
    outline: 0;
    padding: 5px 10px;
    border-radius: 4px;
    color: #fff;
    font-size: 15px;
    cursor: pointer;

    &:hover {
        background-color: #006FCE;
    }
    &:nth-child(1) {
        margin-right: 15px;
    }
`;
export const ProductQuantity = styled.div`
    display: flex;
    align-items: center;
    background-color: #073C07;
    border-radius: 5px;
`;
export const ProductQtImage = styled.img`
    width: 24px;
    height: auto;
    margin-left: 10px;
    margin-right: 10px;    
`;
export const ProductQtText = styled.div`
    font-size: 25px;
    font-weight: bold;
    color: #fff;
`;
export const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: bold;
`;

