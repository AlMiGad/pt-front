//App Views
import Product from '../pages/Product';

// @material-ui/icons
import ProductosIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


var hiddenRoutes = [
    {
        path: "/nuevo-producto",
        name: "Nuevo Producto",
        icon: ProductosIcon,
        component: Product
    },
    {
        path: "/producto/:productId",
        name: "Editar Producto",
        icon: ProductosIcon,
        component: Product
    }
];


export default hiddenRoutes;