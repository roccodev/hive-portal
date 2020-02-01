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
import { ModeState } from '../../Modes';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Button, CardActions, Modal, Chip, Input, FormControl } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { getJson } from '../../util/HttpClient';
import { withStyles } from '@material-ui/styles';
import html2canvas from 'html2canvas';

const useStyles = theme => ({
    card: {
        maxWidth: 500,
        maxHeight: 500,
        position: 'absolute',
        top: '50%',
        left: '55%',
        transform: 'translate(-50%, -50%)'
    }
});



class BedStats extends React.Component {
    render() {
        const classes = this.props.classes;
        return (
            <div>
                <div className={classes.card}>
                    <Card>
                        <form action="" onSubmit={(e) => {
                            e.preventDefault();
                            window.location.assign(`./stats/${document.getElementById("playerName").value}`);
                            return false;
                        }}>
                            <CardContent>
                                <Typography variant="h5" component="h2">Player statistics</Typography>
                                <Input placeholder="Player name or UUID..." id="playerName"></Input>
                            </CardContent >
                            <CardActions>
                                <Button variant="contained" color="primary" style={{ width: "100%" }} type="submit">Go</Button>
                            </CardActions>
                        </form>
                    </Card >
                </div>
            </div>
        );
    }
}

export default withStyles(useStyles)(BedStats);