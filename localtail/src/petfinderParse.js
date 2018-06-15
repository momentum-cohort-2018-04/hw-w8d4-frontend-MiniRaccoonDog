import showdown from 'showdown'

function petfinderParse (array) {
  const final = array.map(array => {
    const converter = new showdown.Converter()
    // {encoding: 'UTF8'}
    const pnPhotos = array.media.photos.photo.filter((entry) =>
      entry['@size'] === 'pn')
    const photoObjs = pnPhotos.map((entry) => {
      return ({
        'url': entry['$t'],
        'id': entry['@id']
      })
    })

    // console.log('array', array)
    // str.replace(regexp|substr, newSubstr|function)
    const markdownDesc = converter.makeHtml(array.description['$t'])
    const description = markdownDesc.replace((/â/g), `'`)
    // console.log(description)
    return ({
      [array.id['$t']]: {
        'contact': {
          'state': array.contact.state['$t'],
          'email': array.contact.email['$t'],
          'city': array.contact.city['$t'],
          'zip': array.contact.zip['$t']
        },
        'age': array.age['$t'],
        'size': array.size['$t'],
        'breed': array.breeds.breed['$t'],
        'name': array.name['$t'],
        'sex': array.sex['$t'],
        'description': description,
        'shelterId': array.shelterId['$t'],
        'lastUpdate': array.lastUpdate['$t']
      },
      'photos': photoObjs
    })
  })

  var fs = require('fs')

  fs.writeFile('./object.json', JSON.stringify(final, null, 4), (err) => {
    if (err) {
      console.error(err)
      return
    };
    console.log('File has been created')
  })
}

export default petfinderParse
