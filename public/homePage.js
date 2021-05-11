'use strict';

const logoutBtn = new LogoutButton;
const currentRates = new RatesBoard;
const usersMoney = new MoneyManager;
const userFavorites = new FavoritesWidget;

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

usersMoney.addMoneyCallback = (data) => {
    return ApiConnector.addMoney(data, (response) => {
        if (response.success === false) {
            return usersMoney.setMessage(response.success, response.error);
        };
        ProfileWidget.showProfile(response.data);
        return usersMoney.setMessage(response.success, 'ok!'); 
    });
};

usersMoney.conversionMoneyCallback = (data) => {
    return ApiConnector.convertMoney(data, (response) => {
        if (response.success === false) {
            return usersMoney.setMessage(response.success, response.error);
        };
        ProfileWidget.showProfile(response.data);
        return usersMoney.setMessage(response.success, 'ok!'); 
    });
};

usersMoney.sendMoneyCallback = (data) => {
    return ApiConnector.transferMoney(data, (response) => {
        if (response.success === false) {
            return usersMoney.setMessage(response.success, response.error);
        };
        ProfileWidget.showProfile(response.data);
        return usersMoney.setMessage(response.success, 'ok!'); 
    });
};

ApiConnector.getFavorites(response => {
    if (response.success === false) {
        return userFavorites.setMessage(response.success, response.error);
    };
    userFavorites.clearTable();
    userFavorites.fillTable(response.data);
    usersMoney.updateUsersList(response.data);
    return;
});

userFavorites.addUserCallback = (data) => {
    return ApiConnector.addUserToFavorites(data, (response) => {
        if (response.success === false) {
            return userFavorites.setMessage(response.success, response.error);
        };
        userFavorites.clearTable();
        userFavorites.fillTable(response.data);
        usersMoney.updateUsersList(response.data);
        return userFavorites.setMessage(response.success, 'ok!');
    });
};

userFavorites.removeUserCallback = (id) => {
    return ApiConnector.removeUserFromFavorites(id, (response) => {
        if (response.success === false) {
            return userFavorites.setMessage(response.success, response.error);
        };
        userFavorites.clearTable();
        userFavorites.fillTable(response.data);
        usersMoney.updateUsersList(response.data);
        return userFavorites.setMessage(response.success, 'ok!');
    });
};