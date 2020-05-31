//Template 1 Add Watermark
{
	"steps": {
		"video_resized": {
			"use": ":original",             //pipes in files uploaded from uppy
		  "robot": "/video/encode",       //specifies which Robot we will use
			"result": true,
			"ffmpeg_stack": "v3.3.3",
			"resize_strategy": "fillcrop",  //Sets a resize strategy which will crop to the exact dimensions specified. We have other options available
		  "height": 1280,
	  	"preset": "ipad-high",          //Presets bring a number of values over to your assembly without needing to specify them such as bit rate
			"width": 720
		},
		"invert_watermarked": {
			"use": "video_resized",         //pipes over our resize step which we named above
	  	"robot": "/video/encode",
	  	"result": true,
	  	"ffmpeg_stack": "v3.3.3",
	  	"preset": "empty",              //No need to bring over a preset as we are just piping over our past step.
	  	"watermark_size": "35%",        //Size of the watermark
	  	"watermark_opacity": 0.7,       //Value which specifes how transparent a value is
	  	"watermark_position": "top-right",
	  	"watermark_url": "https://demos.transloadit.com/inputs/transloadit-padded.png"
		}
	}
}

//Template 2 convert video to grayscale
{
  "steps": {
    "video_resized": {
      "use": ":original",
      "robot": "/video/encode",
      "result": true,
      "ffmpeg_stack": "v3.3.3",
      "resize_strategy": "fillcrop",
      "height": 1280,
      "preset": "ipad-high",
      "width": 720
    },
    "encode-grayscale": {
      "use": "video_resized",
      "robot": "/video/encode",
      "result": true,
      "ffmpeg_stack": "v3.3.3",
      "preset": "empty",
      "ffmpeg": {                   //FFMpeg allows for custom features and specifications to be applied. It is what we use behind the scenes for many of our bots
        "vf": "hue=s=0"             //Converts video to grayscale
      }
    }
  }
}

//Template 3 
