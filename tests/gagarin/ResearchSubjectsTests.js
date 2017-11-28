describe('clinical:hl7-resources-researchsubjects', function () {
  var server = meteor();
  var client = browser(server);

  it('ResearchSubjects should exist on the client', function () {
    return client.execute(function () {
      expect(ResearchSubjects).to.exist;
    });
  });

  it('ResearchSubjects should exist on the server', function () {
    return server.execute(function () {
      expect(ResearchSubjects).to.exist;
    });
  });

});
