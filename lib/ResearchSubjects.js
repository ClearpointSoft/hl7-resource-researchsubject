if(Package['clinical:autopublish']){
  console.log("*****************************************************************************")
  console.log("HIPAA WARNING:  Your app has the 'clinical-autopublish' package installed.");
  console.log("Any protected health information (PHI) stored in this app should be audited."); 
  console.log("Please consider writing secure publish/subscribe functions and uninstalling.");  
  console.log("");  
  console.log("meteor remove clinical:autopublish");  
  console.log("");  
}
if(Package['autopublish']){
  console.log("*****************************************************************************")
  console.log("HIPAA WARNING:  DO NOT STORE PROTECTED HEALTH INFORMATION IN THIS APP. ");  
  console.log("Your application has the 'autopublish' package installed.  Please uninstall.");
  console.log("");  
  console.log("meteor remove autopublish");  
  console.log("meteor add clinical:autopublish");  
  console.log("");  
}







/**
 * @summary Represents a ResearchSubject; typically documented by a clinician.  A Clinical Impression can be self-assigned, in which case it may be considered a Status or ReportedCondition.
 * @class ResearchSubject
 * @param {Object} document An object representing an impression, ususally a Mongo document.
 * @example
newResearchSubject = new ResearchSubject({
  name: {
    given: "Jane",
    family: "Doe"
  },
  gender: "female",
  identifier: "12345"
});


newResearchSubject.clean();
newResearchSubject.validate();
newResearchSubject.save();
 */


// create the object using our BaseModel
ResearchSubject = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
ResearchSubject.prototype._collection = ResearchSubjects;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.ResearchSubjects = new Mongo.Collection('HL7.Resources.ResearchSubjects');
ResearchSubjects = new Mongo.Collection('ResearchSubjects');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
ResearchSubjects._transform = function (document) {
  return new ResearchSubject(document);
};




ResearchSubjectSchema = new SimpleSchema([
  BaseSchema,
  DomainResourceSchema,
  {
  "resourceType" : {
    type: String,
    defaultValue: "ResearchSubject"
  },
  "identifier" : {
    optional: true,
    type: [ IdentifierSchema ]
    },
  "active" : {
    type: Boolean,
    optional: true,
    defaultValue: true
    },
  "name" : {
    optional: true,
    type: [ HumanNameSchema ]
    },
  "telecom" : {
    optional: true,
    type: [ ContactPointSchema ]
    },
  "gender" : {
    optional: true,
    allowedValues: ['male', 'female', 'other', 'unknown'],
    type: String
    },
  "birthDate" : {
    optional: true,
    type: Date
    },
  "deceasedBoolean" : {
    optional: true,
    type: Boolean
    },
  "deceasedDateTime" : {
    optional: true,
    type: Date
    },
  "address" : {
    optional: true,
    type: [ AddressSchema ]
    },
  "maritalStatus" : {
    optional: true,
    type: CodeableConceptSchema
    },
  "multipleBirthBoolean" : {
    optional: true,
    type: Boolean
    },
  "multipleBirthInteger" : {
    optional: true,
    type: Number
    },
  "photo" : {
    optional: true,
    type: [ AttachmentSchema ]
    },
  "contact.$.relationship" : {
    optional: true,
    type: [ CodeableConceptSchema ]
    },
  "contact.$.name" : {
    optional: true,
    type: HumanNameSchema
    },
  "contact.$.telecom" : {
    optional: true,
    type: [ ContactPointSchema ]
    },
  "contact.$.address" : {
    optional: true,
    type: [ AddressSchema ]
    },
  "contact.$.gender" : {
    optional: true,
    allowedValues: ['male', 'female', 'other', 'unknown'],
    type: Code
    },
  "contact.$.organization" : {
    optional: true,
    type: String
    },
  "contact.$.period" : {
    optional: true,
    type: PeriodSchema
    },
  "animal.species" : {
    optional: true,
    type: String
    //type: CodeableConceptSchema
    },
  "animal.breed" : {
    optional: true,
    type: CodeableConceptSchema
    },
  "animal.genderStatus" : {
    optional: true,
    type: CodeableConceptSchema
    },
  "communication.$.language" : {
    optional: true,
    type: CodeableConceptSchema
    },
  "communication.$.preferred" : {
    optional: true,
    type: Boolean
    },
  "generalPractitioner" : {
    optional: true,
    type: [ ReferenceSchema ]
    },
  "managingOrganization" : {
    optional: true,
    type: ReferenceSchema
    },
  "link.$.other" : {
    optional: true,
    type: ReferenceSchema
    },
  "link.$.type" : {
    optional: true,
    allowedValues: ['replaced-by', 'replaces', 'refer', 'seealso'],
    type: Code
    },
  "test" : {
    optional: true,
    type: Boolean
    }
  }
]);
ResearchSubjects.attachSchema(ResearchSubjectSchema);


