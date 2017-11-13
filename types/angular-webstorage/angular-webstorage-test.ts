// Samples taken from the a0-angular-storage Readme.md
var app = angular.module('angular-webstorage-tests', ['webStorageModule']);

angular.module('angular-storage-tests')
    .controller('StoreController', (webstorage: ng.IWebStorageService) => {
        var testObject = {
            test: 'Root-Core'
        };

        if (webstorage.isSupported) {
            console.log('Webstorage is supported');
        }

        webstorage.prefix('ws_')
        console.log('Should be true', webstorage.prefix() === 'ws_');

        webstorage.set('test1', testObject, true);
        webstorage.set<string>('test2', 'Generic', true);

        let got1 = webstorage.get('test1');
        let got2 = webstorage.get('test2');

        console.log('Should be true', webstorage.has('test1'));
        console.log('Should be true', webstorage.has('test2', true));

        console.log('Should be true', angular.equals(got1, testObject));
        console.log('Should be true', angular.equals(got2, 'Generic'));

        console.log('Should be true', webstorage.key(0) === 'test1');
        console.log('Should be true', webstorage.key(1, true) === 'test2');

        webstorage.remove('test1', true);
        console.log('Should be true', webstorage.length() === 1);

        webstorage.clear(true);
        console.log('Should be true', webstorage.length() === 0);

        webstorage.errorName('wsError');
        console.log('Should be true', webstorage.errorName() === 'wsError');

        let localApi = webstorage.local;
        let sessionApi = webstorage.session;
        let memoryApi = webstorage.memory;

        console.log('local-Api', localApi);
        console.log('session-Api', sessionApi);
        console.log('memory-Api', memoryApi);

        console.log('Should be true', memoryApi.isSupported());
        console.log('Should be false', memoryApi.isPolyfilled());
    });
