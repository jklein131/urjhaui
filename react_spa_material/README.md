
### REACT bootstap reference ###
https://react-bootstrap.github.io


### REACT table reference ###
examples: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
ref: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/table-props.html

###should use this for tables ### 
https://github.com/taniarascia/react-hooks  https://www.taniarascia.com/crud-app-in-react-with-hooks/


### random image material design ### 
https://github.com/yscoder/MaterialImage -- convert to use hash 

react user avatar 
https://github.com/wbinnssmith/react-user-avatar

### react rocks ###
https://react.rocks/?q=icon

### react tree nodes ### 
https://github.com/frontend-collective/react-sortable-tree 



### PDF renderer 

for tables: https://www.npmjs.com/package/jspdf-autotable 

for general PDF: jsPDF client side rendering of PDF's: https://github.com/MrRio/jsPDF

omg can I run the same renderer in react as i can in Node, so that I render forms in react and upload them to node.

or? https://github.com/kevinchappell/formeo 


# sortable

choose this one since it said mobile friendly:
https://github.com/clauderic/react-sortable-hoc 

def needs to be this one tho: 
https://github.com/atlassian/react-beautiful-dnd


# yarn linking for custom package 
https://medium.com/@chrisdmasters/how-to-fork-a-dependency-and-use-it-locally-in-a-project-707c80d3449c 


# helm stuff #
https://docs.couchbase.com/operator/current/helm-managing-guide.html

https://docs.couchbase.com/operator/current/helm-couchbase-config.html

db username: Oyualidaderadoso
db password: Siemercesomnios 


### make form builder have only the good things ### 
https://formbuilder.online/docs/formBuilder/options/typeUserAttrs/#example-checkbox



## next steps from VA meeting 

### notes from VA meeting: 
+// standard format (this may just be RAC on the upper left side. We may have to have multiple formats which can be selected)
+// BIGGER RAC on title 
+// add signature sheet on pdf 
+// Description for each JHA to help describe what the task they are doing it 
+// We likely need also an equipment and permit database, because that is a requirement by my knowledge of what the VA needs for their requirements. 
+// Compile all the documents that I found with the VA requirements for AHA from the US army corp of engineers 
+// We have a meeting when we get back from hawaii with Procore about an integration, see if you can get a demo about procore before moving forward with that meeting. 

## big asks 
+// multi-tenancy with other clients, likely to colaborate on PDF's by sending a link
+// automated workflow with email notifications (this would be nice to add if firebase supports it.)
+// job specific edits in addition to hazard update approval process. 
+// a way to view and comment on a JHA by email. 

TODO: 

JHA form landing page 
- JHA RowControl needs to list the things so that we can add them to a new cart. 
- Need to have all the information about the JHA be there and pretty. 
- Show the PDF on a different page. 

Someway to filter by jobs 
- Clicking on a job adds a job search icon or something 
- need to show archived jobs in a different tab. 

Cart
- Need ability to specify cart type so that a JHA and PHA can be created at the same time. Maybe we have the ability to have multiple carts.  
    - I think having multiple carts should come later, first we need the identification logic to find if the cart matches the type or something and then we can add that logic. 
- Cart submit needs to redirect to JHA landing page. 
- REACH: need a "add user" JHA element for adding people to the JHA. 

JHA RowControl 
- Need to prompt if adding a non-typed task to a typed cart. 

Navigation: 
- Need a way to empty cart with a prompt so that people aren't just clearing the JHA. 

Hazard suggestions: 
- REACH: need a way to suggest jobsite specific only changes, and suggestions to master. 

Shopping page: 
- Find a way to update statuss so that they are cleared when the cart is cleared. 
- looks like activity description is also having some trouble clearing that as well since it's storing it's own state. 

- REACH: I think using mongo we should just add all the variants and stuff right on the hazard object. 
    - jhacomplete objects will have a link to variants or suggestions. 
    - in that object. 


API Changes: 
- Forms and other objects should be stored in a customer specific object so that they can be shared between things. 
- Stop uploading so many damn PDF's. 