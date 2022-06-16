import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const onFileChange = async (event: Event): Promise<void> => {
      const file: File | null = event?.target?.files?.[0] ?? null

      if (!file) {
        return
      }

      const XLSX = await import('xlsx')
      const reader: FileReader = new FileReader()

      reader.onload = (evt: Event): void => {
        let workbook = XLSX.read(evt.target.result, {
          type: 'binary'
        })

        let sheetData = workbook.SheetNames.map((sheetName) => {
          let ws = workbook.Sheets[sheetName],
            data = XLSX.utils.sheet_to_json(ws, {
              header: 1,
              defval: '-'
            })

          return {
            sheetName,
            data: data.filter((item) => !item.every((v) => v === ''))
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