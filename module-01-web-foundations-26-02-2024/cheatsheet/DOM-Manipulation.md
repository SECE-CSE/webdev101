### DOM Selection:

1. **Get Element by ID:**
   ```javascript
   const element = document.getElementById('myElement');
   ```

2. **Get Elements by Class Name:**
   ```javascript
   const elements = document.getElementsByClassName('myClass');
   ```

3. **Get Elements by Tag Name:**
   ```javascript
   const elements = document.getElementsByTagName('div');
   ```

4. **Query Selector:**
   ```javascript
   const element = document.querySelector('#myElement');
   ```

5. **Query Selector All:**
   ```javascript
   const elements = document.querySelectorAll('.myClass');
   ```

### DOM Manipulation:

6. **Change Text Content:**
   ```javascript
   element.textContent = 'New Text';
   ```

7. **Change HTML Content:**
   ```javascript
   element.innerHTML = '<strong>New Content</strong>';
   ```

8. **Change Attribute Value:**
   ```javascript
   element.src = 'new-image.jpg';
   ```

9. **Create Element:**
   ```javascript
   const newElement = document.createElement('div');
   ```

10. **Append Child:**
    ```javascript
    parentElement.appendChild(newElement);
    ```

11. **Remove Child:**
    ```javascript
    parentElement.removeChild(childElement);
    ```

### DOM Events:

12. **Add Event Listener:**
    ```javascript
    element.addEventListener('click', function() {
        // Your event handling code
    });
    ```

13. **Remove Event Listener:**
    ```javascript
    element.removeEventListener('click', eventHandler);
    ```

### DOM Navigation:

14. **Parent Node:**
    ```javascript
    const parent = element.parentNode;
    ```

15. **Child Nodes:**
    ```javascript
    const children = parent.childNodes;
    ```

16. **Next Sibling:**
    ```javascript
    const nextSibling = element.nextSibling;
    ```

17. **Previous Sibling:**
    ```javascript
    const prevSibling = element.previousSibling;
    ```

### Local Storage:

18. **Store Data:**
    ```javascript
    localStorage.setItem('key', 'value');
    ```

19. **Retrieve Data:**
    ```javascript
    const data = localStorage.getItem('key');
    ```

20. **Remove Data:**
    ```javascript
    localStorage.removeItem('key');
    ```****

Explore the [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) for in-depth information on DOM manipulation.