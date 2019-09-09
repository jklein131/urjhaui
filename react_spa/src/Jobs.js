import React, { Component } from "react";
import { environment } from "./enviroments/enviroment"; 

//bootstrapTable
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Media from 'react-bootstrap/Media';
import Initicon from 'react-initicon';
import MultiSelect from "@khanacademy/react-multi-select";

var seedrandom = require('seedrandom');


const Icon = ({name, size}) => {
  var rng = seedrandom(name);
  return (
<Initicon size={size} seed={rng()*10} text={name} />
  )
  
}
const options = [
  {label: "HVAC", value: 1},
  {label: "PLUM", value: 2},
  {label: "FUEL", value: 3},
  {label: "ELECTRICAL", value: 4},
  {label: "DRYWALL", value: 5},
  {label: "FRAMING", value: 6},
  {label: "FIRE", value: 7},
];
 
class Jobs extends Component {
  state = {
    jobs: [],
    selected: [],
  } 


  getJobs() {
    fetch( environment.apiUrl+'jobs')
    .then(res => res.json())
    .then((data) => {
      this.setState({ jobs: data })
    }).catch(console.log)
  }

  getJob() {
    fetch( environment.apiUrl+'jobs')
    .then(res => res.json())
    .then((data) => {
      this.setState({ jobs: data })
    }).catch(console.log)
  }

  editSingle(id) {
    const job = this.state.jobs.find((e) => (e._id === id))
    console.log(job)
    if (job === undefined) {
      return (
        <p>could not render job</p>
      )
    }
    const {selected} = this.state;

    return (
      <div style={{margin: 1 + 'em'}}>
        <Button href={"#admin/jobs"} onClick={() => console.log("back_button")}>Back To Jobs</Button>
        <br></br>
        <br></br>
      <Form onSubmit={
        (e) => {e.preventDefault() 
        console.log(e.target.elements.jobname.value)}
      }>
        <Icon name={job["name"]} size={250}></Icon>
      <Form.Group controlId="formJobName">
    <Form.Label>Job Name</Form.Label>
    <Form.Control size="lg" placeholder="Job Name" defaultValue={job["name"]} name="jobname"/>
  </Form.Group>

{/* 
  <Form.Row >
    <Form.Group controlId="formGridEmail">
      <Form.Label>Email</Form.Label>
      <Form.Control type="email" placeholder="Enter email"  />
    </Form.Group>

    <Form.Group controlId="formGridPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" />
    </Form.Group>
  </Form.Row> */}


  <Form.Group controlId="formGridAddress1">
    <Form.Label>Address</Form.Label>
    <Form.Control  defaultValue={job["address"]} name="jobaddress"/>
  </Form.Group>



    <Form.Group controlId="formGridCity">
      <Form.Label>City</Form.Label>
      <Form.Control defaultValue={job["city"]} name="jobcity"/>
    </Form.Group>

    <Form.Group controlId="formGridState">
      <Form.Label>State</Form.Label>
      <Form.Control defaultValue={job["state"]} name="jobstate" as="select">
        <option>California</option> 
      </Form.Control >
    </Form.Group>
 


    <Form.Group controlId="formGridZip">
      <Form.Label>Zip</Form.Label>
      <Form.Control />
    </Form.Group>
 
     
  <Form.Group controlId="formGridType">
      <Form.Label>Job Type</Form.Label>
      <Form.Control defaultValue={job["type"]} name="jobtype" as="select">
        <option>Residential</option> 
        <option>Medical</option> 
        <option>High Rise</option> 
        <option>Gay</option> 
      </Form.Control >
    </Form.Group>

    <Form.Group controlId="formGridZip">
      <Form.Label>Scopes</Form.Label>

    <MultiSelect
      options={options}
      selected={selected}
      onSelectedChanged={selected => this.setState({selected})}
    />
    </Form.Group>

  <Button type="submit" >
    Save
  </Button>
</Form>
</div>
      
     
    )
  }
  
  render() {
    console.log("props", this.props)
    console.log("this", this.state)
  
    if (this.props.match !== undefined && this.props.match.params["id"] !== undefined) {
      const jobid = this.props.match.params["id"] 
      return this.editSingle(jobid) 
    }
    
    const deleteFormatter = (cell, row, rowIndex, formatExtraData) => { return (  <div><Button onSubmit={(e) => e.preventDefault()} href={"#admin/jobs/"+row._id} onClick={() => console.log(row._id)}>Edit </Button></div> ); }
    const iconFormatter = (cell, row, rowIndex, formatExtraData) => {  
    return ( 
      
    <Media >
      <div className="mr-3">
      <Icon name={row.name} size={45}></Icon>
      </div>
      <Media.Body>
    <h5>{row.name}</h5>
    </Media.Body></Media>) }
     
    const { SearchBar } = Search;
    const columns = [{
      dataField: 'name',
      text: 'Job Name',
      sort: true,
      formatter: iconFormatter, 
    },{
      dataField: 'address',
      text: 'Address',
      sort: true,
    },{
      dataField: 'scope',
      text: 'Scopes',
    },{
      dataField: 'levels',
      text: 'Levels',
    },{dataField: '',
    text: 'Edit', 
    formatter: deleteFormatter }
  ];
    return (
      <div>
        <h2>Jobs</h2>

        <ToolkitProvider
  keyField="id"
  data={ this.state.jobs  }
  columns={ columns }
  search
  hover={true} 
>
  {
    props => (
      <div> 
        <SearchBar { ...props.searchProps } />
        <hr />
        <BootstrapTable
          { ...props.baseProps }
        />
      </div>
    )
  }
</ToolkitProvider>

      </div>
    );
  }
  componentDidMount() {
    this.getJobs() 
  }
}

export default Jobs;