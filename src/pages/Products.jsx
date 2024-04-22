import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import API from '../api';
//App Components
import PageHeader from '../components/PageHeader';
import PageContent from '../components/PageContent';
//Material UI
import {Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Paper, Button, CircularProgress,
    IconButton, Snackbar } from '@mui/material';
//Icons
import DeleteIcon from '@mui/icons-material/Delete';
//SweetAlert
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const styles = {
    cgButton: {
        borderRadius: "0.375rem",
        color: "white",
        background: "linear-gradient(195deg, #66BB6A 0%, #43A047 100%)",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
    }
}

const ToolsHeader = styled.div`
    width: 100%;
    text-align: right;
    padding: 5px 0 25px 0;
`;

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            creatingProduct: true,
            products: [],
            snackBar: {open: false, message: ""}
        };
    }

    async componentDidMount(){
        try {
            const result = await API.products.getProducts(); // Obtenemos los productos a traves de la API
            if(result.status == 200){
              this.setState({products: result.data, isLoading: false}); // Actualiza el estado con los productos obtenidos
            }else{
              console.error('Error al obtener productos. Codigo de Error:', result.status);
            }
          } catch (error) {
            console.error('Error al obtener productos:', error);
          }
    }

    //Pereguntamos la confirmacion del borrado de producto y eliminamos de la API
    deleteProduct(productId){
        withReactContent(Swal).fire({
            title: '¿Estás seguro?',
            text: `¿Quieres eliminar el producto?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        }).then((async (result) => {
            if (result.isConfirmed) {
                let resultDelete = await API.products.deleteProduct(productId);
                if(resultDelete.status == 200){
                    let copyProducts = [...this.state.products];
                    let afterDeleteProducts = copyProducts.filter((product) => {return product.id !=productId });
                    this.setState({
                        products : afterDeleteProducts, 
                        snackBar : {open: true, message: "Producto Eliminado."}
                    });
                }else{
                    this.setState({
                        snackBar : {open: true, message: "No se ha podido eliminar el Producto."}
                    });
                }
            }
        }).bind(this))
    }

    render() {
        return (
            <div>
                <PageHeader title="Catálogo de Productos"></PageHeader>
                <PageContent>
                    <ToolsHeader>
                        <Button 
                            component={Link}
                            to="/nuevo-producto"
                            variant="contained" 
                            sx={styles.cgButton}>
                                Nuevo Producto
                        </Button>
                    </ToolsHeader>
                    {/* Renderizado de la tabla de productos*/}
                    {this.state.isLoading ?
                        <div style={{textAlign: "center"}}><CircularProgress /></div>
                    :
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{width: "160px"}}>Referencia</TableCell>
                                        <TableCell>Nombre</TableCell>
                                        <TableCell sx={{width: "110px"}}>Precio</TableCell>
                                        <TableCell sx={{width: "110px"}}>IVA</TableCell>
                                        <TableCell sx={{width: "160px"}}>Opciones</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.products.map((row, index) => (
                                        <TableRow
                                            key={`productRow-${index}`}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell>{row.referencia}</TableCell>
                                            <TableCell>{row.nombre}</TableCell>
                                            <TableCell>{(row.baseImponible).toFixed(2)}€</TableCell>
                                            <TableCell>{(row.tax).toFixed(2)}%</TableCell>
                                            <TableCell>
                                                <Button 
                                                    component={Link}
                                                    to={`/producto/${row.id}`}
                                                    variant="contained" 
                                                    sx={styles.cgButton}>
                                                        Ver
                                                </Button>
                                                <IconButton onClick={() => this.deleteProduct(row.id)} style={{marginLeft: "10px"}} aria-label="delete"><DeleteIcon /></IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    }
                    {/* FIN tabla de productos*/}
                </PageContent>
                {/* Zona SnackBar */}
                <Snackbar
                    open={this.state.snackBar.open}
                    anchorOrigin={{horizontal: "right", vertical: "bottom"}}
                    autoHideDuration={3000}
                    message={this.state.snackBar.message}
                    onClose={() => this.setState({snackBar: {open: false, message: ""}})}
                />
            </div>
        );
    }
}

export default Product;