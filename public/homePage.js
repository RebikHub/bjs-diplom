'use strict';

const logoutBtn = new LogoutButton;
const currentRates = new RatesBoard;
const userMoney = new MoneyManager;

logoutBtn.action = () => ApiConnector.logout(() => location.reload());

ApiConnector.current(response => {
    if (response.success === true) {
        return ProfileWidget.showProfile(response.data);
    };
    return alert(response.error);
});

ApiConnector.getStocks(data => {
    if (data.success === false) {
        return data.error;
    };
    return currentRates.fillTable(data.data);
});

userMoney.addMoneyCallback = (data) => {
    return ApiConnector.addMoney(data, (response) => {
        if (response.success === false) {
            return userMoney.setMessage(response.success, response.error);
        };
        ProfileWidget.showProfile(response.data);
        return userMoney.setMessage(response.success, 'ok!'); 
    });
};

userMoney.conversionMoneyCallback = (data) => {
    return ApiConnector.convertMoney(data, (response) => {
        if (response.success === false) {
            return userMoney.setMessage(response.success, response.error);
        };
        ProfileWidget.showProfile(response.data);
        return userMoney.setMessage(response.success, 'ok!'); 
    });
};

userMoney.sendMoneyCallback = (data) => {
    return ApiConnector.transferMoney(data, (response) => {
        if (response.success === false) {
            return userMoney.setMessage(response.success, response.error);
        };
        ProfileWidget.showProfile(response.data);
        return userMoney.setMessage(response.success, 'ok!'); 
    });
};