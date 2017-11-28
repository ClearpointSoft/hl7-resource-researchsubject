import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { PageContainer } from '../components/PageContainer';
import { GlassCard } from '../components/GlassCard';
import { CardTitle, CardText } from 'react-toolbox/lib/card';

import {Tab, Tabs} from 'react-toolbox/lib/tabs';
import ResearchSubjectDetail from '../workflows/researchSubjects/ResearchSubjectDetail';
import ResearchSubjectTable from '../workflows/researchSubjects/ResearchSubjectTable';


let defaultState = {
  index: 1,
  id: "",
  username: "",
  email: "",
  given: "",
  family: "",
  gender: ""
};
Session.setDefault('researchSubjectCardState', defaultState);

export class ResearchSubjectsPage extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      state: defaultState
    };

    if (Session.get('researchSubjectCardState')) {
      data.state = Session.get('researchSubjectCardState');
    }

    // this should all be handled by props
    // or a mixin!
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

    return data;
  }

  // this could be a mixin
  handleTabChange(index){
    let state = Session.get('researchSubjectCardState');
    state["index"] = index;
    Session.set('researchSubjectCardState', state);
  }

  // this could be a mixin
  changeState(field, value){
    let state = Session.get('researchSubjectCardState');
    console.log("this", this);
    console.log("value", value);

    state[field] = value;
    Session.set('researchSubjectCardState', state);
  }

  // this could be a mixin
  onNewTab(){
    console.log("onNewTab");

    Session.set('selectedResearchSubject', false);
    Session.set('researchSubjectDetailState', false);
  }

  render() {
    return (
      <div id="documentsPage">
        <PageContainer>
          <GlassCard>
            <CardTitle
              title="ResearchSubjects"
            />
            <CardText>

            <Tabs default index={this.data.state.index} onChange={this.handleTabChange}>
             <Tab className="newResearchSubjectTab" label='New' style={{padded: "20px"}} onActive={ this.onNewTab } >
               <ResearchSubjectDetail />
             </Tab>
             <Tab label='ResearchSubjects' onActive={this.handleActive}>
               <ResearchSubjectTable />
             </Tab>
             <Tab label='Detail' onActive={this.handleActive} style={{padded: "20px"}} >
               <ResearchSubjectDetail />
             </Tab>
           </Tabs>
            </CardText>
          </GlassCard>
        </PageContainer>
      </div>
    );
  }
}


ResearchSubjectsPage.propTypes = {
  hasUser: React.PropTypes.object
};
ReactMixin(ResearchSubjectsPage.prototype, ReactMeteorData);
