<?php
script('keeporsweep', 'vue');
script('keeporsweep', 'script');
style('keeporsweep', 'style');
style('keeporsweep', 'animate.min');
?>

<div id="app">
	<div id="app-content">
		<div id="app-content-wrapper">
			<?php print_unescaped($this->inc('content/index')); ?>
		</div>
	</div>
</div>
