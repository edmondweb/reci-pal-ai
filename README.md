# Recipe Recommender - Simple Food Matcher

## Project Overview
The Recipe Recommender project is a simple web application designed to recommend recipes based on the ingredients available to the user. It allows users to input available ingredients, and then fetches recipe suggestions using the OpenAI API. The results are displayed as clickable recipe cards, making it easy for users to browse through suggested recipes.

## Tech Stack
- **Frontend**: 
  - HTML5/CSS (Recipe Cards)
  - JavaScript (Ingredient filtering)
- **Backend**: 
  - Python (Flask for handling requests)
  - MySQL (Database for storing recipes and user information)
- **AI**: 
  - OpenAI API (Free Tier for generating text-based recipe suggestions)

## How it Works
1. The user selects available ingredients (e.g., "chicken, tomatoes").
2. The Python backend sends a query to the OpenAI API: *"Suggest 3 simple recipes with [ingredients]"*.
3. The API returns the suggested recipes, which are then saved to a MySQL database.
4. The recipes are displayed as clickable recipe cards on the frontend, providing an easy way for users to interact with the results.

## Features
- **Ingredient-based Recipe Suggestions**: Users can input ingredients they already have, and the app provides recipe ideas based on those ingredients.
- **AI-Powered Suggestions**: The app uses the OpenAI API to generate recipe suggestions, making it more dynamic and adaptable to different ingredient combinations.
- **Database Integration**: MySQL is used to store user data and recipe suggestions, allowing for easy retrieval and display of data.
- **Simple User Interface**: The frontend uses HTML5, CSS, and JavaScript to display recipe cards and allow for ingredient filtering.

## Beginner Perks
- Uses **basic SQL joins** to link users with their respective recipes.
- No image processing—pure text interaction, making the project easy to implement and understand.
- Demonstrates practical **API integration** (OpenAI API) in a real-world scenario, which is valuable for learning and hands-on experience.

## How to Edit and Contribute
There are several ways to edit this code:

### Option 1: Edit via Lovable
- Visit the [Lovable Project](https://lovable.dev/projects/eb845710-be37-4659-851e-3f9999c9e384) to start prompting and make changes.
- Changes made through Lovable will be automatically committed to the repository.

### Option 2: Work Locally Using Your Own IDE
1. Clone the repository using the project's Git URL:
   ```sh
   git clone <YOUR_GIT_URL>
2. Navigate to the project directory:
   cd <YOUR_PROJECT_NAME>
Install dependencies:

npm install

Start the development server:

    npm run dev

Option 3: Edit Files Directly in GitHub

    Navigate to the file you want to edit.

    Click the "Edit" button (pencil icon) at the top right of the file view.

    Make your changes and commit them.

Option 4: Use GitHub Codespaces

    Go to the main page of your repository.

    Click the "Code" button near the top right.

    Select the "Codespaces" tab and click on "New Codespace" to launch a new environment.

    Edit and commit changes directly within the Codespace.

Technologies Used

    Frontend: HTML5, CSS, JavaScript

    Backend: Python (Flask), MySQL

    AI: OpenAI API (Free Tier)

Deployment

To deploy this project, simply follow these steps:

    Open Lovable.

    Click on Share -> Publish.

Custom Domain

You can connect a custom domain to your Lovable project by following the instructions on the Lovable platform. Simply visit the Share section and configure your domain settings.

Feel free to explore the repository and start building your own version of this Recipe Recommender project!
