<script>
	export default {
		globalData: {  
		
		},
		onLaunch: function() {
			console.log('App Launch')
	
		},
		methods:{
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	.container {
	  height: 100%;
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: space-between;
	  padding: 200rpx 0;
	  box-sizing: border-box;
	} 
	.input-picker{
	  margin: 150rpx 0 150rpx 0;
	  text-align: center;
	}
</style>
