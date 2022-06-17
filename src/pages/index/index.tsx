import { defineComponent, ref, watch } from 'vue'
import { ElInput } from 'element-plus'
import { Search as searchIcon } from '@element-plus/icons-vue'
import './index.scss'
import { data as data1688 } from '../../data/1688.chen.json'
import Fuse from 'fuse.js'

export default defineComponent({
  setup() {
    const matchScore = 0.3
    // https://fusejs.io/api/options.html
    const fuse = new Fuse(data1688.slice(2), {
      minMatchCharLength: 2,
      includeScore: true,
      includeMatches: true,
      keys: ['bar_code', 'brand_name', 'goods_name']
    })

    const searchValue = ref('')

    watch(searchValue, (next) => {
      let result = fuse.search(next)

      result = result.reduce((acc, curr) => {
        const { score = 1, matches = [], item } = curr

        if (matchScore > score) {
          matches.forEach(match => {
            const { key, indices } = match
            let highlightList = String(item[key]).split('')
            indices.forEach(indice => {
              const [start, end] = indice

              const startStr = highlightList.splice(start, 1)
              highlightList.splice(start, 0, `<span class="highlight">${ startStr }`)
              const endStr = highlightList.splice(end, 1)
              highlightList.splice(end, 0, `${ endStr }</span>`)
            })

            item[key] = highlightList.join()
          })

          return [
            ...acc,
            item
          ]
        }

        return acc
      }, [])

      console.log(result)
    })

    return () => (
      <div class="index-container">
        <ElInput 
          v-model={searchValue.value}
          class="search-input"
          size="large"
          placeholder="Please Input"
          suffix-icon={searchIcon}
        />
      </div>
    )
  }
})