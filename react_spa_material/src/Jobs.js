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
//import Multhiselect from "@khanacademy/react-multi-select"; //replace this it is outdated

var seedrandom = require('seedrandom');


const Icon = ({name, size}) => {
  if (name === undefined) {
    name =""
  }
  var rng = seedrandom(name);
  return (
<Initicon size={size} seed={rng()*10} text={name.toUpperCase()} />
  )
}
const options = [
  {label: "HVAC", value: "HVAC"},
  {label: "PLUM", value: "PLUM"},
  {label: "FUEL", value: "FUEL"},
  {label: "ELECTRICAL", value: "ELECTRICAL"},
  {label: "DRYWALL", value: "DRYWALL"},
  {label: "FRAMING", value: "FRAMING"},
  {label: "FIRE", value: "FIRE"},
];
const optionsareas = [
  {label: "A", value: "A"},
  {label: "B", value: "B"},
  {label: "C", value: "C"},
  {label: "D", value: "D"},
  {label: "E", value: "E"},
  {label: "F", value: "F"},
];


class Job extends Component {
  //uhh fix this bullshit
  state = {
    job: {},
    jobid: undefined !== this.props.job ? this.props.job["_id"] : undefined,
    scopes: [],
    areas: [],
    jobname: undefined !== this.props.job ? this.props.job["name"] : undefined,
    jobaddress: undefined !== this.props.job ? this.props.job["street"] : undefined, 
    jobcity: undefined !== this.props.job ? this.props.job["city"] : undefined,
    jobzip: undefined !== this.props.job ? this.props.job["zip"] : undefined,
    joblevels: undefined !== this.props.job ? this.props.job["levels"] : undefined,
    icontext: undefined !== this.props.job ? this.props.job["name"] : undefined,
    updateJob: this.props.updateJob,
  }
  updateState(job) {
    if (job === undefined) {
      return 
    }
    this.setState({jobid: job["_id"]})
    this.setState({scopes: job["scopes"] ===undefined? [] : job["scopes"]})
    this.setState({jobname: job["name"]})
    this.setState({jobaddress: job["street"]})
    this.setState({jobcity: job["city"]})
    this.setState({joblevels: job["levels"]})
    this.setState({jobzip: job["zip"]})
    this.setState({icontext: job["name"]})
  }
  
