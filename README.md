# Caddie Fullstack Technical Test

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>


## Pre-requisites

- Install [Nx](https://nx.dev) globally by running `npm i -g nx` (You can also use npx to run nx if you don't want to install nx globally, please translate any nx commands specified in this readme to use `npx nx <commands>` when using npx)
- Install [Docker desktop](https://docs.docker.com/desktop/install/mac-install/)

## Project structure
 - This project uses [Nx](https://nx.dev) as the base for the repository, and it's structure.
 - The project includes the following apps (You can find the specifics of each app in their respective README.md files)
   - [Frontend app (React)](./apps/frontend/README.md) 
   - [Backend app (NestJS)](./apps/backend/README.md)

## Starting dev server
- Make sure you have docker desktop installed and running on your machine.
- To start the monorepo development server run `nx run-many --targets serve --all`. Open your browser and navigate to http://localhost:4200/. Happy coding!
- **P.S:** The `run-many` command starts up the postgres docker container , frontend app and the backend project.



## Requirements

- Build an app that allows users to create and manage a task list.

 ### Features to build:
* **Users should be able to create tasks.**
  - Users can create tasks with a title and description and a due date from the UI.
  - **P.S:** A simple form with a title, description and due date field is enough, The UI does not need to be polished.


* **Users should be able to view all tasks.**
  - Users can view all tasks in a list in the UI. 
  - Each task item should display the title, description and due date of the task.
  - Each task item should have an avatar that displays the first letter of the task title with a background color , and the background color should always be the same if the letter displayed inside is the same.
    - For example ,  The tasks with title is "Buy groceries" and "Buy a new car" should have the same background color because they both start with the letter "B". 


* **Task Reordering:**
  - Users can reorder tasks within the list using drag-and-drop.
  - The order of the tasks should be persisted.
  - **P.S:** You can use any library of your choice to implement this feature (Even the Native Drag & Drop). 

### Design requirements:
- The design of the app is up to you, We do not judge based on design, but we do expect you to have a good understanding of UX and UI design principles and use them accordingly in the UI.

### Tech stack preferences:
 **P.S:** You can use any tech stack of your choice to build this app, but we would prefer if you use the following tech stack. 
- Frontend: React
- CSS Framework: TailwindCSS
- Backend: NestJS
- Database: PostgreSQL

- We have provided a boilerplate for you to get started with the tech stack we prefer.

### How do i submit my solution?
- Create a new branch in this repo and push your solution to the branch.
- Create a pull request to the main branch of this repo.
- Let us know when you're done by responding to the email you received with a link to your pull request.
