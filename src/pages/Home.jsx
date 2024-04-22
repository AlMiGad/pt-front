import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

//App Components
import PageHeader from '../components/PageHeader';
import PageContent from '../components/PageContent';

//Material UI
import {Button} from '@mui/material';

// Rutas del Menu
import mainMenu from '../routes/mainMenu';

const DashboardButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-width: 185px;
    min-height: 145px;
    text-decoration: none;
`;

function Home() {

    const styles = {
        cgButton: {
            borderRadius: "0.375rem",
            color: "white",
            margin: "10px",
            background: "linear-gradient(195deg, #66BB6A 0%, #43A047 100%)",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
        }
    }

    return (
        <div>
            <PageHeader title="Dashboard"></PageHeader>
            <PageContent>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {
                        mainMenu.map((item, index) => {
                            return (
                                <Button component={Link} to={item.path} sx={styles.cgButton}>
                                    <DashboardButton>
                                        <item.icon/>
                                        {item.name}
                                    </DashboardButton>
                                </Button>
                            );
                        })
                    }
                </div>
            </PageContent>
        </div>
    );
}

export default Home;