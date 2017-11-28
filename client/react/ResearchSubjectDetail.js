import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';

import { Row, Col } from 'react-bootstrap';
import DocumentsList from '../../containers/documents-list.js';
import { AddDocument } from '../../components/AddDocument.js';

import { PageContainer } from '../../components/PageContainer';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';


import {Tab, Tabs} from 'react-toolbox/lib/tabs';
import ResearchSubjectTable from '../../workflows/researchSubjects/ResearchSubjectTable';

import { insertResearchSubject, updateResearchSubject, removeResearchSubjectById } from '../../../api/researchSubjects/methods';
import { Bert } from 'meteor/themeteorchef:bert';

import DatePicker from 'react-toolbox/lib/date_picker';
//import { DatePicker, DatePickerDialog, Calendar, CalendarDay, CalendarMonth } from 'react-toolbox/lib/date_picker';

let defaultState = false;

Session.setDefault('researchSubjectDetailState', defaultState);


export default class ResearchSubjectDetail extends React.Component {
  getMeteorData() {
    let data = {
      researchSubjectId: false,
      researchSubject: {
        id: "",
        name: "",
        gender: "",
        active: true,
        birthdate: new Date(),
        photo: ""
      }
    }

    if (Session.get('selectedResearchSubject')) {
      data.researchSubjectId = Session.get('selectedResearchSubject');

      let selectedResearchSubject = ResearchSubjects.findOne({_id: Session.get('selectedResearchSubject')});
      if (selectedResearchSubject) {
        data.researchSubject = {
          id: selectedResearchSubject._id,
          birthdate: new Date(moment(selectedResearchSubject.birthdate)),
          gender: selectedResearchSubject.gender,
          active: selectedResearchSubject.active.toString(),
          photo: selectedResearchSubject.photo ? selectedResearchSubject.photo[0].url : "",
          name: selectedResearchSubject.name ? selectedResearchSubject.name[0].text : ""
        }
      }
    }

    if (Session.get('researchSubjectDetailState')) {
      data.researchSubject = Session.get('researchSubjectDetailState');
    }

    //console.log("data", data);

    return data;
  };

  render() {
    return (
      <div className="researchSubjectDetail">
        <CardText>
          <Input ref="name" type='text' label='name' name='name' value={this.data.researchSubject.name} onChange={ this.changeState.bind(this, 'name')} />
          <Input ref="active" type='text' label='active' name='active' value={this.data.researchSubject.active} onChange={ this.changeState.bind(this, 'active')} />
          <Input ref="gender" type='text' label='gender' name='gender' value={this.data.researchSubject.gender} onChange={ this.changeState.bind(this, 'gender')} />
          <Input ref="photo" type='text' label='photo' name='photo' value={this.data.researchSubject.photo} onChange={ this.changeState.bind(this, 'photo')} />
          <DatePicker ref="birthdate" label='birthdate' name='birthdate' value={this.data.researchSubject.birthdate} onChange={ this.changeState.bind(this, 'birthdate')}  />
        </CardText>
        <CardActions>
          { this.determineButtons(this.data.researchSubjectId) }
        </CardActions>
      </div>
    );
  }
  determineButtons(researchSubjectId){
    if (researchSubjectId) {
      return (
        <div>
          <Button label="Save" onClick={this.handleSaveButton.bind(this)} />
          <Button label="Delete" onClick={this.handleDeleteButton.bind(this)} />
        </div>
      );
    } else {
      return(
        <Button label="Save" onClick={this.handleSaveButton.bind(this)} />
      );
    }
  };
  // this could be a mixin
  changeState(field, value){

    //console.log("changeState", value);

    // by default, assume there's no other data and we're creating a new researchSubject
    let researchSubjectUpdate = {
      id: "",
      birthdate: new Date(),
      gender: "",
      active: true,
      name: "",
      photo: ""
    }

    // if there's an existing researchSubject, use them
    if (Session.get('selectedResearchSubject')) {
      researchSubjectUpdate = this.data.researchSubject;
    }

    if (typeof Session.get('researchSubjectDetailState') === "object") {
      researchSubjectUpdate = Session.get('researchSubjectDetailState');
    }
    // if (field === "birthdate") {
    //   researchSubjectUpdate[field] = new Date(value);
    // } else {
    //   researchSubjectUpdate[field] = value;
    // }
    researchSubjectUpdate[field] = value;

    console.log("researchSubjectUpdate", researchSubjectUpdate);

    Session.set('researchSubjectDetailState', researchSubjectUpdate);
  };
  openTab(index){
    // set which tab is selected
    let state = Session.get('researchSubjectCardState');
    state["index"] = index;
    Session.set('researchSubjectCardState', state);
  };

  // this could be a mixin
  handleSaveButton(){
    console.log("this", this);

      let researchSubjectFormData = {
        'name': [{
          'text': this.refs.name.refs.input.value
        }],
        'birthdate': this.refs.birthdate.props.value,
        'gender': this.refs.gender.refs.input.value,
        'photo': [{
          url: this.refs.photo.refs.input.value
        }]
      }

      if (this.refs.active.refs.input.value === "true") {
        researchSubjectFormData.active = true;
      } else {
        researchSubjectFormData.active = false;
      }

      console.log("researchSubjectFormData", researchSubjectFormData);


    if (Session.get('selectedResearchSubject')) {
      console.log("update practioner");
      //Meteor.users.insert(researchSubjectFormData);
      updateResearchSubject.call(
        {_id: Session.get('selectedResearchSubject'), update: researchSubjectFormData }, (error) => {
        if (error) {
          console.log("error", error);
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('ResearchSubject updated!', 'success');
          this.openTab(1);
        }
      });
    } else {

      console.log("create a new researchSubject", researchSubjectFormData);

      //Meteor.users.insert(researchSubjectFormData);
      insertResearchSubject.call(researchSubjectFormData, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('ResearchSubject added!', 'success');
          this.openTab(1);
        }
      });
    }
  };

  // this could be a mixin
  handleCancelButton(){
    console.log("handleCancelButton");
  };
  handleDeleteButton(){
    removeResearchSubjectById.call(
      {_id: Session.get('selectedResearchSubject')}, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('ResearchSubject deleted!', 'success');
        this.openTab(1);
      }
    });
  };

}


ResearchSubjectDetail.propTypes = {
  hasUser: React.PropTypes.object,
};
ReactMixin(ResearchSubjectDetail.prototype, ReactMeteorData);
