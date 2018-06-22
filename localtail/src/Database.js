import firebase from './firebase'

class Database {
  constructor () {
    this.db = firebase.database()
  }

  getPets (zip) {
    const ref = this.db.ref('/pets').orderByChild('zip')
    if (zip === '') {
      return (
        ref.once('value').then(snapshot => {
          let categories = snapshot.val()
          let data = Object.keys(categories).map(key => {
            const category = categories[key]
            return {id: key, ...category}
          })
          return data
        })
      )
    } else {
      return (
        this.db.ref('/pets').orderByChild('zip').equalTo(zip).once('value').then(snapshot => {
          let categories = snapshot.val()
          let data = Object.keys(categories).map(key => {
            const category = categories[key]
            return {id: key, ...category}
          })
          return data
        })
      )
    }
  }

  getUser (uid) {
    return (
      this.db.ref('/users/' + uid)
        .once('value')
        .then(snapshot => {
          const data = snapshot.val()
          console.log('user Fav data', data)
          if (data) {
            const favoriteArray = data.favorites.split(';')
            console.log(favoriteArray)
            return favoriteArray
          } else { return [] }
        })
    )
  }

  writeUser (uid, body, zip) {
    var postData = {
      favorites: body,
      zipcode: zip
    }
    var updates = {}
    updates['/users/' + uid] = postData
    return this.db.ref().update(updates)
  }
}

export default Database
