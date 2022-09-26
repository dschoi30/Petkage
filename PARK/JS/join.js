// $(document).ready(function () {
// 약관 동의 모달
// 전체 동의
$(".checkbox_group").on("click", "#checkAll", function () {
  $(this)
    .parents(".checkbox_group")
    .find("input")
    .prop("checked", $(this).is(":checked"));

  if (
    $(this)
      .parents(".checkbox_group")
      .find("input")
      .prop("checked", $(this).is(":checked"))
  ) {
    $(".agreeAllTitle").css("text-decoration", "underline");
  } else {
    $(".agreeAllTitle").css("text-decoration", "");
  }
});

$(".checkbox_group").on("click", ".checkSep", function () {
  var is_checked = true;

  $(".checkbox_group .checkSep").each(function () {
    is_checked = is_checked && $(this).is(":checked");
  });

  $("#checkAll").prop("checked", is_checked);
});

$("#btnAgreeFinish").on("click", function () {
  if ($("#checkAll").is(":checked")) {
    $("#please_allCheck").html("");
  } else {
    $("#please_allCheck").html("모든 항목에 체크 해주세요.");
    $("#please_allCheck").css("color", "#f1785b");
    return false;
  }
});

// 일반회원 - 판매회원 타입 설정
function memberTypeDisplay() {
  if ($("input:radio[id=memberSeller]").is(":checked")) {
    $("#joinSellerInfoBox").show();
    console.log("판매회원");
  } else {
    $("#joinSellerInfoBox").hide();
    console.log("일반회원");
  }
}

// 정규식 표현
//  아이디 - 대소문자 + 숫자 + 10자 이상 12자 이하
var idCheck = /^[a-zA-z0-9]{6,12}$/;

// 비밀번호 - 영소문자, 숫자 모두 포함 8자리 이상
var pwdCheck = /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

// 이름 - 한글 또는 영문만 입력 가능
var nameCheck = /^[가-힣|a-z|A-Z]{3,5}$/;

// 전화번호 - 숫자만 입력 가능
var phoneCheck = /^010[0-9]{8}$/;
// 숫자 - 숫자만 입력 가능
var numCheck = /^[0-9]+$/;

// 공백 체크
var blankCheck = /\s/g;

// 아이디 유효성 검사
$("#userId").keyup(function () {
  if (!idCheck.test($("#userId").val())) {
    $("#id_termsCheck").text("10~12자의 영문 대소문자와 숫자를 입력해 주세요.");
  } else {
    $("#id_termsCheck").text("중복 확인을 해주세요 ");
  }
});

// 비밀번호 유효성 검사
$("#userPwd").keyup(function () {
  if (!pwdCheck.test($("#userPwd").val())) {
    $("#pwd_termsCheck").text(
      "영문자, 숫자 모두 포함해 8자리 이상 입력해 주세요."
    );
  } else {
    $("#pwd_termsCheck").text("");
  }
});

// 비밀번호 일치 여부
$("#userPwdCheck").keyup(function () {
  var userPwd = $("#userPwd").val();
  var userPwdCheck = $("#userPwdCheck").val();

  if (userPwd != "" && userPwdCheck == "") {
    $("#pwd_doubleCheck").text("비밀번호를 확인해 주세요");
  } else if (userPwd != "" || userPwdCheck != "") {
    if (userPwd == userPwdCheck) {
      // 비밀번호 일치 이벤트 실행
      $("#pwd_doubleCheck").text("비밀번호가 일치합니다.");
    } else {
      // 비밀번호 불일치 이벤트 실행
      $("#pwd_doubleCheck").text("비밀번호가 일치하지 않습니다.");
    }
  }
});

// 이름 유효성 검사
$("#userName").keyup(function () {
  if (!nameCheck.test($("#userName").val())) {
    $("#name_termsCheck").text("한글 또는 영문만 입력해 주세요.");
  } else if (
    $("#userName").val().length < 3 ||
    $("#userName").val().length > 5
  ) {
    $("#name_termsCheck").text("3자 이상 5자 이하로 입력해 주세요.");
  } else {
    $("#name_termsCheck").text("");
  }
});

// 전화번호 유효성 검사
$("#userPhone").keyup(function () {
  if (!phoneCheck.test($("#userPhone").val())) {
    $("#phone_termsCheck").text("올바른 전화번호를 입력해 주세요.");
  } else {
    $("#phone_termsCheck").text("");
  }
});

$("#userAddress").keyup(function () {
  if ($("#userAddress").val() !== "") {
    // $("#address_termsCheck").text("나머지 주소를 입력해 주세요.");
    $("#address_termsCheck").text("");
  }
  // else {
  //   $("#address_termsCheck").text("");
  // }
});

// 사업자 번호 유효성 검사
$("#bNumber").keyup(function () {
  if (!numCheck.test($("#bNumber").val())) {
    $("#bNumber_termsCheck").text("-를 제외한 숫자만 입력해 주세요");
  } else {
    $("#bNumber_termsCheck").text("");
  }
});

// });
