/**
 * Created by dell on 2016/9/5.
 */


$(document).ready(function () {

	$(".ui-spinner-input").each(function () {
		if ($(this).attr("data-is-integer") == "true") {
			$(this).addClass("NumText");
		} else {
			$(this).addClass("NumDecText");
		}
	});
	
	setNumText();


    //初始化日期插件
    initDateControl();
	
	//initFileUploadControl();


    //必填项红点
    $("#demo-wrap .txt-frm-component[data-required]:visible,#demo-wrap .txt-frm-component.txt-file-upload[data-required]:hidden,#demo-wrap .txt-frm-component.sel-complexTypes-data[data-required]:hidden,#demo-wrap .txt-frm-component[data-required][data-dict-type-code]:hidden").each(function () {
        var lbl = $(this).closest(".col-sm-8").parent().children("label.control-label:first");

        if (lbl.find(".red").length == 0) {
            lbl.append("<span class='red'>*</span>");
        }

    })
});



/** 初始化日期插件 **/
function initDateControl() {

	$('.form_datetime,.form_start_datetime,.form_end_datetime').each(function () {

		var formatStr = "yyyy-mm-dd";
		var startViewStr = 2;
		var minViewStr = 2;

		if ($(this).attr("data-date-type") == "1") {

			formatStr = "yyyy-mm-dd hh:ii";
			startViewStr = 2;
			minViewStr = 0;
		}

		$(this).datetimepicker({
			format: formatStr,
			weekStart: 1,
			autoclose: true,
			startView: startViewStr,
			minView: minViewStr,
			forceParse: false,
			minuteStep:3,
			language: 'zh-CN',
			container:$(this).parent()
		});

	});

}


/** 设置文本框只能输入数字和小数点 **/
function setNumText() {
	
    /*JQuery 限制文本框只能输入数字*/

    $(".NumText").keyup(function () {
        $(this).val($(this).val().replace(/\D|^0/g, ''));
    }).bind("paste", function () {  //CTR+V事件处理
        $(this).val($(this).val().replace(/\D|^0/g, ''));
    }).css("ime-mode", "disabled"); //CSS设置输入法不可用

    /*JQuery 限制文本框只能输入数字和小数点*/
    $(".NumDecText").keyup(function () {

        var str = $(this).val().replace(/[^0-9.]/g, '');

        var strArr = str.split(".");

        if (str.startWith(".")) {  //以点开头

            str = "0" + str;

        } else if (strArr.length > 2) { //多个点
            str = strArr[0] + "." + str.substring(str.indexOf("."), str.length - 1).replace(/\D|^0/g, '');
        }


        $(this).val(str);
    }).bind("paste", function () {  //CTR+V事件处理
        var str = $(this).val().replace(/[^0-9.]/g, '');

        var strArr = str.split(".");

        if (str.startWith(".")) {  //以点开头

            str = "0" + str;

        } else if (strArr.length > 2) { //多个点
            str = strArr[0] + "." + str.substring(str.indexOf("."), str.length - 1).replace(/\D|^0/g, '');
        }


        $(this).val(str);
    }).blur(function () {
        var str = $(this).val();
        if (str.endWith(".")) {  //以点结束
            str = str + "00";
            $(this).val(str);
        }

    }).css("ime-mode", "disabled"); //CSS设置输入法不可用
}



String.prototype.endWith=function(s){
	if(s==null||s==""||this.length==0||s.length>this.length)
		return false;
	if(this.substring(this.length-s.length)==s)
		return true;
	else
		return false;
	return true;
};

String.prototype.startWith=function(s){
	if(s==null||s==""||this.length==0||s.length>this.length)
		return false;
	if(this.substr(0,s.length)==s)
		return true;
	else
		return false;
	return true;
};



