// Type definitions for angular-webstorage v0.14.0
// Project: https://github.com/fredricrylander/angular-webstorage
// Definitions by: Fabian Arndt <https://github.com/root-core>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.6.1

import * as angular from 'angular';

/**
 * WebStorage Service for AngularJS
 *
 * The webStorage service has both a generic and direct API. The generic
 * API will check for client support and preferred order before altering a
 * specific storage value, trying to degrade gracefully according to a set
 * heuristic. The direct APIs works with either the client's local, session
 * or the module's own in-memory storage engines.
 *
 * The selection heuristics for the generic API is mainly dictated by a set
 * order (defaults to `['local', 'session', 'memory']`.) If the client has no
 * support for the specified storage engine then the service will try to fall
 * back on the next specified engine and so forth.
 *
 * NOTE: The in-memory storage should really be seen as a last resort since
 * all its values will be lost on page reload (somewhat negating the whole
 * idea of client web storage!)
 *
 * If the client does not support local or session web storage the module will
 * try to mimic them by setting cookies on the current document.
 *
 * All errors will be broadcast via the `$rootScope` under a specific name
 * (defaults to: `webStorage.notification.error`.)
 *
 * The service provides the following generic methods:
 *
 * webStorage
 * - isSupported          -- boolean flag indicating client support status (local or session storage)
 * - add(key, value, all) -- [DEPRECATED: use `set`] add a value to storage under the specific key (storage according to 'order')
 * - set(key, value, all) -- add or set a value in storage under the specific key (storage according to 'order')
 * - get(key, all)        -- return the specified value (storage according to 'order')
 * - has(key, all)        -- checks if the given key exists (storage according to 'order')
 * - key(index, all)      -- returns the name of the nth key (storage according to 'order')
 * - length(all)          -- returns the number of items in the key/value store (storage according to 'order')
 * - remove(key, all)     -- remove a key/value pair from storage (storage according to 'order')
 * - clear(all)           -- remove all key/value pairs from storage (storage according to 'order')
 * - errorName(str)       -- get or set the name of the event that is broadcast over the $rootScope on errors
 * - prefix(str)          -- get or set the prefix used for keys while operating on storage values
 * - order(array)         -- get or set the order by which storage models are iterated (defaults to ['local', 'session', 'memory'])
 *
 * It also provides the following direct APIs:
 *
 * webStorage.local
 * - isSupported          -- boolean flag indicating client support status (local storage)
 * - add(key, value)      -- [DEPRECATED: use `set`] add a value to storage under the specific key (local storage)
 * - set(key, value)      -- add or update a value in storage under the specific key (local storage)
 * - get(key)             -- return the specified value (local storage)
 * - has(key)             -- checks if the given key exists (local storage)
 * - key(index)           -- return the name of the nth key (local storage)
 * - length()             -- returns the number of items in storage (local storage)
 * - remove(key)          -- remove a key/value pair from storage (local storage)
 * - clear()              -- remove all key/value pairs from storage (local storage)
 * - isPolyfilled(remove) -- returns `true` if local storage is polyfilled, if `remove` is true then the polyfill is removed (local storage)
 *
 * webStorage.session
 * - isSupported          -- boolean flag indicating client support status (session storage)
 * - add(key, value)      -- [DEPRECATED: use `set`] add a value to storage under the specific key (session storage)
 * - set(key, value)      -- add or set a value in storage under the specific key (session storage)
 * - get(key)             -- return the specified value (session storage)
 * - has(key)             -- checks if the given key exists (session storage)
 * - key(index)           -- return the name of the nth key (session storage)
 * - length()             -- returns the number of items in storage (session storage)
 * - remove(key)          -- remove a key/value pair from storage (session storage)
 * - clear()              -- remove all key/value pairs from storage (session storage)
 * - isPolyfilled(remove) -- returns `true` if session storage is polyfilled, if `remove` is true then the polyfill is removed (session storage)
 *
 * webStorage.memory
 * - isSupported     -- boolean true, the in-memory storage is always supported
 * - add(key, value) -- [DEPRECATED: use `set`] add a value to storage under the specific key (in-memory storage)
 * - set(key, value) -- add or set a value in storage under the specific key (in-memory storage)
 * - get(key)        -- return the specified value (in-memory storage)
 * - has(key)        -- checks if the given key exists (in-memory storage)
 * - key(index)      -- return the name of the nth key (in-memory storage)
 * - length()        -- returns the number of items in storage (in-memory storage)
 * - remove(key)     -- remove a key/value pair from storage (in-memory storage)
 * - clear()         -- remove all key/value pairs from storage (in-memory storage)
 * - isPolyfilled()  -- always returns `false` (in-memory storage)
 */

