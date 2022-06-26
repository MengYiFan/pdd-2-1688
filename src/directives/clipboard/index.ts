import type { ObjectDirective, DirectiveBinding } from 'vue'
import Factory from './factory.tsx'

const Clipboard: ObjectDirective = {
  mounted(el: ClipboardHTMLElement, binding: DirectiveBinding) {
    el.$_clipboard = new Factory(el, binding?.value?.text ?? 'Default Copy Value.')
  },
  unmounted(el: ClipboardHTMLElement) {
    el?.$_clipboard?.destroyClipboard?.()
  }
}

export default Clipboard