import './style.css'

const CLASS_PREFIX = 'g4b-'

const crossSvg = `
  <svg viewBox="0 0 12 16" version="1.1" width="12" height="16" fill="red">
    <path fill-rule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"></path>
  </svg>
`
const checkSvg = `
  <svg viewBox="0 0 12 16" version="1.1" width="12" height="16" fill="green">
    <path fill-rule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path>
  </svg>
`

const parallaxWrapper = document.querySelector('#parallax_wrapper')

const mapObject = (fn, object) =>
  Object.keys(object)
    .reduce(
      (result, key) => {
        result[key] = fn(key, object[key], object)
        return result
      },
      {}
    )

const findTypes = (labels, args) =>
  mapObject(
    (label, type) =>
      args.find(arg =>
        type === 'array'
          ? arg instanceof Array
          : typeof arg === type
      ),
    labels
  )

const el = (name, ...args) => {
  const { attributes = {}, children = [], text } =
    findTypes({ attributes: 'object', children: 'array', text: 'string' }, args)
  const node = document.createElement(name)
  Object.keys(attributes)
    .forEach((attributeName) => {
      const attributeValue = attributes[attributeName]
      if (attributeName === 'class') {
        const classes = attributeValue.split(' ')
        classes.forEach(classname =>
          node.setAttribute(attributeName, CLASS_PREFIX + classname)
        )
      } else {
        node.setAttribute(attributeName, attributeValue)
      }
    })
  children.forEach(child => node.appendChild(child))
  if (typeof text === 'string') {
    node.innerText = text
  }
  return node
}

const cross = el('span')
cross.innerHTML = crossSvg
const check = el('span')
check.innerHTML = checkSvg

const showOk = (segment, index, url) => {
  const segmentEl = document.querySelector(`[data-segment="${segment}-${index}"]`)
  if (segmentEl) {
    segmentEl.classList.add(CLASS_PREFIX + 'success')
    segmentEl.classList.remove(CLASS_PREFIX + 'loading')
    segmentEl.insertAdjacentElement('beforebegin', check.cloneNode(true))
    const text = segmentEl.innerText
    segmentEl.innerText = ''
    const a = el('a', { href: url }, text)
    segmentEl.appendChild(a)
  } else {
    console.error('Failed to find segment', segment, 'in the DOM')
  }
}

const showNotFound = (segment, index, isFirst) => {
  const segmentEl = document.querySelector(`[data-segment="${segment}-${index}"]`)
  if (segmentEl) {
    segmentEl.classList.remove(CLASS_PREFIX + 'loading')
    if (isFirst) {
      segmentEl.classList.add(CLASS_PREFIX + 'not-found')
      segmentEl.insertAdjacentElement('beforebegin', cross.cloneNode(true))
    } else {
      segmentEl.classList.add(CLASS_PREFIX + 'after-not-found')
    }
  } else {
    console.error('Failed to find segment', segment, 'in the DOM')
  }
}

const showNotFounds = (segments, offsetIndex) =>
  segments.forEach((segment, index) =>
    showNotFound(segment, index + offsetIndex, index === 0)
  )

// START

if (parallaxWrapper) {
  const segments =
    window.location.pathname.split('/').filter(segment => segment !== '')
  // Show the URL on the page
  const container = el('div', { class: 'container' })
  container.appendChild(el('span', { class: 'domain' }, 'github.com'))
  segments
    .forEach((segment, index) => {
      container.appendChild(el('span', { class: 'slash' }, '/'))
      container.appendChild(
        el(
          'span',
          { class: 'segment loading', 'data-segment': segment + '-' + index },
          segment
        )
      )
    })
  parallaxWrapper.insertAdjacentElement('afterend', container)

  // Figure out when the URL 404'd
  segments.reduce((previous, segment, index) => {
    return previous.then(previousUrl => {
      const url = previousUrl + '/' + segment
      // Github will 404 on /:user/:repo/tree and /:user/:repo/blob, even though
      // /:user/:repo/tree/... and /:user/:repo/blob/... are OK. We can
      // automatically pass 'tree' or 'blob' at index 2 if they have something
      // following them
      if (
        (segment === 'tree' || segment === 'blob')
          && index === 2
          && segments.length > 3
      ) {
        showOk(segment, index, url)
        return url
      }
      // Perform a GET request on the current URL (that's all previous segments
      // plus the current segment)
      return fetch(url)
        .then(res => {
          // Request was OK, we know the URL is OK up to this point
          if (res.ok) {
            showOk(segment, index, url)
            return url
          // Request 404'd here
          } else if (res.status === 404) {
            // Maybe the URL is OK when 'blob' is replaced with 'tree'
            if (segments[2] === 'blob') {
              const treeUrl =
                'https://github.com/'
                  + segments
                    .slice(0, 2)
                    .concat(['tree', ...segments.slice(3, index + 1)])
                    .join('/')
              return fetch(treeUrl)
                .then(res2 => {
                  // Yep, this is a tree
                  if (res2.ok) {
                    console.log('Ok with tree:', segment)
                    showOk(segment, index, treeUrl)
                    return url
                  // Not a tree, mark everything else as 404
                  } else {
                    // TODO this logic is duplicated below
                    showNotFounds(segments.slice(index), index)
                    return Promise.reject(new Error('got-not-found'))
                  }
                })
            // Not a blob so just mark everything else as 404
            } else {
              showNotFounds(segments.slice(index), index)
              return Promise.reject(new Error('got-not-found'))
            }
          // Unexpected status code
          } else {
            const error = new Error('bad-status')
            error.status = res.status
            return Promise.reject(error)
          }
        })
    })
  }, Promise.resolve('https://github.com'))
    .catch(error => {
      if (error.message !== 'got-not-found') {
        console.error('Unexpected error:', error)
      }
    })
}
