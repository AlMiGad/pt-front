import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import API from '../api';

//App Components
import PageHeader from '../components/PageHeader';
import PageContent from '../components/PageContent';
import ToolsHeader from '../components/ToolsHeader';

//Material UI
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, CircularProgress,
  IconButton, Snackbar
} from '@mui/material';

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


function Orders() {

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [snackBar, setSnackBar] = useState({ open: false, message: "" });

  const deleteOrder = async (orderId) => {
    withReactContent(Swal).fire({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar el pedido?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        let resultDelete = await API.orders.deleteOrder(orderId);
        if (resultDelete.status == 200) {
          let copyOrders = [...orders];
          let afterDeleteOrders = copyOrders.filter((order) => { return order.id != orderId });
          setOrders(afterDeleteOrders);
          setSnackBar({ open: true, message: "Pedido Eliminado." });
        } else {
          setSnackBar({ open: true, message: "No se ha podido eliminar el Pedido." });
        }
        setLoading(false);
      }
    })
  }

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        const result = await API.orders.getOrders(); // Obtenemos los pedidos a traves de la API
        if (result.status == 200) {
          setOrders(result.data); // Actualizamos el array de Productos
        } else {
          setSnackBar({ open: true, message: "Ocurrió un error al cargar los pedidos." });
          console.error('Error al obtener productos. Codigo de Error:', result.status);
        }
      } catch (error) {
        setSnackBar({ open: true, message: "Ocurrió un error al cargar el producto." });
        console.error('Error al obtener pedidos:', error);
      }
    }
    loadOrders().catch(console.error);
    setLoading(false);
  }, []);

  return (
    <div>
      <PageHeader title="Listado de Pedidos"></PageHeader>
      <PageContent>
        <ToolsHeader>
          <Button
            component={Link}
            to="/nuevo-pedido"
            variant="contained"
            sx={styles.cgButton}>
            Nuevo Pedido
          </Button>
        </ToolsHeader>
        {loading ?
          <div style={{ textAlign: "center" }}><CircularProgress /></div>
          :
          <TableContainer component={Paper}> {/* TABLA DE PEDIDOS */}
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: "160px" }}>Identificador</TableCell>
                  <TableCell>Productos en el Pedido</TableCell>
                  <TableCell sx={{ width: "160px" }}>Base Imponible</TableCell>
                  <TableCell sx={{ width: "160px" }}>IVA</TableCell>
                  <TableCell sx={{ width: "160px" }}>TOTAL</TableCell>
                  <TableCell sx={{ width: "160px" }}>Opciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((row, index) => (
                  <TableRow
                    key={`productRow-${index}`}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.products.length} Productos</TableCell>
                    <TableCell>{(row.baseImponible).toFixed(2)}€</TableCell>
                    <TableCell>{(row.tax).toFixed(2)}€</TableCell>
                    <TableCell>{(row.total).toFixed(2)}€</TableCell>
                    <TableCell>
                      <Button
                        component={Link}
                        to={`/pedido/${row.id}`}
                        variant="contained"
                        sx={styles.cgButton}>
                        Ver
                      </Button>
                      <IconButton onClick={() => deleteOrder(row.id)} style={{ marginLeft: "10px" }} aria-label="delete"><DeleteIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table> {/* END TABLA DE PEDIDOS */}
          </TableContainer>
        }
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

export default Orders;