ResearchSubject.prototype.toFhir = function(){
  console.log('ResearchSubject.toFhir()');



  return EJSON.stringify(this.name);
}

/**
 * @summary Search the ResearchSubjects collection for a specific Meteor.userId().
 * @memberOf ResearchSubjects
 * @name findUserId
 * @version 1.2.3
 * @returns {Boolean}
 * @example
 * ```js
 *  let researchSubjects = ResearchSubjects.findUserId(Meteor.userId());
 *  let researchSubject = researchSubjects[0];
 * ```
 */

ResearchSubjects.findUserId = function (userId) {
  process.env.TRACE && console.log("ResearchSubjects.findUserId()");
  return ResearchSubjects.find({'identifier.value': userId});
};

/**
 * @summary Search the ResearchSubjects collection for a specific Meteor.userId().
 * @memberOf ResearchSubjects
 * @name findOneUserId
 * @version 1.2.3
 * @returns {Boolean}
 * @example
 * ```js
 *  let researchSubject = ResearchSubjects.findOneUserId(Meteor.userId());
 * ```
 */

ResearchSubjects.findOneUserId = function (userId) {
  process.env.TRACE && console.log("ResearchSubjects.findOneUserId()");  
  return ResearchSubjects.findOne({'identifier.value': userId});
};
/**
 * @summary Search the ResearchSubjects collection for a specific Meteor.userId().
 * @memberOf ResearchSubjects
 * @name findMrn
 * @version 1.2.3
 * @returns {Boolean}
 * @example
 * ```js
 *  let researchSubjects = ResearchSubjects.findMrn('12345').fetch();
 * ```
 */

ResearchSubjects.findMrn = function (userId) {
  process.env.TRACE && console.log("ResearchSubjects.findMrn()");  
  return ResearchSubjects.find({'identifier.value': userId});
};

/**
 * @summary Search the ResearchSubjects collection for a specific Meteor.userId().
 * @memberOf ResearchSubjects
 * @name findMrn
 * @version 1.2.3
 * @returns {Boolean}
 * @example
 * ```js
 *  let researchSubjects = ResearchSubjects.findMrn('12345').fetch();
 * ```
 */

ResearchSubjects.fetchBundle = function (query, parameters, callback) {
  process.env.TRACE && console.log("ResearchSubjects.fetchBundle()");  
  var researchSubjectArray = ResearchSubjects.find(query, parameters, callback).map(function(researchSubject){
    researchSubject.id = researchSubject._id;
    delete researchSubject._document;
    return researchSubject;
  });

  // console.log("researchSubjectArray", researchSubjectArray);

  var result = Bundle.generate(researchSubjectArray);

  // console.log("result", result.entry[0]);

  return result;
};


/**
 * @summary This function takes a FHIR resource and prepares it for storage in Mongo.
 * @memberOf ResearchSubjects
 * @name toMongo
 * @version 1.6.0
 * @returns { ResearchSubject }
 * @example
 * ```js
 *  let researchSubjects = ResearchSubjects.toMongo('12345').fetch();
 * ```
 */

ResearchSubjects.toMongo = function (originalResearchSubject) {
  var mongoRecord;
  process.env.TRACE && console.log("ResearchSubjects.toMongo()");  

  if (originalResearchSubject.identifier) {
    originalResearchSubject.identifier.forEach(function(identifier){
      if (identifier.period) {
        if (identifier.period.start) {
          var startArray = identifier.period.start.split('-');
          identifier.period.start = new Date(startArray[0], startArray[1] - 1, startArray[2]);
        }
        if (identifier.period.end) {
          var endArray = identifier.period.end.split('-');
          identifier.period.end = new Date(startArray[0], startArray[1] - 1, startArray[2]);
        }
      }
    });
  }

  return originalResearchSubject;
};



