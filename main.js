
const $main = document.querySelector('main')
const $article = $main.querySelector('article')
const $next = $main.querySelector('.next')
const $prev = $main.querySelector('.prev')


function setTale(text) {
  const $oldP = $article.querySelector('p')

  const $newP = document.createElement('p')
  $newP.innerHTML = text

  $article.replaceChild($newP, $oldP)
}


function setPrevNext(prevId, nextId) {
  $prev.href = prevId ? `#${prevId}` : 'javascript:void(0)'
  $next.href = nextId ? `#${nextId}` : 'javascript:void(0)'
}


function loadTale(id) {
  // - Fetch a tale
  // - Set page content
  // - Attempt to fetch next tale
  // - Set prev and next buttons

  return fetch(`/tales/${id}.md`)
    .then(response => response.text())
    .then(setTale)
    .then(_ => fetch(`/tales/${id + 1}.md`))
    .then(response => response.status)
    .then(status => setPrevNext(id - 1, status === 200 ? id + 1 : null))
}


function loadTaleFromHash() {
  const hash = location.hash.slice(1) || '1'

  const id = /^([0-9]+)$/.test(hash)
    ? Number(hash)
    : 1

  return loadTale(id)
}



window.addEventListener('hashchange', loadTaleFromHash)
loadTaleFromHash().then(_ => $main.style = "")
