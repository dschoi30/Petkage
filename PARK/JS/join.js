// 약관 동의 모달
// 전체 동의
$(".checkbox_group").on("click", "#checkAll", function () {
  $(this)
    .parents(".checkbox_group")
    .find("input")
    .prop("checked", $(this).is(":checked"));
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
    $("#agreeCheck").html("약관에 모두 동의하였습니다.");
  } else {
    $("#please_allCheck").html("모든 항목에 체크 해주세요.");
    $("#please_allCheck").css("color", "#753422");
    return false;
  }
});

// 일반회원 - 판매회원 타입 설정
function memberTypeDisplay() {
  if ($("input:radio[id=memberSeller]").is(":checked")) {
    $("#joinSellerInfoBox").show();
    $("#joinPetInfoBox").hide();
    console.log("판매회원");
  } else {
    $("#joinSellerInfoBox").hide();
    $("#joinPetInfoBox").show();
    console.log("일반회원");
  }
}

// 정규식 표현
//  아이디 - 대소문자 + 숫자 + 10자 이상 12자 이하
var idCheck = /^[a-zA-z0-9]{6,12}$/;

// 비밀번호 - 영소문자, 숫자 모두 포함 8자리 이상
var pwdCheck = /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

// 이름 - 한글 또는 영문만 5자 이내 입력 가능
var nameCheck = /^[가-힣|a-z|A-Z]{3,5}$/;

// 핸드폰 번호 - 숫자만 입력 가능
var phoneCheck = /^010[0-9]{8}$/;

// 이메일 - @ 입력!!!!!!!!!!!! 오류 !!!!!!!!
var emailCheck = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

// 숫자 - 숫자만 입력 가능
var numCheck = /^[0-9]+$/;

// 공백 체크
var blankCheck = /\s/g;

// 상호명 - 한글 또는 영문만 10자 입력 가능
var bNameCheck = /^[가-힣|a-z|A-Z]{1,10}$/;

// 아이디 유효성 검사
$("#userId").keyup(function () {
  if (!idCheck.test($("#userId").val())) {
    $("#id_termsCheck").text("10~12자의 영문 대소문자와 숫자를 입력해 주세요.");
    $("#userIdDuplicate").attr("disabled", "true");
    $("[name=idTest]").val("0");

    console.log($("#userIdDuplicate").attr("disabled"));
  } else {
    $("#id_termsCheck").text("중복 확인을 해주세요 ");
    $("#userIdDuplicate").attr("disabled", false);
    $("[name=idTest]").val("1");
  }
});

// 아이디 중복 검사
$("#userIdDuplicate").on("click", () => {
  $("[name=idDuplicateTest]").val("1");
  console.log($("[name=idDuplicateTest]").val() === "1");
  $("#id_termsCheck").text("사용 가능한 아이디 입니다.");
  let userId = $("#userId").val().trim();

  var $userId = $("#userId");
  // DB를 통해 중복검사
  // $.ajax({
  //   type: "POST",
  //   url: "${ path }/member/idCheck",
  //   dataType: "json",
  //   data: {
  //     userId,
  //   },
  //   success: (obj) => {
  //     console.log(obj);

  //     if (obj.duplicate === true) {
  //       $("#userId").val("").focus();
  //       $("#id_termsCheck").text("이미 사용중인 아이디 입니다.");
  //       alert("이미 사용중인 아이디 입니다.");
  //     } else {
  //       $("[name=idTest]").val("1");
  //       // console.log($("[name=idTest]").val());
  //       $("#id_termsCheck").text("사용 가능한 아이디 입니다.");
  //       // alert("사용 가능한 아이디 입니다.");
  //     }
  //   },
  //   error: (error) => {
  //     console.log(error);
  //   },
  // });

  //아이디 중복검사 이후 id값 변경시 다시 체크
  $("#userId").change(function () {
    $("[name=idDuplicateTest]").val("0");
  });
});

// 비밀번호 유효성 검사
$("#userPwd").keyup(function () {
  if (!pwdCheck.test($("#userPwd").val())) {
    $("#pwd_termsCheck").text(
      "영문자, 숫자 모두 포함해 8자리 이상 입력해 주세요."
    );
    $("[name=pwdTest]").val("0");
  } else {
    $("#pwd_termsCheck").text("");
    $("[name=pwdTest]").val("1");
    return true;
  }
});