/**
 * @summary This function takes a DTSU2 resource and returns it as STU3.  i.e. it converts from v1.0.2 to v3.0.0
 * @name toMongo
 * @version 3.0.0
 * @returns { ResearchSubject }
 * @example
 * ```js
 * ```
 */
ResearchSubjects.toStu3 = function(researchSubjectJson){
  if(researchSubjectJson){

    // quick cast from string to boolean
    if(typeof researchSubjectJson.birthDate === "string"){
      researchSubjectJson.birthDate = new Date(researchSubjectJson.birthDate);
    }

    // quick cast from string to boolean
    if(researchSubjectJson.deceasedBoolean){
      researchSubjectJson.deceasedBoolean = (researchSubjectJson.deceasedBoolean == "true") ? true : false;
    }

    // STU3 only has a single entry for family name; not an array
    if(researchSubjectJson.name && researchSubjectJson.name[0] && researchSubjectJson.name[0].family && researchSubjectJson.name[0].family[0] ){
      researchSubjectJson.name[0].family = researchSubjectJson.name[0].family[0];      
    }

    // make sure the full name is filled out
    if(researchSubjectJson.name && researchSubjectJson.name[0] && researchSubjectJson.name[0].family && !researchSubjectJson.name[0].text ){
      researchSubjectJson.name[0].text = researchSubjectJson.name[0].given[0] + ' ' + researchSubjectJson.name[0].family;      
    }
  }
  return researchSubjectJson;
}


/**
 * @summary Similar to toMongo(), this function prepares a FHIR record for storage in the Mongo database.  The difference being, that this assumes there is already an existing record.
 * @memberOf ResearchSubjects
 * @name prepForUpdate
 * @version 1.6.0
 * @returns { Object }
 * @example
 * ```js
 *  let researchSubjects = ResearchSubjects.findMrn('12345').fetch();
 * ```
 */

ResearchSubjects.prepForUpdate = function (researchSubject) {
  process.env.TRACE && console.log("ResearchSubjects.prepForUpdate()");  

  if (researchSubject.name && researchSubject.name[0]) {
    //console.log("researchSubject.name", researchSubject.name);

    researchSubject.name.forEach(function(name){
      name.resourceType = "HumanName";
    });
  }

  if (researchSubject.telecom && researchSubject.telecom[0]) {
    //console.log("researchSubject.telecom", researchSubject.telecom);
    researchSubject.telecom.forEach(function(telecom){
      telecom.resourceType = "ContactPoint";
    });
  }

  if (researchSubject.address && researchSubject.address[0]) {
    //console.log("researchSubject.address", researchSubject.address);
    researchSubject.address.forEach(function(address){
      address.resourceType = "Address";
    });
  }

  if (researchSubject.contact && researchSubject.contact[0]) {
    //console.log("researchSubject.contact", researchSubject.contact);

    researchSubject.contact.forEach(function(contact){
      if (contact.name) {
        contact.name.resourceType = "HumanName";
      }

      if (contact.telecom && contact.telecom[0]) {
        contact.telecom.forEach(function(telecom){
          telecom.resourceType = "ContactPoint";
        });
      }

    });
  }

  return researchSubject;
};


/**
 * @summary Scrubbing the researchSubject; make sure it conforms to v1.6.0
 * @memberOf ResearchSubjects
 * @name scrub
 * @version 1.2.3
 * @returns {Boolean}
 * @example
 * ```js
 *  let researchSubjects = ResearchSubjects.findMrn('12345').fetch();
 * ```
 */

ResearchSubjects.prepForFhirTransfer = function (researchSubject) {
  process.env.TRACE && console.log("ResearchSubjects.prepForFhirTransfer()");  


  // FHIR has complicated and unusual rules about dates in order
  // to support situations where a family member might report on a researchSubject's
  // date of birth, but not know the year of birth; and the other way around
  if (researchSubject.birthDate) {
    researchSubject.birthDate = moment(researchSubject.birthDate).format("YYYY-MM-DD");
  }


  if (researchSubject.name && researchSubject.name[0]) {
    //console.log("researchSubject.name", researchSubject.name);

    researchSubject.name.forEach(function(name){
      delete name.resourceType;
    });
  }

  if (researchSubject.telecom && researchSubject.telecom[0]) {
    //console.log("researchSubject.telecom", researchSubject.telecom);
    researchSubject.telecom.forEach(function(telecom){
      delete telecom.resourceType;
    });
  }

  if (researchSubject.address && researchSubject.address[0]) {
    //console.log("researchSubject.address", researchSubject.address);
    researchSubject.address.forEach(function(address){
      delete address.resourceType;
    });
  }

  if (researchSubject.contact && researchSubject.contact[0]) {
    //console.log("researchSubject.contact", researchSubject.contact);

    researchSubject.contact.forEach(function(contact){

      console.log("contact", contact);


      if (contact.name && contact.name.resourceType) {
        //console.log("researchSubject.contact.name", contact.name);
        delete contact.name.resourceType;
      }

      if (contact.telecom && contact.telecom[0]) {
        contact.telecom.forEach(function(telecom){
          delete telecom.resourceType;
        });
      }

    });
  }

  //console.log("ResearchSubjects.prepForBundle()", researchSubject);

  return researchSubject;
};

