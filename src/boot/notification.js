import store from "./../store";

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    // Now safe to use device APIs
    const token = store().getters["Auth/token"];

    if (token.access_token) {
        store().dispatch('Notif/init')
    }
}
