const baseUrl = 'https://api-wilayah-indonesia-firebase.firebaseio.com/wilayah/';

export const ArrAPI = (url, callback) => {
    fetch(baseUrl + url + '.json')
        .then(function (response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                return
            }
            response
                .json()
                .then(function (data) {
                    let arr = [];
                    Object
                        .values(data)
                        .forEach((val) => {
                            arr.push(val)
                        });
                    callback(arr)
                })
        })
        .catch(function (err) {
            console.log('Fetch Error :-S', err)
        })
};

export const getDataItem = async(region, id) => {
	const response = await fetch(baseUrl + region + '/' + id + '.json')
	const json = await response.json()
	return json.name
}