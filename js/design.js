var demo;


$(function(){

	/** 拖拽及排序 */
	var	selector='.lyrow,.box,.wdg',
		body=$('body').addClass('edit');

	/** 预览区域 */
	demo=$('.demo');


	/** 排序初始化 */
	initContainer();

    /** 拖拽事件初始化 */
	initDraggable();

	/** 控件属性编辑区修改事件 */
	initAttrEditZoneControlChange();


	/** 清空预览区域 */
	$('#clean-up').on('click',function(e){
		e.preventDefault();
		demo.find(".row .col").empty();
	});
	
	/** 获取表单内容 **/
	$('#getLayoutContent').on('click',function(e){
		e.preventDefault();
		getLayoutContent();
	});


});


/** 排序初始化**/
function initContainer() {

	var opts={
		connectWith: '.col',
		opacity: .5,
		handle: '.drag',
		start: function(e,t) {},
		stop: function(e,t) {}
	},opts2=$.extend({},opts,{
		stop: function(e,t) {

		}
	});

	demo.sortable(opts);
	$('.col',demo).sortable(opts2);
}


/** 拖拽事件初始化 */
function initDraggable(){
	
	/** 元素的拖拽事件 */
	$('.sidebar-nav .box').draggable({
		connectToSortable: '.col',
		helper: 'clone',
		opacity: .5,
		start: function(e,t) {
			$(".demo .curr-draggable:not(.ui-draggable-dragging )").removeClass("curr-draggable");
		},
		drag: function(e, t) {
			t.helper.width(400);
			t.helper.height(36);

		},
		stop: function(e,t) {

		    /** 根据当前项设置控件属性编辑区内容 */
			setEditWrapContent();
			

			/** 重新绑定预览区域box单击选中事件 */
			$(".demo .box").unbind("click").click(function(e){
				
				/** 设定当前选中项样式 */
				$(".demo .ui-draggable").removeClass("curr-draggable");
				$(this).addClass("curr-draggable");
				
				/** 根据当前项设置控件属性编辑区内容 */
				setEditWrapContent();
				
			});

		}
	});


	/** 组件的拖拽事件*/
	$('.sidebar-nav .wdg').draggable({
		connectToSortable: '.col',
		helper: 'clone',
		opacity: .5,
		start: function(e,t) {
			$(".demo .curr-draggable:not(.ui-draggable-dragging )").removeClass("curr-draggable");
		},
		drag: function(e, t) {
			t.helper.width(400);
			t.helper.height(36);

		},
		stop: function(e, t) {

			var dataType = $(".demo .curr-draggable:first").attr("data-type");

			if(dataType == "spinner"){ 
				/** 设置数值控件样式 */
				$('.demo .curr-draggable .spinner').spinner();
			}

			/** 根据当前项设置控件属性编辑区内容 */
			setEditWrapContent();


			/** 重新绑定预览区域box单击选中事件 */
			$(".demo .wdg").unbind("click").click(function(){
				
				$(".demo .ui-draggable").removeClass("curr-draggable");
				$(this).addClass("curr-draggable");
				setEditWrapContent();
				
			});

		}
	});

}


