( function () {

	'use strict';

	function BoxService (){

		var box = null;

		var boxItem = {};

		var refreshBox;

		return BoxService = {
			setCurrentBox : setCurrentBox,
			getCurrentBox : getCurrentBox,
			getSelectedBoxItem : getSelectedBoxItem,
			setBoxItemToBeViewed : setBoxItemToBeViewed,
			getBoxItemToBeViewed : getBoxItemToBeViewed,
			favoriteBoxItem: favoriteBoxItem,
			unfavoriteBoxItem: unfavoriteBoxItem,
			setRefreshBox: setRefreshBox,
			getRefreshBox: getRefreshBox
		}
	}

	function setCurrentBox( obj ){
		box = obj;
	}

	function getCurrentBox(){
		return box;
	}

	function getSelectedBoxItem( idItem ){
		for (var i = 0; i < box.length; i++) {
			if (box[i].id == idItem){
				return box[i];
			}
		}
	}

	function setBoxItemToBeViewed(id, text, level, type, used, favorited){
		boxItem.id = id;
		boxItem.text = text;
		boxItem.level = level;
		boxItem.type = type;
		boxItem.used = used;
		boxItem.favorited = favorited;
	}

	function getBoxItemToBeViewed(){
		return boxItem;
	}

	function favoriteBoxItem(id){
		boxItem.id = id;
		boxItem.favorited = true;
	}

	function unfavoriteBoxItem(id){
		boxItem.id = id;
		boxItem.favorited = false;
	}

	function setRefreshBox(refresh){
		refreshBox = refresh;
	}

	function getRefreshBox(){
		return refreshBox;
	}

	angular
	.module('pandoraBoxApp')
	.service('BoxService', BoxService);

	BoxService.$inject = [];
} )();