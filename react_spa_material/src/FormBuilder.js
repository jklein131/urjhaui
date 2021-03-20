import $ from "jquery";
import React, { Component, createRef} from "react";
import { environment } from "./enviroments/enviroment"; 

//bootstrapTable
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Media from 'react-bootstrap/Media';
import Initicon from 'react-initicon';
//import ReactDOM from "react-dom";
//import "./styles.css";

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


window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");
require("./control_plugins/starRating")



class FormBuilderView extends Component {
  state = {
    jobid: undefined !== this.props.job ? this.props.job["_id"] : undefined, 
    formname: undefined !== this.props.job ? this.props.job["name"] : "", 
    formdesc: undefined !== this.props.job ? this.props.job["description"] : "",
    formdata: undefined !== this.props.job ? this.props.job["template"] : "",
    updateJob: this.props.updateJob, 
    formbuilder: undefined, 
  }
  fb = createRef();
  componentDidMount() {
    const formData = this.state.formdata
    this.setState({formbuilder: $(this.fb.current).formBuilder({ formData, 
    onSave: (e,fd) => alert(fd)}
    )})
  }
  render() {
  //   if (this.state.jobid === "create") {
  //     return (
  //       <div>
  //       <h1>Create a New Form</h1>
  //       <Form.Group controlId="formGridLevel">
  //   <Form.Label>Levels</Form.Label>
  //   <Form.Control placeholder="Hieght in Stories of Building" defaultValue={this.state.joblevels} name="joblevels" onChange={(e) => {
  //   this.setState({joblevels : e.target.value})}
  //   }/>
  // </Form.Group>

  //       <Button href="#/form-builder">Return To List</Button>
  //       <div id="fb-editor" ref={this.fb} />
  //       </div>
  //     )
  //   } else {
      return (
        <div>
          <Form onSubmit={
      (e) => {
        e.preventDefault() 
      var jobdata = {
       _id: this.state.jobid, 
        name: this.state.formname,
        description: this.state.formdesc,
        template: this.state.formbuilder.actions.getData(),
      }
     var updatePromise = this.state.updateJob(jobdata)
     console.log(updatePromise)
     updatePromise.then((data)=> { console.log("dboy", data) ; 
     window.history.replaceState({},"Your JHA | Form ", "#/form-templates/"+data._id)
    })
      }
    }>
          
        <h1>{ (this.state.jobid === "create") ? "Create" :"Edit" } {this.state.jobid === "create" ? "New Form Template": this.state.jobid }</h1> 
        <Form.Group controlId="formGridFormTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control required placeholder="Form Title" defaultValue={this.state.formname}  onChange={(e) => {
          this.setState({formname : e.target.value})}
          }/>
        </Form.Group>
        <Form.Group controlId="formGridDesc">
          <Form.Label>Details</Form.Label>
          <Form.Control required placeholder="Form Description" defaultValue={this.state.formdesc} as="textarea" onChange={(e) => {
          this.setState({formdesc : e.target.value})}
          }/>
        </Form.Group>
        
        <div id="fb-editor" ref={this.fb} />
        <Button type="submit" >
          Save
        </Button>
        &nbsp;
        <Button href="#/form-builder">Return To List</Button>
        </Form>
        </div>
      )
    }
}

class FormBuilder extends Component {
  state = {
    jobs: [],
  }
  constructor() {
    super()
    this.getJobs();
  }
 
  getJobs() {
    environment.fetch('formtemplates')
    .then(res => res.json())
    .then((data) => {
      this.setState({ jobs: data })
    }).catch(console.log)
    
  }
  updateJob(body) {
    console.log(body)
    if (!("_id" in body) || body._id === undefined) {
      // we want do do a create here. 
          return environment.fetch('formtemplates',
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
    return environment.fetch('formtemplates/'+body._id,
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
      //this.setState({ jobs: data })
      let ids = [...this.state.jobs]
      let index = ids.findIndex((i) => (i._id === body._id) ? true : false)
      ids[index] = data
      console.log("new jobs", ids)
      this.setState({
        jobs: ids,
      }) 

    }).catch(console.log);
  }
  editSingle(id) {
    if (id === "create") {
      return (
        <FormBuilderView updateJob={(e) => this.updateJob(e)}></FormBuilderView>
      )
    }
    const job = this.state.jobs.find((e) => (e._id === id))
    if (job === undefined) {
      return (
        <p>could not load job</p>
      )
    }
    return (
      <FormBuilderView job={job} updateJob={(e) =>this.updateJob(e)}></FormBuilderView>
    )
  }


  render() {
    //TODO do this better. this is like a ton of queries 
    

    if (this.props.match !== undefined && this.props.match.params["id"] !== undefined) {
      const jobid = this.props.match.params["id"] 
      return this.editSingle(jobid)
    }

    const deleteFormatter = (cell, row, rowIndex, formatExtraData) => { return (  <div><Button onSubmit={(e) => e.preventDefault()} href={"#form-builder/"+row._id} onClick={() => console.log(row._id)}>Edit </Button></div> ); }
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
      text: 'Form Name',
      sort: true,
      formatter: iconFormatter, 
    },{
      dataField: 'description',
      text: 'Description',
      sort: true,
    },{dataField: '',
    text: 'Edit', 
    formatter: deleteFormatter }
  ];
    return (
      <div>
        <h2>Form Templates</h2>
        <Button href="#/form-builder/create">Add New Form Template</Button>
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

 
export default FormBuilder;