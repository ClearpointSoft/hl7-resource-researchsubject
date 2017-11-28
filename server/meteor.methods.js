

Meteor.methods({
  createResearchSubject:function(researchSubjectObject){
    check(researchSubjectObject, Object);

    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Creating ResearchSubject...');
      ResearchSubjects.insert(researchSubjectObject, function(error, result){
        if (error) {
          console.log(error);
          if (typeof HipaaLogger === 'object') {
            HipaaLogger.logEvent({
              eventType: "error",
              userId: Meteor.userId(),
              userName: Meteor.user().fullName(),
              collectionName: "ResearchSubjects"
            });
          }
        }
        if (result) {
          console.log('ResearchSubject created: ' + result);
          if (typeof HipaaLogger === 'object') {
            HipaaLogger.logEvent({
              eventType: "create",
              userId: Meteor.userId(),
              userName: Meteor.user().fullName(),
              collectionName: "ResearchSubjects"
            });
          }
        }
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  initializeResearchSubject:function(){
    if (ResearchSubjects.find().count() === 0) {
      console.log('-----------------------------------------');
      console.log('No records found in ResearchSubjects collection.  Lets create some...');

      var defaultResearchSubject = {
        'name' : [
          {
            'text' : 'Jane Doe',
            'resourceType' : 'HumanName'
          }
        ],
        'active' : true,
        'gender' : 'female',
        'identifier' : [
          {
            'use' : 'usual',
            'type' : {
              text: 'Medical record number',
              'coding' : [
                {
                  'system' : 'http://hl7.org/fhir/v2/0203',
                  'code' : 'MR'
                }
              ]
            },
            'system' : 'urn:oid:1.2.36.146.595.217.0.1',
            'value' : '123',
            'period' : {}
          }
        ],
        'birthdate' : new Date(1970, 1, 25),
        'resourceType' : 'ResearchSubject'
      };

      Meteor.call('createResearchSubject', defaultResearchSubject);
    } else {
      console.log('ResearchSubjects already exist.  Skipping.');
    }
  },
  dropResearchSubjects: function(){
    console.log('-----------------------------------------');
    console.log('Dropping researchSubjects... ');

    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Creating ResearchSubject...');
      ResearchSubjects.find().forEach(function(researchSubject){
        ResearchSubjects.remove({_id: researchSubject._id});
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  }
});
