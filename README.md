# Melapix

## Description
Melapix is your go-to online source for high-style, high resolution stock photo images featuring people of color. It is a celebration of the beauty and majesty of people who perhaps have not (often enough) seen themselves portrayed in such fashion.

Standard users of this application are able to search, view and save images to their collection for later usage.

Users with a seller (photographer) account are able to view, edit and delete thier images, as well as see data displaying their images that have been saved by other users.

## Live Demo
Check it out here: [Melapix](https://aw-melapix.firebaseapp.com)

## Technologies Used
- React 16
- React Router Dom
- React-Bootstrap (Bootstrap 3)
- HTML
- JavaScript/JSX
- Sass
- Firebase
- Photoshop CC

## Screenshots

### Standard User Screenshots:
Home Screen
![Webpage](https://raw.githubusercontent.com/aprilrochelle/melapix/master/screens/melapixHome.png)

____

User login with link to Registration page
![Webpage](https://raw.githubusercontent.com/aprilrochelle/melapix/master/screens/melapixLogin.png)

____

As the user types, images are filtered to display only those containing the search term in either the title or description
![Webpage](https://raw.githubusercontent.com/aprilrochelle/melapix/master/screens/melapixSearch.png)

____

Upon standard user login, user is redirected to Shop Photos, where (s)he can view and search all photos in the database
![Webpage](https://raw.githubusercontent.com/aprilrochelle/melapix/master/screens/melapixAllPics.png)

____

If the user has saved no images, My Collection page displays a message
![Webpage](https://raw.githubusercontent.com/aprilrochelle/melapix/master/screens/melapixNoSaved.png)

____

Once user has saved images, My Collection page shows all photos that have been saved
![Webpage](https://raw.githubusercontent.com/aprilrochelle/melapix/master/screens/melapixUserPics.png)

____

When user clicks on an image in his/her collection, (s)he can view a larger version of the image along with image details
![Webpage](https://raw.githubusercontent.com/aprilrochelle/melapix/master/screens/melapixSingleImg.png)

____

### Seller Account Screenshots:
Upon seller login, user is redirected to Dashboard, where (s)he can view a bar chart detailing user download information
![Webpage](https://raw.githubusercontent.com/aprilrochelle/melapix/master/screens/melapixDash.png)

____

If no users have saved the seller's work, a message displays
![Webpage](https://raw.githubusercontent.com/aprilrochelle/melapix/master/screens/melapixNoFav.png)

____

My Work shows a complete list of all work belonging to the current seller
![Webpage](https://raw.githubusercontent.com/aprilrochelle/melapix/master/screens/melapixPhotogWork.png)

____

Seller is able to edit photo name and/or keywords using the Update Photo form
![Webpage](https://raw.githubusercontent.com/aprilrochelle/melapix/master/screens/melapixEditPhoto.png)

____

Once changes are saved, they are immediately reflected
![Webpage](https://raw.githubusercontent.com/aprilrochelle/melapix/master/screens/melapixPicUpdated.png)

## Plans for v2.0
- Allow sellers to upload photos
- Actual buying/selling of photos
- More detailed seller reports, including
  - Date of download (line chart)
  - Royalty calculations per pay cycle
- Allow standard users to filter/search photos by photographer ID and/or name

## How to Run
1. Clone down this repo and cd into project.
2. Get API keys by creating a new project at `firebase.com`.
3. Copy `src/constants.example.js` to `constants.js` and add in your FirebaseConfig data.
4. Setup Firebase database using seed data from `db/seedData.json`.
5.  Copy and paste the following database rules: `{
  "rules": {
    ".read": true,
    ".write": true,
      "myCollection": {
        ".indexOn": "uid"
      },
        "userAccounts": {
        ".indexOn": "uid"
      },
       "pics": {
        ".indexOn": "photogId"
      },
        "totals": {
        ".indexOn": "picId"
      }
  }
}`
4. In your terminal, run `npm install` in the root directory.
5. Type `npm start` to serve up locally.

## Contributors
[April Watson](https://github.com/aprilrochelle)

with special thanks to NSS front-end instructors:

[Zoë Ames](https://github.com/zoeames)

[Lauren Rouse](https://github.com/rousell) (Capstone Mentor)

[Callan Morrison](https://github.com/morecallan)