/** 控件属性编辑区修改事件 */
function initAttrEditZoneControlChange(){
	
	/** 编辑标题 **/
	$('.edit-wrap [target-data-type=head] textarea.target-head-text').bind('input propertychange', function() {
		$('.demo .curr-draggable .head-zone').html($(this).val());
	});

	/** 编辑段落 **/
	$('.edit-wrap [target-data-type=paragraph] textarea').bind('input propertychange', function() {
		$('.demo .curr-draggable .paragraph-zone').html($(this).val());
	});

	/** 水印文本 **/
	$('.edit-wrap  .txt-placeholder').bind('input propertychange', function() {
		$('.demo .curr-draggable .view  input.txt-zone-placeholder').attr("placeholder",$(this).val());

		var dataType = $(".demo .curr-draggable:first").attr("data-type");
	});

	/** 描述文本 **/
	$('.edit-wrap .txt-content-desc').bind('input propertychange', function() {
		if($.trim($(this).val()) === ""){
			$('.demo .curr-draggable .view  p.help-block').addClass("hide");
		}else{
			$('.demo .curr-draggable .view  p.help-block').html($(this).val()).removeClass("hide");
		}

	});
	
	
	/** 编辑日期区间 **/

	$('.edit-wrap .txt-start-label').bind('input propertychange', function() {

		$('.demo .curr-draggable .view label.label-start-zone-text').html($(this).val());
		setFieldName();
	});

	$('.edit-wrap .txt-end-label').bind('input propertychange', function() {

		$('.demo .curr-draggable .view label.label-end-zone-text').html($(this).val());
		setFieldName();
	});


	/** 编辑选项label **/
	$('.edit-wrap .txt-label').bind('input propertychange', function() {
		$('.demo .curr-draggable .view label.label-zone-text').html($(this).val());

		setFieldName();

	});


	/** 编辑name属性 **/
	$('.edit-wrap .txt-attr-name').bind('input propertychange', function() {
		setFieldNameByName($(this));

	});

	$('.edit-wrap .txt-start-attr-name').bind('input propertychange', function() {
		setFieldTimeStartNameByName($(this));
	});

	$('.edit-wrap .txt-end-attr-name').bind('input propertychange', function() {
		setFieldTimeEndNameByName($(this));
	});
	
	
	/** 编辑数值 最大 **/
	$('.edit-wrap [target-data-type=spinner] .txt-max-value').bind('input propertychange', function() {
		$('.demo .curr-draggable .view input.ui-spinner-input').attr("data-max-val",$(this).val());
	});

	
    /** 编辑数值 最小 **/
	$('.edit-wrap [target-data-type=spinner] .txt-min-value').bind('input propertychange', function() {
		$('.demo .curr-draggable .view input.ui-spinner-input').attr("data-min-val",$(this).val());
	});


	/** 编辑数值 必填项 **/
	$('.edit-wrap [target-data-type=spinner] .integer-checkbox input').bind('click', function() {

		$('.demo .curr-draggable .view input.ui-spinner-input').attr("data-is-integer",$(this).is(':checked'));

	});
	
	
	/** 日期区间必填 特列*/
	$('.edit-wrap .start-required-checkbox input').bind('click', function() {

		$('.demo .curr-draggable .view .form_start_datetime').attr("data-required",$(this).is(':checked'));

	});

	$('.edit-wrap .end-required-checkbox input').bind('click', function() {

		$('.demo .curr-draggable .view .form_end_datetime').attr("data-required",$(this).is(':checked'));

	});
	
	
	/** 选项值改变 **/

	$(".edit-wrap .option input:text").bind('input propertychange', function() {

		chageOptions();
	});



	/** 设置必填 **/
	$('.edit-wrap .required-checkbox input').bind('click', function() {

		$('.demo .curr-draggable .view .txt-frm-component').attr("data-required",$(this).is(':checked'));

	});
	
	
	/** 添加选项 */
	$(".js-add-option").click(function(){

		var addOptionStr = '<div class="option ">'

			+'<div class="col-sm-11">'
			+'<input type="text" class="form-control">'
			+'</div>'

			+'<div  class="col-sm-1 ">'
			+'<div class="js-remove-option fb-button " title="Remove Option">X</div>'
			+'</div>'
			+'</div>';

		$(this).before(addOptionStr);

		/** 移除选项卡 */
		$(".js-remove-option").unbind("click").click(function(){
			$(this).parent().parent().remove();
			chageOptions();
		});

		/** 选项内容编辑 */
		$(".edit-wrap .option").bind('input propertychange', function() {
			chageOptions();
		});

	});



	/**日期格式切换 **/
	$('.edit-wrap [target-data-type=date] .sel-date-type,.edit-wrap [target-data-type=date-section] .sel-start-date-type,.edit-wrap [target-data-type=date-section] .sel-end-date-type').bind('change', function() {

		var formatStr = "yyyy-mm-dd";
		var startViewStr = 2;
		var minViewStr = 2;

		if($(this).val() == "1"){

			formatStr = "yyyy-mm-dd hh:ii";
			startViewStr = 2;
			minViewStr = 0;
		}


		var $target = null;

		if($(this).hasClass("sel-date-type")){

			$target = $(".demo .curr-draggable .form_datetime");

		}else if($(this).hasClass("sel-start-date-type")){

			$target = $(".demo .curr-draggable .form_start_datetime");

		}else if($(this).hasClass("sel-end-date-type")){

			$target = $(".demo .curr-draggable .form_end_datetime");
		}


		if($target != null){

			$target.attr("data-date-type",$(this).val());
		}

	});

}
	

