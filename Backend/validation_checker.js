import { ObjectId } from "mongodb";
import path from "path";
import fs from "fs";

const exportedMethods = {

    checkId(id) {
        if (!id) {
            throw new Error("No id is provided");
        }
        if (typeof id !== "string" || id.trim().length === 0) {
            throw new Error("The id provided is not a string or an empty string");
        }
        id = id.trim();
        if (!ObjectId.isValid(id)) {
            throw new Error("Invalid Object ID");
        }
        return id;
    },

    checkEmail(email) {
        if (!email) throw new Error("Please provide email");
        if (typeof email !== "string" || email.trim().length <= 0) throw new Error("Please provide a valid email");
        email = email.trim().toLowerCase();
        const emailPrefixRegex = /^[a-z0-9!#$%&'*+\-/=?^_`{|}~.]+@/i;
        const emailPostfixRegex = /@stevens\.edu$/i;
        if (!emailPrefixRegex.test(email)) {
            throw new Error("Email address should contain only letters, numbers, and common special symbols !#$%&'*+\\-/=?^_`{|} before the @ character");
        }
        if (!emailPostfixRegex.test(email)) {
            throw new Error("Error: Email address should end with stevens.edu");
        }
        return email;
    },

    checkPassword(password) {
        if (!password) throw new Error("Password not provided");
        if (typeof password !== "string") throw new Error("Password must be a string!");
        password = password.trim();
        if (password.length < 8 || password.length > 25) throw new Error("Password must be at least 8 characters and less than 25 characters");
        const spaceRegex = /\s/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[a-zA-Z\d\W]{8,25}$/;
        if (spaceRegex.test(password)) throw new Error("Password must not contain whitespace");
        if (!passwordRegex.test(password)) throw new Error("Password must contain at least 1 uppercase character, 1 lowercase character, 1 number, and 1 special character");
        return password;
    },


    checkName(name, valName) {
        if (!name) throw new Error(`${valName} not provided`);
        if (typeof name !== "string" || name.trim().length === 0) throw new Error(`Please provide a valid input of ${valName}`);
        name = name.trim();
        const nameRegex = /^[ a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`]+$/;
        if (!nameRegex.test(name)) throw new Error(`${valName} must only contain letters, numbers, and common special characters`);
        return name;
    },

    checkLegitName(name, valName) {
        if (!name) throw new Error(`${valName} not provided`);
        if (typeof name !== "string" || name.trim().length === 0) throw new Error(`Please provide a valid input of ${valName}`);
        name = name.trim();
        const nameRegex = /^[a-zA-Z]+$/;
        if (!nameRegex.test(name)) throw new Error(`${valName} must be only contain character a-z and A-Z`);
        if (name.length < 2) throw new Error(`${valName} length must be greater than 2 words`);
        if (name.length > 20) throw new Error(`${valName} length must be less than 20 words`);
        return name;
    },


    checkDOB(DOB) {
        if (!DOB) throw new Error("DOB not provided");
        if (typeof DOB !== "string" || DOB.trim().length === 0) throw new Error("Please provide a valid DOB");
        const dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
        if (!dateRegex.test(DOB)) throw new Error("Invalid date format, should be 'yyyy-mm-dd'");
        const [_, year, month, day] = DOB.match(dateRegex);

        const currentDate = new Date().toISOString().slice(0, 10);

        if (DOB > currentDate) {
            throw new Error("Date of birth must be in the past");
        }

        const minAgeDate = new Date();
        minAgeDate.setFullYear(minAgeDate.getFullYear() - 13); // Subtract 13 years from the current date

        const inputDate = new Date(DOB);
        if (inputDate > minAgeDate) {
            throw new Error("You must be at least 13 years old");
        }

        return DOB;
    },

    checkDate(date) {
        if (!date) throw new Error("Date not provided");
        if (typeof date !== "string" || date.trim().length === 0) throw new Error("Please provide a valid date");
        const dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
        if (!dateRegex.test(date)) throw new Error("Invalid date format, should be 'yyyy-mm-dd'");
        const [_, year, month, day] = date.match(dateRegex);
        const currentDate = new Date().toISOString().slice(0, 10);

        if (date < currentDate) {
            throw new Error("Date of event must be in the future");
        }
        return date;
    },


    checkAuth(authentication) {
        if (!authentication) return false;
        if (typeof authentication !== "string" || authentication.trim().length === 0) return false;
        authentication = authentication.trim().toLowerCase();
        return authentication === "getprivilege";
    },

};

export default exportedMethods;
