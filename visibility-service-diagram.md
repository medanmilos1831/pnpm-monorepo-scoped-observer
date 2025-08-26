# React Visibility Service Architecture Diagram

```mermaid
graph TB
    %% React Components
    subgraph "React Components"
        A[Component] --> B[useVisibility Hook]
        C[VisibilityHandler] --> D[Children Function]
        E[useWatch Hook]
    end

    %% Visibility Instance
    subgraph "Visibility Instance"
        F[VisibilityInstance] --> G[State Machine]
        G --> H[State: 'open']
        G --> I[State: 'close']
        F --> J[API Methods]
        J --> K[open()]
        J --> L[close()]
        J --> M[reset()]
    end

    %% State Machine
    subgraph "State Machine Engine"
        N[@scoped-observer/react-state-machine]
        O[createMachine]
        P[State Transitions]
        P --> Q[ON_OPEN → open]
        P --> R[ON_CLOSE → close]
        P --> S[RESET → close]
    end

    %% Core Observer
    subgraph "Core Observer System"
        T[@scoped-observer/core]
        U[ScopedObserver]
        V[EventEntity]
        W[Event Management]
    end

    %% Data Flow
    A --> B
    B --> F
    C --> F
    E --> F
    F --> G
    G --> N
    N --> O
    O --> P
    F --> T
    T --> U
    U --> V
    V --> W

    %% State Changes
    H --> K
    I --> L
    K --> H
    L --> I
    M --> I

    %% Styling
    classDef reactComponent fill:#61dafb,stroke:#333,stroke-width:2px
    classDef visibilityInstance fill:#ff6b6b,stroke:#333,stroke-width:2px
    classDef stateMachine fill:#4ecdc4,stroke:#333,stroke-width:2px
    classDef coreObserver fill:#45b7d1,stroke:#333,stroke-width:2px
    classDef api fill:#f9ca24,stroke:#333,stroke-width:2px

    class A,B,C,D,E reactComponent
    class F,G visibilityInstance
    class N,O,P,Q,R,S stateMachine
    class T,U,V,W coreObserver
    class J,K,L,M api
```

## Visibility Service Flow

### 1. **Component Level**
- React komponente koriste `useVisibility` hook
- `VisibilityHandler` omogućava renderovanje children funkcije
- `useWatch` hook za praćenje stanja

### 2. **Visibility Instance**
- Svaki visibility item ima svoj `VisibilityInstance`
- Upravlja stanjem kroz state machine
- Pruža API metode: `open()`, `close()`, `reset()`

### 3. **State Machine**
- Koristi `@scoped-observer/react-state-machine`
- Dva glavna stanja: `open` i `close`
- Transicije: `ON_OPEN`, `ON_CLOSE`, `RESET`

### 4. **Core Observer**
- `@scoped-observer/core` za event management
- `ScopedObserver` za upravljanje event-ima
- `EventEntity` za individualne event-e

### 5. **Data Flow**
```
Component → useVisibility → VisibilityInstance → State Machine → Core Observer
```

### 6. **Key Features**
- **Scoped Management**: Svaki visibility item ima svoj scope
- **State Persistence**: Stanje se čuva u Map strukturi
- **Event System**: Integrisan sa core observer sistemom
- **Type Safety**: Full TypeScript podrška
- **Memory Management**: Automatsko čišćenje pri unmount-u