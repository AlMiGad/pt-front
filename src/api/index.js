
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
        async getOrders(){
            const response = await fetch(`${API_ROOT}/pedidos`);
            const data = await response.json();
            return {
                status: response.status,
                data: data
            };
        },
        async getOrder(orderId){
            const response = await fetch(`${API_ROOT}/pedidos/${orderId}`);
            const data = await response.json();
            return {
                status: response.status,
                data: data
            };
        },
        async createOrder(orderData){
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const response = await fetch(`${API_ROOT}/pedidos`, {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(orderData)
            });
            const data = await response.json();
            return {
                status: response.status,
                data: data
            };
        },
        async saveOrder(orderData){
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const response = await fetch(`${API_ROOT}/pedidos/${orderData.id}`, {
                method: 'PUT',
                headers: myHeaders,
                body: JSON.stringify(orderData)
            });
            const data = await response.json();
            return {
                status: response.status,
                data: data
            };
        },
        async deleteOrder(orderId){
            const response = await fetch(`${API_ROOT}/pedidos/${orderId}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            return {
                status: response.status,
                data: data
            };
        }
    },
};

export default API;
