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
import { Monthlies, Render } from '../../firebase/config';

const columns = [
    { title: "Place", field: "place", defaultSort: "asc" },
    { title: "Name", field: "name", searchable: true },
    { title: "Points", field: "points" },
    { title: "Victories", field: "victories" },
    { title: "Games Played", field: "played" },
    { title: "Correct Guesses", field: "correct" },
    { title: "Incorrect Guesses", field: "incorrect" },
    { title: "Skips", field: "skips" },
    { title: "W/L", field: "wl", render: Render.decimal("wl") }
];

class DrawitMonthlies extends React.Component {

    render() {
        const fields = {
            name: "username",
            victories: "victories",
            played: "played",
        }
        return (
            <div>
                {makeTable(columns, "Monthly Leaderboard", (query, json) => makeTableParser(query, fields, json),
                    Monthlies.draw, this.props.theme, "/monthly", null, `drawit/monthlies`)}
            </div>
        );
    }
}

export default withTheme(DrawitMonthlies);