/** 根据当前项设置控件属性编辑区内容 **/
function setEditWrapContent(){


	var dataType = $(".demo .curr-draggable:first").attr("data-type");

	var $parent = $(".edit-wrap>form >div[target-data-type="+dataType+"]");

	$(".edit-wrap>form>div").hide();
	$parent.show();


	//1.设置标签文本
	$parent.find('.txt-label:visible').val($('.demo .curr-draggable .view label.label-zone-text').html());

	//2.设置水印文本
	$parent.find('.txt-placeholder:visible').val($('.demo .curr-draggable .view  input.txt-zone-placeholder').attr("placeholder"));

	//3.设置描述文本
	$parent.find('.txt-content-desc:visible').val($('.demo .curr-draggable .view  p.help-block').html());

	//4.设置name
	$parent.find('.txt-attr-name:visible').val($('.demo .curr-draggable .view  .txt-frm-component:last').attr("name"));

	//选项变量
	var $options = null;

	/** 特殊情况设值 **/

	if(dataType == "head"){ //标题

		$parent.find('textarea.target-head-text:visible').val($('.demo .curr-draggable .head-zone').html());

	}else if(dataType == "paragraph"){ //段落

		$parent.find('textarea.target-paragraph-text:visible').val($('.demo .curr-draggable .paragraph-zone').html());

	}else if(dataType == "text"){ //文本框

	}else if(dataType == "textarea"){ //多行文本

	}else if(dataType == "date"){ //日期控件

		var dateTimeType = $(".demo .curr-draggable .form_datetime").attr("data-date-type");
		$parent.find('.sel-date-type:visible').find('option[value=' +dateTimeType+ ']').prop("selected", true);

	}else if(dataType == "date-section"){ //日期区间

		$parent.find('input.txt-start-label:visible').val($('.demo .curr-draggable .label-start-zone-text').html());
		$parent.find('input.txt-end-label:visible').val($('.demo .curr-draggable .label-end-zone-text').html());
		$parent.find('.txt-start-attr-name:visible').val($('.demo .curr-draggable .view  input.form_start_datetime').attr("name"));
		$parent.find('.txt-end-attr-name:visible').val($('.demo .curr-draggable .view  input.form_end_datetime').attr("name"));

		var dateStartTimeType = $(".demo .curr-draggable .form_start_datetime").attr("data-date-type");
		var dateEndTimeType = $(".demo .curr-draggable .form_end_datetime").attr("data-date-type");
		$parent.find('.sel-start-date-type:visible').find('option[value=' +dateStartTimeType+ ']').prop("selected", true);
		$parent.find('.sel-end-date-type:visible').find('option[value=' +dateEndTimeType+ ']').prop("selected", true);


		if($('.demo .curr-draggable .view input.form_start_datetime').attr("data-required") == "true"){
			$parent.find(".start-required-checkbox :checkbox").prop("checked",true).attr("checked",true) ;
		}else{
			$parent.find(".start-required-checkbox :checkbox").removeProp("checked").removeAttr("checked") ;
		}

		if($('.demo .curr-draggable .view input.form_end_datetime').attr("data-required") == "true"){
			$parent.find(".end-required-checkbox :checkbox").prop("checked",true).attr("checked",true) ;
		}else{
			$parent.find(".end-required-checkbox :checkbox").removeProp("checked").removeAttr("checked") ;
		}

	}else if(dataType == "select" ){ //下拉框

		$options = $(".demo .curr-draggable select option");

	}else if(dataType == "checkbox"){ //复选框

		$options = $(".demo .curr-draggable .checkbox-wrap .checkbox>label>div");

	}else if(dataType == "checkbox-inline"){ //内联复选框

		$options = $(".demo .curr-draggable .checkbox-inline-wrap label.checkbox-inline>div");

	}else if(dataType == "radio"){ //单选框

		$options = $(".demo .curr-draggable .radio-wrap .radio>label>div");

	}else if(dataType == "radio-inline"){ //内联单选框

		$options = $(".demo .curr-draggable .radio-inline-wrap label.radio-inline>div");

	}else if(dataType == "button"){ //按钮

		$options = $(".demo .curr-draggable .button-wrap .btn");

	}else if(dataType == "file"){ //上传

	}else if(dataType == "spinner"){ //数值

		$parent.find(".txt-max-value:visible").val($('.demo .curr-draggable .view input.ui-spinner-input').attr("data-max-val"));
		$parent.find(".txt-min-value:visible").val($('.demo .curr-draggable .view input.ui-spinner-input').attr("data-min-val"));

		if($('.demo .curr-draggable .view input.ui-spinner-input').attr("data-is-integer") == "false"){
			$parent.find(".integer-checkbox :checkbox").removeProp("checked").removeAttr("checked") ;
		}else{
			$parent.find(".integer-checkbox :checkbox").prop("checked",true).attr("checked",true);
		}
	}

	if($('.demo .curr-draggable .view .txt-frm-component:first').attr("data-required") == "true"){

		$parent.find(".required-checkbox :checkbox").prop("checked",true).attr("checked",true);

	}else{

		$parent.find(".required-checkbox :checkbox").removeProp("checked").removeAttr("checked") ;

	}

	//如果是有多个选项的组件，则赋值
	if($options != null && $options.length > 0){
		$(".edit-wrap .option:visible").remove();

		$options.each(function(){

			var currOption = $(this).html();
			var appendStr = '<div class="option">'

				+'<div class="col-sm-11">'
				+'<input type="text" class="form-control" value="' +currOption+ '">'
				+'</div>'

				+'<div class="col-sm-1 ">'
				+'<div class="js-remove-option fb-button " title="Remove Option">X</div>'
				+'</div>'
				+'</div>';

			if(currOption){

				$parent.find(".js-add-option:visible").before(appendStr);

			}
		});
	}

	//绑定移除事件
	$(".js-remove-option").click(function(){
		$(this).parent().parent().remove();
		chageOptions();
	});

	//绑定值改变事件
	$(".edit-wrap .option input:text").bind('input propertychange', function() {
		chageOptions();
	});

}


