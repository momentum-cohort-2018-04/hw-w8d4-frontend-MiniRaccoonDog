const functions = require('firebase-functions')
const admin = require('firebase-admin')
const showdown = require('showdown')
const request = require('superagent')

admin.initializeApp()

function petfinderParse (array) {
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

    const markdownDesc = converter.makeHtml(array.description['$t'])
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
  return final
}

exports.addDogs = functions.https.onRequest((req, resp) => {
  request
    .get(`http://api.petfinder.com/pet.find?key=${functions.config().petfinder.key}&animal=dog&location=durham,NC&output=full&count=250&format=json`)
    .then((response) => {
      return response.petfindr.pets.pet
    })
    .then((result) => {
      return petfinderParse(result)
    })
    .then((parse) => {
      return admin.database().ref('/pets').update(parse)
    })
    .then(response =>
      console.log('writeDatabase success', response))
    .catch(error =>
      console.log('writeDatabase error', error))
})
