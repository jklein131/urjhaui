import React from "react";
import ReactDOM from "react-dom";
import { CircularProgress, Typography } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import { environment } from "./enviroments/enviroment"; 
import IconButton from '@material-ui/core/IconButton';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import LaunchIcon from '@material-ui/icons/Launch';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import * as m from 'moment'
async function inner(data) {
  await Promise.all( data.map((person, index) => {
    return firebase.storage().ref(person.data[4]).getDownloadURL().then((snapshot) => {
        person.data[4] = snapshot
      }
    )
  }))
  return data
}

class PositionsDashboardTable extends React.Component {

  state = {
    page: 0,
    count: 1,
    data: [["Loading Data..."]],
    isLoading: false
  };

  componentDidMount() {
    this.getData();
  }

  // get data
  getData = () => {
    this.setState({ isLoading: true });
    environment.fetch( 'jhacomplete/positions')
    .then(res => res.json())
    .then((data) => {
      this.setState({ data: data, isLoading: false })
      console.log(data)
    }).catch(console.log)
  }

//   changePage = (page) => {
//     this.setState({
//       isLoading: true,
//     });
    
//     this.xhrRequest(`/myApiServer?page=${page}`).then(res => {
//       this.setState({
//         isLoading: false,
//         page: page,
//         data: res.data,
//         count: res.total,
//       });
//     });
//   };

csvDownload(buildHead,buildBody,columns,data) {
  // data = inner(data)
  return buildHead(columns) + buildBody(data) 
}

  render() {
    const columns = [
        // {
        //  name: "jobId.name",
        //  label: "Job Name",
        // },
        {
         name: "activityId.name",
         label: "Activity Name",
        },
        {
            name: "profileId.displayName",
            label: "Created By",
        },
        {
            name: "updatedAt",
            label: "Created At",
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                  // console.log("clicked", value, tableMeta, updateValue, m().utc(value).local())
                  return value !== undefined ? (
                      <span>{m.utc(value).local().format('MMMM Do YYYY, h:mm a')}</span>
                  ) : "";
                }
              }
        },
        
        {
            name: "pdfUrl",
            label: "PDF",
            options: {
              filter: false,
              sort: false,
              empty: true,
              customBodyRender: (value, tableMeta, updateValue) => {
                // console.log("clicked", value, tableMeta, updateValue)
                return value !== undefined ? (
                  <React.Fragment>
                    <IconButton onClick={() => firebase.storage().ref(value).getDownloadURL().then((snapshot) => {
                        console.log(snapshot)
                        window.open(snapshot)
                        return 
                      })}>
                        <PictureAsPdfIcon></PictureAsPdfIcon>
                    </IconButton>
                    </React.Fragment>
                ) : "";
              }
            }
          },
          {
            name: "_id",
            label: "Template",
            options: {
              filter: false,
              sort: false,
              empty: true,
              customBodyRender: (value, tableMeta, updateValue) => {
                // console.log("clicked", value, tableMeta, updateValue) 
                return value !== undefined ? (
                  <React.Fragment>
                    <IconButton href={"#/positions/"+ value}>
                        <LaunchIcon></LaunchIcon>
                    </IconButton>
                    </React.Fragment>
                ) : "";
              }
            }
          }
       ];
    const { data, page, count, isLoading } = this.state;
    //TODO reduce padding on 
    // .MuiTableCell-root {
    //     display: table-cell;
    //     /* padding: 16px; */

    const options = {
      filter: true,
      filterType: 'dropdown',
      responsive: 'standard', //standard | vertical | simple
      print: false, 
      onDownload: this.csvDownload,
    //   serverSide: true,
    //   count: count,
    enableNestedDataAccess: '.',
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
          Previous PHA's
          {isLoading && <CircularProgress size={24} style={{marginLeft: 15, position: 'relative', top: 4}} />}
          </Typography>
          } data={data} columns={columns} options={options} />
      </div>
    );

  }
}

export default PositionsDashboardTable;