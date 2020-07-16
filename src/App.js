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
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import BedMonthlies from './routes/bedwars/BedMonthlies';
import { useCookies } from 'react-cookie';
import Router from './Router.js';
import BedStats from './routes/bedwars/BedStats.js';
import TimvMonthlies from './routes/monthlies/TimvMonthlies.js';
import DrMonthlies from './routes/monthlies/DrMonthlies.js';
import HideMonthlies from './routes/monthlies/HideMonthlies.js';
import GntMonthlies from './routes/monthlies/GntMonthlies.js';
import SkyMonthlies from './routes/monthlies/SkyMonthlies.js';
import SpMonthlies from './routes/monthlies/SpMonthlies.js';
import BpMonthlies from './routes/monthlies/BpMonthlies.js';
import BedWinstreaks from './routes/bedwars/BedWinstreaks.js';
import BedMonthliesProfile from './routes/bedwars/BedMonthliesProfile.js';
import BpMonthliesProfile from './routes/monthlies/BpMonthliesProfile.js';
import TimvMonthliesProfile from './routes/monthlies/TimvMonthliesProfile.js';
import SkyMonthliesProfile from './routes/monthlies/SkyMonthliesProfile.js';
import SpMonthliesProfile from './routes/monthlies/SpMonthliesProfile.js';
import HideMonthliesProfile from './routes/monthlies/HideMonthliesProfile.js';
import DrMonthliesProfile from './routes/monthlies/DrMonthliesProfile.js';
import GntMonthliesProfile from './routes/monthlies/GntMonthliesProfile.js';
import BedFarmers from './routes/bedwars/BedFarmers.js';
import BedRanks from './routes/bedwars/BedRanks.js';
import BedMaps from './routes/bedwars/BedMaps.js';
import BedStatsLandingPage from './routes/bedwars/BedStatsLandingPage.js';
import Ads from './components/Ads.js';
import About from './routes/About.js';

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

  const app = (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Container maxWidth="lg">
        <Switch>
          <Route path="/about" component={About} />

          <Route path="/bedwars/monthlies/:uuid" component={BedMonthliesProfile} />
          <Route path="/bedwars/monthlies" component={BedMonthlies} />

          <Route path="/bedwars/stats/:uuid" component={BedStats} />
          <Route path="/bedwars/stats" component={BedStatsLandingPage} />
          <Route path="/bedwars/winstreaks" component={BedWinstreaks} />
          <Route path="/bedwars/farmers" component={BedFarmers} />
          <Route path="/bedwars/ranks" component={BedRanks} />
          <Route path="/bedwars/maps" component={BedMaps} />

          <Route path="/timv/monthlies/:uuid" component={TimvMonthliesProfile} />
          <Route path="/timv/monthlies" component={TimvMonthlies} />

          <Route path="/deathrun/monthlies/:uuid" component={DrMonthliesProfile} />
          <Route path="/deathrun/monthlies" component={DrMonthlies} />

          <Route path="/gnt/monthlies/:uuid" render={() => <GntMonthliesProfile />} />
          <Route path="/gnt/monthlies" render={() => <GntMonthlies />} />
          <Route path="/gntm/monthlies/:uuid" render={() => <GntMonthliesProfile mini />} />
          <Route path="/gntm/monthlies" render={() => <GntMonthlies mini />} />

          <Route path="/skywars/monthlies/:uuid" component={SkyMonthliesProfile} />
          <Route path="/skywars/monthlies" component={SkyMonthlies} />

          <Route path="/splegg/monthlies/:uuid" component={SpMonthliesProfile} />
          <Route path="/splegg/monthlies" component={SpMonthlies} />

          <Route path="/bp/monthlies/:uuid" component={BpMonthliesProfile} />
          <Route path="/bp/monthlies" component={BpMonthlies} />

          <Route path="/hide/monthlies/:uuid" component={HideMonthliesProfile} />
          <Route path="/hide/monthlies" component={HideMonthlies} />
        </Switch>
      </Container>
      <Ads />
    </div>
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
          <Route path="/monthlies/splegg/">
            <Redirect to="/splegg/monthlies/" />
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
          <Navbar themeSetter={setTheme} app={app} />
        </BrowserRouter>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
