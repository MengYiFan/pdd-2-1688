import { ElIcon, ElMessage } from 'element-plus'
import { DocumentCopy } from '@element-plus/icons-vue'
import { createApp, onUnmounted } from 'vue'
import ClipboardJS from 'clipboard'

export default class Clipboard {
  clipboardVm: any;
  constructor(hostEle: HTMLElement, text: string) {
    const span = document.createElement('span')
    Object.assign(span.style, {
      marginLeft: '4px',
      verticalAlign: 'text-top',
      cursor: 'pointer',
      zIndex: '99'
    })
    span.style.cursor = 'pointer'
    span.style.zIndex = '99'
    
    const clipboardVm = this.createComponent(text)
    clipboardVm.mount(span)
    this.clipboardVm = clipboardVm

    hostEle?.appendChild?.(span) 
  }

  createComponent(text: string) {
    return createApp({
      name: 'clipboardComponent',
      setup() {
        return () => (
          <label
            ref="copy"
            onClick={
              (evt: any) => {
                console.log('click event: ', evt)
                Clipboard.copy(evt.currentTarget, text)
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
        this.clipboard = Clipboard.copy(this.$el, text, false)
      },
      unmounted() {
        this.clipboard?.destroy?.()
      }
    })
  }

  static copy(eleSelector: string, text: string | number, displayMessage: boolean = true) {
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