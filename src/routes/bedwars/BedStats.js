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
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { getJson } from '../../util/HttpClient';
import { withStyles } from '@material-ui/styles';

const useStyles = ({
    card: {
        maxWidth: 500,
        maxHeight: 500,
        position: 'absolute',
        top: '50%',
        left: '55%',
        transform: 'translate(-50%, -50%)'
    },
    elements: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    element: {
        marginLeft: '20px',
        marginTop: '10px'
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const stats = {
    total_points: "Points",
    victories: "Victories",
    games_played: "Games Played",
    kills: "Kills",
    deaths: "Deaths",
    beds_destroyed: "Beds Destroyed",
    teams_eliminated: "Teams Eliminated",
    win_streak: "Win Streak",
    kd: {
        name: "K/D",
        value: (data) => (data.kills / data.deaths).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    },
    wl: {
        name: "W/L",
        value: (data) => (data.victories / (data.games_played - data.victories)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    }
}

function getStatistics(data, stats, classes) {
    return (<div className={classes.elements}>
        {
            Object.keys(stats).map(stat => {
                let name, value;
                let obj = stats[stat];
                if (typeof obj === "string") {
                    name = obj;
                    value = data[stat];
                }
                else if (typeof obj === "object") {
                    name = obj.name;
                    value = (obj.value)(data);
                }
                return (
                    <div className={classes.element}>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {name}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {value}
                        </Typography>
                    </div>
                );
            })
        }</div>);
}


class BedStats extends React.Component {
    state = {
        mode: 0,
        data: null
    };

    componentDidMount() {
        this.uuid = ModeState.thirdParam;
        this.updateData();
    }

    updateData() {
        const mode = this.state.mode;
        const urlMode = (!mode || mode === 0) ? "BED" : mode === 1 ? "BEDS" : mode === 2 ? "BEDD" : mode === 3 ? "BEDT" : "BEDX";
        this._dataPromise = getJson(`https://api.hivemc.com/v1/player/${this.uuid}/${urlMode}`).then(
            json => {
                this._dataPromise = null;
                this.setState({ mode: this.state.mode, data: json });
            }
        );
    }

    componentWillUnmount() {
        if (this._dataPromise) {
            this._dataPromise.cancel();
        }
    }

    render() {
        const classes = this.props.classes;
        const mode = this.state.mode;
        const data = this.state.data;
        return (<Card className={classes.card}>
            <CardContent>
                <div style={{ display: 'flex' }}>
                    <Typography style={{ flexGrow: 1 }}>
                        {this.uuid}'s Stats
                </Typography>
                    <ToggleButtonGroup size="small" color="primary" value={mode} exclusive onChange={(e, i) => {
                        this.state.mode = i;
                        this.updateData();
                    }}>
                        <ToggleButton value={0}>Global</ToggleButton>
                        <ToggleButton value={1}>Solo</ToggleButton>
                        <ToggleButton value={2}>Duos</ToggleButton>
                        <ToggleButton value={3}>Teams</ToggleButton>
                        <ToggleButton value={4}>LTM</ToggleButton>
                    </ToggleButtonGroup>
                </div>
                {this.state.data ? getStatistics(data, stats, classes) : "Loading..."}
            </CardContent >
        </Card >);
    }
}

export default withStyles(useStyles)(BedStats);