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

import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, makeStyles } from '@material-ui/core';
import { useTheme } from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import MenuIcon from '@material-ui/icons/Menu'
import { useCookies } from 'react-cookie'

const getStyle = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    menuBtn: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    }
}));

function useChangeTheme(props, cookie) {
    const setTheme = props.themeSetter;
    return () => setTheme(theme => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        cookie('palette-type', newTheme);
        return newTheme;
    });
}

const Navbar = (props) => {
    const theme = useTheme().palette.type;
    const [_, setCookie, _r] = useCookies(['palette-type']);
    const themeButton = theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />;
    const classes = getStyle();
    const title = "Hive Portal";
    const changeTheme = useChangeTheme(props, setCookie);
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuBtn} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {title}
                    </Typography>
                    <IconButton aria-label="palette" color="inherit" onClick={changeTheme}>
                        {themeButton}
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div >
    );
}

export default Navbar;