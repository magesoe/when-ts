import { StateMachine, when } from 'when-ts';

type State = { // the state of our program
  value: number; // a counter that will be incremented once per tick
}

class TestMachine extends StateMachine<State> {
  constructor() {
    super({ value: 0 }); // pass the initial state to the event machine
  }

  @when(true) // define a condition for this block to execute, in this case always
  reportOncePerTick(s: State, m: TestMachine) {
    console.log(`beginning tick #${m.history.tick} with state`, s);
  }

  @when(state => state.value < 5) // this only executes when `value` is less than 5
  incrementOncePerTick(s: State) { // increment `value` once per tick
    return { value: s.value + 1 };
  }

  @when(state => state.value >= 5) // this will only execute when `value` is >= 5
  exitWhenDone(s: State, m: TestMachine) {
    console.log(`finished on tick #${m.history.tick}, exiting`, s);
    if (m.history.tick >= 5)
      m.exit(); // exit the state machine
  }
}

const test = new TestMachine();

const result = test.run(); // this does will block until the machine exits, unlike `.step()`

console.log('state machine exits with:', result);
