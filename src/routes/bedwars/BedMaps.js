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

class BedMaps extends React.Component {
    state = {
        data: null
    }

    componentDidMount() {
        this._dataPromise = getJson(`https://api.hivemc.com/v1/game/BED/maps`).then(
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
                <Typography variant="h5" align="center">Maps</Typography>
                <br />
                {this.state.data ?

                    <TableContainer component={Paper}>
                        <Table stickyHeader aria-label="ranks table" size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Mode</TableCell>
                                    <TableCell>Author</TableCell>
                                    <TableCell>Added on</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.values(this.state.data).reverse().map(row => {
                                    const mode = row.worldname.endsWith("_TEAM") ? "Duos" : row.worldname.endsWith("_SOLO") ? "Solo" : "Teams";
                                    return (
                                        <TableRow key={row.name}>
                                            <TableCell component="th" scope="row">{row.mapname}</TableCell>
                                            <TableCell>{mode}</TableCell>
                                            <TableCell>{row.mapauthor}</TableCell>
                                            <TableCell>{new Date(row.added * 1000).toLocaleDateString()}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    : "Loading..."}
            </div>
        );
    }
}

export default BedMaps;