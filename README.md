##  clinical:hl7-resource-researchsubject   

HL7 FHIR Resource - ResearchSubject


--------------------------------------------  
#### Schema Version 

The resource in this package implements the `FHIR 1.6.0 - STU3 Ballot` version of the ResearchSubject resource schema, specified at  [http://hl7.org/fhir/2016Sep/researchsubject.html](http://hl7.org/fhir/2016Sep/researchsubject.html).  


--------------------------------------------  
#### Installation  

```bash
meteor add clinical:hl7-resource-researchsubject
```

You may also wish to install the `autopublish` package, which will set up a default publication/subscription of the ResearchSubjects collection for logged in users.  You will need to remove the package before going into production, however.

```bash
meteor add clinical:autopublish  
```


--------------------------------------------  
#### Example    

```js
var newResearchSubject = {
  'name' : [
    {
      'text' : 'Jane Doe',
      'given' : 'Jane',
      'family' : 'Doe',
      'resourceType' : 'HumanName'
    }
  ],
  'active' : true,
  'gender' : 'female',
  'identifier' : [{
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
   }],
  'birthdate' : new Date(1970, 1, 25),
  'resourceType' : 'ResearchSubject'
};
ResearchSubjects.insert(newResearchSubject);
```

--------------------------------------------  
#### Extending the Schema  

If you have extra fields that you would like to attach to the schema, extend the schema like so:  

```js
ExtendedResearchSubjectSchema = new SimpleSchema([
  ResearchSubjectSchema,
  {
    "createdAt": {
      "type": Date,
      "optional": true
    }
  }
]);
ResearchSubjects.attachSchema( ExtendedResearchSubjectSchema );
```

--------------------------------------------  
#### Initialize a Sample ResearchSubject  

Call the `initializeResearchSubject` method to create a sample researchsubject in the ResearchSubjects collection.

```js
Meteor.startup(function(){
  Meteor.call('initializeResearchSubject');
})
```
--------------------------------------------  
#### Server Methods  

This package supports `createResearchSubject`, `initializeResearchSubject`, and `dropResearchSubject` methods.

--------------------------------------------  
#### REST API Points    

This package supports the following REST API endpoints.  All endpoints require an OAuth token.  

```
GET    /fhir-1.6.0/ResearchSubject/:id    
GET    /fhir-1.6.0/ResearchSubject/:id/_history  
PUT    /fhir-1.6.0/ResearchSubject/:id  
GET    /fhir-1.6.0/ResearchSubject  
POST   /fhir-1.6.0/ResearchSubject/:param  
POST   /fhir-1.6.0/ResearchSubject  
DELETE /fhir-1.6.0/ResearchSubject/:id
```

If you would like to test the REST API without the OAuth infrastructure, launch the app with the `NOAUTH` environment variable, or set `Meteor.settings.private.disableOauth` to true in you settings file.

```bash
NOAUTH=true meteor
```

--------------------------------------------  
#### Conformance Statement  

This package conforms to version `FHIR 1.6.0 - STU3 Ballot`, as per the Touchstone testing utility.  

![https://raw.githubusercontent.com/ShivaDara/hl7-resource-researchsubject/master/screenshots/Screen%20Shot%202017-03-18%20at%2010.56.09%20PM.png](https://raw.githubusercontent.com/ShivaDara/hl7-resource-researchsubject/master/screenshots/Screen%20Shot%202017-03-18%20at%2010.56.09%20PM.png)  


--------------------------------------------  
#### Licensing   

![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)
