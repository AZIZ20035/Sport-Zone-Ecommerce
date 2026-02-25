export class User {
    constructor({ name = '', email = '', password = '' } = {}) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    validate(confirmPassword = '') {
        const errors = {};

        if (!this.name.trim()) {
            errors.name = 'Name is required';
        } else if (this.name.trim().length < 3) {
            errors.name = 'Name must be at least 3 characters';
        }

        if (!this.email.trim()) {
            errors.email = 'Email is required';
        } else if (!this.email.includes('@') || !this.email.includes('.')) {
            errors.email = 'Please enter a valid email address';
        }

        if (!this.password) {
            errors.password = 'Password is required';
        } else if (this.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }

        if (confirmPassword !== this.password) {
            errors.confirmPassword = 'Passwords do not match';
        }

        const valid = Object.keys(errors).length === 0;
        return { valid, errors };
    }

    save() {
        const users = User.getAllUsers();
        const exists = users.some((u) => u.email.toLowerCase() === this.email.toLowerCase());
        if (exists) {
            return { success: false, message: 'Email is already registered' };
        }
        users.push({ name: this.name, email: this.email, password: this.password });
        localStorage.setItem('sportzone_users', JSON.stringify(users));
        return { success: true };
    }

    static authenticate(email, password) {
        const users = User.getAllUsers();
        const user = users.find(
            (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );
        if (user) {
            const { name, email: userEmail } = user;
            localStorage.setItem('sportzone_loggedIn', JSON.stringify({ name, email: userEmail }));
            return { success: true, user: { name, email: userEmail } };
        }
        return { success: false, message: 'Invalid email or password' };
    }

    static getAllUsers() {
        const data = localStorage.getItem('sportzone_users');
        return data ? JSON.parse(data) : [];
    }

    static getLoggedInUser() {
        const data = localStorage.getItem('sportzone_loggedIn');
        return data ? JSON.parse(data) : null;
    }

    static logout() {
        localStorage.removeItem('sportzone_loggedIn');
    }
}
