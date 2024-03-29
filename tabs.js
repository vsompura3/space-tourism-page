const tabLists = document.querySelector('[role="tablist"]')
const tabs = document.querySelectorAll('[role="tab"]')

tabLists.addEventListener('keydown', changeTabFocus)

tabs.forEach(tab => tab.addEventListener('click', changeTabPanel))

let tabFocus = 0
function changeTabFocus(e) {
  const keydownLeft = 37
  const keydownRight = 39

  if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
    tabs[tabFocus].setAttribute('tabIndex', -1)

    if (e.keyCode === keydownRight) {
      tabFocus++
      if (tabFocus >= tabs.length) {
        tabFocus = 0
      }
    } else if (e.keyCode === keydownLeft) {
      tabFocus--
      if (tabFocus < 0) {
        tabFocus = tabs.length - 1
      }
    }

    tabs[tabFocus].setAttribute('tabIndex', 0)
    tabs[tabFocus].focus()
  }
}

function changeTabPanel(e) {
  const targetTab = e.target
  const targetPanel = targetTab.getAttribute('aria-controls')
  const targetImage = targetTab.getAttribute('data-image')
  const tabContainer = targetTab.parentNode
  const mainContainer = tabContainer.closest('#main')

  tabContainer
    .querySelector('[aria-selected="true"]')
    .setAttribute('aria-selected', false)

  targetTab.setAttribute('aria-selected', true)

  hideContent(mainContainer, '[role="tabpanel"]')
  hideContent(mainContainer, 'picture')

  showContent(mainContainer, targetPanel)
  showContent(mainContainer, targetImage)
}

function hideContent(parent, content) {
  parent
    .querySelectorAll(content)
    .forEach(item => item.setAttribute('hidden', true))
}

function showContent(parent, content) {
  parent.querySelector([`#${content}`]).removeAttribute('hidden')
}
