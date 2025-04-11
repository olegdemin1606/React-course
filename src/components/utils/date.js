export function calculateAge(birthDateString) {
    const [day, month, year] = birthDateString.split('.').map(Number);
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