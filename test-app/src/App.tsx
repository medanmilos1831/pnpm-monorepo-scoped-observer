import { HomePage } from "./pages/HomePage";

// ============================================
// KLASIČAN FLYWEIGHT PATTERN PRIMER
// ============================================

// 1. INTRINSIC STATE (Shared - deli se između svih instanci)
// Ovo su metode i logika koja je ista za sve person objekte
type PersonIntrinsic = {
  updateFirstName(this: PersonContext, fname: string): void;
  updateLastName(this: PersonContext, lname: string): void;
  getFullName(this: PersonContext): string;
  getInfo(this: PersonContext): string;
};

const PersonFlyweight: PersonIntrinsic = {
  updateFirstName(this: PersonContext, fname: string) {
    this.fname = fname;
    // console.log(`[Flyweight] Updated first name to: ${fname}`);
  },
  updateLastName(this: PersonContext, lname: string) {
    this.lname = lname;
    // console.log(`[Flyweight] Updated last name to: ${lname}`);
  },
  getFullName(this: PersonContext): string {
    return `${this.fname} ${this.lname}`;
  },
  getInfo(this: PersonContext): string {
    return `Person: ${this.fname} ${this.lname} (ID: ${this.id})`;
  },
};

// 2. EXTRINSIC STATE (Unique - jedinstven za svaki objekat)
// Ovo su podaci specifični za svaki person
type PersonContext = {
  id: string;
  fname: string;
  lname: string;
};

// 3. FLYWEIGHT FACTORY (Upravlja kreiranjem i deljenjem flyweight objekata)
const PersonFlyweightFactory = (() => {
  // Cache za flyweight objekte - deli se između svih instanci
  const flyweightCache = new Map<string, PersonIntrinsic>();

  return {
    getFlyweight(type: string): PersonIntrinsic {
      // Ako već postoji u cache-u, vrati ga (deljenje)
      if (flyweightCache.has(type)) {
        // console.log(`[Factory] Reusing existing flyweight: ${type}`);
        return flyweightCache.get(type)!;
      }

      // Ako ne postoji, kreiraj novi i sačuvaj u cache
      // console.log(`[Factory] Creating new flyweight: ${type}`);
      flyweightCache.set(type, PersonFlyweight);
      return PersonFlyweight;
    },
    getCacheSize(): number {
      return flyweightCache.size;
    },
  };
})();

// 4. CONTEXT OBJEKAT (Kombinuje intrinsic i extrinsic state)
const createPerson = (
  id: string,
  data: { firstName: string; lastName: string }
): PersonContext & PersonIntrinsic => {
  // Uzmi flyweight objekat iz factory-ja (shared)
  const flyweight = PersonFlyweightFactory.getFlyweight("person");

  // Kreiraj context objekat sa extrinsic state-om (unique)
  const context: PersonContext = {
    id,
    fname: data.firstName,
    lname: data.lastName,
  };

  // Kombinuj flyweight (intrinsic) sa context-om (extrinsic)
  return Object.assign(Object.create(flyweight), context);
};

// 5. STORE (Upravlja svim person instancama)
const createPersonStore = () => {
  const store = new Map<string, PersonContext & PersonIntrinsic>();

  return {
    createPerson: (
      id: string,
      person: { firstName: string; lastName: string }
    ) => {
      const personInstance = createPerson(id, person);
      store.set(id, personInstance);
      // console.log(`[Store] Created person with ID: ${id}`);
    },
    getPerson: (id: string) => {
      return store.get(id);
    },
    removePerson: (id: string) => {
      store.delete(id);
    },
    getAllPersons: () => {
      return Array.from(store.entries());
    },
  };
};

// ============================================
// PRIMER UPOTREBE
// ============================================

const store = createPersonStore();

// Kreiraj više person objekata
store.createPerson("1", { firstName: "John", lastName: "Doe" });
store.createPerson("2", { firstName: "Jane", lastName: "Doe" });
// store.createPerson("3", { firstName: "Jim", lastName: "Beam" });

// console.log(store.getAllPersons());

// Svi person objekti dele isti flyweight objekat!
// console.log("\n=== Flyweight Cache Size ===");
// console.log(`Cache size: ${PersonFlyweightFactory.getCacheSize()}`); // 1 - samo jedan flyweight objekat!

// Koristi metode iz flyweight-a
// const person1 = store.getPerson("1")!;
// person1.updateFirstName("Milos");
// console.log(person1.getFullName()); // "Milos Doe"
// console.log(person1.getInfo()); // "Person: Milos Doe (ID: 1)"

// const person2 = store.getPerson("2")!;
// person2.updateLastName("Smith");
// console.log(person2.getFullName()); // "Jane Smith"

// Svi person objekti koriste iste metode iz flyweight-a
// console.log("\n=== All Persons ===");
// store.getAllPersons().forEach(([id, person]) => {
//   console.log(person.getInfo());
// });
function App() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "black",
        color: "white",
      }}
    >
      {/* <HomePage /> */}
    </div>
  );
}

export { App };