/** 通过改变name属性修改控件name的值 **/
function setFieldNameByName(obj) {

	var dataType = $(".demo .curr-draggable:first").attr("data-type");
	var $parent = $(".edit-wrap>form >div[target-data-type="+dataType+"]");

	if(dataType == "file"){ //上传
		$('.demo .curr-draggable .view input.txt-file-upload').attr("name",obj.val());
		$('.demo .curr-draggable .view :file').attr("data-upload-txt",obj.val());;
	}

	if(dataType == "text"){ //文本框
		needSetFieldNameObj = $('.demo .curr-draggable .view input.txt-zone-placeholder');
	}else if(dataType == "textarea"){ //多行文本
		needSetFieldNameObj = $('.demo .curr-draggable .view textarea.form-control');
	}else if(dataType == "date"){ //日期控件
		needSetFieldNameObj = $('.demo .curr-draggable .view input.form_datetime');
	}else if(dataType == "select" ){ //下拉框
		needSetFieldNameObj = $('.demo .curr-draggable .view select.form-control');
	}else if(dataType == "checkbox" ||　dataType == "checkbox-inline"){ //复选框 & 内联复选框
		needSetFieldNameObj = $('.demo .curr-draggable .view :checkbox');
	}else if(dataType == "radio" || dataType == "radio-inline"){ //单选框&内联单选框
		needSetFieldNameObj = $('.demo .curr-draggable .view :radio');
	}else if(dataType == "spinner"){ //数值
		needSetFieldNameObj = $('.demo .curr-draggable .view .ui-spinner-input');
	}

	if(needSetFieldNameObj != null ){
		needSetFieldNameObj.attr("name",obj.val());
	}

}


/** 通过改变name属性修改控件name的值--日期区间开始 **/
function setFieldTimeStartNameByName(obj) {
	var dataType = $(".demo .curr-draggable:first").attr("data-type");
	var $parent = $(".edit-wrap>form >div[target-data-type="+dataType+"]");
	$('.demo .curr-draggable .view input.form_start_datetime').attr("name",obj.val());
}


