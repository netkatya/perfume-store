# AI-NOTES.md

## AI Tools Used

During the development of this project I used AI tools including **ChatGPT** and **GitHub Copilot** to assist with code suggestions and debugging.

AI was used as a support tool, but all final decisions, structure, and implementation details were reviewed and adjusted manually.

---

## Example 1 – Improving AI-generated code

An AI suggestion initially proposed a simpler filtering implementation for the `/api/products` route handler. However, it did not properly validate query parameters or handle incorrect values.

I improved this by adding explicit validation for:

- `sort` values
- `minPrice` and `maxPrice`
- `page` and `pageSize`

This ensured the API behaves predictably and returns meaningful errors for invalid inputs.

---

## Example 2 – Adjusting UI logic suggested by AI

AI-generated UI suggestions initially mixed too much logic into client components. I refactored the implementation to better align with **Next.js App Router practices** by:

- Keeping **data fetching in server components**
- Moving only interactive functionality (basket interactions) into client components

This resulted in a clearer separation between server-rendered content and client-side interactivity.

---

## Architectural Tradeoff

For the basket functionality I chose to use **Zustand** instead of a more complex state management approach.

The tradeoff is that Zustand is simple and lightweight, but it does not provide built-in advanced features such as reducers or strict state patterns like Redux.

For this small application, Zustand provides a good balance between simplicity and maintainability while keeping the implementation easy to understand.
