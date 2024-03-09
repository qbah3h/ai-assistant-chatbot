const { OpenAIAPIKey } = require('./config'); // Create config.js with your API key
const { create_chunks,decode_chunk } = require('./tiktoken.js'); // Create config.js with your API key

class OpenAIAPI {
    static async generateResponse(userMessage) {
        // Start testing for encoding      
        const book_text = `
            Mrs. Darling quivered and went to the window. It was securely fastened.
            She looked out, and the night was peppered with stars. They were
            crowding round the house, as if curious to see what was to take place
            there, but she did not notice this, nor that one or two of the smaller
            ones winked at her. Yet a nameless fear clutched at her heart and made
            her cry, “Oh, how I wish that I wasn’t going to a party to-night!”

            Even Michael, already half asleep, knew that she was perturbed, and he
            asked, “Can anything harm us, mother, after the night-lights are lit?”

            “Nothing, precious,” she said; “they are the eyes a mother leaves
            behind her to guard her children.”

            She went from bed to bed singing enchantments over them, and little
            Michael flung his arms round her. “Mother,” he cried, “I’m glad of
            you.” They were the last words she was to hear from him for a long
            time.
            `;
        // const aaa = create_chunks(book_text, 10, "gpt-3.5-turbo")
        // console.log('aaa ', aaa);

        const createdChunks = create_chunks(userMessage, 10, "gpt-3.5-turbo")
        console.log('createdChunks ', createdChunks);

        // const decodedChunks = decode_chunk(createdChunks);
        // console.log('decodedChunks ', decodedChunks);
        //
        return;
        const apiKey = OpenAIAPIKey;
        const endpoint = 'https://api.openai.com/v1/engines/gpt-3.5-turbo/completions';
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                prompt: userMessage,
                max_tokens: 150,
            }),
        });
        const responseData = await response.json();
        // Log the entire API response for debugging
        console.log('Response from OpenAI API:', responseData);
        // Check if choices array is defined and not empty
        if (responseData.choices && responseData.choices.length > 0) {
            return responseData.choices[0].text.trim();
        } else {
            // Handle the case where choices array is undefined or empty
            console.error('Error: No valid response from OpenAI API');
            return 'Sorry, I couldn\'t understand that.';
        }
    }
}
module.exports = { OpenAIAPI };
// Test Script, used mainly as proof of concept
// // import { get_encoding, encoding_for_model } from "";
// const enc = get_encoding("gpt2");
// console.log(`enc: ${JSON.stringify(enc)}`);
// // test
// let decoderHelper = new TextDecoder().decode(enc.decode(enc.encode("hello world")));
// console.log(`enc: ${enc}`);
// console.log(`decoderHelper: ${decoderHelper}`);
// // don't forget to free the encoder after it is not used
// enc.free();
// console.log(`decoderHelper: ${decoderHelper}`);

// // To get the tokeniser corresponding to a specific model in the OpenAI API:
// const enc2 = encoding_for_model("text-davinci-003");
// console.log(`enc2: ${enc2}`);
// // don't forget to free the encoder after it is not used
// enc2.free();
// console.log(`enc2: ${enc2}`);

// // Extend existing encoding with custom special tokens
// const enc3 = encoding_for_model("gpt2", {
//     "<|im_start|>": 100264,
//     "<|im_end|>": 100265,
//   });
//   console.log(`enc3: ${enc3}`);
// // don't forget to free the encoder after it is not used
// enc3.free();
// console.log(`enc3: ${enc3}`);