declare module 'angular' {

    export type WebStorageType = ('session' | 'local' | 'memory');

    export interface IWebStorageService {

        /**
         * This flag indicates the client support status (local or session storage)
         * @type {boolean}
         */
        isSupported: boolean;
        //add(key: string, value: any, all?: boolean): void;   //[DEPRECATED: use `set`] add a value to storage under the specific key (storage according to 'order')
        //add<T>(key: string, value: T, all?: boolean): void;  //[DEPRECATED: use `set`] add a value to storage under the specific key (storage according to 'order')

        /**
         * This function adds or sets a value in the storage (according to 'order') under the specific key.
         * @see order
         * @param {string} key - The key, which the value gets assigned to.
         * @param {any} value - The value, that gets assigned to the specified key.
         * @param {boolean} [all=false] - Should the value set for all storages?
         */
        set(key: string, value: any, all?: boolean): void;

        /**
         * This function adds or sets a value in the storage (according to 'order') under the specific key.
         * @see order
         * @param {string} key - The key, which the value gets assigned to.
         * @param {any} value - The value, that gets assigned to the specified key.
         * @param {boolean} [all=false] - Should the value set for all storages?
         * @template T - The type of value, that should be stored.
         */
        set<T>(key: string, value: T, all?: boolean): void;

        /**
         * This function returns the specified value from the storage (according to 'order').
         * @see order
         * @param {string} key - The key, which the value was assigned to.
         * @param {boolean} [all=true] - Should the key be tested for all storages? (First match returns)
         * @returns {any} - The value, that was assigned to the specified key. NULL if not found.
         */
        get(key: string, all?:boolean): any;

        /**
         * This function returns the specified value from the storage (according to 'order').
         * @see order
         * @param {string} key - The key, which the value was assigned to.
         * @param {boolean} [all=true] - Should the key be tested for all storages? (First match returns)
         * @returns {any} - The value, that was assigned to the specified key. NULL if not found.
         * @template T - The type of value, that should be returned.
         */
        get<T>(key: string, all?:boolean): T;

        /**
         * This function checks if the given key exists in the storage (according to 'order').
         * @see order
         * @param {string} key - The key, to check if an value was assigned to.
         * @param {boolean} [all=true] - Should the key be tested for all storages? (First match returns)
         * @returns {boolean} - True, if found.
         */
        has(key: string, all?: boolean): boolean;

        /**
         * This function returns the name of the nth key of the storage (according to 'order').
         * @see order
         * @param {number} index - The index to lookup.
         * @param {boolean} [all=true] - Should the key be searched in all storages? (First match returns)
         * @returns {string} - The name of an found index. NULL if not found.
         */
        key(index: number, all?: boolean): string;

        /**
         * This function returns the number of items in the storage (according to 'order').
         * @see order
         * @param {boolean} [all=true] - Should the lenght be queried for all storages (until a non 0 lenght was found)?
         * @returns {number} - The count of objects.
         */
        length(all?: boolean): number;

        /**
         * This function removes a key/value pair from storage (according to 'order').
         * @see order
         * @param {string} key - The key of the key/value pair to be removed.
         * @param {boolean} [all=true] - Should the key/value pair be removed from all storages?
         * @returns {boolean} - True, if the key/valie pair was removed.
         */
        remove(key: string, all?: boolean): boolean;

        /**
         * This function removes all key/value pairs from storage (according to 'order').
         * @see order
         * @param {boolean} [all=true] - Should all storages be cleared?
         * @returns {boolean} - True, if successful.
         */
        clear(all?: boolean): boolean;

        /**
         * This function sets the name of the event that is broadcast over the $rootScope on errors.
         * @see angular.IRootScopeService
         * @param {string} newName - The name to set for the thrown error.
         * @returns {boolean} - True, if successful.
         */
        errorName(newName: string): boolean;

