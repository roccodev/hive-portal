// Copyright (C) 2020 RoccoDev
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// 
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, makeStyles } from '@material-ui/core';
import { useTheme } from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import MenuIcon from '@material-ui/icons/Menu'
import { useCookies } from 'react-cookie'
import MenuDrawer from './Drawer';
import NavbarItem from './NavbarItem';
import Modes from '../../Modes';
import { ModeState } from '../../Modes';

const getStyle = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    menuBtn: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    title: {
        flexGrow: 1
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        position: "relative"
    }
}));

function useChangeTheme(props, cookie) {
    const setTheme = props.themeSetter;
    return () => {
        setTheme(theme => {
            const newTheme = theme === 'light' ? 'dark' : 'light';
            cookie('palette-type', newTheme, {
                path: "/",
                expires: new Date(2100, 1, 1)
            });
            return newTheme;
        });
        window.location.reload()
    };
}

function getCurrentModeName() {
    if (ModeState.index === -1) {
        return "Hive Portal";
    }
    else {
        return `Hive Portal - ${Object.keys(Modes)[ModeState.index]}`;
    }
}

function getCurrentModeItems() {
    if (ModeState.index !== -1) {
        return Modes[Object.keys(Modes)[ModeState.index]].map(item => {
            return (<NavbarItem href={item.url}>{item.name}</NavbarItem>);
        });
    }
}

const Navbar = (props) => {
    const theme = useTheme().palette.type;
    const [_, setCookie, _r] = useCookies(['palette-type']);
    const themeButton = theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />;
    const classes = getStyle();
    const title = getCurrentModeName();
    const changeTheme = useChangeTheme(props, setCookie);
    const [mobile, setMobile] = useState(false);
    const navItems = getCurrentModeItems();

    const toggle = () => {
        setMobile(!mobile);
    }
    return (
        <div className={classes.root}>
            <MenuDrawer mobile={mobile} setMobile={setMobile} />
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={toggle}
                        className={classes.menuBtn}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" style={{ flexGrow: 0.1 }}>
                        {title}
                    </Typography>
                    {navItems}
                    <Typography className={classes.title}></Typography>
                    <IconButton aria-label="palette" color="inherit" onClick={changeTheme}>
                        {themeButton}
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div >
    );
}

export default Navbar;