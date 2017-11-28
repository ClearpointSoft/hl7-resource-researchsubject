
Router.map(function(){
  this.route('researchSubjectPreviewPage', {
    path: '/researchSubject/:id',
    template: 'researchSubjectPreviewPage',
    data: function () {
      return ResearchSubjects.findOne({_id: this.params.id});
    }
  });
});


Template.researchSubjectPreviewPage.events({
  "click .listButton": function(event, template){
    Router.go('/list/researchSubjects');
  },
  "click .imageGridButton": function(event, template){
    Router.go('/grid/researchSubjects');
  },
  "click .tableButton": function(event, template){
    Router.go('/table/researchSubjects');
  },
  "click .indexButton": function(event, template){
    Router.go('/list/researchSubjects');
  },
  "click .researchSubjectId": function(){
    Router.go('/upsert/researchSubject/' + this._id);
  }
});
