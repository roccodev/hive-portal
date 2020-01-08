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
import { Route, withRouter } from 'react-router-dom';
import Bedwars from './routes/Bedwars';
import Modes from './Modes';
import { ModeState } from './Modes';

function getComponentForMode(mode) {
    const modes = Object.keys(Modes);
    switch (mode) {
        case "bedwars":
            ModeState.index = modes.indexOf("BedWars");
            break;
        default:
            break;
    }
}

class Router extends React.Component {
    render() {
        const path = this.props.location.pathname;
        let match = /[^\/][^\/]*/.exec(path);
        if (match.length > 0) {
            const mode = match[0].toLowerCase();
            getComponentForMode(mode);
        }
        return (<div></div>);
    }
}

export default withRouter(Router);