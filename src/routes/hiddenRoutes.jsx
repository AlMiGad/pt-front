//App Views
import Product from '../pages/Product';
import Order from '../pages/Order';
import Home from '../pages/Home';

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
    },
    {
        path: "/nuevo-pedido",
        name: "Nuevo Pedido",
        icon: ShoppingCartIcon,
        component: Order
    },
    {
        path: "/pedido/:orderId",
        name: "Editar Pedido",
        icon: ShoppingCartIcon,
        component: Order
    },
    {
        path: "*",
        name: "Dashboard",
        icon: ShoppingCartIcon,
        component: Home
    }
];


export default hiddenRoutes;