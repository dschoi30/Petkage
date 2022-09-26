// 아이디/패스워드 모두 입력 시 로그인 버튼 활성화
const userId = document.querySelector("#userId");
const userPwd = document.querySelector("#userPwd");
const btnLoin = document.querySelector("#btnLoin");

userId.addEventListener("keyup", btnLoginActive);
userPwd.addEventListener("keyup", btnLoginActive);
console.log("로그인 버튼 활성화");

function btnLoginActive() {
  switch (!(userId.value && userPwd.value)) {
    case true:
      btnLoin.disabled = true;
      break;
    case false:
      btnLoin.disabled = false;
      break;
  }
}

// // 아이디 기억하기
// var key = getCookie("key");
// // 저장된 쿠키값을 가져와서 ID 칸에 넣어준다. 없으면 공백으로 들어감.
// $("#userId").val("key");

// // 그 전에 ID를 저장해서 처음 페이지 로딩 시, 입력 칸에 저장된 ID가 표시된 상태라면,
// if($("#userId").val() != "") {
//     $("#checkId").attr("checked", true); // ID 저장하기를 체크 상태로 두기.
// }

// $("#checkId").change(function(){ // 체크박스에 변화가 있다면,
//     if($("#checkId").is(":checked")){ // ID 저장하기 체크했을 때,
//         setCookie("key", $("#id").val(), 7); // 7일 동안 쿠키 보관
//     }else{ // ID 저장하기 체크 해제 시,
//         deleteCookie("key");
//     }
// });

// })

// 회원가입
$("#btnJoinMember").click(function (e) {
  e.preventDefault(); // 새로고침 방지
  // location.href = '${path}/memeber/join';
  location.href = "./join.html";
  console.log("회원가입 버튼 클릭");
});
