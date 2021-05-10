'use strict';

// const getStocks = require("../routes/stocks");

const logoutBtn = new LogoutButton;

logoutBtn.action = () => {
    return ApiConnector.logout(() => location.reload());
};

ApiConnector.current(response => {
    if (response.success === true) {
        return ProfileWidget.showProfile(response.data);
    };
    return alert(response.error);
});

const currentRates = new RatesBoard;

currentRates.fillTable(ApiConnector.getStocks(response => console.log(response.success)))