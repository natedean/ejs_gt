import GameController from './game-controller';

export default function game() {
  var directive = {
    link: gameLink,
    scope: {},
    template:`
    <div class="gtGameContainer" ng-class="{ 'gtGameContainer--offset': !vm.gameModel.isActive &&
                                                                          vm.gameModel.inactiveState.isCorrectAnswer }">
      <div class="gtGame">
        <div class="gtGame__questionTextContainer">
          <div class="gtGame__questionText">{{ vm.question.question }}</div>
        </div>
        <div class="gtGame__answerBtnRow row">
          <div class="gtGame__answerBtnContainer animate-repeat" ng-repeat="answer in vm.answers">
            <button
              class="button"
              ng-click="vm.submitAnswer($event, answer)">
              {{ ::answer.answer }}
            </button>
          </div>
        </div>
        <action-panel></action-panel>
      </div>
    </div>
    `,
    restrict: 'E',
    controller: GameController,
    controllerAs: 'vm',
    bindToController: true // because the scope is isolated
  };

  return directive;

  function gameLink(scope, elem, attrs) {
    /* */
  }
}
