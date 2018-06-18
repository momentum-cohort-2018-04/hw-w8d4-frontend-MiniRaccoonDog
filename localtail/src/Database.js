import firebase from './firebase'
import request from 'superagent'

class Database {
  constructor () {
    this.db = firebase.database()
  }

  getPets () {
    return this.db.ref('/pets').once('value').then(snapshot => {
      console.log('snapshot.val()', snapshot.val())
      let categories = snapshot.val()
      let data = Object.keys(categories).map(key => {
        const category = categories[key]
        return {id: key, ...category}
      })
      console.log('data', data)
      return data
    })
  }
  writeDatabase (val) {
    this.db.ref('/pets').set(val)
      .then(response =>
        console.log('writeDatabase success', response))
      .catch(error =>
        console.log('writeDatabase error', error))
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

  writeUser (uid, body) {
    var postData = {
      favorites: body
    }
    var updates = {}
    updates['/users/' + uid] = postData
    return this.db.ref().update(updates)
  }

  getZipDist (me, dog) {
    request
      .get(`https://www.zipcodeapi.com/rest/u74XfDvV0jHsVS9DF8xQOG2Tm2NPSlLSkUCUi85XQ2H9ra2sZVrrv5OrfESgUgWP/
        distance.json/${me}/${dog}/mile`)
      .then((response) => {
        console.log(`zip response`, response)
      })
  }
}

export default Database
