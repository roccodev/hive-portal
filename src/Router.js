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
import { withRouter } from 'react-router-dom';
import Modes from './Modes';
import { ModeState } from './Modes';

function getComponentForMode(mode) {
    const modes = Object.keys(Modes);
    switch (mode) {
        case "bedwars":
            ModeState.index = modes.indexOf("BedWars");
            break;
        case "timv":
            ModeState.index = modes.indexOf("Trouble in Mineville");
            break;
        case "deathrun":
            ModeState.index = modes.indexOf("DeathRun");
            break;
        case "hide":
            ModeState.index = modes.indexOf("Hide and Seek");
            break;
        case "gravity":
            ModeState.index = modes.indexOf("Gravity");
            break;
        case "drawit":
            ModeState.index = modes.indexOf("DrawIt");
            break;
        case "skywars":
            ModeState.index = modes.indexOf("SkyWars");
            break;
        case "splegg":
            ModeState.index = modes.indexOf("Splegg");
            break;
        case "bp":
            ModeState.index = modes.indexOf("BlockParty");
            break;
        default:
            break;
    }
}

class Router extends React.Component {
    render() {
        const path = this.props.location.pathname;
        let match = path.match(/[^\/][^\/]*/g);
        if (match && match.length > 0) {
            const mode = match[0].toLowerCase();
            getComponentForMode(mode);
            if (match[2]) {
                ModeState.thirdParam = match[2];
            }
        }
        return (<div></div>);
    }
}

export default withRouter(Router);