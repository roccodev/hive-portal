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
import { Typography, Link, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const getStyle = makeStyles(theme => ({
    box_root: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
        flexGrow: 0.02,
        height: "100%",
        "&:hover:not($disabled):not($focused):not($error)": {
            borderBottom: "1px solid",
            borderColor: theme.palette.background.paper
        }
    },
    menu_text: {
        textTransform: "uppercase",
        position: "relative",
        top: "50%",
        left: "5%",
        transform: "translate(5%, -50%)"
    },
    link: {
        "&:hover": {
            textDecoration: "none"
        }
    }
}));


function NavbarItem(props) {
    const boxProps = {};
    const classes = getStyle();
    if (props.selected) {
        boxProps.borderBottom = 1;
    }
    const href = props.href;
    const content = props.children;
    return (
        <Box className={classes.box_root} {...boxProps}>
            <Typography className={classes.menu_text}>
                <Link href={href} color="inherit" className={classes.link}>
                    {content}
                </Link>
            </Typography>
        </Box>
    );
}

export default NavbarItem;