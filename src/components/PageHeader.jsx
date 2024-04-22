import * as React from 'react';
import styled from 'styled-components';

//Assets
import decorationHeader from '../assets/images/decoration-header.png';

export default function PageHeader({ title, children }) {

    const Header = styled.header`
        position: relative;
        width: 100%;
        display: flex;
        align-items: center;
        height: 70px;
        background: linear-gradient(270deg, #191919 90px, #42424a 100%);
        padding: 0 20px;
        &:after{
            position: absolute;
            height: 15px;
            width: 15px;
            bottom: -15px;
            left: 0px;
            content: '';
            background-image: url(${decorationHeader});
            background-size: 15px 15px;
        }
    `;
    const PageTitle = styled.header`
        color: white;
        font-weight: 500;
        font-size: 1.3em;
    `;

    return (
        <Header>
            <PageTitle>{title}</PageTitle>
        </Header>
    );
}