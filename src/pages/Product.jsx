import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import API from '../api';
//Router
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
//App Components
import PageHeader from '../components/PageHeader';
import PageContent from '../components/PageContent';
//Material UI
import { Button, Grid, TextField, InputAdornment, Card, CardContent, CircularProgress, Snackbar } from '@mui/material';

const styles = {
    cgButton: {
        borderRadius: "0.375rem",
        marginBottom: "4px",
        color: "white",
        background: "linear-gradient(195deg, #66BB6A 0%, #43A047 100%)",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
    }
}

const ToolsHeader = styled.div`
    width: 100%;
    text-align: right;
    padding: 5px 0 25px 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

function Product() {
    const params = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [snackBar, setSnackBar] = useState({open: false, message: ""});
    const [product, setProduct] = useState(
        {
            id: null,
            referencia: "",
            nombre: "",
            descripcion: "",
            baseImponible: "",
            tax: ""
        }
    );

    useEffect(() => {
        if (params.productId) {
            const loadProduct = async () => {
                try {
                    const result = await API.products.getProduct(params.productId); // Obtenemos los productos a traves de la API
                    if (result.status == 200) {
                        setProduct(result.data); // Actualizamos el array de Productos
                    } else {
                        setSnackBar({open: true, message: "Ocurrió un error al cargar el producto."});
                        console.error('Error al obtener productos. Codigo de Error:', result.status);
                    }
                } catch (error) {
                    setSnackBar({open: true, message: "Ocurrió un error al cargar el producto."});
                    console.error('Error al obtener productos:', error);
                }
            }
            loadProduct().catch(console.error);
            
        }
        setLoading(false);
    }, []);

    const handleInput = (event) => {
        const { name, value } = event.target;
        let productCopy = { ...product };
        productCopy[name] = value;
        console.log(productCopy);
        setProduct(productCopy);
    }

    const handleInputNumber = (event) => {

        let { name, value } = event.target;

        // Reemplazamos cualquier caracter que no sea un número o un punto decimal con una cadena vacía
        value = value.replace(/,/g, '.');
        value = value.replace(/[^0-9.]/g, '');

        var puntos = value.split('.').length - 1;
        if (puntos > 1) {
            // Si hay más de un punto decimal, eliminamos el último punto
            value = value.slice(0, value.lastIndexOf('.'));
        }

        // Limitamos el número de decimales a dos
        var partes = value.split('.');
        if (partes.length > 1) {
            value = partes[0] + '.' + partes[1].slice(0, 2);
        }

        let productCopy = { ...product };
        productCopy[name] = value;
        setProduct(productCopy);
    }

    const prepareNumber = (number) => {
        let parsedNumber = parseFloat(number);
        return isNaN(parsedNumber) ? 0 : parsedNumber;
    }

    const confirmSaveProduct = async () => {
        // Limpiamos los posibles errores anteriores
        setLoading(true);
        setSnackBar({open: false, message: ""});

        let productCopy = { ...product };

        // Comprobamos la validez de los campos del Producto
        if (productCopy.nombre != "" && productCopy.referencia != "" && productCopy.descripcion != "") {

            // En este caso no importa el valor de los campos numericos, si no estan rellenos los seteamos a 0.
            productCopy.baseImponible = prepareNumber(productCopy.baseImponible);
            productCopy.tax = prepareNumber(productCopy.tax);

            let result = null;
            
            if(product.id){
                // Si el producto tiene fijada la ID es porque lo estamos editando
                result = await API.products.saveProduct(productCopy);
                if (result.status != 200) {
                    setSnackBar({open: true, message: "Ocurrió un error al guardar el producto."});
                } else {
                    navigate("/productos");
                }
                
            }else{
                // Se trata de un Nuevo Producto
                result = await API.products.createProduct(productCopy);
                if (result.status != 201) {
                    setSnackBar({open: true, message: "Ocurrió un error al crear el producto."});
                } else {
                    navigate("/productos");
                }
            }
        } else {
            setSnackBar({open: true, message: "Debes rellenar todos los Campos."});
        }
        setLoading(false);
    }

    console.log(product);

    return (
        <div>
            <PageHeader title={product.id ? "Editar Producto" : "Crear Producto"}></PageHeader>
            <PageContent>
                <ToolsHeader>
                    {loading && <div style={{ marginRight: "10px" }}><CircularProgress size={26} /></div>}
                    <Button
                        onClick={(e) => {confirmSaveProduct()}}
                        variant="contained"
                        disabled={loading}
                        sx={styles.cgButton}>
                        {product.id ? "Guardar Producto" : "Crear Producto"}
                    </Button>
                </ToolsHeader>
                <Card>
                    <CardContent>
                        <Grid container spacing={2} direction="row" justify="center">
                            <Grid item xs={6}>
                                <TextField key="np-nombre" disabled={loading} onChange={(e) => handleInput(e)} value={product.nombre}
                                    name="nombre" label="Nombre" variant="outlined" size="small" fullWidth />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField key="np-ref" disabled={loading} onChange={(e) => handleInput(e)} value={product.referencia} name="referencia"
                                    label="Referencia" variant="outlined" size="small" fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField key="np-desc" disabled={loading} onChange={(e) => handleInput(e)} name="descripcion" value={product.descripcion}
                                    label="Descripción" variant="outlined" multiline rows={6} maxRows={8} fullWidth></TextField>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField key="newProduct-bi" disabled={loading} onChange={(e) => handleInputNumber(e)} name="baseImponible" label="Base Imponible"
                                    value={product.baseImponible} variant="outlined" size="small"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">€</InputAdornment>,
                                    }} fullWidth></TextField>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    key="newProduct-tax" disabled={loading} onChange={(e) => handleInputNumber(e)} name="tax" label="IVA" variant="outlined" size="small"
                                    value={product.tax}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">%</InputAdornment>,
                                    }} fullWidth></TextField>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    key="newProduct-total" disabled={true} name="total" label="TOTAL" variant="outlined" size="small"
                                    value={(product.baseImponible * (1 + (product.tax / 100))).toFixed(2)}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">€</InputAdornment>,
                                    }} fullWidth></TextField>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </PageContent>
            {/* Zona SnackBar */}
            <Snackbar
                    open={snackBar.open}
                    anchorOrigin={{horizontal: "right", vertical: "bottom"}}
                    autoHideDuration={3000}
                    message={snackBar.message}
                    onClose={() => setSnackBar({open: false, message: ""})}
                />
        </div>
    );

}

export default Product;
