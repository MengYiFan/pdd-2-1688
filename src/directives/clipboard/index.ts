import type { ObjectDirective, DirectiveBinding } from 'vue'
import Factory from './factory'
import _ from 'lodash'

const Clipboard: ObjectDirective = {
  mounted(el: ClipboardHTMLElement, binding: DirectiveBinding) {
    const {
      text = '',
      location = 'backend',
      format = null
    } = _.get(binding, 'value', {})
    el.$_clipboard = new Factory(el, {
      text,
      location,
      format
    })
  },
  unmounted(el: ClipboardHTMLElement) {
    el?.$_clipboard?.destroyClipboard?.()
  }
}

export default Clipboard