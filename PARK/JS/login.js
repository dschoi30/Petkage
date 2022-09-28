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

// 회원가입
$("#btnJoinMember").click(function (e) {
  e.preventDefault(); // 새로고침 방지
  // location.href = '${path}/memeber/join';
  location.href = "./join.html";
  console.log("회원가입 버튼 클릭");
});
