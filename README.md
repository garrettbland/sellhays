# sellhays

### Project setup
1. Clone this repo and cd into it
2. `yarn install`
3. Create two environment files with `VUE_APP_ENVIRONMENT=` as the only content.
  1.`.env`
  2.`production.env`
4. `yarn serve` (for development)
5. `yarn deploy` (deploys to live firebase hosting. ONLY deploy from master.)


### To Do for v1.0
- [x] Setup global loading indicator in vuex
- [x] Setup popups or modals for alerts
- [x] Setup deleting sale along with images in storage
- [x] ~~Setup limited tag list & limit tags~~
- [ ] Setup error logging
- [ ] Setup simple breadcrumb navigation? 
- [ ] Setup date picker
- [ ] Setup image compression
- [ ] Setup form validation and sanitization
- [x] Add in Google Maps auto complete and places API
- [x] Add trix editor to description for rich text editing
- [ ] ~~Create whole app loading indicator~~
- [x] Create empty list component
- [x] Tighten down permissions server/firebase side
- [x] Make mobile friendly
- [ ] Make the whole thing look super polished 😎

### To Do for v2.0
- [ ] Setup sale editing
- [ ] Setup image compression, up limit maybe, and add in thumbnails for faster home loading
- [ ] Setup home page sale preview images loading indicator
- [ ] Setup max images to 5 or 10? (Currently 3)
- [ ] Setup sale tracking & metrics for users
- [ ] Setup logging for errors so we can track
- [ ] Customize trix buttons and editor to match 
- [ ] Setup pagination
- [ ] Setup admin dashboard
- [ ] Setup image drag and drop
- [ ] Setup image & tags with drag to reorder
- [ ] Setup accounts to save/use previously used addresses

### Firestore Rules Backup
```
service cloud.firestore {
  match /databases/{database}/documents {
  
    // Match any document in the 'sales' collection
    match /sales/{sale} {
      allow create: if request.auth.uid != null;
      allow read;
      allow update: if resource.data.uid == request.auth.uid;
      allow delete: if resource.data.uid == request.auth.uid;
    }

  }
}

```

### Firebase Storage Rules Backup
```
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

#### Google Maps Stuff

As of March 20th, I am using a personal google maps api key - garrett
Using this package, https://github.com/xkjyeah/vue-google-maps
To create the bounding box, go here -> https://www.latlong.net/
and then get the points according to this crazyness -> https://developers.google.com/maps/documentation/javascript/reference/coordinates#LatLngBoundsLiteral

```
<GmapMarker
  :key="index"
  v-for="(m, index) in markers"
  :position="m"
  :clickable="true"
  :draggable="true"
  @click="center=m"
/>
```