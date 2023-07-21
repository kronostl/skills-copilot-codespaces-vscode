function skillsMembers() {
  return {
    restrict: 'E',
    templateUrl: 'templates/skills/members.html',
    controller: 'SkillsMembersCtrl',
    controllerAs: 'skillsMembersCtrl',
    bindToController: true,
    scope: {
      members: '='
    }
  };
}