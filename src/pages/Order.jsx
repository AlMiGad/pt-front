import React, { useState, useEffect } from 'react';
import API from '../api';

//Router
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

//App Components
import PageHeader from '../components/PageHeader';
import PageContent from '../components/PageContent';
import ToolsHeader from '../components/ToolsHeader';
import ItemPedido from '../components/ItemPedido';

//Material UI
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button, CircularProgress,
    IconButton, Snackbar, Grid, TableFooter
} from '@mui/material';

//Icons
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const styles = {
    cgButton: {
        borderRadius: "0.375rem",
        color: "white",
        background: "linear-gradient(195deg, #66BB6A 0%, #43A047 100%)",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
    }
}

function Order() {

    const params = useParams();
    const navigate = useNavigate();

    const [loadingProducts, setLoadingProducts] = useState(true);
    const [loading, setLoading] = useState(true);
    const [snackBar, setSnackBar] = useState({ open: false, message: "" });
    const [products, setProducts] = useState([]);
    const [order, setOrder] = useState(
        {
            id: null,
            baseImponible: 0,
            tax: 0,
            total: 0,
            products: []
        }
    );

    useEffect(() => {
        if (params.orderId) {
            //Si el parametro OrderId esta definido es porque estamos editando un pedido
            const loadOrder = async () => {
                try {
                    const result = await API.orders.getOrder(params.orderId); // Obtenemos el pedido a traves de la API
                    if (result.status == 200) {
                        setOrder(result.data); // Actualizamos el pedido actual
                    } else {
                        setSnackBar({ open: true, message: "Ocurrió un error al cargar el pedido." });
                        console.error('Error al obtener el pedido. Codigo de Error:', result.status);
                    }
                } catch (error) {
                    setSnackBar({ open: true, message: "Ocurrió un error al cargar el pedido." });
                    console.error('Error al obtener el pedido. Codigo de Error:', error);
                }
            }
    
            loadOrder().catch(console.error);
    
        }

        setLoading(false);

        //Cargamos los productos disponibles para el pedido
        const loadProducts = async () => {
            try {
                const result = await API.products.getProducts(); // Obtenemos los productos a traves de la API
                if (result.status == 200) {
                    setProducts(result.data); // Actualizamos el array de Productos
                    setLoadingProducts(false)
                } else {
                    setSnackBar({ open: true, message: "Ocurrió un error al cargar los productos." });
                    console.error('Error al obtener productos. Codigo de Error:', result.status);
                }
            } catch (error) {
                setSnackBar({ open: true, message: "Ocurrió un error al cargar los productos." });
                console.error('Error al obtener productos:', error);
            }
        }

        loadProducts().catch(console.error);

    }, []);

    const confirmSaveOrder = async () => {
        // Limpiamos los posibles errores anteriores
        setLoading(true);
        setSnackBar({ open: false, message: "" });

        //Comprobamos que el pedido tiene productos añadidos
        if(order.products.length == 0){
            setSnackBar({ open: true, message: "Debes añadir algún Producto a tu Pedido." });
            setLoading(false);
            return;
        }

        let result = null;

        if (params.orderId) {
            // Se trata de una edicion de Pedido
            result = await API.orders.saveOrder(order);
            if (result.status != 200) {
                setSnackBar({ open: true, message: "Ocurrió un error al guardar el pedido." });
            } else {
                navigate("/pedidos");
            }
        } else {
            // Se trata de un Nuevo Pedido
            result = await API.orders.createOrder(order);
            if (result.status != 201) {
                setSnackBar({ open: true, message: "Ocurrió un error al crear el pedido." });
            } else {
                navigate("/pedidos");
            }
        }
        setLoading(false);
    }

    const addProduct = (product) => {

        let orderCopy = { ...order };

        //Comprobamos que el producto no está en el pedido
        let existsInOrder = orderCopy.products.filter((prod) => { return (prod.id == product.id) });

        if (existsInOrder.length == 0) {
            //El pedio no tiene el Produto, lo vamos a añadir

            orderCopy.products.push(
                { ...product, cantidad: 1 }
            );

            //Actualizamos los totales
            let orderTotals = calculateProductsTotals(orderCopy.products);

            setOrder({ ...orderCopy, ...orderTotals });

            setSnackBar({ open: true, message: "Producto Añadido." });

        } else {
            setSnackBar({ open: true, message: "El Producto ya está en el Pedido." });
        }

    }

    const onChangeQuantity = (product, e) => {

        let value = e.target.value;
        let copyOrder = { ...order };

        copyOrder.products.forEach((orderProduct, index) => {
            if (orderProduct.id == product.id) {
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
                copyOrder.products[index].cantidad = value;
            }
        });

        //Actualizamos los totales
        let orderTotals = calculateProductsTotals(copyOrder.products);
        setOrder({ ...copyOrder, ...orderTotals });

    }

    const removeProduct = (productId) => {

        let orderCopy = { ...order };

        //Comprobamos que el producto no está en el pedido
        let productRest = orderCopy.products.filter((prod) => { return (prod.id != productId) });

        //Actualizamos los totales
        let orderTotals = calculateProductsTotals(productRest);

        orderCopy.products = productRest;
        setOrder({ ...orderCopy, ...orderTotals });

        setSnackBar({ open: true, message: "Producto Eliminado del Pedido." });

    }

    const calculateProductsTotals = (products) => {
        let baseImponible = 0;
        let tax = 0;

        products.forEach(product => {
            baseImponible += product.cantidad * product.baseImponible;
            tax += product.cantidad * product.baseImponible * (product.tax / 100);
        });

        return ({
            baseImponible: parseFloat(baseImponible),
            tax: parseFloat(tax),
            total: baseImponible + tax
        });

    }

    return (
        <div>
            <PageHeader title={order.id ? "Editar Pedido" : "Crear Pedido"}></PageHeader>
            <PageContent>

                <ToolsHeader>
                    {loading && <div style={{ marginRight: "10px" }}><CircularProgress size={26} /></div>}
                    <Button
                        onClick={(e) => { confirmSaveOrder() }}
                        variant="contained"
                        disabled={loading}
                        sx={styles.cgButton}>
                        Guardar Pedido
                    </Button>
                </ToolsHeader>

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={4}>
                        {/* Zona añadido de Productos */}
                        <h3 style={{ marginBottom: "10px" }}>Productos Disponibles</h3>
                        {
                            !loadingProducts ?
                                <div style={{overflowY: "auto", maxHeight: "640px"}}>
                                    <TableContainer component={Paper}>
                                        <Table aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Producto</TableCell>
                                                    <TableCell sx={{ width: "60px" }}></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    products.map((item, index) => {
                                                        return (
                                                            <TableRow
                                                                key={`productToAddRow-${index}`}
                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                            >
                                                                <TableCell>{item.nombre}<span style={{display: "block", fontSize: "0.8em", color: "#9b9b9b"}}>{item.referencia}</span></TableCell>
                                                                <TableCell>
                                                                    <IconButton onClick={() => addProduct(item)} style={{ marginLeft: "10px" }} aria-label="delete"><AddShoppingCartIcon /></IconButton>
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    })
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                                :
                                <div style={{ textAlign: "center" }}><CircularProgress /></div>
                        }
                    </Grid>
                    <Grid item xs={8}>
                        {/* Contenido del Pedido*/}
                        <h3 style={{ marginBottom: "10px" }}>Contenido del Pedido</h3>
                        {!loading ?
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Producto</TableCell>
                                            <TableCell sx={{ width: "140px" }}>Precio Unidad</TableCell>
                                            <TableCell sx={{ width: "80px" }}>Cantidad</TableCell>
                                            <TableCell sx={{ width: "140px" }}>Base Imponible</TableCell>
                                            <TableCell sx={{ width: "140px" }}>IVA</TableCell>
                                            <TableCell sx={{ width: "140px" }}>TOTAL</TableCell>
                                            <TableCell sx={{ width: "60px" }}></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            order.products.map((item) => {
                                                return (
                                                    <ItemPedido
                                                        item={item}
                                                        onRemoveProduct={(productId) => removeProduct(productId)}
                                                        onChangeQuantity={(item, e) => onChangeQuantity(item, e)}
                                                    />
                                                )
                                            })
                                        }
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell sx={{ fontWeight: 600, fontSize: "1.1em" }}>{(order.baseImponible).toFixed(2)}€</TableCell>
                                            <TableCell sx={{ fontWeight: 600, fontSize: "1.1em" }}>{(order.tax).toFixed(2)}€</TableCell>
                                            <TableCell sx={{ fontWeight: 600, fontSize: "1.1em" }}>{(order.total).toFixed(2)}€</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </TableContainer>
                            :
                            <div style={{ textAlign: "center" }}><CircularProgress /></div>
                        }
                    </Grid>
                </Grid>
            </PageContent>

            {/* Zona SnackBar */}
            <Snackbar
                open={snackBar.open}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                autoHideDuration={3000}
                message={snackBar.message}
                onClose={() => setSnackBar({ open: false, message: "" })}
            />
        </div>
    );

}

export default Order;
