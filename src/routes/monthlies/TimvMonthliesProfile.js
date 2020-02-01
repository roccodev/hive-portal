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
import { Monthlies } from '../../firebase/config';
import GameProfile from '../../components/row/GameProfile';

const stats = {
    karma: "Karma",
    i_points: "Innocent Points",
    d_points: "Detective Points",
    t_points: "Traitor Points",
    r_points: {
        name: "Role Points",
        value: (data) => data.t_points + data.i_points + data.d_points
    },
    most_change: "Most Points",
    tr: {
        name: "Traitor %",
        value: (data) => (data.t_points * 100.0 / (data.t_points + data.i_points + data.d_points))
            .toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "%"
    },

}

function TimvMonthliesProfile() {
    return (<GameProfile stats={stats} fbConfig={Monthlies.timv} path="monthly/" name="timv" />);
}

export default TimvMonthliesProfile;