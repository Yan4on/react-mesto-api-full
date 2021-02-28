// Объект с проверками для каждого поля
export const validators = {
    name: {
        required: (value) => { return value === '' },
        minLength: (value) => { return value.length < 2 }
    },
    about: {
        required: (value) => { return value === '' },
        minLength: (value) => { return value.length < 2 }
    },
    link: {
        required: (value) => { return value === '' },
        http: (value) => { return httpCheck(value) }
    },
    avatar: {
        required: (value) => { return value === '' },
        http: (value) => { return httpCheck(value) }
    }
};

function httpCheck(value) {
    // eslint-disable-next-line
    return !(/(^https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i).test(value);
}