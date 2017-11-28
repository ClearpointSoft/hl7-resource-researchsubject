
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

//import { ResearchSubjects } from 'meteor/accounts-base';


export const insertResearchSubject = new ValidatedMethod({
  name: 'researchSubjects.insert',
  validate: new SimpleSchema({
    'name.$.text': { type: String },
    'identifier': { type: [ String ], optional: true },
    'gender': { type: String, optional: true },
    'active': { type: Boolean, optional: true },
    'birthdate': { type: Date, optional: true },
    'photo.$.url': { type: String, optional: true }
  }).validator(),
  run(document) {

    ResearchSubjects.insert(document);
  }
});

export const updateResearchSubject = new ValidatedMethod({
  name: 'researchSubjects.update',
  validate: new SimpleSchema({
    _id: { type: String },
    'update': { type: Object, blackbox: true, optional: true}
  }).validator(),
  run({ _id, update }) {
    console.log("updateResearchSubject");
    console.log("_id", _id);
    console.log("update", update);

    let researchSubject = ResearchSubjects.findOne({_id: _id});

    delete researchSubject._id;
    delete researchSubject._document;
    delete researchSubject._super_;
    researchSubject.name.text = update.name.text;
    researchSubject.gender = update.gender;
    researchSubject.photo = update.gender.photo;

    console.log("diffedResearchSubject", researchSubject);

    ResearchSubjects.update(_id, { $set: update });
  }
});

export const removeResearchSubjectById = new ValidatedMethod({
  name: 'researchSubjects.removeById',
  validate: new SimpleSchema({
    _id: { type: String }
  }).validator(),
  run({ _id }) {
    console.log("Removing user " + _id);
    ResearchSubjects.remove({_id: _id});
  }
});
