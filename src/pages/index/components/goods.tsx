import { defineComponent } from 'vue'
// import type { PropType } from 'vue'
import { ElCard, ElRow, ElCol, ElAvatar } from 'element-plus'

export default defineComponent({
  props: {
    data: {
      type: Object,
      default: () => null
    }
  },

  setup(props) {
    const data: any = props.data

    if (!data) return 

    return () => (
      <ElCard class="goods-container c-content-box">
        <ElRow class="c-spacing-bottom" gutter={20}>
          <ElCol span={ 6 } class="c-title c-text-center">
            <ElAvatar size={60} src="https://empty">
              <img src={ data.hd_thumb_url } />
            </ElAvatar>
          </ElCol>
          <ElCol span={ 18 }>
            { data.id }
            <br />
            <span class="c-text-ellipsis">
              { data.goods_name }
            </span>
            <div 
              class="c-title"
              style={{
                fontSize: '12px',
              }}
            >
              { data.out_goods_sn }
            </div>
          </ElCol>
        </ElRow>

        <ElRow class="c-spacing-bottom" gutter={20}>
          <ElCol span={ 6 } class="c-title c-text-center">品牌</ElCol>
          <ElCol span={ 18 }>
            { data.brand_name }
          </ElCol>
        </ElRow>
      </ElCard>
    )
  }
})