Script Assist
A React + TypeScript web application that demonstrates user authentication, resource listing, and navigation. The app includes both login and signup functionalities with state persistence.

1. Project Overview
This project features user authentication, protected resource pages, and local storage-based state persistence. It includes responsive design and UI components using Mantine.

2. Features
Authentication: Users can sign up and log in with a username and password.

Protected Routes: Resources and details pages are protected and require login.

Responsive UI: Pages are designed to be responsive and accessible on both mobile and desktop.

Local Storage: User credentials and authentication state are stored locally using localStorage.

3. Tech Stack
React for UI rendering.

TypeScript for type safety and improved developer experience.

Mantine for UI components.

React Router for routing and navigation.

Zustand for state management.

4. Authentication Flow
Signup: Users create an account on the /signup page.

Login: Login is validated against stored credentials.

Persistent State: The authentication state is preserved across sessions using localStorage.

5. Protected Routes
A custom PrivateRoute component is used to protect access to certain pages. If a user is not authenticated, they are redirected to the login page.

6. Responsive Design
The app is fully responsive. The login and signup pages, as well as the resource listing page, adapt to different screen sizes, ensuring a smooth experience on mobile and desktop devices.

7. User Interface
The UI uses Mantine components such as:

TextInput for username and password fields.

Button for form submissions.

Paper and Stack for layout and spacing.

A space-themed background image enhances the visual appeal.

8. Local Storage Authentication
Signup: Credentials are stored in localStorage.

Login: On successful login, the isAuthenticated state is set, and the user is redirected to /resources.

Logout: The user can log out, which clears the authentication state.
