import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import AppBar from 'react-toolbox/lib/app_bar';
import Button from 'react-toolbox/lib/button';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import Avatar from 'react-toolbox/lib/avatar';

import { Table } from 'react-bootstrap';
import TextField from 'material-ui/TextField';


Session.setDefault('researchSubjectSearchFilter', '');
Session.setDefault('selectedResearchSubjectId', '');

export default class ResearchSubjectTable extends React.Component {

  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      selected: [],
      showSearch: false,
      researchSubjects: ResearchSubjects.find({'name.text': {
        $regex: Session.get('researchSubjectSearchFilter'),
        $options: 'i'
      }}, {limit: this.props.limit}).map(function(person){
        return {
          _id: person._id,
          active: person.active.toString(),
          gender: person.gender,
          name: person.name ? person.name[0].text : "",
          birthdate: moment(person.birthDate).format("YYYY-MM-DD"),
          photo: person.photo ? person.photo[0].url: ""
        };
      })
    };

    if (Session.get('darkroomEnabled')) {
      data.style.color = "black";
      data.style.background = "white";
    } else {
      data.style.color = "white";
      data.style.background = "black";
    }

    // this could be another mixin
    if (Session.get('glassBlurEnabled')) {
      data.style.filter = "blur(3px)";
      data.style.webkitFilter = "blur(3px)";
    }

    // this could be another mixin
    if (Session.get('backgroundBlurEnabled')) {
      data.style.backdropFilter = "blur(5px)";
    }

    if (this.props.showSearch) {
      data.showSearch = this.props.showSearch;
    }
    if (!Session.equals('selectedResearchSubjectId', '')) {
      data.showSearch = false;
    } else {
      data.showSearch = true;
    }

    return data;
  }


  rowClick(id, name){
    // set the user
    //Session.set("selectedResearchSubjectId", id);

    // if a selected row is clicked again, unselect it
    if (Session.equals('selectedResearchSubjectId', id)) {
      Session.set("selectedResearchSubjectId", '');
    } else {
      // otherwise, update the select row to whatever was just clicked
      Session.set("selectedResearchSubjectId", id);
    }

    if (Session.equals('researchSubjectSearchFilter', name)) {
      Session.set("researchSubjectSearchFilter", '');
    } else {
      Session.set("researchSubjectSearchFilter", name);
    }

    // set which tab is selected
    let state = Session.get('researchSubjectCardState');
    state["index"] = 2;
    Session.set('researchSubjectCardState', state);
  }
  renderAvatar(i){
    if (!this.props.hideAvatar) {
      return (
        <td>
          <Avatar><img src={this.data.researchSubjects[i].photo }/></Avatar>
        </td>
      );
    }
  }
  renderAvatarHeader(){
    if (!this.props.hideAvatar) {
      return (<th>photo</th>);
    }
  }
  renderResearchSubjectSearch(){
    if (this.data.showSearch) {
      return (
        <TextField
          id="researchSubjectSearchInput"
          floatingLabelText="Search researchSubjects..."
          floatingLabelStyle={{color: 'lightgray'}}
          fullWidth={true}
          onChange={this.setSearchFilter}
        />
      );
    }
  }
  setSearchFilter(event){
    console.log("setSearchFilter", event.target.value);
    Session.set('researchSubjectSearchFilter', event.target.value);
  }
  render () {
    let tableRows = [];
    console.log("this.data.researchSubjects.length", this.data.researchSubjects.length);

    for (var i = 0; i < this.data.researchSubjects.length; i++) {
      tableRows.push(
        <tr key={i} className="researchSubjectRow" style={{cursor: "pointer"}} onClick={ this.rowClick.bind('this', this.data.researchSubjects[i]._id, this.data.researchSubjects[i].name)} >
          {this.renderAvatar(i)}
          <td>{this.data.researchSubjects[i].name }</td>
          <td>{this.data.researchSubjects[i].gender}</td>
          <td>{this.data.researchSubjects[i].birthdate }</td>
          <td className='hidden-on-phone'>{this.data.researchSubjects[i].active}</td>
          <td className='hidden-on-phone'><span className="barcode">{this.data.researchSubjects[i]._id}</span></td>
        </tr>
      );
    }


    return(
      <div>
        {this.renderResearchSubjectSearch() }
        <Table responses hover >
          <thead>
            <tr>
              {this.renderAvatarHeader}
              <th>name</th>
              <th>gender</th>
              <th>birthdate</th>
              <th className='hidden-on-phone'>active</th>
              <th className='hidden-on-phone'>user._id</th>
            </tr>
          </thead>
          <tbody>
            { tableRows }
          </tbody>
        </Table>
      </div>
    );
  }
}


ResearchSubjectTable.propTypes = {};
ReactMixin(ResearchSubjectTable.prototype, ReactMeteorData);
