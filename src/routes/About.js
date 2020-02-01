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
import { Typography, Link, IconButton } from '@material-ui/core';
import TwitterIcon from '@material-ui/icons/Twitter';
import MailIcon from '@material-ui/icons/Mail';
import GitHubIcon from '@material-ui/icons/GitHub';

function About() {
    return (
        <div>
            <Typography variant="h3">Hive Portal</Typography>
            <Typography variant="subtitle">Copyright &copy; {new Date().getFullYear()} <Link href="https://rocco.dev">RoccoDev</Link></Typography>
            <Typography variant="body1">This website is a collection of tools for <Link href="https://hivemc.com">The Hive</Link> players.</Typography>
            <Typography variant="body1">It is the new home of the <Typography component="span" color="primary">monthly leaderboards</Typography> and the <Typography component="span" color="primary">Bedwars Toolkit</Typography>.</Typography>
            <Typography variant="body1">The source of this portal is available on <Link href="https://github.com/RoccoDev/hive-portal">GitHub</Link>.</Typography>
            <br />
            <Typography variant="h5">Credits</Typography>
            <ul>
                <li>
                    <Typography variant="body1">This website was built using <Link href="https://reactjs.org/">React</Link> + <Link href="https://material-ui.com/">Material-UI</Link>.</Typography>
                </li>
                <li>
                    <Typography variant="body1"><Link href="https://material-table.com">material-table</Link> provides functionality for the tables.</Typography>
                </li>
                <li>
                    <Typography variant="body1">Advertisements are offered by <Link href="https://a-ads.com?partner=1257301">Anonymous Ads</Link>.</Typography>
                </li>
            </ul>
            <br />
            <Typography variant="h5">License</Typography>
            <Typography variant="body1">This website is licensed under the <Link href="https://github.com/RoccoDev/hive-portal/blob/master/LICENSE">GNU Affero General Public License v3.0</Link>.</Typography>
            <br />
            <Typography variant="h5">Contact</Typography>
            <IconButton component={Link} href="mailto:hey@rocco.dev">
                <MailIcon />
            </IconButton>
            <IconButton component={Link} href="https://github.com/RoccoDev">
                <GitHubIcon />
            </IconButton>
            <IconButton component={Link} href="https://twitter.com/RealRoccoDev">
                <TwitterIcon />
            </IconButton>
        </div>
    );
}

export default About;