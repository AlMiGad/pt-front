import React from 'react';
import styled from 'styled-components';

const Content = styled.div`
    background: white;
    border-radius: 10px 0 0 0;
    padding: 15px 20px;
    height: calc(100vh - 70px);
    overflow: auto;
`;

class PageContent extends React.Component {

    constructor(props) {
        super(props);
    }

    render(){
        const {children} = this.props
        return (
            <Content>
                {children}
            </Content>
        );
    }
    
}

export default PageContent;