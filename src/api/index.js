
import { API_ROOT } from './api-config';

const API = {
    products:{
        async getProducts(){
            const response = await fetch(`${API_ROOT}/productos`);
            const data = await response.json();
            return {
                status: response.status,
                data: data
            };
        },
        async getProduct(productId){
            const response = await fetch(`${API_ROOT}/productos/${productId}`);
            const data = await response.json();
            return {
                status: response.status,
                data: data
            };
        },
        async createProduct(productData){
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const response = await fetch(`${API_ROOT}/productos`, {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(productData)
            });
            const data = await response.json();
            return {
                status: response.status,
                data: data
            };
        },
        async saveProduct(productData){
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const response = await fetch(`${API_ROOT}/productos/${productData.id}`, {
                method: 'PUT',
                headers: myHeaders,
                body: JSON.stringify(productData)
            });
            const data = await response.json();
            return {
                status: response.status,
                data: data
            };
        },
        async deleteProduct(productId){
            const response = await fetch(`${API_ROOT}/productos/${productId}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            return {
                status: response.status,
                data: data
            };
        }
    },
    orders:{
       
    },
};

export default API;
