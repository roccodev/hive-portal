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
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@material-ui/core';
import { getJson } from '../../util/HttpClient';

class BedRanks extends React.Component {
    state = {
        data: null
    }

    componentDidMount() {
        this._dataPromise = getJson(`https://api.hivemc.com/v1/game/BED/titles`).then(
            json => {
                this._dataPromise = null;
                this.setState({ data: json });
            }
        );
    }

    componentWillUnmount() {
        if (this._dataPromise) {
            this._dataPromise.cancel();
        }
    }

    render() {
        return (
            <div>
                <Typography variant="h5" align="center">Ranks</Typography>
                <br />
                {this.state.data ?

                    <TableContainer component={Paper}>
                        <Table stickyHeader aria-label="ranks table" size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Rank</TableCell>
                                    <TableCell>Required Points</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.data.map(row => (
                                    <TableRow key={row.name}>
                                        <TableCell component="th" scope="row">{row.plain_name}</TableCell>
                                        <TableCell>{row.required_points}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    : "Loading..."}
            </div>
        );
    }
}

export default BedRanks;