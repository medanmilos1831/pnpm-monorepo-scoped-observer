import { useMachine } from "../../services/toggleMachine";

export function HomePage() {
  const { state, send } = useMachine();
  const { state: state2, send: send2 } = useMachine();

  return (
    <div>
      <h1>Home Page</h1>

      <div>
        <h3>Scoped Observer State Machine Example</h3>
        <p>
          Current state: <strong>{state}</strong>
        </p>
        <p>
          Current state 2: <strong>{state2}</strong>
        </p>
        <button onClick={() => send({ type: "TOGGLE" })}>Toggle State</button>
      </div>
    </div>
  );
}
