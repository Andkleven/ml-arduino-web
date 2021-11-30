<script>
	import { onMount } from "svelte";
	import * as tf from "@tensorflow/tfjs";
	import * as tmImage from "@teachablemachine/image";
	const URL = "https://teachablemachine.withgoogle.com/models/JMtniqs-n/";
	let videoEl;
	let errorMessage;
	let model;
	let loading = true;
	let percentage = "";
	let name = "";
	let lastPrediction = "";
	const modelURL = URL + "model.json";
	const metadataURL = URL + "metadata.json";
	onMount(async () => {
	  try {
		model = await tmImage.load(modelURL, metadataURL);
		const stream = await navigator.mediaDevices.getUserMedia({ video: true });
		videoEl.srcObject = stream;
		videoEl.play();
		setInterval(predict, 2000);
		loading = false;
	  } catch (e) {
		console.error(e, "camera access denied");
		errorMessage = "Camera Access Denied";
	  }
	});
	async function predict() {
	  const predictions = await model.predict(videoEl);
	  const [choosenPrediction] = predictions.sort(
		(a, b) => b.probability - a.probability
	  );
	  if (choosenPrediction) {
		percentage = (choosenPrediction.probability * 100).toFixed(2) + "%";
		name = classNameToLabel(choosenPrediction.className);
		let label = choosenPrediction.className
		console.log(label, lastPrediction)
		if (label !== lastPrediction && 0.7 < choosenPrediction.probability) {
			console.log(1)
			fetch(
			  `http://localhost:3000/${label}`,
			  {
				method: "GET"
			}
			).then((res) => {
				console.leg(res)
				lastPrediction = label;
			}).catch((e)=> {
			console.error(e);
			})
		}
	  }
	}
	function classNameToLabel(className) {
	  switch (className) {
		case "meg":
		  return "Kom inn";
		case "ikkeMeg":
		  return "Gå bort";
		default:
		  return "Nothing";
	  }
	}
  </script>
  
  <style>
	main {
	  width: 100%;
	  height: 100vh;
	  padding: 0;
	  box-sizing: border-box;
	  position: absolute;
	}
	video {
	  display: block;
	  margin: 20px auto;
	}
	h1,
	h2 {
	  text-align: center;
	}
	h1 {
	  font-size: 40px;
	}
	h2 {
	  font-size: 20px;
	}
  </style>
  
  <main>
	<h1>Machine Learning</h1>
	<video bind:this={videoEl} width="600" height="480" />
  
	{#if errorMessage}
	  <h2 style="color: red;">{errorMessage}</h2>
	{:else if loading}
	  <h2>Loading ...</h2>
	{:else if percentage && name}
	  <h2>AI {percentage} certain it's a {name}</h2>
	{/if}
  </main>