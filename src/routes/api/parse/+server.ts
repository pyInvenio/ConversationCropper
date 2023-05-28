import { OPEN_AI_KEY } from '$lib/server/config.js';
import { Configuration, OpenAIApi } from 'openai';

export const POST = async ({ request }) => {
  const body = await request.json();
  const transcript = body.transcript;
  const tags = body.tags;
  const accessToken = OPEN_AI_KEY;

  const prompt = `Given the provided transcript of a conversation between a farmer and a representative 
  from a tech startup specializing in agriculture-based carbon removal, please analyze the conversation. 
  Using the following categories ${tags}, determine the frequency of each topic's mention, any associated 
  data or statistics, and the sentences related to them in the form of {label:{data, frequency, sentences}}. 
  All of this should be listed under a high level "mentioned" section.
  Also, determine if there were any issues or blockers that were brought up during the conversation. 
  Based on the discussion, list the next steps as action items for the tech startup representative with the json label 
  "action-items", and propose some potential future questions (labeled "future-questions") for the representative 
  to ask the farmer in their next conversation. Also provide four relevant search terms to help the representative, 
  labeled "queries". If there are any possible "issues-or-blockers" for the farmer, put it in the json too. The output 
  should be in the JSON format. The transcript is ${transcript}. For your reference, here is an example of a JSON output: 
  {
    "mentioned": {
      "ph-range": {
        "mentions": 5,
        "data": {"ph-target": "6-6.5", "ph-limit": "7"},
        "sentences": [
          "We're doing potatoes, so we want to be 6.2, 6.3, anywhere from 6 to 6.5 is our target.",
          "Well, it is not so much. You know, we don't want to be, you know, 7 runs up a red flag.",
          "No, we don't want to be 7 or above."
        ]
      },
      "ph-limit": {
        "mentions": 2,
        "data": {"ph-limit": "7"},
        "sentences": [
          "Well, it is not so much. You know, we don't want to be, you know, 7 runs up a red flag.",
          "No, we don't want to be 7 or above."
        ]
      },
      "timeline": {
        "mentions": 3,
        "data": {"planting_time": "Late April", "lime_application": "Already done"},
        "sentences": [
          "The sweet potatoes are going to go on there in late April.",
          "So Green Pond CMC has already put lime."
        ]
      }
    },
    "unmentioned": {
      "weather": {
        "mentions": 0,
        "data": {},
        "sentences": []
      },
      "delivery-method": {
        "mentions": 0,
        "data": {},
        "sentences": []
      }
    },
    "issues_and_blockers": {
      "crop_rotation": {
        "mentions": 3,
        "data": {"crop_rotation": "Sweet potatoes -> Tobacco"},
        "sentences": [
          "Yeah, sweet potatoes. On all of them?",
          "Well, no, the Green Pond, the big field at Green Pond has had lime on it for... Because it's going to put tobacco in it."
        ]
      }
    },
    "action_items": [
      "Send recommendations for Bailey field and smaller Green Pond field over email",
      "Begin preparations based on the planned timeline"
    ],
    "future_questions": [
      "What other crops are you considering for rotation?",
      "What is your preferred method for receiving updates and progress reports?",
      "Are there specific concerns or issues with the crop rotation plan?",
      "Are there any specific soil amendments or treatments you would like us to consider?"
    ]
  }  
  `;

  const configuration = new Configuration({
    apiKey: accessToken
  });

  const openai = new OpenAIApi(configuration);

  const res = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }]
  });

  if (res.status !== 200) {
    return new Response('Error', { status: 500 });
  }

  const data = await res.data;
  const response_text = data.choices[0].message.content;
  return new Response(JSON.stringify({ data: response_text }));
};
