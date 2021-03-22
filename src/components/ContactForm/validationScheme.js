export function isRequired(value) {
    return !!value ? undefined : "Field is Required!";
}
export function maxLength(length) {
    return function (value) {
        return value.length <= length ? undefined : `Max length of this field: ${length}`;
    }
}
export function minLength(length) {
    return function (value) {
        return value.length >= length ? undefined : `Min length of this field: ${length}`;
    }
}

export function emailValidation(email) {
    if (
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            email,
        )
    ) {
        return undefined;
    }

    return 'Please enter a valid email';
}

export function isAllValid(formData) {
    for (let key in formData) {
        if (typeof formData[key] === "object" && !formData[key].valid)
            return false;
    }
    return true;
}
