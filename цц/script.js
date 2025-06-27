document.addEventListener('DOMContentLoaded', function() {
    // Установка минимальной даты приема (завтра)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];
    document.getElementById('appointmentDate').min = minDate;
    
    // Находим кнопку отправки
    const submitButton = document.getElementById('submitButton');
    
    // Вешаем обработчик на кнопку
    submitButton.addEventListener('click', function() {
        let isValid = true;
        
        // Сброс предыдущих ошибок
        document.querySelectorAll('.error').forEach(el => {
            el.textContent = '';
        });
        document.querySelectorAll('input').forEach(el => {
            el.classList.remove('invalid');
        });
        
        // Проверка ФИО
        const fullName = document.getElementById('fullName');
        if (!fullName.value || !/^[А-Яа-яЁё\s]+$/.test(fullName.value)) {
            document.getElementById('fullNameError').textContent = 'Введите ФИО нормально';
            fullName.classList.add('invalid');
            isValid = false;
        }
        
        // Проверка даты рождения
        const birthDate = document.getElementById('birthDate');
        if (!birthDate.value) {
            document.getElementById('birthDateError').textContent = 'Введите дату рождения';
            birthDate.classList.add('invalid');
            isValid = false;
        } else {
            const birthYear = new Date(birthDate.value).getFullYear();
            if (birthYear > 2006) {
                document.getElementById('birthDateError').textContent = 'Не позже 2006 года';
                birthDate.classList.add('invalid');
                isValid = false;
            }
        }
        
        // Проверка телефона
        const phoneNumber = document.getElementById('phoneNumber');
        if (!phoneNumber.value || !/^[0-9]{11}$/.test(phoneNumber.value)) {
            document.getElementById('phoneNumberError').textContent = 'Тут должно быть 11 цифр!';
            phoneNumber.classList.add('invalid');
            isValid = false;
        }
        
        // Проверка даты приема (если указана)
        const appointmentDate = document.getElementById('appointmentDate');
        if (appointmentDate.value && new Date(appointmentDate.value) < tomorrow) {
            document.getElementById('appointmentDateError').textContent = 'Не раньше завтрашнего дня';
            appointmentDate.classList.add('invalid');
            isValid = false;
        }
        
        // Проверка времени приема (если указано)
        const appointmentTime = document.getElementById('appointmentTime');
        if (appointmentTime.value) {
            const [hours, minutes] = appointmentTime.value.split(':').map(Number);
            if (hours < 8 || hours > 22 || (hours === 22 && minutes > 0)) {
                document.getElementById('appointmentTimeError').textContent = 'с 8:00 до 22:00!';
                appointmentTime.classList.add('invalid');
                isValid = false;
            }
        }
        
        if (isValid) {
            alert('Ваша заявка принята!');
            // Здесь можно отправить форму
            // document.getElementById('registrationForm').submit();
        } else {
            // Прокрутка к первой ошибке
            const firstError = document.querySelector('.invalid');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
    
    // Очистка ошибок при вводе
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', function() {
            if (this.classList.contains('invalid')) {
                this.classList.remove('invalid');
                const errorElement = document.getElementById(this.id + 'Error');
                if (errorElement) errorElement.textContent = '';
            }
        });
    });
});