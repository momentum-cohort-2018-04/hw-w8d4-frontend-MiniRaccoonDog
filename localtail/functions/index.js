const functions = require('firebase-functions')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!')
})

const admin = require('firebase-admin')
const showdown = require('showdown')
const request = require('superagent')

admin.initializeApp()

function petfinderParse (array) {
  // const set1 = new Set()
  const final = array.map(array => {
    console.log(array)
    const converter = new showdown.Converter()
    let photoObjs = []
    if (array.media.photos) {
      const pnPhotos = array.media.photos.photo.filter((entry) =>
        entry['@size'] === 'x')
      photoObjs = pnPhotos.map((entry) => {
        return ({
          'url': entry['$t'],
          'id': entry['@id']
        })
      })
    } else {
      photoObjs = [{
        'url': 'http://tradepending.com/wp-content/uploads/2015/03/placeholder.png',
        'id': 1}]
    }

    let breed = 'unknown'
    if (Array.isArray(array.breeds.breed)) {
      let mixed = []
      array.breeds.breed.map(breed => {
        return mixed.push(breed['$t'])
      })
      breed = mixed.join(', ')
    } else if (array.breeds.breed) {
      breed = array.breeds.breed['$t']
    }

    let zip = ' '
    if (array.contact.zip['$t']) {
      zip = array.contact.zip['$t']
    }
    // set1.add(zip)

    const betterdesc = array.description['$t'] ? array.description['$t'].replace((/(You MUST).*(AVAILABLE:)/g), '') : ''
    const markdownDesc = converter.makeHtml(betterdesc)

    // const markdownDesc = array.description['$t'] ? converter.makeHtml(array.description['$t']) : ''
    const middescription = markdownDesc.replace((/â/g), `'`)
    const description = middescription.replace((/Â/g), '')

    return ({
      'dog': {
        'contact': {
          'state': array.contact.state['$t'],
          'email': array.contact.email['$t'],
          'city': array.contact.city['$t']
        },
        'age': array.age['$t'],
        'size': array.size['$t'],
        'breed': breed,
        'name': array.name['$t'],
        'sex': array.sex['$t'],
        'id': array.id['$t'],
        'description': description,
        'shelterId': array.shelterId['$t'],
        'lastUpdate': array.lastUpdate['$t']
      },
      'photos': photoObjs,
      'zip': zip
    })
  })
  // console.log(set1)
  return final
}

exports.addDogs = functions.https.onRequest((httprequest, httpresponse) => {
  return request
    .get(`http://api.petfinder.com/pet.find?key=${functions.config().petfinder.key}&animal=dog&location=durham,NC&output=full&count=250&format=json`)
    .then((response) => {
      console.log(response.body)
      return response.body.petfinder.pets.pet
    })
    .then((result) => {
      return petfinderParse(result)
    })
    .then((parse) => {
      return admin.database().ref('/pets').update(parse)
    })
    .then(response => {
      console.log('writeDatabase success', response)
      return httpresponse.send('Pet Database Updated Successfully')
    })
    .catch(error => {
      console.log('writeDatabase error', error)
      return httpresponse.status(500).send(error)
    })
})
