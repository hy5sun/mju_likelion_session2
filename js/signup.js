const fromEl = document.querySelector('#signupForm'); /*id를 가져옴*/
const idEl = document.querySelector('#signupId');
const passwordEl = document.querySelector('#signupPassword');

const isUserExist = (newUserId) => {
    const users = localStorage.getItem('userList'); /*userList 키 참조*/

    if(!users) return false;

    const convertedUsers = JSON.parse(users); /*users를 JSON으로 */
    const getExistUsers = convertedUsers.find(user => user.id === newUserId);
    /*객체는 아래와 같이 생성됨 
    {
        id,
        password
    }
    */

    return getExistUsers ? true : false;
};

/*user 등록 */
const registerUser = (userInfo) => {
    const currentUsers = JSON.parse(localStorage.getItem('userList')); /*userList를 가져오고, 이걸 JSON 형태로 parsing할것임 */

    if (!currentUsers) {
        const newUserList = [];
        newUserList.push(
            {
                id: userInfo.id,
                password: userInfo.password,
            }
        );

        localStorage.setItem('userList', JSON.stringify(newUserList)); /*배열을 string 형태로 바꿔줘야함=>stringify 사용 */
    } else {
        const updatedUsers = currentUsers.concat({
            id: userInfo.id,
            password: userInfo.password,
        });

        localStorage.setItem('userList', JSON.stringify(updatedUsers));
    }
};

const init = () => {
    // 일급객체
    fromEl.addEventListener('submit', (e) => {
        e.preventDefault(); //새로고침에서 나오기

        const idValue = idEl.value;
        const passwordValue = passwordEl.value;

        if (isUserExist(idValue)) { //회원가입하려는 아이디가 있는지 확인 (이미 있다면)
            alert(`${idValue} 유저는 이미 존재합니다!`);
            idEl.value = ' '; // 초기화
            passwordEl.value = ' '; //초기화
            return;
        }
        // 유저가 회원가입이 가능하다면
        registerUser({id: idValue, password: passwordValue});
        alert('회원가입 완료!');
        location.href = './signin.html';
    });
};

document.addEventListener('DOMContentLoaded', init); 