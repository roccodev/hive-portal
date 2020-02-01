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
import { withTheme } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { makeTable, makeTableParser } from '../../components/row/GameTable';
import config from '../../firebase/config';

const columns = [
    { title: "Place", field: "place", defaultSort: "asc" },
    { title: "Name", field: "name", searchable: true },
    { title: "Win Streak", field: "winstreak" },
];

class BedStreaks extends React.Component {
    table = React.createRef();
    state = { selected: 0 };

    render() {
        const fields = {
            name: "name"
        }
        return (
            <div style={{ marginTop: "10px" }}>
                <ToggleButtonGroup size="small" color="primary" value={this.state.selected} exclusive onChange={(e, i) => {
                    const path = i === 0 ? "BED" : i === 1 ? "BEDS" : i === 2 ? "BEDD" : i === 3 ? "BEDT" : i === 4 ? "BEDX" : "BED";
                    this.table.current && this.table.current.updateRef(path);
                    this.setState({ selected: i });
                }}>
                    <ToggleButton value={0}>Global</ToggleButton>
                    <ToggleButton value={1}>Solo</ToggleButton>
                    <ToggleButton value={2}>Duos</ToggleButton>
                    <ToggleButton value={3}>Teams</ToggleButton>
                    <ToggleButton value={4}>LTM</ToggleButton>
                </ToggleButtonGroup>
                {makeTable(columns, "Win Streak Leaderboard", (query, json) => makeTableParser(query, fields, json), config.winstreaks, this.props.theme, "BED", this.table)}
            </div>
        );
    }
}

export default withTheme(BedStreaks);