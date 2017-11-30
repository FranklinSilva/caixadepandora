( function () {

	'use strict';
	//TODO - Refactor this service
	function LocalDatabaseService ($q){
		var request, localDb;

		var deferred = $q.defer();

		return LocalDatabaseService = {
			openDatabase: openDatabase,
			clearObjectStore: clearObjectStore,
			addDataToLocalDatabase: addDataToLocalDatabase,
			removeDataFromLocalDatabase: removeDataFromLocalDatabase,
			getDataFromLocalDatabase: getDataFromLocalDatabase,
			getDatabase: getDatabase
		}

		function openDatabase(name, version){
			var deferred = $q.defer();
			var setUp;
			if(setUp){
				deffered.resolve(true);
				return deferred.promise;
			}
			
			request = window.indexedDB.open(name, version);
			 	request.onError = function(e){
		  			console.log("Database error: " + e.target.errorCode);
				};

				request.onsuccess = function(event){
					localDb = event.target.result;
					setUp = true;
		            deferred.resolve(true);
				}

				request.onupgradeneeded = function(event) { 
				  localDb = event.target.result;
				  console.log(localDb);
				  // Create an objectStore for this database
				  if(localDb.objectStoreNames.length < 1){
					  var box = localDb.createObjectStore("box", { keyPath: "key" });
					  box.createIndex("id", "id", { unique : true }); //creating index to seach and setting attribute to be unique or not
			          box.createIndex("text", "text", { unique : false });
			          box.createIndex("level", "level", { unique : false });
			          box.createIndex("type", "type", { unique : false });
			          box.createIndex("used", "used", { unique : false });
			          box.createIndex("favorited", "favorited", { unique : false });
				  }
		          
				};

			return deferred.promise;

		}

		function getObjectStore(storeName, mode){
			var tx = localDb.transaction(['localDb'], mode);
			return tx.objectStore(storeName);
		}	

		function clearObjectStore(storeName){
			var transaction = localDb.transaction([storeName], 'readwrite');
			var objectStore = transaction.objectStore(storeName)
			var request = objectStore.clear()
			
			request.onsuccess = function(evt) {
				console.log("Store cleared");
			}
			request.onerror = function (evt) {
		  		console.error("clearObjectStore:", evt.target.errorCode);
			};

		}

		function addDataToLocalDatabase(objectStore, mode, data){
			var transaction = localDb.transaction([objectStore], mode);
			transaction.oncomplete = function(evt){
			}
			transaction.onerror = function(evt){
			}
			var objectStored = transaction.objectStore(objectStore);
			for (var i in data){
				var request = objectStored.add(data[i]);
				request.onsuccess = function(evt){
				}
				request.onerror = function(evt){
				}
			}
		}

		function removeDataFromLocalDatabase (objectStore, mode, data){
			var transaction = localDb.transaction([objectStore], mode);
			transaction.oncomplete = function(evt){
			}
			transaction.onerror = function(evt){
				console.log(evt);
			}
			var objectStored = transaction.objectStore(objectStore);
			var request = objectStored.delete(data);
			request.onsuccess = function(evt){
			}
			request.onerror = function(evt){
				console.log(evt);
			}
			/*for (var i in data){
				var request = objectStored.delete(data[i]);
				request.onsuccess = function(evt){
				}
			}*/
		}

		function getDataFromLocalDatabase(key, objectStore){

			var value;

			var deferred = $q.defer();

			var transaction = localDb.transaction([objectStore]);
			
			var objectStored = transaction.objectStore(objectStore)
		    
		    var request = objectStored.get(key);
		    
		    request.onsuccess = function(evt) {
		    	LocalDatabaseService.objectGet = evt.target.result;
		    	deferred.resolve(LocalDatabaseService.objectGet);
		    };
		    
		    request.onerror = function(evt) {
		    }

		    request.oncomplete = function(evt) {
		      deferred.resolve(value);

		    };

		    return deferred.promise;
		}

		//Need to workaround database structure to make this function usable. 
		//For now, every update will be done in the controller after get data using 
		//getDataFromLocalDatabase()
		/*function updateDataFromLocalDatabase(key, objectStore, itemGet, itemSet){

			var value;

			var deferred = $q.defer();

			var transaction = localDb.transaction([objectStore]);
			
			var objectStored = transaction.objectStore(objectStore)
		    
		    var request = objectStored.get(key);
		    
		    request.onsuccess = function(evt) {
		    	var objectUpdate = evt.target.result;
		    	objectUpdate = itemSet;

		    	var requestUpdate = objectStore.put(objectUpdate);
		    	requestUpdate.onerror = function(evt){
		    		console.log("Error "+evt);
		    	}
		    	requestUpdate.onsuccess = function(evt){
		    		deferred.resolve(objectUpdate);
		    		console.log('success');
		    		console.log(evt);
		    	}
		    };
		    
		    request.onerror = function(evt) {
		    }

		    request.oncomplete = function(evt) {
		      deferred.resolve(value);

		    };

		    return deferred.promise;

		}*/

		function getDatabase() {
			return localDb;
		}
	}

	angular
	.module('pandoraBoxApp')
	.service('LocalDatabaseService', LocalDatabaseService);

	LocalDatabaseService.$inject = ['$q'];
} )();