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
import { Card, CardContent, Typography, Button, CardActions, Modal, Chip } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { getJson } from '../../util/HttpClient';
import { withStyles } from '@material-ui/styles';
import html2canvas from 'html2canvas';
import { getStatistics } from './BedStats';
import Bedwars from '../../firebase/config';
import Firebase from 'firebase';

const useStyles = theme => ({
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
    modal: {
        position: 'absolute',
        width: 600,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
});

const stats = {
    __points: "Points",
    _victories: "Victories",
    played: "Games Played",
    _kills: "Kills",
    _kjdeaths: "Deaths",
    zBeds: "Beds Destroyed",
    zTeams: "Teams Eliminated",
    kd: {
        name: "K/D",
        value: (data) => (data._kills / data._kjdeaths).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    },
    wl: {
        name: "W/L",
        value: (data) => (data._victories / (data.played - data._victories)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    }
}

class ImageModal extends React.Component {
    constructor(props) {
        super(props);
        this.close = this.close.bind(this);
    }

    getModalStyle() {
        const top = 50;
        const left = 50;

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }

    state = {
        open: false
    }

    componentWillReceiveProps(props) {
        this.setState({ ...props });
    }

    close() {
        this.setState({ open: false })
    }

    render() {
        return (
            <Modal
                aria-labelledby="img-title"
                open={this.state.open}
                onClose={this.close}>
                <div style={this.getModalStyle()} className={this.state.classes}>
                    <h2 id="img-title">{this.state.name}'s Stats</h2>
                    {this.state.img}
                </div>
            </Modal>
        );
    }
}

class BedMonthlyProfile extends React.Component {
    state = {
        data: null
    };

    componentDidMount() {
        this.uuid = ModeState.thirdParam;
        this.firebase = Firebase.initializeApp(Bedwars.monthlies, "profile");
        this.dbRef = this.firebase.database().ref(this.uuid);
        this.updateData();
    }

    updateData() {
        this._dataPromise = 1;
        this.dbRef.on("value", (snap) => {
            const json = snap.val();
            this._dataPromise = null;
            this.setState({ ...this.state, data: json });
        });
    }

    componentWillUnmount() {
        if (this._dataPromise) {
            this._dataPromise.cancel();
        }
        this.firebase.delete();
    }

    render() {
        const classes = this.props.classes;
        const data = this.state.data;
        return (
            <div>
                <div className={classes.card}>
                    <Button onClick={(e, i) => {
                        html2canvas(document.getElementById('statsCard')).then(img => {
                            const i = <img src={img.toDataURL("image/png")} alt="Stats" style={{ border: "1px solid green" }} />;
                            this.setState({ ...this.state, imgModal: i })
                        });
                    }}>Save as image</Button>
                    <Card id="statsCard">
                        <CardContent>
                            <div style={{ display: 'flex' }}>
                                <Typography style={{ flexGrow: 1 }}>
                                    {data && data["____name"]}'s Monthly Stats ({new Date().toLocaleDateString()})
                                </Typography>
                            </div>
                            {this.state.data ? getStatistics(data, stats, classes) : "Loading..."}
                        </CardContent >
                        <CardActions style={{ display: "flex" }}>
                            <Chip label={data && `Place: #${data._____place}`} />
                            <div style={{ flexGrow: 1 }}></div>
                            <Typography variant="caption">https://hive.rocco.dev/bedwars/monthlies</Typography>
                        </CardActions>
                    </Card >
                </div>
                <ImageModal open={!!this.state.imgModal} img={this.state.imgModal} classes={classes.modal} name={this.uuid} />
            </div>
        );
    }
}

export default withStyles(useStyles)(BedMonthlyProfile);