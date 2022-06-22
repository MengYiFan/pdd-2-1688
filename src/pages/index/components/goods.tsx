import { defineComponent, ref } from 'vue'
// import type { PropType } from 'vue'
import { ElCard, ElRow, ElCol, ElAvatar, ElDescriptions, ElDescriptionsItem } from 'element-plus'

export default defineComponent({
  props: {
    data: {
      type: Object,
      default: () => null
    }
  },

  setup(props) {
    const data: any = props.data
    const viewMore = ref(false)

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

        {
          viewMore.value ? 
            <ElDescriptions title="Sku List" size="large" column={3} direction="vertical" border={true}>
              {
                data.sku_list.map((sku: any) => {
                  return (
                    <div>
                      <ElDescriptionsItem label="ID">{ sku.skuId }</ElDescriptionsItem>
                      <ElDescriptionsItem label="名字" span={2}>{ sku.spec }</ElDescriptionsItem>
                      <ElDescriptionsItem label="活动价">{ (sku.activityGroupPrice / 100).toFixed(2) }</ElDescriptionsItem>
                      <ElDescriptionsItem label="拼单价">{ (sku.groupPrice / 100).toFixed(2) }</ElDescriptionsItem>
                      <ElDescriptionsItem label="单买价">{ (sku.normalPrice / 100).toFixed(2) }</ElDescriptionsItem>
                    </div>
                  )
                })
              }
            </ElDescriptions> : ''
        }
        
        <div 
          style={{
            margin: '4px 0',
            fontSize: '11px',
            textAlign: 'center',
            color: '#d6d6d6'
          }} 
          onClick={
            () => { viewMore.value = !viewMore.value }
          }
        >
          { viewMore.value ? '收起' : '展开'  } Skus
        </div>
      </ElCard>
    )
  }
})