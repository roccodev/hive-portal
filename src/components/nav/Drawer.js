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

// Credits: https://material-ui.com/components/drawers/

import React, { useState } from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Modes from './../../Modes';
import MenuIcon from '@material-ui/icons/Menu';

const width = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: width,
            flexShrink: 0,
        },
    },
    appBar: {
        visibility: "hidden",
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
        visibility: "visible",
        zIndex: theme.zIndex.drawer + 2,
        position: "relative"
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: width,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    divider: {
        margin: `5px 0 0 ${theme.spacing(9)}px`,
    }
}));

function MenuDrawer(props) {
    const container = props.container;
    const classes = useStyles();
    const theme = useTheme();
    const { mobile, setMobile } = props;
    const toggle = () => {
        setMobile(!mobile);
    }
    const drawer = (
        <div>
            <div className={classes.toolbar} />
            {Object.keys(Modes).map(name => {
                let items = Modes[name].map(item => {
                    return (
                        <ListItem button component="a" href={item.url}>
                            <ListItemText primary={item.name} />
                        </ListItem>
                    );
                });
                return (
                    <div>
                        <Divider component="li">
                            <li>
                                <Typography
                                    className={classes.divider}
                                    color="textSecondary"
                                    display="block"
                                    variant="caption"
                                >{name}</Typography>
                            </li>
                        </Divider>
                        <List>
                            {items}
                        </List>
                    </div>
                );
            })}
        </div>
    );

    return (
        <div className={classes.root}>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobile}
                        onClose={toggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>

        </div>
    );
}

export default MenuDrawer;