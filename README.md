# seros-interactive-map-client

Seros Interactive Map Client is the front end for my Dungeons and Dragons companion app. Created to track various entries consisting of sublocations, characters, quests and combat instances all of which are assigned under the banner of a unique location represented by a pin on the map. It also allows for the creation of multiple campaigns so all created notes can be isolated to one campaign.

## Scripts

This app was created using Create React App, so any scripts that come with that are included. 

In the project directory, you can run:

### `npm install`

Installs the relevant dependancies.

### `npm start`

Runs the app in the development mode with hot reloading enabled.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Tech

This app was created with the following libraries/frameworks:

React: https://legacy.reactjs.org/

React Leaflet: https://react-leaflet.js.org/

React Router: https://reactrouter.com/en/main

## Using The App

### Getting Started
To use this app you will have to create an account with an e-mail, username and a password. You will also need a mongoDB database setup and ready. 

Once the previous steps have been completed you can create a campaign and generate an invite code to send to other users, or use a code you have recieved from someone else to join a campaign and begin populating the map

### Changing The Map
The map uses multiple layers of tiles created through parsing a larger image. to change the original image you will need to have a parsed image file structure the same as the one found in `public\images\maps\seros\png-example`. See the link section for a link to the React Leaflet Documentation for further guidance.

## Data Structure

- Campaigns - The main story applied to the adventure. Campaigns may contain the following:
  - A name and a description
  - A list of users
  - A list of locations

- Locations - Important places to be marked on the map. Locations may contain the following:
  - A name and a description
  - A pair of latitude and longitude coordinates
  - A list of relevant sublocations
  - A list of relevant characters
  - A list of relevant quests
  - A list of relevant combat instances

- Sublocations - Buildings or places of interest that are found at each location. Sublocations may contain the following:
  - A name and a description
  - A location that the sublocation is associated with

- NPCs (Non-Player Characters) - Characters that are found within each location. NPCs may contain the following:
  - A name and a description
  - A race
  - A disposition towards the players
  - A living status - whether the NPC is alive or deceased
  - A list of associated locations - this allows the NPC entry to be found at multiple locations
  - A list of associated quests

- Quests - Missions created by the players. Quests may contain the following:
  - A name and a description
  - A list of associated locations - this allows the quest entry to be found at multiple locations
  - A completion status - whether or not the quest is finished in the eyes of the player

- Combat Instances - Whenever the players get into a fight in game. Combat instances may contain the following:
  - A name and a description
  - A list of players that were present during the fight - each player has a name, a class, and an array of damage and healing values representing each turn of combat
  - A location that the combat instance is assocaited with
  - A timestamp that the combat instance was created at

## Relevant Links

seros-interactive-map-server repository: https://github.com/JackSalloway/seros-interactive-map-server



## Next steps

The things I would like to implement for the future of this app are as follows:

- Typescript - To increase the manageability of the project
- Webhooks - To allow users to see when another user is active in the same campaign. Features would include:
  -  Representing the position of a user's cursor using latitude and longitude coordinates on the map
  -  Showing which location a user is currently viewing
  -  Showing if a user is creating a new entry
- Testing - To increase efficiency when updating/creating new features
  


