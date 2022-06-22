import { defineComponent, ref, watch, reactive } from 'vue'
import { ElBacktop, ElInput, ElTable, ElTableColumn, ElIcon, ElNotification, vLoading } from 'element-plus'
import { Search as searchIcon, InfoFilled } from '@element-plus/icons-vue'
import './index.scss'

import { data as data1688 } from '../../data/czm_1688.json'
import { goods_list as pddGoodsList } from '../../data/pdd_goods_list.json'
import Fuse from 'fuse.js'
import _ from 'lodash'

import Goods from './components/goods'

const MATCH_SCORE = 0.75
const MAX_MATCH_LENGTH = 25

const handleShowGoodsDesc = ({ goods_desc }: { goods_desc: string }) => {
  ElNotification({
    title: '描述',
    message: goods_desc,
    duration: 2000
  })
}

const fmtResult = (result: Array<any>) => {
  let amount = 0
  result = _.cloneDeep(result)
  return result.reduce((acc, curr) => {
    const { score = 1, matches = [], item } = curr

    if (MATCH_SCORE > score && amount < MAX_MATCH_LENGTH) {
      amount++

      matches.forEach((match: any) => {
        const { key, indices } = match
        let highlightList = String(item[key]).split('')

        indices.forEach((indice: Array<number>) => {
          const [start, end] = indice

          highlightList[start] = `<span class="c-highlight">${ highlightList[start] }`
          highlightList[end] = `${ highlightList[end] }</span>`
        })

        item[key] = highlightList.join('')
      })

      return [
        ...acc,
        item
      ]
    }

    return acc
  }, [])
}

export default defineComponent({
  directives: {
    loading: vLoading
  },
  setup() {
    // https://fusejs.io/api/options.html
    const fuse1688 = new Fuse(data1688.slice(2), {
      minMatchCharLength: 2,
      includeScore: true,
      includeMatches: true,
      keys: ['bar_code', 'brand_name', 'goods_name']
    })

    let info: any = reactive({
      currGoodsData: null,
      list: [],
      effectiveSearchVal: ''
    })
    let isInited = ref(false)
    const loading = ref(false)

    const searchValue = ref('')

    watch(searchValue, (next) => {
      const fn = _.debounce(function () {
        loading.value = true
        if (!next) {
          info.currGoodsData = null
          info.list = []
          loading.value = false

          return
        }

        let effectiveSearchVal = next
        const currGoodsData = pddGoodsList.find(goods => String(goods.id) === next || goods.goods_name.indexOf(next) !== -1)
        info.currGoodsData = currGoodsData || null
        
        if (currGoodsData?.out_goods_sn) {
          effectiveSearchVal = currGoodsData.out_goods_sn
        }

        info.effectiveSearchVal = effectiveSearchVal
        info.list = fmtResult(fuse1688.search(effectiveSearchVal))

        if (!isInited.value) {
          isInited.value = isInited.value || !!info.currGoodsData || info.list.length
        }

        setTimeout(() => {
          loading.value = false
        }, 360)
      }, 800)

      fn()
    })

    return () => (
      <div class="index-container" style={{ paddingBottom: '28px' }}>
        <ElBacktop right={20} bottom={36} target={`.index-container`} />

        <ElInput 
          v-model={ searchValue.value }
          class={ `search-input c-content-box c-horizontal-position-center${ isInited.value ? ' is-inited' : '' }` }
          size="large"
          clearable
          placeholder="Please Input"
          suffix-icon={ searchIcon }
        />
        
        { 
          info.effectiveSearchVal ? 
          <div 
            style={{ 
              position: 'fixed',
              bottom: 0,
              left: 0,
              width: '100vw',
              padding: '4px',
              borderTop: '1px solid #f0f0f0',
              backgroundColor: 'rgba(255, 255, 255, .5)',
              fontSize: '12px',
              textAlign: 'center',
              zIndex: 999
            }}
          >
            <span class="c-title">搜索生效词: </span>{ info.effectiveSearchVal }</div> : 
          '' 
        }
        
        <div v-loading={ loading.value }>
          { 
            info.currGoodsData ? 
            <Goods 
              class="c-spacing-bottom" 
              style={{
                position: 'sticky',
                top: '-20px',
                zIndex: 999
              }}
              data={ info.currGoodsData } 
            /> : 
            '' 
          }
          
          {
            info.list.length ? 
            <ElTable class="c-content-box" data={ info.list }>
              <ElTableColumn 
                width="120"
                label="条码"
                v-slots={{
                  default: (scope: any) => {
                    return (
                      <div v-html={ scope.row.bar_code }></div>
                    )
                  }
                }}
              />

              <ElTableColumn width="70" label="Cost" prop="cost_price"></ElTableColumn>
              <ElTableColumn width="70" label="Selling" prop="selling_price"></ElTableColumn>

              <ElTableColumn 
                width="120"
                label="商品名称"
                v-slots={{
                  default: (scope: any) => {
                    return (
                      <a target="_blank" href={ scope.row.link_1688 }>
                        <label v-html={ scope.row.goods_name }></label>
                      </a>
                    )
                  }
                }}
              />

              <ElTableColumn width="100" label="Row index" prop="row_index"></ElTableColumn>

              <ElTableColumn 
                width="120"
                label="商品描述"
                v-slots={{
                  default: (scope: any) => {
                    if (!scope.row.goods_desc) {
                      return '-'
                    }

                    return (
                      <div class="c-vertical-center">
                        Desc 
                        <ElIcon onClick={() => { handleShowGoodsDesc(scope.row) }}><InfoFilled /></ElIcon>
                      </div>
                    )
                  }
                }}
              />

              <ElTableColumn 
                label="品牌"
                v-slots={{
                  default: (scope: any) => {
                    return (
                      <div v-html={ scope.row.brand_name }></div>
                    )
                  }
                }}
              />
              
              <ElTableColumn 
                label="网盘地址"
                v-slots={{
                  default: (scope: any) => {
                    return (
                      <a target="_blank" href={ scope.row.network_disk }>网盘地址</a>
                    )
                  }
                }}
              />
            </ElTable> : 
            ''
          }
        </div>
        
      </div>
    )
  }
})