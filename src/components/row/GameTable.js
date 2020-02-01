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
import { forwardRef } from 'react';
import MaterialTable from 'material-table';
import Firebase from 'firebase';

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
import Update from '@material-ui/icons/Update'
import { Chip, Link } from '@material-ui/core';

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

class FirebaseTable extends React.Component {
    constructor(props) {
        super(props);
        this.tableRef = React.createRef();
        this.columns = props.columns;
        this.name = props.name;
        this.parser = props.parser;
        this.firebaseConfig = props.config;
        this.json = {};
        this.firebaseApp = Firebase.initializeApp(this.firebaseConfig);
        this.theme = props.theme;
        this.path = props.path || "/";
        this.lastUpdate = new Date();
        this.dbRef = this.firebaseApp.database().ref(this.path);
    }

    componentDidMount() {
        // We can set up Firebase here.
        this.dbRef.on('value', snap => {
            const json = snap.val();
            this.json = json;
            this.lastUpdate = new Date();
            this.update();
            this.setState({ a: 0 }); // Update the "Last updated" counter
        });
    }

    componentWillUnmount() {
        // Page reload/changed, changing Firebase instance here.
        this.firebaseApp.delete();
    }

    updateRef(newPath) {
        this.dbRef.off("value");
        this.dbRef = this.firebaseApp.database().ref(newPath);
        this.componentDidMount();
    }

    update() {
        this.tableRef.current && this.tableRef.current.onQueryChange();
    }

    render() {
        const theme = this.theme;
        return (
            <div>
                <div style={{ display: "flex", marginTop: "10px" }}>
                    <p style={{ flex: "1 1 5%", textDecoration: "italic" }}>Select a player to view more info.</p>
                    <Chip
                        label={`Last updated ${this.lastUpdate.getHours()}:${this.lastUpdate.getMinutes().toString().padStart(2, '0')}`}
                        variant="outlined"
                        style={{}}
                        icon={<Update />} />
                </div>
                <MaterialTable
                    title={this.name}
                    tableRef={this.tableRef}
                    icons={tableIcons}
                    columns={this.columns}
                    options={{
                        sorting: true,
                        pageSize: 10,
                        pageSizeOptions: [10, 20, 50],
                        rowStyle: rowData => ({
                            backgroundColor: (rowData.tableData.id % 2) ? theme.palette.background.paper : theme.palette.background.default
                        }),
                        exportButton: true,
                        draggable: false
                    }}
                    data={(query) => this.parser(query, this.json)}
                >
                </MaterialTable >
            </div>
        );
    }
}

function makeTableParser(query, fields, json) {
    return new Promise((res, rej) => {
        if (Object.keys(json).length === 0) return;
        let data = Object.values(json).map(obj => {
            obj.uuid = Object.keys(json).find(key => json[key] === obj);
            obj = { name: obj[fields.name], ...obj };
            delete obj[fields.name];
            obj.kd = (obj[fields.kills] / obj[fields.deaths]).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            obj.wl = (obj[fields.victories] / (obj[fields.played] - obj[fields.victories])).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            return obj;
        })
        const pageSize = query.pageSize;
        const page = query.page;
        const orderBy = query.orderBy;
        const filter = query.search;
        if (filter) {
            data = data.filter(obj => obj[fields.name].match(new RegExp(filter, 'i')));
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
    });
}

function makeTable(columns, title, parser, fbConfig, theme, path = "/", ref, nameBaseUrl) {
    if (nameBaseUrl) {
        columns = columns.map(col => {
            if (col.field === "name") {
                col.render = rowData => (
                    <div style={{ display: "flex" }}>
                        <img src={`https://crafatar.com/avatars/${rowData.uuid}?size=16`} alt="Skin"></img>
                        <Link href={`https://hive.rocco.dev/${nameBaseUrl}/${rowData.uuid}`} style={{ marginLeft: "10px" }}>{rowData.name}</Link>
                    </div >
                );
            }
            return col;
        });
    }
    return (
        <FirebaseTable
            columns={columns}
            name={title}
            parser={parser}
            config={fbConfig}
            theme={theme}
            path={path}
            ref={ref}
        />
    );
}

export { makeTable, makeTableParser };