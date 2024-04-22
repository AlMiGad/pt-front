//App Views
import Products from '../pages/Products';
import Orders from '../pages/Orders';

// @material-ui/icons
import ProductosIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


var mainMenu = [
    {
        path: "/productos",
        name: "Productos",
        icon: ProductosIcon,
        component: Products
    },
    {
        path: "/pedidos",
        name: "Pedidos",
        icon: ShoppingCartIcon,
        component: Orders
    }
    
];


export default mainMenu;
