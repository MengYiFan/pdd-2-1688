import { defineComponent, ref } from 'vue'

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
                raw: true
              })

          console.log(11, data)
          return {
            sheetName,
            data: data.filter((item: string[]) => !item.every((v) => v === ''))
          }
        })

        console.log(sheetData)
      }

      reader.readAsBinaryString(file)
    }

    return () => (
      <div class="index-container">
        <input
          type="file"
          onChange={onFileChange}
        ></input>
      </div>
    )
  }
})