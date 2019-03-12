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
- [ ] Setup limited tag list & limit tags
- [ ] Setup simple breadcrumb navigation? 
- [ ] Setup date picker
- [ ] Setup image compression and image limit to 10
- [ ] Add trix editor to description for bold/italics
- [ ] Create whole app loading indicator
- [ ] Create empty list component
- [x] Tighten down permissions server/firebase side
- [ ] Make the whole thing look super polished 😎

### To Do for v2.0
- [ ] Setup sale editing
- [ ] Setup sale tracking & metrics for users
- [ ] Setup logging for errors so we can track
- [ ] Setup pagination 
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