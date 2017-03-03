import React, { Component } from 'react';
import * as MUI from 'material-ui'
import styles from './DonorDetailStyles';
import Person from 'material-ui/svg-icons/social/person';


//<div>Age : 45</div>
class DonorDetail extends Component {


  componentWillMount() {
    this.props.getDonorDetail(this.props.params.id);
  }

  //user-default
  render() {
    const {donorDetail} = this.props;
    const date = new Date(donorDetail.dateOfBirth);
    return (
      <div style={styles.donerDetailContainer}>
        <MUI.Card>
          <MUI.CardHeader
            title={donorDetail.fullName}
            subtitle={donorDetail.bloodGroup}
            avatar={<MUI.Avatar icon={<Person />}/>}
          />
          <MUI.CardText >
            <div>Contatct No. : {donorDetail.contactNo}</div>
            <div>Email. : {donorDetail.email}</div>
            <div>Date Of Birth : {date.toString()}</div>
            <div>Address : {donorDetail.address}</div>
          </MUI.CardText>
        </MUI.Card>
      </div>
    );
  }
}

export default DonorDetail