// 비밀번호 일치 여부
$("#userPwdCheck").keyup(function () {
  var userPwd = $("#userPwd").val();
  var userPwdCheck = $("#userPwdCheck").val();

  // 비밀번호 입력 안했을 경우
  if (userPwd != "" && userPwdCheck == "") {
    $("#pwd_doubleCheck").text("비밀번호를 확인해 주세요");
  } else if (userPwd != "" || userPwdCheck != "") {
    if (userPwd == userPwdCheck) {
      // 비밀번호 일치 이벤트 실행
      $("#pwd_doubleCheck").text("비밀번호가 일치합니다.");
      // userPwdCheck == "1";
      $("[name=pwdCheckTest]").val("1");
    } else {
      // 비밀번호 불일치 이벤트 실행
      $("#pwd_doubleCheck").text("비밀번호가 일치하지 않습니다.");
      $("[name=pwdCheckTest]").val("0");
      return true;
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
    $("[name=nameTest]").val("1");
    return true;
  }
});

// 핸드폰 번호 유효성 검사
$("#userPhone").keyup(function () {
  if (!phoneCheck.test($("#userPhone").val())) {
    $("#phone_termsCheck").text("문자를 제외한 번호만 입력해 주세요.");
  } else {
    $("#phone_termsCheck").text("");
    $("[name=phoneTest]").val("1");
    return true;
  }
});

// 주소 유효성 검사
$("#addressSub").keyup(function () {
  if ($("#addressSub").trim().val() !== "") {
    $("#address_termsCheck").text("");
  } else {
    $("#address_termsCheck").text("나머지 주소를 입력해 주세요.");
  }
});

// 이메일 유효성 검사
//이메일 인증하기 구현
$("#userEmail").keyup(function () {
  if (!emailCheck.test($("#userEmail").val())) {
    $("#email_termsCheck").text("인증 버튼을 눌러 주세요.");
    $("#emailSend").attr("disabled", false);
  } else {
    $("#email_termsCheck").text("올바른 이메일을 입력해 주세요.");
  }

  // 보낼 인증번호 담는곳
  // var confirmCode;
  // $.ajax({
  //   url: "${ path }/member/emailCheck",
  //   data: {
  //     email: eamilId,
  //   },
  //   method: "POST",
  //   dataType: "text",

  //   //성공했을시
  //   success: function (data) {
  //     if (data == "overlap") {
  //       $("#email_termsCheck").text("이미 가입된 이메일 입니다.");
  //       return;
  //     }

  //     confirmCode = data;

  //     //인증번호 박스, 버튼나타나기
  //     $("#emailCheck").attr("disabled", false);

  //     //인증번호 확인눌렀을 시 구현
  //     $(btnEmailConfirm).click(function () {
  //       var memberConfirmCode = $("#emailConfirm").val();

  //       if (confirmCode == memberConfirmCode) {
  //         $("[name=emailTest]").val("1"); //인증에 성공하면 value를 1로바꿈
  //         $("#email_numCheck").text("인증이 완료되었습니다.");
  //         $("#userEmail, #userEmailCheck").attr("readonly", true); //인증성공하면 이메일 + 인증번호창 readonly
  //       } else {
  //         alert("인증에 실패하셨습니다");
  //       }
  //     });
  //   },
  //   error: function (xhr, status, error) {
  //     console.log("error call!");
  //     console.log(xhr, status, error);
  //   },
  // });
});

// 상호명 유효성 검사
$("#bName").keyup(function () {
  if (!bNameCheck.test($("#bName").val())) {
    $("#bName_termsCheck").text("10자 이내의 한글과 영문만 입력해 주세요.");
  } else {
    $("#bName_termsCheck").text("");
    return true;
  }
});

// 사업자 번호 유효성 검사
$("#bNumber").keyup(function () {
  if (!numCheck.test($("#bNumber").val())) {
    $("#bNumber_termsCheck").text("-를 제외한 숫자만 입력해 주세요");
  } else {
    $("#bNumber_termsCheck").text("");
    return true;
  }
});

//제출버튼 클릭시 모든 값 유무 확인
// click -> submit으로 바꾸기 (지금 테스트용)
$(".btnJoin").click(function () {
  // 아이디 유효성 검사
  if ($("[name=idTest]").val() != "1") {
    $("#id_termsCheck").text("아이디를 입력해 주세요.");
    $("#userId").focus();
    return false;
  }

  // 아이디 중복검사
  if ($("[name=idDuplicateTest]").val() != "1") {
    $("#id_termsCheck").text("중복 확인을 해주세요.");
    $("#userId").focus();
    return false;
  }

  // 비밀번호 유효성 검사
  // 비밀번호를 입력하지 않았을 경우
  if ($("[name=pwdTest]").val() != "1") {
    $("#pwd_termsCheck").text("비밀번호를 입력해 주세요.");
    $("#userPwd").focus();
    return false;
  }

  // 비밀번호를 확인하지 않았을 경우
  if ($("[name=pwdCheckTest]").val() != "1") {
    $("#pwd_doubleCheck").text("비밀번호 확인을 해주세요.");
    $("#userPwdCheck").focus();
  }

  // 이름 유효성 검사
  if ($("[name=nameTest]").val() != "1") {
    $("#name_termsCheck").text("올바른 이름을 입력해 주세요.");
    $("#userName").focus();
  }

  //핸드폰 유효성 검사
  if ($("[name=phoneTest]").val() != "1") {
    $("#phone_termsCheck").text("문자를 제외한 번호만 입력해 주세요.");
    $("#userName").focus();
  }
});
