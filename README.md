# Recipe Recommender - Simple Food Matcher

## Project Overview
The Recipe Recommender project is a simple web application designed to recommend recipes based on the ingredients available to the user. It allows users to input available ingredients, and then fetches recipe suggestions using the OpenAI API. The results are displayed as clickable recipe cards, making it easy for users to browse through suggested recipes.

## Tech Stack
This project is built with:

- **Vite** for fast and optimized development
- **TypeScript** for static type checking and enhanced developer experience
- **React** for building the user interface and managing state
- **shadcn-ui** for a streamlined and modern UI component library
- **Tailwind CSS** for utility-first CSS styling
- **Supabase** for the database and authentication

## How it Works
1. The user selects available ingredients (e.g., "chicken, tomatoes").
2. The frontend, built with React and TypeScript, sends the selected ingredients to the backend, which is powered by Supabase (used for database and authentication).
3. The backend queries the OpenAI API to generate recipe suggestions based on the provided ingredients.
4. The API returns the suggested recipes, which are then saved to the Supabase database.
5. The recipes are displayed as clickable recipe cards on the frontend, providing an easy and interactive way for users to explore the suggested recipes.

## Features
- **Ingredient-based Recipe Suggestions**: Users can input ingredients they already have, and the app provides recipe ideas based on those ingredients.
- **AI-Powered Suggestions**: The app uses the OpenAI API to generate dynamic recipe suggestions based on available ingredients, ensuring adaptability to various ingredient combinations.
- **Database Integration**: Supabase is used to store both user data and recipe suggestions, facilitating easy retrieval and display of the data on the frontend.
- **Modern User Interface**: The frontend leverages React, TypeScript, and Tailwind CSS to provide an intuitive, responsive, and visually appealing interface.
- **UI Components**: shadcn-ui is used to enhance the user interface with modern and consistent components.

## Beginner Perks
- Uses **basic SQL joins** via Supabase to link users with their respective recipe suggestions.
- No image processing—pure text interaction, making the project straightforward and ideal for learning.
- Demonstrates practical **API integration** (OpenAI API) in a real-world scenario, offering valuable hands-on experience in working with APIs and databases.

## How to Edit and Contribute
There are several ways to edit this code:

### Option 1: Edit via Lovable
- Visit the [Lovable Project](https://recipal.lovable.app/) to start prompting and make changes.
- Changes made through Lovable will be automatically committed to the repository.

### Option 2: Work Locally Using Your Own IDE
1. Clone the repository using the project's Git URL:
   ```sh
   git clone https://github.com/edmondweb/reci-pal-ai.git
2. Navigate to the project directory:

   `cd reci-pal-ai`

4. Install dependencies:

   `npm install`

5. Start the development server:

    `npm run dev`

Option 3: Edit Files Directly in GitHub

    Navigate to the file you want to edit.

    Click the "Edit" button (pencil icon) at the top right of the file view.

    Make your changes and commit them.

Option 4: Use GitHub Codespaces

    Go to the main page of your repository.

    Click the "Code" button near the top right.

    Select the "Codespaces" tab and click on "New Codespace" to launch a new environment.

    Edit and commit changes directly within the Codespace.

Deployment

To deploy this project, simply follow these steps:

    Open Lovable.

    Click on Share -> Publish.

Custom Domain

You can connect a custom domain to your Lovable project by following the instructions on the Lovable platform. Simply visit the Share section and configure your domain settings.

Feel free to explore the repository and start building your own version of this Recipe Recommender project!
