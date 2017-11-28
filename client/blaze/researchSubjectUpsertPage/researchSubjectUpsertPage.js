Session.setDefault('researchSubjectReadOnly', true);


Router.map(function () {
  this.route('newResearchSubjectRoute', {
    path: '/insert/researchSubject',
    template: 'researchSubjectUpsertPage',
    onAfterAction: function () {
      Session.set('researchSubjectReadOnly', false);
    }
  });

});
Router.route('/upsert/researchSubject/:id', {
  name: 'upsertResearchSubjectRoute',
  template: 'researchSubjectUpsertPage',
  data: function () {
    return ResearchSubjects.findOne(this.params.id);
  },
  onAfterAction: function () {
    Session.set('researchSubjectReadOnly', false);
  }
});
Router.route('/view/researchSubject/:id', {
  name: 'viewResearchSubjectRoute',
  template: 'researchSubjectUpsertPage',
  data: function () {
    return ResearchSubjects.findOne(this.params.id);
  },
  onAfterAction: function () {
    Session.set('researchSubjectReadOnly', true);
  }
});


//-------------------------------------------------------------


Template.researchSubjectUpsertPage.helpers({
  getName: function(){
    return this.name[0].text;
  },
  getEmailAddress: function () {
    if (this.telecom && this.telecom[0] && (this.telecom[0].system === "email")) {
      return this.telecom[0].value;
    } else {
      return "";
    }
  },
  isNewResearchSubject: function () {
    if (this._id) {
      return false;
    } else {
      return true;
    }
  },
  isReadOnly: function () {
    if (Session.get('researchSubjectReadOnly')) {
      return 'readonly';
    }
  },
  getResearchSubjectId: function () {
    if (this._id) {
      return this._id;
    } else {
      return '---';
    }
  }
});

Template.researchSubjectUpsertPage.events({
  'click #removeUserButton': function () {
    ResearchSubjects.remove(this._id, function (error, result) {
      if (error) {
        console.log("error", error);
      };
      if (result) {
        Router.go('/list/researchSubjects');
      }
    });
  },
  'click #saveUserButton': function () {
    //console.log( 'this', this );

    Template.researchSubjectUpsertPage.saveResearchSubject(this);
    Session.set('researchSubjectReadOnly', true);
  },
  'click .barcode': function () {
    // TODO:  refactor to Session.toggle('researchSubjectReadOnly')
    if (Session.equals('researchSubjectReadOnly', true)) {
      Session.set('researchSubjectReadOnly', false);
    } else {
      Session.set('researchSubjectReadOnly', true);
      console.log('Locking the researchSubject...');
      Template.researchSubjectUpsertPage.saveResearchSubject(this);
    }
  },
  'click #lockResearchSubjectButton': function () {
    //console.log( 'click #lockResearchSubjectButton' );

    if (Session.equals('researchSubjectReadOnly', true)) {
      Session.set('researchSubjectReadOnly', false);
    } else {
      Session.set('researchSubjectReadOnly', true);
    }
  },
  'click #researchSubjectListButton': function (event, template) {
    Router.go('/list/researchSubjects');
  },
  'click .imageGridButton': function (event, template) {
    Router.go('/grid/researchSubjects');
  },
  'click .tableButton': function (event, template) {
    Router.go('/table/researchSubjects');
  },
  'click #previewResearchSubjectButton': function () {
    Router.go('/customer/' + this._id);
  },
  'click #upsertResearchSubjectButton': function () {
    console.log('creating new ResearchSubjects...');
    Template.researchSubjectUpsertPage.saveResearchSubject(this);
  }
});


Template.researchSubjectUpsertPage.saveResearchSubject = function (researchSubject) {
  // TODO:  add validation functions

  if (researchSubject._id) {
    var researchSubjectOptions = {
      researchSubjectname: $('#researchSubjectnameInput').val(),
      emails: [{
        address: $('#researchSubjectEmailInput').val()
      }],
      profile: {
        fullName: $('#researchSubjectFullNameInput').val(),
        avatar: $('#researchSubjectAvatarInput').val(),
        description: $('#researchSubjectDescriptionInput').val()
      }
    };

    ResearchSubjects.update({
      _id: researchSubject._id
    }, {
      $set: researchSubjectOptions
    }, function (error, result) {
      if (error) console.log(error);
      Router.go('/view/researchSubject/' + researchSubject._id);
    });

    if (researchSubject.emails[0].address !== $('#researchSubjectEmailInput')
      .val()) {
      var options = {
        researchSubjectId: researchSubject._id,
        email: $('#researchSubjectEmailInput')
          .val()
      };
      Meteor.call('updateEmail', options);
    }


  } else {
    var researchSubjectOptions = {
      researchSubjectname: $('#researchSubjectnameInput').val(),
      email: $('#researchSubjectEmailInput').val(),
      profile: {
        fullName: $('#researchSubjectFullNameInput').val(),
        avatar: $('#researchSubjectAvatarInput').val(),
        description: $('#researchSubjectDescriptionInput').val()
      }
    };
    //console.log( 'researchSubjectOptions', researchSubjectOptions );

    researchSubjectOptions.password = $('#researchSubjectnameInput')
      .val();
    Meteor.call('addUser', researchSubjectOptions, function (error, result) {
      if (error) {
        console.log('error', error);
      }
      if (result) {
        console.log('result', result);
        Router.go('/view/researchSubject/' + result);
      }
    });

  }
};
