'use strict';

const userForm = new UserForm;

userForm.loginFormCallback = (data) => {
    return ApiConnector.login(data, (response) => {
        if (response.success === false) {
            return userForm.setLoginErrorMessage(response.error);
        }
        return location.reload();
    });
};

userForm.registerFormCallback = (data) => {
    return ApiConnector.register(data, (response) => {
        if (response.success === false) {
            return userForm.setRegisterErrorMessage(response.error);
        }
        return location.reload();
    });
};