  render() {
    const {scopes} = this.state;
    const {areas} = this.state;
    if (this.state.job === undefined ) {
      console.log('wtf why')
      return (
        <p>nerd</p>
      )
    }
    return (
      <div style={{margin: 1 + 'em'}}>
      <br></br>
      <br></br>
    <Form onSubmit={
      (e) => {
        e.preventDefault() 
      var jobdata = {
       _id: this.state.jobid, 
        name: this.state.jobname, 
        street: this.state.jobaddress,
        city: this.state.jobcity,
        state: this.state.jobstate,
        levels: this.state.joblevels,
        zip: this.state.jobzip,
        type: this.state.jobtype,
        scopes: this.state.scopes,
      }
      var newjob = this.state.updateJob(jobdata)
      
      console.log("new job 2", newjob.then((data)=> {console.log("data2", data);
       this.updateState(data);
       window.history.replaceState({},"Your JHA | Job ", "#/admin/jobs/"+data._id)
      }))
      
      //TODO: change history if ID has changed
      if (this.state.jobid !== undefined) {
        
      }

      //this.setState({job:this.state.updateJob(jobdata)})
      }
    }>
      <Icon name={this.state.icontext} size={250}></Icon>
    <Form.Group controlId="formJobName">
  <Form.Label>Job Name <span style={{color:"red"}}>*</span></Form.Label>
  <Form.Control size="lg" placeholder="Job Name" value={this.state.jobname} name="jobname" onBlur={(e) => {
    
    this.setState( {icontext: this.state.jobname})}
  }
  onChange={(e) => {
    this.setState({jobname : e.target.value})}
    }/>
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
  <Form.Label>Address <span style={{color:"red"}}>*</span></Form.Label>
  <Form.Control  defaultValue={this.state.jobaddress} name="jobaddress" onChange={(e) => {
    this.setState({jobaddress : e.target.value})}
    }/>
</Form.Group>



  <Form.Group controlId="formGridCity">
    <Form.Label>City <span style={{color:"red"}}>*</span></Form.Label>
    <Form.Control defaultValue={this.state.jobcity} name="jobcity" required onChange={(e) => {
    this.setState({jobcity : e.target.value})}
    }/>
  </Form.Group>

  <Form.Group controlId="formGridState">
    <Form.Label>State  </Form.Label>
    <Form.Control defaultValue={this.state.jobstate} name="jobstate" as="select" onChange={(e) => {
    this.setState({jobstate : e.target.value})}
    }>
      <option>California</option> 
    </Form.Control >
  </Form.Group>



  <Form.Group controlId="formGridZip">
    <Form.Label>Zip</Form.Label>
    <Form.Control defaultValue={this.state.jobzip} name="jobzip" onChange={(e) => {
    this.setState({jobzip : e.target.value})}
    }/>
  </Form.Group>
  <Form.Group controlId="formGridLevel">
    <Form.Label>Levels</Form.Label>
    <Form.Control placeholder="Hieght in Stories of Building" defaultValue={this.state.joblevels} name="joblevels" onChange={(e) => {
    this.setState({joblevels : e.target.value})}
    }/>
  </Form.Group>

  <Form.Group controlId="formGridAreas">
    <Form.Label>Areas</Form.Label>

  {/* <Multhiselect
    options={optionsareas}
    selected={areas}
    onSelectedChanged={areas => this.setState({areas})}
  /> */}
  </Form.Group>

   
<Form.Group controlId="formGridType">
    <Form.Label>Job Type</Form.Label>
    <Form.Control defaultValue={this.state.jobtype} name="jobtype" as="select" onChange={(e) => {
    this.setState({jobtype : e.target.value})}
    }>
      <option>Residential</option> 
      <option>Medical</option> 
      <option>High Rise</option> 
      <option>Gay</option> 
    </Form.Control >
  </Form.Group>

  <Form.Group controlId="formGridZip">
    <Form.Label>Scopes</Form.Label>

  {/* <Multhiselect
    options={options}
    selected={scopes}
    onSelectedChanged={scopes => this.setState({scopes})}
  /> */}
  </Form.Group>

<Button type="submit" >
  Save
</Button>&nbsp;<Button href={"#admin/jobs"} onClick={() => console.log("back_button")}>Return (Without Saving)</Button>
</Form>
</div>
    )
  }
}
 
class Jobs extends Component {
  state = {
    jobs: [],
    scopes: [],
    jobname: "swag",
    icontext: "",
  }

  constructor(props) {
    super(); 
    //TODO add this later eh
     this.getJobs();
  }

  getJobs() {
    environment.fetch('jobs')
    .then(res => res.json())
    .then((data) => {
      this.setState({ jobs: data })
    }).catch(console.log)
  }

  getJob() {
    environment.fetch('jobs')
    .then(res => res.json())
    .then((data) => {
      this.setState({ jobs: data })
      return data
    }).catch(console.log)
  }
  updateJob(body) {
    console.log(body)
    if (!("_id" in body) || body._id === undefined) {
      // we want do do a create here. 
        return environment.fetch('jobs',
        {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Accept': 'application/json',
            "content-type": "application/json",
          }
        })
        .then(res => 
          res.json())
        .then((data) => {
          var newjobs = this.state.jobs
          newjobs.push(data)
          this.setState({
            jobs: newjobs,
          })
          return data
        });
    }
    return environment.fetch('jobs/'+body._id,
    {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Accept': 'application/json',
        "content-type": "application/json",
      }
    })
    .then(res => 
      res.json())
    .then((data) => {
      console.log("res", data)
      console.log("this", this)
      console.log("this", this)
      //this.setState({ jobs: data })
      //TODO update local state
      let ids = [...this.state.jobs]
      let index = ids.findIndex((i) => (i._id === body._id) ? true : false)
      ids[index] = data
      console.log("new jobs", ids)
      this.setState({
        jobs: ids,
      })
      return data

    }).catch(console.log);
  }

  editSingle(id) {
    if (id === "create") {
      return (
        <Job updateJob={(e) => this.updateJob(e)}></Job>
      )
    }
    const job = this.state.jobs.find((e) => (e._id === id))
    if (job === undefined) {
      return (
        <p>could not load job</p>
      )
    }
    return (
      <Job job={job} updateJob={(e) => this.updateJob(e)}></Job>
    )
  }
  
  render() {
  

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
      dataField: 'street',
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
        <Button href="#/admin/jobs/create">Add Job</Button>
        <br></br>
        <br></br>

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
}

export default Jobs;