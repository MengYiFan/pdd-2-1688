import { defineComponent, ref } from 'vue'
import { ElInput } from 'element-plus'
import { Search as searchIcon } from '@element-plus/icons-vue'
import './index.scss'

export default defineComponent({
  setup() {
    const searchValue = ref('')

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