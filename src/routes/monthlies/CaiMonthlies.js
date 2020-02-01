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
import { makeTable, makeTableParser } from '../../components/row/GameTable';
import { Monthlies } from '../../firebase/config';

const columns = [
    { title: "Place", field: "place", defaultSort: "asc" },
    { title: "Name", field: "name", searchable: true },
    { title: "Points", field: "points" },
    { title: "Captures", field: "captures" },
    { title: "Caught", field: "caught" },
    { title: "Victories", field: "victories" },
    { title: "Games Played", field: "played" },
    { title: "W/L", field: "wl" }
];

class DeathrunMonthlies extends React.Component {

    render() {
        const fields = {
            name: "username",
            victories: "victories",
            played: "played",
        }
        return (
            <div>
                {makeTable(columns, "Monthly Leaderboard", (query, json) => makeTableParser(query, fields, json),
                    Monthlies.cai, this.props.theme, "/monthly", null, "cai/monthlies")}
            </div>
        );
    }
}

export default withTheme(DeathrunMonthlies);