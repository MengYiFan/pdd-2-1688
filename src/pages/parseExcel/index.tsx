import { defineComponent } from 'vue'
import { ElButton, ElMessage } from 'element-plus'
import './index.scss'

export default defineComponent({
  setup() {
    const onFileChange = async (event: Event): Promise<void> => {
      const file: File | null = (event.target as HTMLInputElement).files?.[0] ?? null

      if (!file) {
        return
      }

      const XLSX = await import('xlsx')
      const reader: FileReader = new FileReader()

      reader.onload = (evt: ProgressEvent<FileReader>): void => {
        let workbook = XLSX.read((evt.target as FileReader).result, {
          type: 'binary'
        })

        let sheetData = workbook.SheetNames.map((sheetName: string): any => {
          let ws = workbook.Sheets[sheetName],
              data: Array<Array<string>> = XLSX.utils.sheet_to_json(ws, {
                header: 1,
                defval: '-',
                raw: true,
                rawNumbers: true
              })

          console.log('Raw data: ', ws)
          
          return {
            sheetName,
            data: data.filter((item: string[]) => !item.every((v) => v === ''))
          }
        })

        console.log('Sheet data: ', sheetData)

        ElMessage({
          message: `<pre>${ JSON.stringify(sheetData, null, 2) }</pre>`,
          dangerouslyUseHTMLString: true,
          duration: 1000,
          showClose: true
        })
      }

      reader.readAsBinaryString(file)
    }

    return () => (
      <div class="parse-excel-container">
        <ElButton type="info" style={{ backgroundColor: '#232323' }} >
          <label for="input-file" style={{ cursor: 'pointer' }}>
            上传 Excel 解析
          </label>
        </ElButton>
        
        <input
          id="input-file"
          type="file"
          style={{
            display: 'none'
          }}
          onChange={onFileChange}
        />
      </div>
    )
  }
})