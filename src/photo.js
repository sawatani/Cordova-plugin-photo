var FEATURE_NAME = 'Photo'

var taker = function(source, onSuccess, onError) {
	var options = {
		correctOrientation: true,
		mediaType: navigator.camera.MediaType.PICTURE,
        encodingType: Camera.EncodingType.JPEG,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: source
	};
	navigator.camera.getPicture(
		function(uri) {
			console.log("Resolving file uri: " + uri);
			resolveLocalFileSystemURL(uri,
				function(entry) {
					console.log("Loading file entry: " + entry);
					entry.file(
						function(file) {
							console.log("Reading file: " + file);
							var reader = new FileReader();
							reader.onload = function(event) {
								var array = reader.result;
								console.log("Creating Blob from ArrayBuffer: " + array);
								var blob = new Blob([array], 'image/jpeg')
								onSuccess(blob);
							};
							reader.onerror = function(event) {
								var error = reader.error;
								console.log("Failed to read file: " + error);
								onError(error);
							};
							reader.readAsArrayBuffer(file);
						},
						function(error) {
							console.log("Failed to load file: " + error);
							onError(error);
						}
					);
				},
				function(error) {
					console.log("Failed to resolve uri: " + error);
					onError(error);
				}
			);
		},
		function(error) {
			console.log("Failed to getPicture: " + error);
			onError(error);
		},
		options
	);
    console.log('Result: ' + some);
}

module.exports = {
    select : function(onSuccess, onError) {
        console.log(FEATURE_NAME + '#select');
        taker(Camera.PictureSourceType.PHOTOLIBRARY, onSuccess, onError);
    },
    take : function(onSuccess, onError) {
        console.log(FEATURE_NAME + '#take');
        taker(Camera.PictureSourceType.CAMERA, onSuccess, onError);
    }
};
