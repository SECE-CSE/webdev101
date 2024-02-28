### Day 3: Introduction to React with JavaScript

1. **What is React?:**
   - Overview of React and its role in building user interfaces.
   - The concept of components.

2. **Setting Up a React Project:**
   - Create a new React app using `create-react-app`.
   - Project structure and initial setup.

   ```bash
   npx create-react-app my-react-app
   cd my-react-app
   npm start
   ```

3. **Creating React Components:**
   - Introduction to components.
   - Creating functional components.

   ```javascript
   // src/components/HelloWorld.js
   import React from 'react';

   function HelloWorld() {
       return <div>Hello, World!</div>;
   }

   export default HelloWorld;
   ```

4. **JSX (JavaScript XML):**
   - Understanding JSX syntax for rendering React elements.
   - JSX expressions and embedding JavaScript.

   ```javascript
   // src/components/GreetUser.js
   import React from 'react';

   function GreetUser(props) {
       return <div>Hello, {props.name}!</div>;
   }

   export default GreetUser;
   ```

5. **Props in React:**
   - Passing data to components using props.
   - Default props and prop types.

   ```javascript
   // src/App.js
   import React from 'react';
   import HelloWorld from './components/HelloWorld';
   import GreetUser from './components/GreetUser';

   function App() {
       return (
           <div>
               <HelloWorld />
               <GreetUser name="Alice" />
           </div>
       );
   }

   export default App;
   ```

6. **State in React:**
   - Introduction to state in functional components.
   - Using the `useState` hook.

   ```javascript
   // src/components/Counter.js
   import React, { useState } from 'react';

   function Counter() {
       const [count, setCount] = useState(0);

       return (
           <div>
               <p>Count: {count}</p>
               <button onClick={() => setCount(count + 1)}>Increment</button>
           </div>
       );
   }

   export default Counter;
   ```

7. **Handling Events:**
   - Attaching event handlers in React.
   - Updating state based on events.

   ```javascript
   // src/components/ClickButton.js
   import React, { useState } from 'react';

   function ClickButton() {
       const [clickCount, setClickCount] = useState(0);

       const handleClick = () => {
           setClickCount(clickCount + 1);
       };

       return (
           <div>
               <p>Click Count: {clickCount}</p>
               <button onClick={handleClick}>Click me</button>
           </div>
       );
   }

   export default ClickButton;
   ```

8. **Conditional Rendering:**
   - Using conditional statements in JSX.
   - Rendering components conditionally.

   ```javascript
   // src/components/LoginStatus.js
   import React from 'react';

   function LoginStatus({ isLoggedIn }) {
       return (
           <div>
               {isLoggedIn ? <p>Welcome, User!</p> : <p>Please log in.</p>}
           </div>
       );
   }

   export default LoginStatus;
   ```

9. **Lists and Keys:**
   - Rendering lists of elements in React.
   - Using keys to optimize rendering.

   ```javascript
   // src/components/TodoList.js
   import React from 'react';

   function TodoList({ todos }) {
       return (
           <ul>
               {todos.map(todo => (
                   <li key={todo.id}>{todo.text}</li>
               ))}
           </ul>
       );
   }

   export default TodoList;
   ```

10. **Styling in React:**
    - Adding styles to React components.
    - Using CSS modules or inline styles.

    ```javascript
    // src/components/StyledComponent.js
    import React from 'react';
    import styles from './StyledComponent.module.css';

    function StyledComponent() {
        return <div className={styles.container}>Styled Component</div>;
    }

    export default StyledComponent;
    ```