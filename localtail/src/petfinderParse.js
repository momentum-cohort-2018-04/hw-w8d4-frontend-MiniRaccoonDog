import showdown from 'showdown'

function petfinderParse (array) {
  const final = array.map(array => {
    console.log(array)
    const converter = new showdown.Converter()
    // {encoding: 'UTF8'}
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
    console.log('array.description', array.description['$t'])
    const betterDesc = array.description['$t'] ? array.description['$t'].replace((/\\n\\n/g), `\n`) : ''
    console.log('replace', betterDesc)
    const markdownDesc = converter.makeHtml(betterDesc)
    // const markdownDesc = converter.makeHtml(array.description['$t']) ? converter.makeHtml(array.description['$t']) : ''
    const middescription = markdownDesc.replace((/â/g), `'`)
    const description = middescription.replace((/Â/g), '')
    console.log('description', description)
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

export default petfinderParse
