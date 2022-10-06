// 펫 타입 선택
// function pet_sel(no) {

//     console.log(this.id);

//     $("#pet_type").val(no);
//     $(this).addClass("pet_on");
//     $("li[class^='pet_type_']").removeClass("pet_on");
//     $(".pet_type_" + no).addClass("pet_on");

    // if (no == 0) {
    //     console.log(no + "강아지");
    //     $("#cat_hide").show();
    //     $("#bcs_sel_cat_img").hide();
    //     $("#bcs_sel_dog_img").show();
    //     $("#pet_jisu").hide();
    //     $("#cat_jisu").hide();
    //     $("#dog_jisu").show();
        
    // } else if (no == 3) {
    //     console.log(no + "고양이");
    //     $("#cat_hide").hide();
    //     $("#bcs_sel_dog_img").hide();
    //     $("#bcs_sel_cat_img").show();
    //     $("#pet_jisu").hide();
    //     $("#dog_jisu").hide();
    //     $("#cat_jisu").show();
    // }
// }

// 펫 선택 
// $('#pet_sel li').click(function(){
// 	alert("Id: " + this.id);
// })

// 비만도 선택
function bcs_sel(no) {
    $("#bcs_type").val(no);
    $(this).addClass("bcs_on");
    $("li[class^='bcs_type_']").removeClass("bcs_on");
    $(".bcs_type_" + no).addClass("bcs_on");
}

// 소중대 선택
function weigh_choice(no) { 
    $("a[class^='bcs_type_']").removeClass("bcs_on");

    $("#dog_type").val(no);
    $("#bcs_type").val("");
}

// 소중대 라디오 버튼 선택
var dog_type_btn = document.getElementsByClassName("dog_type_btn");

function handleClick(event) {
    console.log(event.target);

    console.log(event.target.classList);

    if (event.target.classList[1] === "cal_type_checked") {
        event.target.classList.remove("cal_type_checked");
    } else {
        for (var i = 0; i < dog_type_btn.length; i++) {
            dog_type_btn[i].classList.remove("cal_type_checked");
        }

        event.target.classList.add("cal_type_checked");
    }
}

function init() {
    for (var i = 0; i < dog_type_btn.length; i++) {
        dog_type_btn[i].addEventListener("click", handleClick);
    }
}

init();

// 생년월일 유효성 검사
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

// 펫 상태 셀렉트 박스
const label = document.querySelectorAll('.label');

label.forEach(function(lb){
    lb.addEventListener('click', e => {
        let optionList = lb.nextElementSibling;
        let optionItems = optionList.querySelectorAll('.optionItem');
        clickLabel(lb, optionItems);
    })
});

const clickLabel = (lb, optionItems) => {
    if(lb.parentNode.classList.contains('active')) {
        lb.parentNode.classList.remove('active');
        optionItems.forEach((opt) => {
            opt.removeEventListener('click', () => {
                handleSelect(lb, opt)
            })
        })
    } else {
        lb.parentNode.classList.add('active');
        optionItems.forEach((opt) => {
            opt.addEventListener('click', () => {
                handleSelect(lb, opt)
            })
        })
    }
}

const handleSelect = (label, item) => {
    label.innerHTML = item.textContent;
    label.parentNode.classList.remove('active');
}



// 결과창 열기
function result_view(tab_id) {
    var pet_date = $('input[name="pet_date"]').val().replace(/\./g, '-');
    var dog_type = $('input[name="dog_type"]').val();

    var bcs_type = $('#bcs_type').val();

    var pet_weight = $('input[name="pet_weight"]').val();
    var dog_jisu = $('select[name="dog_jisu"]').val();
    var cat_jisu = $('select[name="cat_jisu"]').val();

    

    if (tab_id == 1) {
            colsole.log("강아지 선택")

            if (!pet_date) {
                alert("생년월일을 입력해주세요.");
                $('input[name="pet_date"]').focus()
                return;
            } else if (!dog_type) {
                alert("몸무게를 선택해주세요.");
                return;
            }

        

        if (!isBirthday(pet_date)) { //생년월일 유효성 검사
            return;
        } else {
            $(".cal_info_box").hide();
            if ($("#dog_on").hasClass("pet_on") === true && $("#cat_on").hasClass("pet_off") === true) {
                $(".cal_result_box").show();
                $("#dog_life").show();
                $("#cat_life").hide();
            } else if ($("#dog_on").hasClass("pet_off") === true && $("#cat_on").hasClass("pet_on") === true) {
                $(".cal_result_box").show();
                $("#cat_life").show();
                $("#dog_life").hide();
            }
        }

        data = "m2Code=dogcal&mode=age_cal&pet_date=" + pet_date + "&dog_type=" + dog_type;
    
    } else if (tab_id == 2) {
        if (!bcs_type) {
            alert("BCS를 선택해주세요");
            return;
        } else {

        $(".cal_info_box").hide();
            if ($("#dog_on").hasClass("pet_on") === true && $("#cat_on").hasClass("pet_off") === true) {
                $(".cal_result_box").show();
                $("#dog_ob_1").show();
                $("#cat_ob_1").hide();
            } else if ($("#dog_on").hasClass("pet_off") === true && $("#cat_on").hasClass("pet_on") === true) {
                $(".cal_result_box").show();
                $("#cat_ob_1").show();
                $("#dog_ob_1").hide();
            }
        }

        data = "m2Code=dogcal&mode=bimando_cal&bcs_type=" + bcs_type;
    
    } else if (tab_id == 3) {
        if (!pet_weight) {
            alert("몸무게를 입력해주세요.");
            $('input[name="pet_weight"]').focus()
            return;
        } else if ((dog_jisu && !cat_jisu) ) {
            alert("반려동물 상태를 선택해주세요.");
            return;
        } else {
            $(".cal_info_box").hide();
            $(".cal_result_box").show();
        }

        data = "m2Code=dogcal&mode=calorie_cal&pet_weight=" + pet_weight + "&dog_jisu=" + dog_jisu;
    
    }

    $.ajax({
        type: "post",
        dataType: "json",
        data: data,
        url: "../ajaxData_cal.php",
        success: function (r) {
            $(".cal_result_box").show();
            // $(".h21_calculator_sns").show(); //SNS 공유하기
            $(".cal_info_box").hide();

            if (tab_id == 1) { // 나이 계산기
                $(".cal_result_age").css("display", "block");
                $("#dog_age").html(r.msg[0]);
                $("#dog_age_cal").html(r.msg[1] + "살");
                $("#dog_life").html(r.msg[2]);
            } else if (tab_id == 2) {// 비만도 계산기
                $(".cal_result_bmi").css("display", "block");
                $("#bsc_type_str1").html(r.msg_pc[0]);
                $("#bsc_type_str2").html(r.msg_pc[1]);
                $("#bsc_type_str3").html(r.msg_pc[2]);
            } else if (tab_id == 3) {// 칼로리 계산기
                $(".cal_result_calorie").css("display", "block");
                $("#basic_meta").html(r.msg[0] + "kcal");
                $("#basic_kal").html(r.msg[1] + "kcal");
            } 
        }
    })
}