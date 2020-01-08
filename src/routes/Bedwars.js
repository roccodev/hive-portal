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
import { makeTable } from '../components/row/GameTable';
import config from '../firebase/config';
import Modes from '../Modes';
import { ModeState } from '../Modes';

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
        ModeState.index = Object.keys(Modes).indexOf("BedWars");
        this.setState({ title: "Bedwars" });
    }

    render() {
        return (
            <div>
                <Typography variant="h3">
                    Bedwars
                </Typography>
                {makeTable(columns, "Monthly Leaderboard", (query, json) => new Promise((res, rej) => {
                    if (Object.keys(json).length === 0) return;
                    let data = Object.values(json).map(obj => {
                        obj.kd = (obj["_kills"] / obj["_kjdeaths"]).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                        obj.wl = (obj["_victories"] / (obj["played"] - obj["_victories"])).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                        return obj;
                    })
                    const pageSize = query.pageSize;
                    const page = query.page;
                    const orderBy = query.orderBy;
                    const filter = query.search;
                    if (filter) {
                        data = data.filter(obj => obj["____name"].match(new RegExp(filter, 'i')));
                    }
                    const length = data.length;
                    if (orderBy) {
                        data = data.sort((a, b) => {
                            const obj1 = a[orderBy.field];
                            const obj2 = b[orderBy.field];

                            const cmp = obj1 > obj2 ? 1 : obj1 < obj2 ? -1 : 0;
                            return query.orderDirection === "asc" ? cmp : -cmp;
                        })
                    }
                    data = data.slice(page * pageSize, page * pageSize + pageSize);
                    res({
                        data: data,
                        page: query.page,
                        totalCount: length
                    })
                }), config, this.props.theme)}
            </div>
        );
    }
}

export default withTheme(Bedwars);