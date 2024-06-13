const CONTENT_TYPE = {
  POST: 'post',
  QUESTION: 'question',
  IDEA: 'ideation',
  WIKI: 'wiki',
  SURVEY: 'survey',
  MEDIA: 'media'
}


const MEDIA_URI = [
  "swym:Picture",
  "swym:AnimatedPicture",
  "swym:Document",
  "swym:Sound",
  "swym:Video",
  "swym:3dModel",
  "swym:Drawing",
  "swym:SimulationMedia",
]

export const CONTENT_TYPE_URI = {
  'swym:Post': 'post',
  'swym:Question': 'question',
  'swym:Idea': 'ideation',
  'swym:WikitreePage': 'wiki',
  'swym:Survey': 'survey',
  'swym:Picture': 'media'
}


export function isDerivedType(type) {
  switch (type) {
    case 'post':
    case 'ideation':
    case 'question':
    case 'wiki':
    case 'survey':
    case 'media':
      return false;
    default:
      return true;
  }
}

export function preconditionTemplate(type) {
  return `[ds6w:type]:"swym:${type}"`
}

export function preconditionTemplateByUri(uri) {
  return `[ds6w:type]:"${uri}"`
}

export function getMediaSearchPrecondition() {
  let precondition = ''

  MEDIA_URI.forEach((mediaUri, index) => {
    precondition += `(${preconditionTemplateByUri(mediaUri)})`

    if (index < MEDIA_URI.length - 1) {
      precondition += " OR "
    }

  })

  return precondition;
}

export function getSearchPrecondition(type) {
  let precondition = ''
  switch (type) {
    case 'post':
      precondition = preconditionTemplate('Post')
      break;
    case 'media':
      precondition = getMediaSearchPrecondition()
      break;
    case 'question':
      precondition = preconditionTemplate('Question');
      break;
    case 'ideation':
      precondition = preconditionTemplate('Idea');
      break;
    case 'wiki':
      precondition = preconditionTemplate('WikitreePage');
      break;
    default:
      precondition = preconditionTemplate('Post');
  }

  return `(${precondition})`
}

