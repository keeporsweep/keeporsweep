<div id="randomdeclutter-app">
	<div class="element-container">
		<div class="element-preview icon-category-multimedia"></div>
		<div class="element-name"><strong>{{ file.name }}</strong></div>
		<div class="element-detail">{{ file.path }}</div>
	</div>
	<div class="action-container">
		<button v-on:click="remove" class="action-remove icon-close-white">Nah</button>
		<button v-on:click="next" class="action-keep icon-checkmark-white">Keep</button>
	</div>
</div>
