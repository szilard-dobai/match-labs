# Week2 assignment

1. Create a new page called Library.
   This will be the page where we display all our likes and matches for a candidate.

2. In the Library page we will have to call our API endpoint in order to get the labs.
   API endpoint: https://match-labs-api.herokuapp.com/api/no_auth/labs

3. For each lab in the data, render a Card component with prop values being dynamic data from the API

4. On clicking on a card, you should be navigated to the /profile:id page, as we did in lesson2, but this time data should come from the API
   API endpoint: https://match-labs-api.herokuapp.com/api/no_auth/labs/:id

5. For both the Profile and the Library pages, while the data fetches from the API, display a <Loader> component that you will find in the Components folder.

6. EXTRA: implement a button or some sorts of toggle on the Library page that toggles between the user roles of our APP.
   When the toggle is pressed and the value of it is companies, you should display candidates, on next toggle, it should display labs.
   API endpoint for candidates: https://match-labs-api.herokuapp.com/api/no_auth/candidates (at the moment it displays only 1 message)

### Implementation details

##### Data Fetching:

- Add another layer that handles our API operations.
  You can add a new JS utility file which will be responsible only for fetch()-ing and preparing data for the component, so our component doesn't know about any implementation details of the fetching.

- use fetch() and async functions for fetching data


### Notes
- dupa multe cautari, am gasit o solutie folosind react hooks
- totul e (mai mult sau mai putin) functional, desi arata urat ca styling
- codul nu e cel mai frumos din lume, but it works :))