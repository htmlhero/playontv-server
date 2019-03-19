# HTTP API

* `/setVideo` (GET)
	* description — sets video info immediately. GET method used to circumvent browser restrictions.
	* parameters:
		* `url`
			* **required**: true
			* **type**: string
			* **description**: video URL
		* `title`
			* **required**: false
			* **type**: string
			* **description**: video title
	* response - empty

* `/getVideo` (GET)
	* description — gets video info immediately.
	* parameters — empty
	* response:
		* `url`
			* **required**: true
			* **type**: string
			* **description**: video URL
		* `title`
			* **required**: false
			* **type**: string
			* **description**: video title

* `/getVideoUpdate` (GET)
	* description — gets video info when it changes. It's a long-polling request.
	* parameters:
		* `url`
			* **required**: true
			* **type**: string
			* **description**: *old* video URL
		* `title`
			* **required**: false
			* **type**: string
			* **description**: *old* video title
	* response:
		* `url`
			* **required**: true
			* **type**: string
			* **description**: *new* video URL
		* `title`
			* **required**: false
			* **type**: string
			* **description**: *new* video title
