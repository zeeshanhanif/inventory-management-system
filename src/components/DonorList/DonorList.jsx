import React, { Component,PropTypes } from 'react';
import * as MUI from 'material-ui'
import styles from './DonorListStyles';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Person from 'material-ui/svg-icons/social/person';

class DonorList extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  constructor(){
    super();
    this.handleListItemClick = this.handleListItemClick.bind(this);
  }
  
  handleListItemClick = (id) => this.context.router.push("/dashboard/donorlist/"+id);

  listDonors(){
    console.log("list donors");
    var listItems = this.props.donorList
      .filter((donor=>donor.uid!==this.props.authUser.uid))
      .map(donor=> {
      console.log("Donor item ",donor);
      return (<div key={donor.uid}>
                <MUI.ListItem                    
                    leftAvatar={<MUI.Avatar icon={<Person />} />}
                    rightIcon={<ActionInfo />}
                    primaryText={donor.fullName}
                    secondaryText={"Blood Group: "+donor.bloodGroup}
                    onTouchTap={()=>this.handleListItemClick(donor.uid)}
                  />
                  <MUI.Divider />
             </div>
             )
    })

    return listItems;
  }

  componentWillMount() {
    if(this.props.isAuthenticated){
      this.props.getDonorList("A+");
    }
  }

  render() {
    
    return (
      
      <div style={styles.donerListContainer}>
          
          <MUI.List>
            <MUI.Subheader style={styles.subHeader} inset={false}>Donor List</MUI.Subheader>
            {
              this.listDonors()
            }
          </MUI.List>
        </div>
    );
  }
}

export default DonorList
