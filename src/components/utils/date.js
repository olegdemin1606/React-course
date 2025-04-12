export function calculateAge(birthDateString) {
    const [year, month, day] = birthDateString.split('-').map(Number);
    const birthDate = new Date(year, month - 1, day); // Месяцы в JavaScript начинаются с 0
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const hasHadBirthday = (today.getMonth() > birthDate.getMonth()) ||
                           (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

    if (!hasHadBirthday) {
        age--;
    }
    return age;
}

export function getCurrentDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Месяцы в JS начинаются с 0
    const year = today.getFullYear();

    return `${year}-${month}-${day}`;
}

