import { ElIcon, ElMessage } from 'element-plus'
import { DocumentCopy } from '@element-plus/icons-vue'
import { createApp } from 'vue'
import type { App } from 'vue'
import ClipboardJS from 'clipboard'

export default class Clipboard {
  clipboardVm: App<Element>
  clipboardInstance: any

  constructor(hostEle: HTMLElement, text: string) {
    const label = document.createElement('label')
    Object.assign(label.style, {
      marginLeft: '6px',
      verticalAlign: 'text-top',
      cursor: 'pointer',
      zIndex: '99'
    })
    
    const clipboardVm: App<Element> = this.createComponent(text)
    clipboardVm.mount(label)
    this.clipboardVm = clipboardVm

    hostEle?.appendChild?.(label) 
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