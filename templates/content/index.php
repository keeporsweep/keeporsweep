<div id="randomdeclutter-app" class="animated bounceInUp">
	<div class="element-container element-container-1 animated active">
		<div class="element-preview"></div>
		<div class="element-name">{{ file.name }}</div>
		<div class="element-detail icon-folder">{{ file.path }}</div>
	</div>
	<div class="element-container element-container-2 animated">
		<div class="element-preview"></div>
		<div class="element-name">{{ file.name }}</div>
		<div class="element-detail icon-folder">{{ file.path }}</div>
	</div>
	<div class="element-container element-container-3 animated">
		<div class="element-preview"></div>
		<div class="element-name">{{ file.name }}</div>
		<div class="element-detail icon-folder">{{ file.path }}</div>
	</div>
	<div class="element-container element-container-4 animated">
		<div class="element-preview"></div>
		<div class="element-name">{{ file.name }}</div>
		<div class="element-detail icon-folder">{{ file.path }}</div>
	</div>
	<div class="element-container element-container-empty">
		<div class="element-empty icon-favorite"></div>
		<div class="element-name">That’s all!</div>
		<div class="element-detail">Refresh to go through your data again</div>
	</div>
	<div class="action-container">
		<button v-on:click="remove"
			v-on:mouseover="actionRemoveHover = true" v-on:mouseout="actionRemoveHover = false" :class="{'animated tada': actionRemoveHover}"
			class="action-remove icon-close-white">Nah</button>
		<button v-on:click="keep"
			v-on:mouseover="actionKeepHover = true" v-on:mouseout="actionKeepHover = false" :class="{'animated pulse': actionKeepHover}"
			class="action-keep icon-checkmark-white">Keep</button>
	</div>
</div>
