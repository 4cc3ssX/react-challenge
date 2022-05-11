import React from 'react';
import styled from 'styled-components';
import Logo from '../../../svgs/Logo.svg';
import { Header, Nav } from './NavBar.styled';

interface INavBar {
    title?: string;
}

const NavBar = (props: INavBar) => {
    const {title = ''} = props;
    return (
        <Nav className="bg-white fixed inset-x-0 top-0 z-20 px-4 py-3 flex flex-col justify-center items-center">
            <Header className="mb-2">{title}</Header>
            <div className="absolute -bottom-2 rounded-full bg-white shadow-[0px_4px_10px_#00000008] w-12 h-12 flex flex-col justify-center items-center -mb-3">
                <div className="absolute -top-1">
                    <Logo />
                </div>
            </div>
        </Nav>
    )
}

export default NavBar;