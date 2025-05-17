document.addEventListener("DOMContentLoaded", () => {
    const usernameElement = document.getElementById("profile-username");
    const userLoginElement = document.getElementById("user-login");
    const userDate = document.getElementById("user-date");
    const userGender = document.getElementById("user-gender")
    const userLastTestResult = document.getElementById("last-test-result")

    const logoutButton = document.getElementById("logout-button2");

    const login = sessionStorage.getItem("login");
    const date = sessionStorage.getItem("date");
    const gender = sessionStorage.getItem("gender");
    const lastTestResult = sessionStorage.getItem("lastScore");

    let formattedDate = date;
    if (date) {
        const [year, month, day] = date.split("-");
        formattedDate = `${day}.${month}.${year}`;
    }

    usernameElement.textContent = login;
    userLoginElement.textContent = login;
    userDate.textContent = formattedDate;
    userGender.textContent = gender;

    if (lastTestResult) {
        userLastTestResult.textContent = `Вы набрали ${lastTestResult} из 6 возможных баллов`;
    } else {
        userLastTestResult.textContent = "Вы еще не проходили тест";
    }


    logoutButton.addEventListener("click", () => {
        sessionStorage.clear();
        window.location.href = "auth.html";
    });
})



