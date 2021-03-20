import React from "react";
import ReactDOM from "react-dom";
import { CircularProgress, Typography } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import { environment } from "./enviroments/enviroment"; 
import IconButton from '@material-ui/core/IconButton';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';



export default function FormDashboardTable({template}) {

  var [data, setData] = React.useState([["Loading..."]])
  var [isLoading, setLoading] = React.useState([])

  React.useEffect(()=>{
    setLoading(true );
    environment.fetch( 'formcomplete/template/' + template._id)
    .then(res => res.json())
    .then((data) => {
      setLoading(false);
      setData( data)
      
      console.log(data)
    }).catch(console.log)
    return 
  },[template])
  // populate columns based on the template
  // TODO: set special flags in the form builder that allows fields to be filterable. 
    const columns = [
        {
         name: "jobId.name",
         label: "Job Name",
        },
        {
            name: "updatedAt",
            label: "Created At",
        },
        {
          name: "profileId.displayName",
          label: "Created By",
      },
        {
            name: "pdfUrl", 
            label: "PDF",
            options: {
              filter: false,
              sort: false,
              empty: true,
              customBodyRender: (value, tableMeta, updateValue) => {

                return value !== undefined ? (
                    <IconButton onClick={() => firebase.storage().ref(value).getDownloadURL().then((snapshot) => {
                        console.log(snapshot)
                        window.open(snapshot)
                        return 
                      })}>
                        <PictureAsPdfIcon></PictureAsPdfIcon>
                    </IconButton>
                ) : "";
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
        <MUIDataTable title={<Typography variant="title">
          Previous {template.name}'s
          {isLoading && <CircularProgress size={24} style={{marginLeft: 15, position: 'relative', top: 4}} />}
          </Typography>
          } data={data} columns={columns} options={options} />
      </div>
    );
}