/** 通过改变name属性修改控件name的值--日期区间结束 **/
function setFieldTimeEndNameByName(obj) {
	var dataType = $(".demo .curr-draggable:first").attr("data-type");
	var $parent = $(".edit-wrap>form >div[target-data-type="+dataType+"]");
	$('.demo .curr-draggable .view input.form_end_datetime').attr("name",obj.val());
}


/** 选项值改变 **/
function chageOptions(){


	var dataType = $(".edit-wrap>form>div:visible").attr("target-data-type");

	/** 下拉框 **/
	if(dataType == "select" ){
		$(".demo .curr-draggable select").html("");
		$(".edit-wrap .option:visible").each(function(){

			var currOption = $(this).find(":text.form-control:first").val();
			if(currOption){
				$(".demo .curr-draggable select").append('<option value="' +currOption+ '">' +currOption+ '</option>');
			}
		});
	}

	/** 复选框 **/
	if(dataType == "checkbox"){
		$(".demo .curr-draggable .checkbox-wrap").html("");
		$(".edit-wrap .option:visible").each(function(){

			var currOption = $(this).find(":text.form-control:first").val();
			if(currOption){
				var appendStr = '<div class="checkbox">'
					+'<label>'
					+'<input class="txt-frm-component" type="checkbox" value="' +currOption+ '"><div>'
					+currOption
					+'</div></label>'
					+'</div>';
				$(".demo .curr-draggable .checkbox-wrap").append(appendStr);
			}
		});
	}


	/**内联复选框**/
	if(dataType == "checkbox-inline"){
		$(".demo .curr-draggable .checkbox-inline-wrap").html("");
		$(".edit-wrap .option:visible").each(function(){

			var currOption = $(this).find(":text.form-control:first").val();
			if(currOption){
				var appendStr = '<label class="checkbox-inline">'
					+' <input class="txt-frm-component" type="checkbox" id="inlineCheckbox1" value="' +currOption+ '"> <div>'
					+ currOption
					+'</div></label>';
				$(".demo .curr-draggable .checkbox-inline-wrap").append(appendStr);
			}
		});
	}


	/** 单选框 **/
	if(dataType == "radio"){
		$(".demo .curr-draggable .radio-wrap").html("");
		$(".edit-wrap .option:visible").each(function(){

			var currOption = $(this).find(":text.form-control:first").val();
			if(currOption){
				var appendStr = '<div class="radio">'
					+'<label>'
					+'<input class="txt-frm-component" type="radio" value="' +currOption+ '"><div>'
					+currOption
					+'</div></label>'
					+'</div>';
				$(".demo .curr-draggable .radio-wrap").append(appendStr);
			}
		});
	}


	/**内联单选框**/
	if(dataType == "radio-inline"){
		$(".demo .curr-draggable .radio-inline-wrap").html("");
		$(".edit-wrap .option:visible").each(function(){

			var currOption = $(this).find(":text.form-control:first").val();
			if(currOption){
				var appendStr = '<label class="radio-inline">'
					+' <input class="txt-frm-component" type="radio" id="inlineCheckbox1" value="' +currOption+ '"><div> '
					+ currOption
					+'</div></label>';
				$(".demo .curr-draggable .radio-inline-wrap").append(appendStr);
			}
		});
	}


	/** 按钮 **/
	if(dataType == "button"){
		$(".demo .curr-draggable .button-wrap").html("");
		$(".edit-wrap .option:visible").each(function(){

			var currOption = $(this).find(":text.form-control:first").val();
			if(currOption){
				var appendStr = ' <button type="button" class="btn btn-default">' + currOption + '</button>';
				$(".demo .curr-draggable .button-wrap").append(appendStr);
			}
		});
	}


}


/** 获取表单内容 */
function getLayoutContent(){

    //文本内容
    var content = "";
	
	$(".demo .drag.view .col .form-group").each(function(){
		
		content += this.outerHTML;
	
	});

	console.log(content);
	
	alert("请通过F12键查看Console控制台打印结果");
	
	return content;
}

