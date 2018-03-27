<div id="randomdeclutter-app" class="animated bounceInUp">
	<div class="element-container">
		<div class="element-preview icon-category-multimedia"></div>
		<div class="element-name">{{ file.name }}</div>
		<div class="element-detail">{{ file.path }}</div>
	</div>
	<div class="action-container">
		<button v-on:click="remove" v-on:mouseover="pulse" class="action-remove icon-close-white">Nah</button>
		<button v-on:click="next" v-on:mouseover="pulse" class="action-keep icon-checkmark-white">Keep</button>
	</div>
</div>
