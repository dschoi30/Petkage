


function result_view(tab_id) {
    var pet_date = $('input[name="pet_date"]').val().replace(/\./g, '-');
    var dog_type = $('input[name="animal_check"]').val();
    var dog_on = $("#dog_on").val();
    var cat_on = $("#cat_on").val();

    var bcs_type = $('#bcs_type').val();

    var pet_weight = $('input[name="pet_weight"]').val();
    var dog_jisu = $('select[name="dog_jisu"]').val();
    var cat_jisu = $('select[name="cat_jisu"]').val();

    

    if (tab_id == 1) {
        if(dog_on === 0) {
            if (!pet_date) {
                alert("생년월일을 입력해주세요.");
                $('input[name="pet_date"]').focus()
                return;
            } else if (!dog_type) {
                alert("몸무게를 선택해주세요.");
                return;
            }
        
        } else if(cat_on === 3) {
            alert("냥");
        }

        if (!isBirthday(pet_date)) { //생년월일 유효성 검사
            return;
        }

    }
}


function dog_on() {
    console.log("강쥐 클릭");
    console.log($("#dog_on").val());

    $("#cat_hide").show();
    $("[name=animal_check]").attr("disabled", false);
    $('#cat_on').attr('value','');
    $('#dog_on').attr('value','0');
}

function cat_on() {
    console.log("고영희 클릭");
    console.log($("#cat_on").val());

    $("#cat_hide").hide();
    $("[name=animal_check]").attr("disabled", true);
    $('#cat_on').attr('value','3');
    $('#dog_on').attr('value','');
}

function weigh_choice(no) { 
    console.log(no + $("#dog_type").val(no));

    $("#dog_type"+no).val(no);
}

function isBirthday(dateStr) {
    $("#birth_chk_str").hide();
    dateStr = dateStr.replace(/[^0-9]/g, '');
    var year = Number(dateStr.substr(0, 4)); // 입력한 값의 0~4자리까지 (연) 
    var month = Number(dateStr.substr(4, 2)); // 입력한 값의 4번째 자리부터 2자리 숫자 (월) 
    var day = Number(dateStr.substr(6, 2)); // 입력한 값 6번째 자리부터 2자리 숫자 (일) 
    var today = new Date(); // 날짜 변수 선언 
    var yearNow = today.getFullYear(); // 올해 연도 가져옴 

    if (dateStr.length <= 10) { // 연도의 경우 1900 보다 작거나 yearNow 보다 크다면 false를 반환합니다. 
        if (1900 > year || year > yearNow) {
            alert("날짜형식이 다릅니다.");
            $('input[name="pet_date"]').focus()
            return false;
        } else if (month < 1 || month > 12) {
            alert("날짜형식이 다릅니다.");
            $('input[name="pet_date"]').focus()
            return false;
        } else if (day < 1 || day > 31) {
            alert("날짜형식이 다릅니다.");
            $('input[name="pet_date"]').focus()
            return false;
        } else if ((month == 4 || month == 6 || month == 9 || month == 11) && day == 31) {
            alert("날짜형식이 다릅니다.");
            $('input[name="pet_date"]').focus()
            return false;
        } else if (month == 2) {
            var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
            if (day > 29 || (day == 29 && !isleap)) {
                alert("날짜형식이 다릅니다.");
                $('input[name="pet_date"]').focus()
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    } else { //1.입력된 생년월일이 8자 초과할때 : auth:false 
        alert("날짜형식이 다릅니다.");
        $('input[name="pet_date"]').focus()
        return false;
    }
}