        /**
         * This function gets the name of the event that is broadcast over the $rootScope on errors.
         * @see angular.IRootScopeService
         * @returns {string} - The used errors name.
         */
        errorName(): string;

        /**
         * This function sets the prefix used for keys while operating on storage values.
         * @param {string} newPrefix - The prefix, that should be used.
         * @returns {boolean} - True, if successful.
         */
        prefix(newPrefix: string): boolean;

        /**
         * This function gets the prefix used for keys while operating on storage values.
         * @returns {string} - The used prefix.
         */
        prefix(): string;

        /**
         * This function sets the order by which storage models are iterated.
         * @param {Array<WebStorageType>} newOrder - The new order to work with.
         */
        order(newOrder: Array<WebStorageType>): Array<WebStorageType>;

        /**
         * This function gets the order by which storage models are iterated.
         * @returns {Array<WebStorageType>} - The used order.
         */
        order(): WebStorageType[];

        /**
         * The local storage API.
         * @type {IWebStorage}
         */
        local: IWebStorage;

        /**
         * The session storage API.
         * @type {IWebStorage}
         */
        session: IWebStorage;

        /**
         * The memory storage API.
         * CAUTION: This is non persistent and will be cleared on reload.
         * @type {IWebStorage}
         */
        memory: IWebStorage;
    }

    /**
     * This interface represents one storage api. (eg. local, session, memory)
     * @see WebStorageType
     * @interface IWebStorage
     */
    interface IWebStorage {
        /**
         * This flag indicates the client support status (local or session storage).
         * @type {boolean} - Always true for storage 'memory'.
         */
        isSupported: boolean;
        //add(key:string, value:any):boolean;         //[DEPRECATED: use `set`] add a value to storage under the specific key (special storage)
        //add<T>(key:string, value:T):boolean;        //[DEPRECATED: use `set`] add a value to storage under the specific key (special storage)

        /**
         * This function adds or sets a value in this storage under the specific key.
         * @param {string} key - The key, which the value gets assigned to.
         * @param {any} value - The value, that gets assigned to the specified key.
         */
        set(key: string, value: any): boolean;

        /**
         * This function adds or sets a value in this storage under the specific key.
         * @param {string} key - The key, which the value gets assigned to.
         * @param {any} value - The value, that gets assigned to the specified key.
         * @template T - The type of value, that should be stored.
         */
        set<T>(key: string, value: T): boolean;

        /**
         * This function returns the specified value from this storage.
         * @param {string} key - The key, which the value was assigned to.
         * @returns {any} - The value, that was assigned to the specified key. NULL if not found.
         */
        get(key: string): any;

        /**
         * This function returns the specified value from this storage.
         * @param {string} key - The key, which the value was assigned to.
         * @returns {any} - The value, that was assigned to the specified key. NULL if not found.
         * @template T - The type of value, that should be returned.
         */
        get<T>(key: string): T;

        /**
         * This function checks if the given key exists in this storage.
         * @param {string} key - The key, to check if an value was assigned to.
         * @returns {boolean} - True, if found.
         */
        has(key: string): boolean;

        /**
         * This function returns the name of the nth key of this storage.
         * @param {number} index - The index to lookup.
         * @returns {string} - The name of an found index. NULL if not found.
         */
        key(index: number): string;

        /**
         * This function returns the number of items in this storage.
         * @returns {number} - The count of objects.
         */
        length(): number;

        /**
         * This function removes a key/value pair from this storage.
         * @param {string} key - The key of the key/value pair to be removed.
         * @returns {boolean} - True, if the key/valie pair was removed.
         */
        remove(key: string): boolean;

        /**
         * This function removes all key/value pairs from this storage.
         * @returns {boolean} - True, if successful.
         */
        clear(): boolean;

        /**
         * This function indicates, if this storage type was polyfilled.
         * @param {boolean} [remove]
         * @returns {boolean} - Always false for storage 'memory'.
         */
        isPolyfilled(): boolean;

        /**
         * This function removes the polyfill from this storage type.
         * CAUTION: This will have no effect on type 'memory'.
         * @param {boolean} remove - Should the polyfill be removed?
         * @returns {boolean} - The previos state. Always false for storage 'memory'.
         */
        isPolyfilled(remove: boolean): boolean;
    }
}
