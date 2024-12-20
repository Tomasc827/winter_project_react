# Winter Project by Team GG EZ

## Project Title 
**Mock Streaming Service**

## Description

### The app is a basic version of what could be called a streaming service, similar to Netflix or HBO. It includes functionality for navigation, display, and user interaction (such as sign-up and login processes), but lacks security measures. The app is powered by a mock backend using JSON Server.

## Framework

   * **React**: For building the user interface
   * **Vite**: Fast build tool and development server
   * **Tailwind CSS**: Utility-first CSS framework for styling
   * **tailwindcss-forms**: Plugin for better form styling in Tailwind
   * **daisyUI**: Pre-built UI components for Tailwind CSS

## Form Management

   * **react-hook-form**: For handling form validation and state management

## Routing

   * **React Router**: For handling routing and navigation across the app

## API & Data Handling

   * **Axios**: For making HTTP requests
   * **JSON Server**: For mocking a backend API
   * **API Endpoints**:
      *  **/users**: For user data and authentication
      *  **/content**: For streaming content data

## Installation Instructions (Using Bash)

1. To run the project locally:

    Clone the repository:
* **HTTPS**:

git clone https://github.com/Tomasc827/winter_project_react.git

* **SSH**:

    git clone git@github.com:Tomasc827/winter_project_react.git

2. Navigate into the project directory:

 cd winter_project_react

3. Install the dependencies:

 npm install

4. Run the development server:

 npm run dev

* The app should be available at: http://localhost:5173

5. Start the mock API server (JSON Server):

 npx json-server data/data.json --port 5000

## Layout

### The landing page serves as the homepage, and the navigation bar allows users to smoothly transition between movies, TV series, and bookmarked pages.

 ### Unregistered users can browse freely, but when they attempt to view a video, a modal will appear prompting them to either log in or sign up to continue.

## Rating System

### Registered users can give a rating to their chosen media (Movies/TV series) using the "5 Star Rating System". Also, be able to view the number of ratings and the rating average.

## Administrator

### Administrator user has the privelege to Add/Update/Delete the App media.

### Administrator Manual for gaining access:

1. Create a new general user account or have one already created.

2. Enter the data.json file inside the "data" folder.

3. Scroll down to the bottom part of the file - the "users" part.

4. Find your created user using your registered email as a guide.

5. Change the "role" from "User" to "Admin" .

6. Log out.

7. Restart the mock API server (JSON Server):
   
npx json-server data/data.json --port 5000

8. Log back In.
