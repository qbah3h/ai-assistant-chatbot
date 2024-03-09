const { get_encoding, encoding_for_model } = require('tiktoken'); // Create config.js with your API key

function num_tokens_from_string(string, model_name) {
    try {
        const enc = encoding_for_model('gpt-3.5-turbo');
        console.log('num of tokens: ', enc.encode(string).length);
        return enc.encode(string).length;
    } catch (error) {
        console.error('Error in num_tokens_from_string:', error);
        return 0; // Or handle the error appropriately
    }
}

function price_of_tokens(num_of_tokens, model_name) {
    try {
        let price_per_token = 0.002 / 1000;
        switch (model_name) {
            case 'gpt-3.5-turbo':
                price_per_token = 0.002 / 1000;
                break;
            default:
                break;
        }
        return num_of_tokens * price_per_token;
    } catch (error) {
        console.error('Error in price_of_tokens:', error);
        return 0; // Or handle the error appropriately
    }
}

function create_chunks(message, chunk_size, model_name) {
    try {
        const enc = encoding_for_model('gpt-3.5-turbo');
        const tokens = enc.encode(message);
        const total_tokens = num_tokens_from_string(message);

        // Calculating and printing the price for tokens
        console.log('price of tokens: $', price_of_tokens(total_tokens));
        //
        if(total_tokens < chunk_size) return tokens;
        let chunks = [];
        for (let i = 0; i < total_tokens; i += chunk_size) {
            // Calculate the end index for the current chunk
            const end = Math.min(i + chunk_size, total_tokens);

            // Extract the chunk of tokens
            const chunk = tokens.slice(i, end);
            console.log('chunk: $', chunk);
            
            // Push the chunk into the chunks array
            chunks.push(chunk);
        }

        return chunks;
    } catch (error) {
        console.error('Error in create_chunks:', error);
        return []; // Or handle the error appropriately
    }
}

function decode_chunk(chunk) {
    const enc = get_encoding('gpt-3.5-turbo');
    for (let i = 0; i < chunk.length; i++) {
        console.log('decodedChunk: $', enc.decode(chunk[i]));        
    }
}

module.exports = { create_chunks, decode_chunk };
