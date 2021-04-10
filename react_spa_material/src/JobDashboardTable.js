import React from "react";
import ReactDOM from "react-dom";
import { CircularProgress, Typography } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import { environment } from "./enviroments/enviroment"; 
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import JobEditModal from './JobEditModal'
import Icon from './Icon'

import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';



export default function JobDashboardTable({jobs, setJob}) {

  // populate columns based on the template
  // TODO: set special flags in the form builder that allows fields to be filterable. 
    const columns = [
        {
         name: "name",
         label: "Job Name",
        //  options :{
        //   customBodyRender: (value, tableMeta, updateValue) => {
        //     return value !== undefined ? (
        //       <span><Icon  name={value} size={25}></Icon>{value}</span>
        //     ) : "";
        //   }
        // }
        },
        {
          name: "street",
          label: "Job Location",
         },
        {
          name: "jhacount",
          label: "Total JHA's",
      },
      //   {
      //     name: "profileId.displayName",
      //     label: "Created By",
      // },
        {
            name: "_id", 
            label: "Edit",
            options: {
              filter: false,
              sort: false,
              empty: true,
              customBodyRender: (value, tableMeta, updateValue) => {
                console.log(tableMeta)
                return (
                  <JobEditModal job={tableMeta.tableData[tableMeta.rowIndex]} setJob={setJob}></JobEditModal>
                )
              }
            }
          }
       ];
    //TODO reduce padding on 
    // .MuiTableCell-root {
    //     display: table-cell;
    //     /* padding: 16px; */

    const options = {
      filter: true,
      filterType: 'dropdown',
      responsive: 'stacked',
      print: false, 
    //   serverSide: true,
    //   count: count,
    //   page: page,
      onTableChange: (action, tableState) => {

        console.log(action, tableState);
        // a developer could react to change on an action basis or
        // examine the state as a whole and do whatever they want

        // switch (action) {
        //   case 'changePage':
        //     this.changePage(tableState.page);
        //     break;
        // }
      }
    };
    return ( 
      <div>
        <MUIDataTable title={<Typography variant="h6">
          All Jobs
          {/* {isLoading && <CircularProgress size={24} style={{marginLeft: 15, position: 'relative', top: 4}} />} */}
          </Typography>
          } data={jobs} columns={columns} options={options} />
      </div>
    );
}