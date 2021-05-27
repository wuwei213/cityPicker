<template>
    <view class="city-picker">
        <view class="city-picker-view" @tap="togglePicker">
            <slot></slot>
        </view>
        <view :class="['city-picker-container',show ? 'show' : '']">
            <view class="city-picker-shadow" @click.stop="hideCityPicker"></view>
            <view class="city-picker-box">
                <view class="city-picker-header">
                    <view class="city-picker-cancel" @click.stop="hideCityPicker">取消</view>
                    <view class="city-picker-submit" @click.stop="submitCityPicker">确定</view>
                </view>
                <picker-view indicator-class="custom-picker" indicator-style="height: 40px;" style="width: 100%; height: 200px; line-height: 40px; text-align: center;" :value="value" @change="changeCityPicker">
                    <picker-view-column>
                        <view v-for="(item,index) in cityArr" :key="index">{{item.label}}</view>
                    </picker-view-column>
                    <picker-view-column>
                        <view v-for="(item,index) in citys" :key="index">{{item.label}}</view>
                    </picker-view-column>
                    <picker-view-column v-if="mode === 1">
                        <view v-for="(item,index) in areas" :key="index">{{item.label}}</view>
                    </picker-view-column>
                </picker-view>
            </view>
        </view>
    </view>
</template>

<script>
/**
 * v-tabs
 * 
 
 */
import CityList from "@/utils/common/city.js"
export default {
  props: {
    mode: {
      type: Number,
      default: 1
    },
    codes: {
      type: Array,
      default: []
    },
    childkey: {
      type: String,
      default: 'children'
    },
    idkey: {
      type: String,
      default: 'id'
    },
    namekey: {
      type: String,
      default: 'label'
    },
    data: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
        value: [0, 0, 0],
        citys: [],
        areas: [],
        show: false,
        cityArr:[],//城市树状数据
    }
  },
  watch: {
  
  },
  methods: {
        hasValue(list) {
            const { childkey } = this.$props
            return this.isUndefined(list[childkey]) ? [] : list[childkey]
        },

        hasIndex(index, list) {
            return this.isUndefined(list[index]) ? [] : this.hasValue(list[index])
        },

        key2Value(list, idx, key) {
            return this.isUndefined(list[idx]) ? '' : list[idx][key]
        },

        getCityCodeItem(list, id) {
            let i = 0
            while (i < list.length) {
                if (list[i].id == id) {
                    return {
                        item: list[i],
                        index: i
                    }
                }
                i++
            }
            return null
        },

        getCityItem(list, id) {
            const { childkey } = this.$props
            let result = this.getCityCodeItem(list, id)
            if (!result) return { item: list.length > 0 ? list[0] : [], index: 0 }
            return {
                item: this.isUndefined(result.item[childkey])
                ? []
                : result.item[childkey],
                index: result.index
            }
        },

        isUndefined(value) {
            return typeof value === 'undefined'
        },

        isEmpty(value) {
            if (Array.isArray(value) && value.length === 0) return true
            return this.isUndefined(value) || /^\s*$/.test(value)
        },

        // 初始化选择器信息
        togglePicker() {
            let { value, show, cityArr } = this.$data
            let {mode,codes}=this.$props
            
            if (show) return this.show= !show 
         
            if (mode === 2) value.length = 2

            let citys = []
            let areas = []
            if (this.isEmpty(codes)) {
                value = new Array(mode === 2 ? 2 : 3).fill(0)
                citys = this.hasIndex(0, cityArr)
                areas = mode == 1 ? this.hasIndex(0, citys) : []
            } else {
                const currentProvince = this.getCityItem(cityArr, codes[0])
                citys = currentProvince.item
                const currentCity = this.getCityItem(citys, codes[1])
                if (mode == 2) {
                    areas = []
                    value = [currentProvince.index, currentCity.index]
                } else {
                    areas = currentCity.item
                    const currentArea = this.getCityItem(areas, codes[2])
                    value = [currentProvince.index, currentCity.index, currentArea.index]
                }
            }
            const params = {
                value,
                citys,
                show: !show
            }
            if(mode==1){
                this.value=value
                this.citys=citys
                this.show=!show
                this.areas=areas
            }else{
                this.value=value
                this.citys=citys
                this.show=!show
            }
            
        },
        // 列滚动
        changeCityPicker(e) {
            const val = e.detail.value
            let { citys,value, areas, cityArr } = this.$data
            let {mode}=this.$props
            if (val[0] !== value[0]) {
                const currentCity = cityArr[val[0]]
                citys = this.hasValue(currentCity)
                areas = mode == 2 ? [] : this.hasIndex(0, citys)
                value = mode == 2 ? [val[0], 0] : [val[0], 0, 0]
            } else if (val[1] !== value[1]) {
                areas = mode == 2 ? [] : this.hasIndex(val[1], citys)
                value = mode == 2 ? [val[0], val[1]] : [val[0], val[1], 0]
            } else if (mode === 1 && val[2] !== value[2]) {
                value = val
            }

            const params = { value, citys }
            if(mode==1){
                this.value=value
                this.citys=citys
                this.areas=areas
            }else{
                this.value=value
                this.citys=citys
            }
        },
        // 确认
        submitCityPicker() {
            const { cityArr, citys, areas, value} = this.$data
            const { mode , idkey, namekey}=this.$props
            this.show=false;
            const codeList = [
                    this.key2Value(cityArr, value[0], idkey),
                    this.key2Value(citys, value[1], idkey)
                ]
            const valueList = [
                this.key2Value(cityArr, value[0], namekey),
                this.key2Value(citys, value[1], namekey)
            ]
            const result =
                mode === 2
                ? {
                    code: codeList,
                    value: valueList
                    }
                : {
                    code: [...codeList, this.key2Value(areas, value[2], idkey)],
                    value: [...valueList, this.key2Value(areas, value[2], namekey)]
                    }
            this.$emit('select', result); //传给父组件重新赋值
        },
        // 取消
        hideCityPicker() {
            console.log('弹框操作');
            this.show=false
            console.log(this.show);
        }

    
  },
  mounted() {
   
  },
  created(){
     this.cityArr=CityList
  }
}
</script>

<style lang="scss" scoped>
.city-picker-container {
    position: fixed;
    top: 100vh;
    left: 0;
    right: 0;
    height: 100vh;
    z-index: 20000;
    transition: 0.3s all ease-in-out;
}

.city-picker-container.show {
    top: 0;
}

.city-picker-shadow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.65);
}
.city-picker-shadow {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: calc(100% - 240);
    z-index: 200000;
    display: none;
}

.show .city-picker-shadow {
    display: block;
}

.city-picker-header {
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
}

.city-picker-submit {
    color: #33ac37;
}

.city-picker-header view {
    padding: 10px;
}

.custom-picker {
    width: 100%;
    height: 200px;
}

.custom-picker view {
    line-height: 40px;
    text-align: center;
}

.city-picker-box {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 300000;
    background-color: #fff;
}




</style>
