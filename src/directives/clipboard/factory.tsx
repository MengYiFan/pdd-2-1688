import { ElIcon, ElMessage } from 'element-plus'
import { DocumentCopy } from '@element-plus/icons-vue'
import { createApp } from 'vue'
import type { App } from 'vue'
import ClipboardJS from 'clipboard'

enum Location {
  backend = 'backend',
  front = 'front'
}

interface clipboardParams {
  text: string,
  location: Location,
  format: null | Function
}

export default class Clipboard {
  clipboardVm: App<Element> | null = null
  clipboardInstance?: any

  constructor(hostEle: HTMLElement, { text, location = Location.backend, format = null }: clipboardParams) {
    if (!text.length) {
      console.log(`hostEle: ${hostEle}, Is an empty text`)
      return
    }
    const label = document.createElement('label')
    Object.assign(label.style, {
      verticalAlign: 'text-top',
      cursor: 'pointer',
      zIndex: '99'
    })

    if (format && '[object Function]' === toString.call(format)) {
      text = format(text)
    }

    const clipboardVm: App<Element> = this.createComponent(text)
    clipboardVm.mount(label)
    this.clipboardVm = clipboardVm

    if (location === Location.front) {
      label.style.marginRight = '6px'
      hostEle?.insertBefore?.(label, hostEle.children[0])
    } else {
      label.style.marginLeft = '6px'
      hostEle?.appendChild?.(label) 
    }
  }

  createComponent(text: string): App<Element> {
    const that = this
    return createApp({
      name: 'clipboardComponent',
      setup() {
        return () => (
          <label
            ref="copy"
            onClick={
              (evt: any) => {
                evt.preventDefault()
                evt.stopPropagation()
                that.clipboardInstance = Clipboard.copy(evt.currentTarget, text)
              }
            }
          >
            <ElIcon>
              <DocumentCopy />
            </ElIcon>
          </label>
        )
      },
      async mounted() {
        await this.$nextTick()
        // hack: 待确认为什么第一次点击不复制
        that.clipboardInstance = Clipboard.copy(this.$el, text, false)
      }
    })
  }

  destroyClipboard() {
    this.clipboardInstance?.destroy?.()
  }

  static copy(eleSelector: string | Element, text: string | number, displayMessage: boolean = true): Clipboard {
    let clipboard: any = new ClipboardJS(eleSelector, {
      text: () => {
        return String(text)
      }
    })

    displayMessage && ElMessage({
      message: '复制成功',
      type: 'success',
      duration: 1000,
      showClose: true
    })
  
    return clipboard
  }
}