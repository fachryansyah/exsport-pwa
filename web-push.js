var webPush = require('web-push')
var pushSubscription = {
	"endpoint" : "https://android.googleapis.com/gcm/send/ckExaVzSZ1Q:APA91bEIJ2VUtWKEX1xity1OmTa2kluqX3wHvct_DEfq9lTRd_h6U0-e_O_JQxVfRFx9RvZZrSDUb4AxjLesBFZ-pf4M23czddwinodgwiVVBD7C5jeboAy5r2QcEPTS7PMGmRi6QfIH",
	"keys" : {
		"p256dh": "BPfz5v1K1/DEl5TDWlL6c7fwLKYPoMOEIUMplNxHFGolgxzGGxOmwzXz40z4MeiszjV3X6reQM/tSj6Ep8urhV0=", 
        "auth": "b29DzRyvQ1CJbFx9JhHSGg=="
	}
}


var payload = "test payloadnya gan.."

var options = {
	gcmAPIKey : 'AAAASmJIBes:APA91bFbf2jQuAEr9ulnkA6R1GxdVsxBr_I7Bmz4dPu2_nj__f0TNK3SuyNGFOArnIgPDvD0pWoGHR1PSNY0HaRqyEL4TqkJAbplHtRtLMFKWGx6xqZ0WX12IWTq3qcNUlgbFhRVvdLt',
	TTL : 60
}

webPush.sendNotification(
	pushSubscription,
	payload,
	options
)