import * as React from 'react';

//Material UI
import {TableCell, TableRow, IconButton, TextField } from '@mui/material';

//Icons
import CloseIcon from '@mui/icons-material/Close';

export default function ItemPedido({ item, onRemoveProduct, onChangeQuantity}) {

    return (
        <TableRow
            key={`productRow-${item.id}`}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell><strong>{item.nombre}</strong><span style={{display: "block", fontSize: "0.8em", color: "#9b9b9b"}}>{item.referencia}</span></TableCell>
            <TableCell>{(item.baseImponible).toFixed(2)}€</TableCell>
            <TableCell>
                <TextField
                    id="number"
                    onChange={(e) => onChangeQuantity(item, e)}
                    value={item.cantidad}
                    size={"small"}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </TableCell>
            <TableCell>{(item.baseImponible * item.cantidad).toFixed(2)}€</TableCell>
            <TableCell>{(item.tax).toFixed(2)}%</TableCell>
            <TableCell>{(item.baseImponible * item.cantidad * (1 + (item.tax / 100))).toFixed(2)}€</TableCell>
            <TableCell>
                <IconButton onClick={() => onRemoveProduct(item.id)} style={{ marginLeft: "10px" }} aria-label="delete"><CloseIcon /></IconButton>
            </TableCell>
        </TableRow>
    );
}