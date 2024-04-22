import * as React from 'react';
import styled from 'styled-components';

export default function ToolsHeader({ children }) {

    const ToolsHeader = styled.div`
        width: 100%;
        text-align: right;
        padding: 5px 0 25px 0;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    `;

    return (
        <ToolsHeader>
            {children}
        </ToolsHeader>
    );
}