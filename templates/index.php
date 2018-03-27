<?php
script('randomdeclutter', 'vue');
script('randomdeclutter', 'script');
style('randomdeclutter', 'style');
style('randomdeclutter', 'animate.min');
?>

<div id="app">
	<div id="app-content">
		<div id="app-content-wrapper">
			<?php print_unescaped($this->inc('content/index')); ?>
		</div>
	</div>
</div>
