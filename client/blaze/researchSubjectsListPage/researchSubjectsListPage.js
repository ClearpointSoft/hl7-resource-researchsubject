Session.setDefault( 'researchSubjectSearchFilter', '' );
Session.setDefault( 'tableLimit', 20 );
Session.setDefault( 'paginationCount', 1 );
Session.setDefault( 'selectedPagination', 0 );
Session.setDefault( 'skipCount', 0 );



//------------------------------------------------------------------------------
// ROUTING

Router.route( '/list/researchSubjects/', {
  name: 'researchSubjectsListPage',
  template: 'researchSubjectsListPage',
  data: function () {
    return ResearchSubjects.find();
  }
});

//------------------------------------------------------------------------------
// TEMPLATE INPUTS

Template.researchSubjectsListPage.events( {
  'click .addRecordIcon': function () {
    Router.go( '/insert/researchSubject' );
  },
  'click .researchSubjectItem': function () {
    Router.go( '/view/researchSubject/' + this._id );
  },
  // use keyup to implement dynamic filtering
  // keyup is preferred to keypress because of end-of-line issues
  'keyup #researchSubjectSearchInput': function () {
    Session.set( 'researchSubjectSearchFilter', $( '#researchSubjectSearchInput' ).val() );
  }
} );


//------------------------------------------------------------------------------
// TEMPLATE OUTPUTS


var OFFSCREEN_CLASS = 'off-screen';
var EVENTS = 'webkitTransitionEnd oTransitionEnd transitionEnd msTransitionEnd transitionend';

// Template.researchSubjectsListPage.rendered = function () {
//   console.log( 'trying to update layout...' );
//
//   Template.appLayout.delayedLayout( 20 );
// };


Template.researchSubjectsListPage.helpers( {
  dateOfBirth: function(){
    return moment(this.birthDate).format("MMM DD, YYYY");
  },
  getName: function(){
    return this.name[0].text;
  },
  hasNoContent: function () {
    if ( ResearchSubjects.find().count() === 0 ) {
      return true;
    } else {
      return false;
    }
  },
  researchSubjectsList: function () {
    Session.set( 'receivedData', new Date() );

    Template.appLayout.delayedLayout( 20 );

    return ResearchSubjects.find();
    // return ResearchSubjects.find( {
    //   'name.$.text': {
    //     $regex: Session.get( 'researchSubjectSearchFilter' ),
    //     $options: 'i'
    //   }
    // } );
  }
} );
