import firebase from './firebase'

class Database {
  constructor () {
    this.db = firebase.database()
  }

  getPets (zip) {
    console.log('Zip', zip)
    const ref = this.db.ref('/pets').orderByChild('zip')
    if (zip === '') {
      return (
        ref.once('value').then(snapshot => {
          // console.log('snapshot.val()', snapshot.val())
          let categories = snapshot.val()
          let data = Object.keys(categories).map(key => {
            const category = categories[key]
            return {id: key, ...category}
          })
          console.log('data', data)
          return data
        })

      )
    } else {
      console.log('else ran', zip, typeof (zip))
      return (
        this.db.ref('/pets').orderByChild('zip').equalTo(zip).once('value').then(snapshot => {
          console.log('snapshot.val()', snapshot.val())
          let categories = snapshot.val()
          let data = Object.keys(categories).map(key => {
            const category = categories[key]
            return {id: key, ...category}
          })
          console.log('data', data)
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
