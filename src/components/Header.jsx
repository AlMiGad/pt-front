import * as React from 'react';
import { Link } from "react-router-dom";

//Assets
import logo from '../assets/images/logo.png'; 

//Material UI
import { AppBar, Grid, Toolbar, List, ListItemButton , ListItemIcon, ListItemText, Container, ListItem } from '@mui/material';

//Routes
import mainMenu from '../routes/mainMenu';

export default function Header() {
    return (
        <AppBar component="nav" position="relative">
            <Toolbar>
                <div className={"toolsCol"}>
                    <Link to="/"><img className={"logo"} src={logo} alt="Logo" /></Link>
                </div>
                <div>
                    <List className={"flexContainer"}>
                        {mainMenu.map((item, index) => (
                            <ListItem disablePadding sx={{maxWidth: "150px"}}>
                                <ListItemButton component={Link} to={item.path}>
                                    <ListItemText primary={item.name} sx={{textAlign: "center"}} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Toolbar>
        </AppBar>
    );
}