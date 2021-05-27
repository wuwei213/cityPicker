<template>
    <view class="component">
		<text>普通的选择城市picker</text>
		<city-picker :codes="codes" class="picker_style" @select="placeNameSelect" name="placeNameSelect">
			<view class="input-picker">
				<text>{{placeName||'点击选择城市'}}</text>
			</view>
		</city-picker>
		<view>选中的汉字数组： {{placeName}}</view>
		<view>选中的id数组： {{placeCode.toString()}}</view>
		<rfLoading isFullScreen :active="loading"></rfLoading>
    </view>
</template>
<script>
	export default {
        name: 'homepage',
        mixins:[],
        props:[],
        components:{},
		data() {
			return {
                loading:true,
				placeName:'',
				placeCode:[],
				codes:[]
            }
		},
		watch: {
			
		},
		created() {
           setTimeout(()=>{
			   this.loading=false
		   },1000)
		},
		methods: {
			placeNameSelect(e){
				console.log(e);
				this.placeCode=e.code;
				this.placeName=e.value.toString();
			},
		}
	}
</script>
<style lang="scss" >

</style>
