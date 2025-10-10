
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
$(function() {
    $('.forma').each(function() {    
        var $frm = $(this);
        var input = $(this).find('.validate-input-at .input-at');
        var butsend = $(this).find('.form-at-btn');
        butsend.on('click',function(){
            var check = true;
            for(var i=0; i<input.length; i++) {
                if(validate(input[i]) == false){
                    showValidate(input[i]);
                    check=false;
                }
            }
            // Отправка формы        
            if (check == true) {
                $.post("/send.php", $frm.find(".form-at select, .form-at input, .form-at textarea").serialize(),
                    function(data){
                        if(data.frm_check == 'error'){ 
                            $frm.find(".result-at").html("<div class='error-at'>Ошибка: " + data.msg + "</div>");                    
                            } else {
                            $frm.find(".result-at").html("<div class='success-at'>Ваше сообщение отправлено!</div>"); 
                            $frm.find(".form-at").fadeOut(500);
                            $frm.find(".input-at").val("");            
                        }
                    }, "json");
                    return false;
            }
        });
        $('.form-at .input-at').each(function(){
            $(this).focus(function(){
                hideValidate(this);
            });
        });
        
    });    
    function validate(input) {
        /* Если нужно проверять валидность почты, раскомментируйте строчки ниже */
        /*
            if($(input).attr('type') == 'email' || $(input).attr('name') == 'email-at') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            return false;
            }
            }
        */
        if($(input).val().trim() == ''){
            return false;
        }
    }
    function showValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).addClass('alert-validate');
    }
    function hideValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).removeClass('alert-validate');
    }
});