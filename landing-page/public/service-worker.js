console.log("Cleanup Service Worker Starting");

caches.keys()
    .then(keys =>
        Promise.all(
            keys.map(async key => console.log("caches.delete", key, await caches.delete(key)))))
    .then(async () => {
        console.log("registration.unregister", await registration.unregister());
    })
    .then(() => console.log("DONE"))
    .catch(console.error);