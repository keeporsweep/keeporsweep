<div id="randomdeclutter-app" class="animated bounceInUp">
	<div class="element-container">
		<div class="element-preview">{{ file.preview }}</div>
		<div class="element-name">{{ file.name }}</div>
		<div class="element-detail icon-folder">{{ file.path }}</div>
	</div>
	<div class="action-container">
		<button v-on:click="remove"
			v-on:mouseover="actionRemoveHover = true" v-on:mouseout="actionRemoveHover = false" :class="{'animated tada': actionRemoveHover}"
			class="action-remove icon-close-white">Nah</button>
		<button v-on:click="next"
			v-on:mouseover="actionKeepHover = true" v-on:mouseout="actionKeepHover = false" :class="{'animated pulse': actionKeepHover}"
			class="action-keep icon-checkmark-white">Keep</button>
	</div>
</div>
