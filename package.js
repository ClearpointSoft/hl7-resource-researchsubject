Package.describe({
  name: 'clinical:hl7-resource-researchsubject',
  version: '3.0.12',
  summary: 'HL7 FHIR Resource - ResearchSubject',
  git: 'https://github.com/ShivaDara/hl7-resource-researchsubject',
  documentation: 'README.md'
});


Package.onUse(function (api) {
  api.versionsFrom('1.1.0.3');

  api.use('meteor-platform');
  api.use('mongo');
  api.use('aldeed:simple-schema@1.3.3');
  api.use('simple:json-routes@2.1.0');
  api.use('momentjs:moment@2.17.1');


  api.use('clinical:extended-api@2.2.2');
  api.use('clinical:base-model@1.3.5');
  api.use('clinical:user-model@1.5.0');
  api.use('clinical:hl7-resource-datatypes@3.0.0');
  api.use('clinical:hl7-resource-bundle@1.3.10');

  api.imply('clinical:user-model');

  api.addFiles('lib/ResearchSubjects.js');
  api.addFiles('server/rest.js', 'server');

  if(Package['clinical:fhir-vault-server']){
    api.use('clinical:fhir-vault-server@0.0.3', ['client', 'server'], {weak: true});
  }
  
  api.export('ResearchSubject');
  api.export('ResearchSubjects');
  api.export('ResearchSubjectSchema');
});
