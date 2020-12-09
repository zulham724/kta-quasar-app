<?php 
$a=scandir("D:\project\kta-quasar-app\src\store\modules");
foreach($a as $file){
	if(is_file("./modules/".$file)){
		echo $file."\n";
	}
}