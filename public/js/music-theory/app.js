var initialState = {
  count: 0,
  inputValue: ''
};

var increaseButton = document.querySelector('#increase');
var increase = Rx.Observable.fromEvent(increaseButton, 'click')
  // Again we map to a function the will increase the count
  .map(() => state => state.set('count', state.get('count') + 1));

var decreaseButton = document.querySelector('#decrease');
var decrease = Rx.Observable.fromEvent(decreaseButton, 'click')
  // We also map to a function that will decrease the count
  .map(() => state => state.set('count', state.get('count') - 1));

var inputElement = document.querySelector('#input');
var input = Rx.Observable.fromEvent(inputElement, 'keyup')
  // Let us also map the keypress events to produce an inputValue state
  .map(event => state => state.set('inputValue', event.target.value));

// We merge the three state change producing observables
var state = Rx.Observable.merge(
  increase,
  decrease,
  input
).scan((state, changeFn) => changeFn(state), Immutable.fromJS(initialState));

// We subscribe to state changes and update the DOM
state.subscribe((state) => {
  document.querySelector('#count').innerHTML = state.get('count');
  document.querySelector('#hello').innerHTML = 'Hello ' + state.get('inputValue');
});
