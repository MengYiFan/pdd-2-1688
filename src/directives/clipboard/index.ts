import type { ObjectDirective, DirectiveBinding } from 'vue'
import Factory from './factory'

const Clipboard: ObjectDirective = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    new Factory(el, binding?.value?.text ?? 'Default Copy Value.')
  }
}

export default Clipboard