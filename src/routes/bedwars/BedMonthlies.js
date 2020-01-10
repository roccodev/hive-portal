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
import { Typography, useTheme, withTheme } from '@material-ui/core';
import { makeTable, makeTableParser } from '../../components/row/GameTable';
import config from '../../firebase/config';

const columns = [
    { title: "Place", field: "_____place", defaultSort: "asc" },
    { title: "Name", field: "____name", searchable: true },
    { title: "Points", field: "__points" },
    { title: "Kills", field: "_kills" },
    { title: "Deaths", field: "_kjdeaths" },
    { title: "Victories", field: "_victories" },
    { title: "Played", field: "played" },
    { title: "Beds Destroyed", field: "zBeds" },
    { title: "Teams Eliminated", field: "zTeams" },
    { title: "K/D", field: "kd" },
    { title: "W/L", field: "wl" }
];

class Bedwars extends React.Component {

    componentDidMount() {
        this.setState({ title: "Bedwars" });
    }

    render() {
        const fields = {
            name: "____name",
            kills: "_kills",
            deaths: "_kjdeaths",
            victories: "_victories",
            played: "played"
        }
        return (
            <div>
                <Typography variant="h3">
                    Bedwars
                </Typography>
                {makeTable(columns, "Monthly Leaderboard", (query, json) => makeTableParser(query, fields, json), config, this.props.theme)}
            </div>
        );
    }
}

export default withTheme(Bedwars);