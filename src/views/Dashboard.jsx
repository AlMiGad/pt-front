import React from 'react';
import { Link, useLocation } from "react-router-dom";
import styled from 'styled-components';

//Assets
import logo from '../assets/images/logo.png';

//Material UI
import { List, ListItemButton, ListItemText, ListItem } from '@mui/material';

//Routes
import mainMenu from '../routes/mainMenu';

const styles = {
  list:{
    padding: "15px"
  },
  listItemButton:{
    borderRadius: "0.375rem",
    marginBottom: "4px",
    color: "white",
    "&:hover":{
      background: "linear-gradient(195deg, #66BB6A 0%, #43A047 100%)",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
    }
  },
  listItemButtonActive:{
    background: "linear-gradient(195deg, #66BB6A 0%, #43A047 100%)",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
  }
}

function Dashboard({ children }) {

  const Wrapper = styled.div`
    width: 100%;
    display: flex;
  `;
  const CGMenuWrapper = styled.div`
    width: 256px;
    height: 100vh;
    background: linear-gradient(195deg, #42424a 90px, #191919 100%);
  `;
  const CGContentWrapper = styled.div`
    width: calc(100% - 256px);
    height: 100vh;
  `;
  const Logo = styled.div`
    padding: 8px;
    display: flex;
    align-items: center;
    height: 70px;
    & img{
      width: 100%;
      height: auto;
      max-width: 200px;
      max-height: 42px
    }
  `;

  const location = useLocation();

  return (
    <div>
      <Wrapper>
        <CGMenuWrapper>

          <Logo>
            <Link to="/"><img className={"logo"} src={logo} alt="Logo" /></Link>
          </Logo>
          
          <List sx={styles.list}>
            {mainMenu.map((item, index) => {
              let activeRoute = location.pathname === item.path;
              return (
                <ListItem key={`mainMenu-${index}`} disablePadding>
                  <ListItemButton component={Link} to={item.path} sx={{...styles.listItemButton, ...(activeRoute ? styles.listItemButtonActive : {})}}>
                    <item.icon/>
                    <ListItemText sx={{marginLeft: "10px"}} primary={item.name}/>
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>
        </CGMenuWrapper>
        <CGContentWrapper>
          {children}
        </CGContentWrapper>
      </Wrapper>
    </div>
  );

}

export default Dashboard;