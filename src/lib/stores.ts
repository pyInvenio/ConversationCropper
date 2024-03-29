import { writable } from 'svelte/store';

export const tags = writable([
	'enthusiasm',
	'topic',
	'ph-range',
	'ph-limit',
	'ph-target',
	'manganese-level',
	'timeline',
	'weather',
	'delivery-method'
]);

export const parsedData = writable({});
export const transcript = writable('');
transcript.set(
	"Can you tell me a bit more about your farm? How many acres do you guys farm? It ain't quite 500. About 500? Yeah. Got it, and what crops do you grow? Soybeans, corn, produce, strawberries, we do sweet corn, pumpkins. Okay. Little tobacco, nothing but. Got it, got it. And then do you have any acres where you still need lime for the spring? Yes, sir. How many acres is that? It's probably around 50. About 50? Yeah. Okay, and how much lime would you apply on those fields if you had it? Probably a ton. About a ton? I did a soil sample last year, it came off a half a ton, so I didn't put any last year, so it probably needs a ton each year, I would think. Okay, yeah, that makes sense. And what pH do you usually try to get your soils to? I think on the vine, it's around six, so that's what we try to do every time. Got it, I see. Would you be open to going a little bit higher on these 50 acres, just to try it out? Yes, sir. Okay. Okay. So, yeah, one thing to know is that, so the application rates for this material, the material is called basalt. It's a volcanic rock, it's the most common volcanic rock in the world. And so the inherent liming ability of the material is a little bit lower, because it actually has a lot of silicon. So I don't know if you guys have ever participated in one of these pumpkin competitions, where you try to get the largest pumpkin or something. Like a lot of folks put silicon into their soils for that. So it should also help with growth usually, and yield increases here and there. I'm not promising that, but the data has been pretty good on that, but no promises made on that. But yeah, so the application rate is gonna be a little bit higher than normally, but if you'd be open to going up to a little bit higher pH, we like to put out a little bit more material, because that's better from a carbon perspective. But obviously we don't wanna do anything that's bad for your soils. But in our trials with the University of Illinois, we've run eight year trials now. Every year we put out 20 tons to the ABA, or so just to see what happens if you put like a crazy amount out. And we've never seen any yield decreases, no heavy metal buildup or anything like that. So it's really safe material. Okay. Yeah. Would you guys be able to send me those soil test results that you pulled last year, or the most recent results that you have for this farm through email, is that possible? Yeah, okay. Okay. I'll text you my email address. And then the other question I have is, do you have maps for your farm as well? Oh, I've got some here for the site now. Yeah, do you have those digitally, or do you have those printed out? I got them printed out. Got it. Would you be able, so sometimes what folks, because I kind of need the maps to be able to know exactly where the fields are and things like that. If you can call the FSA representative, they can just email them to me directly. They've been doing this a lot for me. So if you give them a call and you tell them my email address, then they can send those to me directly. Okay. Yeah. And then when are you guys planting on this field? Like how quickly do we need to get your material? Probably in the next probably three weeks or so. Okay. Okay, we should be able to do that. Yeah. You guys, who does the spreading for you usually? Well, we have a spreader truck. Okay. What kind of spreader is it? It's a new little, it's an international truck with a new little bed. Okay. And is it, does it have a chain or a belt or something at the bottom? It has a chain. Or something at the bottom? It has a belt. A belt. Okay, perfect. Yeah, that's great. And you know how the width of it is an inch? Yeah. Okay, got it. Got it. Yeah, that should work. Would you be open to spreading the material yourself? Do you have time for that? Otherwise we can help you find a spreader. I guess we would be open to it. Yeah, we could do it. You could do it? You think so? Yes, sir. Okay. Do you know how, like how many tons does the spreader hold usually? Oh, well, I've got probably about four or five tons of the land. Okay. Okay, yeah, I got it. Yeah, the density of the material is very similar to lime. So it'll be holding about four or five tons as well. And I would guess, you know, if you, if you haven't limed that land and you'd be open to going up a little bit, you'd probably, we'd probably want to apply sort of six or seven tons to the acre, I think. So, you know, you probably, you probably want to do sort of one or two passes on each acre. Would that be, would that work for you guys? Yeah. Yeah? Okay, excellent. Any other questions that I can answer? No, I don't think so. Okay. I don't have. Okay, so what I'll do is Charles, sorry, Jack, I'll send you my, I'll send you my email address through text and then if you can send me your soil sample results and then if you can call the FSA to send me those maps, then we'll take it from there. Okay. Yeah. Yep, sounds good. Great, and then maybe you can, when you send me the maps or when the FSA sends me the maps, can you just let me know what the name of the field is or the like tract ID and the farm ID of those fields that you, that still need the lime? Okay. Yeah? Yeah, sure. Maybe once I have those, I'll just give you another call and we can talk it through. Okay. Okay. Excellent. All right, see ya."
);

parsedData.set({
	enthusiasm: {
		frequency: 'consistently',
		data: 'N/A',
		sentences: 'N/A'
	},
	topic: {
		frequency: 'once',
		data: '500 acres, crops: soybeans, corn, produce, strawberries, sweet corn, pumpkins, little tobacco',
		sentences: "It ain't quite 500. About 500? Yeah."
	},
	'ph-limit': {
		frequency: 'once',
		data: '6.0',
		sentences: "I think on the vine, it's around six, so that's what we try to do every time."
	},
	'ph-target': {
		frequency: 'twice',
		data: 'higher than 6.0',
		sentences:
			'Would you be open to going a little bit higher on these 50 acres, just to try it out? Yes, sir.'
	},
	timeline: {
		frequency: 'once',
		data: 'next three weeks',
		sentences: 'Probably in the next probably three weeks or so.'
	},
	lime_application: {
		frequency: 'four times',
		data: '50 acres, 1 ton per acre',
		sentences: "It's probably around 50. About 50? Yeah. Probably a ton. About a ton?"
	},
	basalt_information: {
		frequency: 'once',
		data: 'volcanic rock, lower liming ability, silicon, growth and yield benefits',
		sentences:
			"So the application rates for this material, the material is called basalt. It's a volcanic rock, it's the most common volcanic rock in the world."
	},
	soil_test_results: {
		frequency: 'once',
		data: 'N/A',
		sentences:
			'Would you guys be able to send me those soil test results that you pulled last year, or the most recent results that you have for this farm through email, is that possible? Yeah, okay.'
	},
	farm_maps: {
		frequency: 'once',
		data: 'printed out, request from FSA',
		sentences: 'I got them printed out. Got it.'
	},
	action_items:[
		"Send soil test results to tech startup representative",
		"Send farm maps to tech startup representative",
		"Apply basalt to 50 acres of land",
	]
});
