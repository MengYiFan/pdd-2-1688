type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T
}

interface ClipboardHTMLElement extends HTMLElement {
  $_clipboard?: any
}