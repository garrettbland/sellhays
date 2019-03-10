# sellhays

## Project setup
```
yarn install
```
```
yarn serve
```


### Commands
`yarn serve`
`yarn deploy-production`

### To Do for v1.0
- [ ] Setup alert messages or toasts

### Environment Variables
Create these two files below.

`.env`

`production.env`

 Add in the following to both files. At production build, production.env is used for the build.

`VUE_APP_ENVIRONMENT=`


### To Do for v1.0
- [x] Setup global loading indicator in vuex
- [ ] Setup popups or modals for alerts
- [ ] Setup limited tag list & limit tags
- [ ] Setup date picker
- [ ] Setup image compression and image limit to 10
- [ ] Add trix editor to description for bold/italics
- [ ] Create whole app loading indicator
- [ ] Create empty list component
- [ ] Tighten down permissions server side
- [ ] Make the whole thing look super polished 😎

### To Do for v2.0
- [ ] Setup sale editing
- [ ] Setup logging for errors so we can track
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