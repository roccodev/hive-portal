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

import React, { forwardRef } from 'react';
import { Typography } from '@material-ui/core';
import { getJson } from '../../util/HttpClient';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Update from '@material-ui/icons/Update';
import { withTheme } from '@material-ui/styles';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const columns = [
    { title: "Name", field: "plain_name" },
    { title: "Required Points", field: "required_points" },
]

class BedMaps extends React.Component {
    state = {
        data: null
    }

    componentDidMount() {
        this._dataPromise = getJson(`https://api.hivemc.com/v1/game/BED/titles`).then(
            json => {
                this._dataPromise = null;
                this.setState({ data: json });
            }
        );
    }

    componentWillUnmount() {
        if (this._dataPromise) {
            this._dataPromise.cancel();
        }
    }

    render() {
        const theme = this.props.theme;
        return (
            <div>
                <Typography variant="h5" align="center">Ranks</Typography>
                <br />
                {this.state.data ?
                    <MaterialTable
                        columns={columns}
                        title="Ranks"
                        icons={tableIcons}
                        options={{
                            sorting: true,
                            pageSize: 10,
                            pageSizeOptions: [10, 20, 50],
                            rowStyle: rowData => ({
                                backgroundColor: (rowData.tableData.id % 2) ? theme.palette.background.paper : theme.palette.background.default
                            }),
                            draggable: false
                        }}
                        data={Object.values(this.state.data)}
                    />

                    : "Loading..."}
            </div>
        );
    }
}

export default withTheme(BedMaps);