export function findPasswordChars(password: string): number {
    var count = 0;
    const specialCharRegex = /[!@#$%^&*()_+\-=~\[\]{};':"\\|,.<>\/?]+/;
    if (specialCharRegex.test(password)) count++;
    if (password !== password.toUpperCase()) count++;
    if (password !== password.toLowerCase()) count++;
    if(/\d/.test(password)) count++;
    return count;
  }

export function getPasswordLength(str: string): number {
    return str.length;
};
export function findPasswordComplexity(password: string): number {
    var power = 0;
    const specialCharRegex = /[!@#$%^&*()_+\-=~\[\]{};':"\\|,.<>\/?]+/;
    if (specialCharRegex.test(password)) power += 30;
    if (password !== password.toUpperCase()) power+= 26;
    if (password !== password.toLowerCase()) power+= 26;
    if(/\d/.test(password))  power+=10;
    return power;
  }