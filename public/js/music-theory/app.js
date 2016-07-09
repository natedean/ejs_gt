var initialState = {
  count: 0,
  inputValue: ''
};

var increaseButton = document.querySelector('#increase');
var decreaseButton = document.querySelector('#decrease');
var inputElement = document.querySelector('#input');
var eId = document.querySelector('.personDisplay-id');
var eName = document.querySelector('.personDisplay-name');
var eEmail = document.querySelector('.personDisplay-email');
var eLoading = document.querySelector('.loadingIndicator');

var increase = Rx.Observable.fromEvent(increaseButton, 'click')
    .map(e => e.target.value);
  // .map(() => state => state.set('count', state.get('count') + 1));


var decrease = Rx.Observable.fromEvent(decreaseButton, 'click')
    .map(e => e.target.value);
  // .map(() => state => state.set('count', state.get('count') - 1));


var state$ = Rx.Observable.merge(increase, decrease)
    .startWith(1)
    .map(x => parseInt(x, 10))
    .scan((acc, x) => {
      if (acc <= 1 && x < 1) return acc;

      return acc + x;
    }, 0)
    .filter(x => x > 0)
    .do(val => setLoadingState())
    .debounceTime(300)
    .switchMap((val) => fetch(`https://jsonplaceholder.typicode.com/users/${val}`))
    .flatMap(res => res.json())
    .do(val => eLoading.textContent = '');

state$.subscribe(val => {
  eId.textContent = val.id;
  eName.textContent = val.name;
  eEmail.textContent = val.email;


  if(val.id <= 1){
    decreaseButton.style.display = 'none';
  } else {
    decreaseButton.style.display = 'inline-block';
  }

});

function setLoadingState() {
  eName.textContent = 'Loading...';
  eEmail.textContent = '';
}




// We merge the three state change producing observables
// var state$ = Rx.Observable.merge(
//   increase,
//   decrease,
//   input
// ).scan((state, changeFn) => changeFn(state), Immutable.fromJS(initialState));
//
// // We subscribe to state changes and update the DOM
// state$.subscribe((state) => {
//   document.querySelector('#count').innerHTML = state.get('count');
//   document.querySelector('#hello').innerHTML = 'Hello ' + state.get('inputValue');
//   console.log(state.get('inputValue'));
// });
