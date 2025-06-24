# Scoped Observer Store for React

A lightweight and flexible event-driven scoped state manager for React.  
It allows you to define modular stores with **mutations** and **getters**, and subscribe to state changes via custom **event names**.

## ✨ Features

- Scoped modules with isolated state (`data`)
- Support for **mutations** and **getters**
- Manual **event dispatching** to trigger state updates
- Simple **React hook** for subscriptions
- No re-renders unless the relevant event is dispatched
- No external state management dependencies

---

## 📦 Installation

This package assumes you're using it in a React environment.

```
npm i scoped-observer-store-react
```

### 🧠 Concept

Each store module defines:

data: the reactive state

mutations: synchronous functions that mutate the state

getters: functions that return computed state

- Changes to state do not trigger React re-renders automatically.
- Instead, you manually emit events using mutate() and subscribe to them using useSubscribe().

## 🚀 Usage

### Define the store

```
import { generateStore } from 'scoped-observer-store-react';

generateStore({
  counterModule: {
    data: { counter: 0 },
    mutations: {
      updateCounter(payload: number) {
        this.counter += payload;
      },
    },
    getters: {
      getCounter() {
        return this.counter;
      },
    },
  },
});
```

## Mutate state and emit event

```
import { mutate } from 'scoped-observer-store-react';

mutate({
  scope: 'counterModule',
  commit: 'updateCounter',
  payload: 1,
  runEvents: ['counterUpdated'],
});
```

## Subscribe to changes in React component

```
import { useSubscribe, ModulesMap } from 'scoped-observer-store-react';
type StoreModules = ModulesMap<{
  counter: CounterData;
}>;
const Counter = () => {
  const { result: counter } = useSubscribe(
    (store: StoreModules) => store.counterModule.data.counter,
    ['counterUpdated']
  );

  return <div>Counter: {counter}</div>;
};
```

## 🛠 API

##### generateStore(modules)

Creates modules with state, mutations, and getters.

##### mutate(mutations, runEvents)

Commits one or more mutations and dispatches specified events.

Parameters:

- mutations (Mutation | Mutation[]): A single mutation object or an array of mutation objects. Each mutation object should have the following structure:

```
{
  scope: string;
  commit: string;
  payload?: any;
}
```

- runEvents (string[]): An array of event names to dispatch after the mutations are applied.

```
mutate(
  {
    scope: 'counter',
    commit: 'updateCounter',
    payload: 1,
  },
  ['counterUpdated']
);

mutate(
  [
    {
      scope: 'counter',
      commit: 'updateCounter',
      payload: 1,
    },
    {
      scope: 'user',
      commit: 'updateName',
      payload: 'Alice',
    },
  ],
  ['counterUpdated', 'userUpdated']
);

```

This updated API allows for flexible mutation handling, supporting both single and multiple mutations in a single call, along with associated event dispatching.

##### getter({ scope, getter, params? })

Executes a getter function.

##### useSubscribe(callback, eventNames)

React hook that returns the result of callback(store) whenever specified events are emitted.
