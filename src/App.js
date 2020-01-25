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


import React, { useState } from 'react';
import './components/nav/Navbar.js';
import Navbar from './components/nav/Navbar.js';
import { createMuiTheme, Container, CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import lightGreen from '@material-ui/core/colors/lightGreen';
import { BrowserRouter, Route, Redirect, withRouter } from 'react-router-dom';
import BedMonthlies from './routes/bedwars/BedMonthlies';
import { useCookies } from 'react-cookie';
import Router from './Router.js';
import BedStats from './routes/bedwars/BedStats.js';
import TimvMonthlies from './routes/monthlies/TimvMonthlies.js';
import DrMonthlies from './routes/monthlies/DrMonthlies.js';
import HideMonthlies from './routes/monthlies/HideMonthlies.js';
import GntMonthlies from './routes/monthlies/GntMonthlies.js';
import SkyMonthlies from './routes/monthlies/SkyMonthlies.js';
import CaiMonthlies from './routes/monthlies/CaiMonthlies.js';
import BpMonthlies from './routes/monthlies/BpMonthlies.js';
import BedWinstreaks from './routes/bedwars/BedWinstreaks.js';

function App(props) {
  const [cookieTheme, _] = useCookies('palette-type');
  const [theme, setTheme] = useState(cookieTheme['palette-type']);

  const isDark = theme === 'dark';
  const theme1 = React.useMemo(
    () => createMuiTheme({
      palette: {
        type: theme,
        primary: {
          main: '#7cb342',
        },
        secondary: lightGreen,
      }
    }), [isDark]
  );
  return (
    <MuiThemeProvider theme={theme1}>
      <CssBaseline />
      <div className="App">
        <BrowserRouter>
          {/* Old redirects */}
          <Route exact path="/bedwars">
            <Redirect to="/bedwars/monthlies/" />
          </Route>
          <Route path="/monthlies/timv/">
            <Redirect to="/timv/monthlies/" />
          </Route>
          <Route path="/monthlies/dr/">
            <Redirect to="/deathrun/monthlies/" />
          </Route>
          <Route path="/monthlies/sky/">
            <Redirect to="/skywars/monthlies/" />
          </Route>
          <Route path="/monthlies/cai/">
            <Redirect to="/cai/monthlies/" />
          </Route>
          <Route path="/monthlies/bp/">
            <Redirect to="/bp/monthlies/" />
          </Route>
          <Route path="/monthlies/hide/">
            <Redirect to="/hide/monthlies/" />
          </Route>
          <Route path="/monthlies/gnt/">
            <Redirect to="/gnt/monthlies/" />
          </Route>
          <Route path="/monthlies/gntm/">
            <Redirect to="/gntm/monthlies/" />
          </Route>

          {/* Aliases */}
          <Route exact path="/dr*">
            <Redirect to="/deathrun" />
          </Route>
          <Route exact path="/sky/*">
            <Redirect to="/skywars" />
          </Route>

          <Router />
          <Navbar themeSetter={setTheme} />
          <Container maxWidth="lg">
            <Route path="/bedwars/monthlies" component={BedMonthlies} />
            <Route path="/bedwars/stats" component={BedStats} />
            <Route path="/bedwars/winstreaks" component={BedWinstreaks} />

            <Route path="/timv/monthlies" component={TimvMonthlies} />

            <Route path="/deathrun/monthlies" component={DrMonthlies} />

            <Route path="/gnt/monthlies" render={() => <GntMonthlies />} />
            <Route path="/gntm/monthlies" render={() => <GntMonthlies mini />} />

            <Route path="/skywars/monthlies" component={SkyMonthlies} />

            <Route path="/cai/monthlies" component={CaiMonthlies} />

            <Route path="/bp/monthlies" component={BpMonthlies} />
          </Container>
        </BrowserRouter>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