/**
 * @summary The displayed name of the researchSubject.
 * @memberOf ResearchSubject
 * @name displayName
 * @version 1.2.3
 * @returns {Boolean}
 * @example
 * ```js
 * ```
 */

ResearchSubject.prototype.displayName = function () {
  process.env.TRACE && console.log("ResearchSubjects.displayName()");  

  if (this.name && this.name[0]) {
    return this.name[0].text;
  }
};


/**
 * @summary The displayed Meteor.userId() of the researchSubject.
 * @memberOf ResearchSubject
 * @name userId
 * @version 1.2.3
 * @returns {Boolean}
 * @example
 * ```js
 * ```
 */

ResearchSubject.prototype.userId = function () {
  process.env.TRACE && console.log("ResearchSubjects.userId()");  

  var result = null;
  if (this.extension) {
    this.extension.forEach(function(extension){
      if (extension.url === "Meteor.userId()") {
        result = extension.valueString;
      }
    });
  }
  return result;
};



/**
 * @summary The displayed Meteor.userId() of the researchSubject.
 * @memberOf ResearchSubject
 * @name userId
 * @version 1.2.3
 * @returns {Boolean}
 * @example
 * ```js
 * ```
 */


/**
 * @summary Anonymize the researchSubject record
 * @memberOf ResearchSubject
 * @name removeProtectedInfo
 * @version 1.2.3
 * @returns {Object}
 * @example
 * ```js
 * ```
 */

ResearchSubject.prototype.removeProtectedInfo = function (options) {
  process.env.TRACE && console.log("ResearchSubjects.anonymize()", this);  

  console.log("ResearchSubjects.anonymize()");  

  // 1. Names
  if(this.name && this.name[0]){
    var anonymizedName = this.name[0];

    if(this.name[0].family){
      anonymizedName.family = '';
    }
    if(this.name[0].given && this.name[0].given[0]){
      anonymizedName.given = [];          
    }
    if(this.name[0].text){
      anonymizedName.text = '';
    }

    this.name = [];
    this.name.push(anonymizedName);
  }

  // 3.  dates


  // 4. Phone numbers
  // 5.  Fax Numbers
  // 6.  Identifiers
  // 7.  Medical Record Nubers
  // 17.  Photos

  return this;
}


/**
 * @summary Anonymize the researchSubject record
 * @memberOf ResearchSubject
 * @name anonymize
 * @version 1.2.3
 * @returns {Object}
 * @example
 * ```js
 * ```
 */

ResearchSubject.prototype.anonymize = function () {
  process.env.TRACE && console.log("ResearchSubjects.hash()", this);  

  console.log("ResearchSubjects.hash()");  


  if(this.name && this.name[0]){
    var anonymizedName = this.name[0];

    if(this.name[0].family){
      anonymizedName.family = Anon.name(this.name[0].family);        
    }
    if(this.name[0].given && this.name[0].given[0]){
      var secretGiven = Anon.name(this.name[0].given[0]);
      anonymizedName.given = [];      
      anonymizedName.given.push(secretGiven);
    }
    if(this.name[0].text){
      anonymizedName.text = Anon.name(this.name[0].text);
    }

    this.name = [];
    this.name.push(anonymizedName);
  }

  return this;
}


Anon = {
  name: function(name){
    var anonName = '';
    for(var i = 0; i < name.length; i++){
      if(name[i] === " "){
        anonName = anonName + " ";
      } else {
        anonName = anonName + "*";
      }
    }
    return anonName;
  },
  phone: function(){
    return "NNN-NNN-NNNN";
  },
  ssn: function(){
    return "###-##-####"
  }
}