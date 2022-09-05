# Book Memory

A personal archive for recording book reviews

<img width="60%" src="https://user-images.githubusercontent.com/93829156/188270525-db234e34-d617-49a2-9d6a-2d54b0b06b21.png">

- This is a project to learn and practice `React Hooks`

<br>

# 🔗 Link

- [https://book-memory.netlify.app/](https://book-memory.netlify.app/)

<br>

# 🔧 Skills

- React
- Styled components
- LocalStorage

<br>

# 🚀 Deployment

- Netlify

<br>

# 🛠️ Features

## My Book

<img width="60%" src="https://user-images.githubusercontent.com/93829156/188261869-062554e0-a310-45f2-8ea0-eb0e7f4d0a10.gif">

- Sort reviews by date written (newest, oldest)
- Filter reviews by year and star rating

<br>

## New Review

<img width="60%" src="https://user-images.githubusercontent.com/93829156/188262120-f5dfa885-2f37-4029-9c52-29d785f4acdc.gif">

- Choose a book to review
- When searching for a book, the search results according to the search term (book title) are retrieved from Google Books APIs and displayed.

<br>

## Review

<img width="60%" src="https://user-images.githubusercontent.com/93829156/188262122-14096068-0748-4ecf-b0b9-3a8dd60f2e5c.gif">

- Display written review

<br>

## Review Edit

<img width="60%" src="https://user-images.githubusercontent.com/93829156/188262123-fd5450e5-80dc-45c7-bfcb-dcac6c28a0e1.gif">

- Edit or delete a written review

<br>

# 💡 What I learned

- Understood how React hooks work and applied them in this project.
- Optimized performance by preventing unnecessary re-rendering of components.
- Experienced in Styled components.

  <br>

# 👩‍💻 How I used React hooks

- React memo
  - In order to prevent unnecessary re-rendering of controllers and review items, the components are memoized using React memo and the memoized results are reused.
- useParams
  - Access the URL parameter of the review page and edit page to get the review id and display the review content.
  - Access the URL parameter of the new review page to get the book id and display the book information.
- useRef
  - Give focus to unfilled elements when writing a new review or editing an existing review.
- useReducer
  - At first, the onCreate, onEdit, and onDelete functions to change the review list were declared separately, and each function was reused using useCallback to prevent unnecessary re-rendering of child components that receive these functions.
  - To facilitate state management, the state update logic is separated from the component using useReducer.
- useContext
  - Create a ReviewStateContext to make the review list available to child components without having to pass props down manually.
  - Create a ReviewDispatchContext to make the onCreate, onEdit, onDelete functions in the reducer available to child components without having to pass props down manually.
