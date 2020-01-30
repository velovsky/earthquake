
  

# Earthquake

Creditshelf coding challenge: a project that consumes the data in https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php and displays info about earthquakes in an Angular SPA.

This project also features the possibility to dockerize the Angular app for production purposes.

  

  

## How to run

Here is a list of commands that can be run on the root of the project:

  

-  `ng serve -o`: will launch a webpack dev server in `http://localhost:4200/` on the default user browser.

-  `ng build`: manually build the distributed version of the SPA into /dist folder.

-  `npm docker_build`: will perform the tests, build a docker container and store it in a nginx server. This, provided that Docker is installed in your machine.

-  `npm docker_run`: will run the Docker container at `http://localhost:80/`, if successful.

  

  

## Considerations

  

### API (/api folder)

For the API I took into consideration all the combinations of geojson's files: data (hour, week, etc) and magnitude (Significant, All, etc). In summary a single angular service was generated taking as inputs the date/time and the magnitude. This means that the number of requests are limited to the changes of the date and/or magnitude filters.

The API has its own models, and all were generated as *interfaces* that reflect the geojson structure.

  

### Module

Only one module was created, since we are only addressing the information of earthquakes (dashboard page). If more pages are needed, then more modules could be considered to adopt a lazy-loading pattern, thus making a more performance-wise app.

  

### Components

four components were created:

  

-  **Side Menu**: the menu for the end user to input the desired filters and sort;

-  **Earthquake Card**: card representation of an earthquake where it displays all the required data and minimap;
- **Loader**: as the name suggest to display the loader when making HTTP requests.

-  **Dashboard**: used as a container for *earthquake cards*, *side menu* and paginator. In essence reflects all the view representation of the dashboard.

  

### Services

Four services were created:

  

-  **Mapper**: to map the API structure into the desired earthquake info card;

-  **Filter/Sort**: for the *Alert* filter and *Sort* logic;
-  **HTTP-Loading**: an interceptor to keep track of requests still pending;

-  **Data Manager**: last but not least, the Data Manager whom is responsible to:

  - request data from the API;

  - transform data in order for the dashboard to consume: acting as a *redux*;

  - centralize all the relevant earthquake data: persisting in memory, unless new data is required from the API.

  

### UX/UI

The SPA is reponsive and is adapted for mobile screen devices. For the UI, I made use of the Angular Material library: buttons, side menu, paginator, spinner and snackbar.

  

### Imported libraries

For the minimaps I used the Angular Google Maps library: [https://github.com/SebastianM/angular-google-maps](https://github.com/SebastianM/angular-google-maps).

As previously mentioned, I also used the Angular Material for UI components: [https://github.com/angular/components](https://github.com/angular/components).

  

### Assets

No assets were used for this project.

  

  

## TODO's

Some features I believe it could bring more added value to the project:

  

-  **Router implementation**: add query parameters to mimic the state of the page. This way the page could be shared to others. The routing module already exists, but requires to be configured;

-  **Redux state management**: Add a store for proper management of events within the application. For these requirements it is excessive, but for project scalability sake, it would make more sense in the long-run;

-  **Create an API backend server**: Ease the performance on the client side, by creating a backend api. This way it will leverage the logic and processing for the client;

-  **Improve API requests**: Make it more efficient, provided there is no backend API. For example if 'All' magnitudes is selected and later changed to another value, avoid making an additional HTTP request;

- **Improve design**: a more appealing design for a better look and feel of the application.