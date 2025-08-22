# NGRX Reference Project

This project serves as a **reference guide for implementing NgRx** in Angular 19 applications.  
It covers core NgRx concepts, including **Actions, Effects, Reducers, and Selectors**, and introduces **NgRx Entity** for efficient management of collections.  

This repository is intended as a **learning and reference tool** for future projects.

---

## 🛠 Tools & Technologies

- **Angular 19** – modern Angular framework for building SPA applications  
- **NgRx** – Redux-inspired state management library for Angular  
- **RxJS** – reactive programming library for handling asynchronous streams  

---

## 🔹 Project Structure

The repository demonstrates a typical **NgRx flow** using an `Employee` feature module.

### 1. Actions
Defined using `createActionGroup`:

- **Load Employees**  
- **Load Employee by ID**  
- **Delete Employee**  

Each action group includes **request, success, and error** variants for handling asynchronous operations.

### 2. Effects
Effects handle side effects and asynchronous logic using RxJS operators like `mergeMap`, `exhaustMap`, and `catchError`.

- Observables returned from services are transformed into NgRx actions.  
- Success actions update the store, while error actions handle failures gracefully.  
- Optional: Notifications via `ngx-toastr` are triggered on certain effects.

### 3. Reducers
Reducers update the application state based on dispatched actions:

- `loading` and `error` flags manage request status.  
- Employee data is stored in arrays or Entity collections.  
- `delete`, `update`, and `add` operations modify state immutably.

### 4. Selectors
Selectors provide **derived or computed slices of state**:

- `selectEmployees` – returns an array of all employees  
- `selectEmployeeEntities` – returns a dictionary of employees keyed by ID  
- `selectEmployeeIds` – returns an array of employee IDs  
- `selectEmployeeTotal` – returns the total number of employees  

Selectors allow components to reactively subscribe to specific parts of the store.

### 5. NgRx Entity
NgRx Entity is used for **efficient state management of collections**:

- Normalizes collections into `{ ids: [], entities: {} }` format  
- Provides helper methods like `addOne`, `removeOne`, `updateOne`, `setAll`  
- Enables **O(1) lookups** for individual entities  
- Reduces boilerplate in reducers and selectors  

**Use cases:**

- Arrays or collections (e.g., list of employees, products, messages)  
- Fast retrieval by ID  
- Simplified updates and deletions  

> Note: For single objects like `currentEmployee`, storing the plain object or using a `selectedId` lookup with entity is preferred.
