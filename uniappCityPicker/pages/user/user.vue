<template>
	<view>
		<text>打开默认选中codes设置好的城市</text>
		
		<city-picker :codes="codes" class="picker_style" @select="placeNameSelect" name="placeNameSelect">
			<view class="input-picker">
				<text>{{placeName||'点击选择城市'}}</text>
			</view>
		</city-picker>
		<rfLoading isFullScreen :active="loading"></rfLoading>
	</view>
</template>

<script>
	
	export default {
		name:'user',
		components:{
			
		},
		data() {
			return {
				loading:true,
				placeName:'',
				placeCode:[],
				codes:[7,34767,34768]
			}
		},
		methods: {
			placeNameSelect(e){
				console.log(e);
				this.placeCode=e.code;
				this.placeName=e.value.toString();
			},
			
			
		},
		created() {
		   setTimeout(()=>{
			   this.loading=false
		   },1000)
		},
	}
</script>

<style lang="scss" >

</style>
