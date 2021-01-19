'use strict';

let getCategoryId = () => {
    let item = document.querySelector('.rows[checked="true"]');
    if (item === null || item.className !== "c rows ng-scope") return;
    return item.getElementsByTagName("td")[0].innerHTML;
}

let getTagId = () => {
    let item = document.querySelector('.rows[checked="true"]');
    if (item === null || item.className !== "t rows ng-scope") return;
    return item.getElementsByTagName("td")[0].innerHTML;
}

let getJsonForSending = (elem, type, str) => {
    let name = document.querySelector('#' + type + str + '_name').value;
    let description = document.querySelector('#' + type + str + '_description').value;
    // let icon =

    if (!name && !description) { // !name && !img to return
        alert('Empty form!');
        return undefined;
    }

    let formData = new FormData();
    if (elem !== null)
        formData.append('id', elem.id);
    formData.append('name', name);
    formData.append('description', description);
    // formData.append('newIcon', icon);

    let jsonString = formToJson(formData);
    console.log(jsonString);

    return jsonString;
}

let getJsonForSendingDelete = (elem, str) => {
    let formData = new FormData();
    formData.append('id', elem.id);
    formData.append('name', elem.name);
    formData.append('description', elem.description);

    let jsonString = formToJson(formData);
    console.log(jsonString);

    return jsonString;
}

angular.module("get_form", [])
    .controller("GetController", ["$scope", "$http", function ($scope, $http) {
        $scope.items = [];
        $scope.items_tags = [];
        $scope.getItems = function () {
            $http({
                method: "GET",
                url: "api/category/get",
                headers: {"Content-Type": "application/json"}
            }).then(
                function (data) {
                    console.log(data.data);

                    categories.items = data.data;
                    // tags.items = ;
                    
                    $scope.items = data.data;
                    $scope.items_tags = tags.items;
                },
                function (error) {
                    console.log("error")
                }
            );
        }
    }]);

let sendCreateCategory = async () => {

    let jsonString = getJsonForSending(null, 'add', 'category');
    if (jsonString === undefined) return;

    await send('api/category/create', jsonString, errorMsg);

}

let sendUpdateCategory = async () => {
    let id = getCategoryId();
    if (id === undefined) return;
    let elem = categories.items.find(element => element.id === Number.parseInt(id));

    let jsonString = getJsonForSending(elem, 'update', 'category');
    if (jsonString === undefined) return;

    await send('api/category/update', jsonString, errorMsg);

}

let sendDeleteCategory = async () => {
    let id = getCategoryId();
    if (id === undefined) return;
    if (!confirm('Delete this category?')) return;
    let elem = categories.items.find(element => element.id === Number.parseInt(id));

    let jsonString = getJsonForSendingDelete(elem, 'category');

    let errorMsg = 'You can\'t delete category when it uses in transactions. \n' +
        'Delete corresponding transaction first.';
    await send('api/category/delete', jsonString, errorMsg);

}

let sendCreateTag = async () => {
    let jsonString = getJsonForSending(null, 'add', 'tag');
    if (jsonString === undefined) return;

    await send('api/tag/create', jsonString, errorMsg);

}

let sendUpdateTag = async () => {
    let id = getTagId();
    if (id === undefined) return;
    let elem = tags.items.find(element => element.id === Number.parseInt(id));

    let jsonString = getJsonForSending(elem, 'update', 'tag');
    if (jsonString === undefined) return;

    await send('api/tag/update', jsonString, errorMsg);

}

let sendDeleteTag = async () => {
    let id = getTagId();
    if (id === undefined) return;
    if (!confirm('Delete this tag?')) return;
    let elem = tags.items.find(element => element.id === Number.parseInt(id));

    let jsonString = getJsonForSendingDelete(elem, 'tag');

    let errorMsg = 'You can\'t delete tag when it uses in transactions. \n' +
        'Delete corresponding transaction first.';
    await send('api/tag/delete', jsonString, errorMsg);

}
