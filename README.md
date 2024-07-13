# Discord Bot

Discord bot that integrates with ChatGPT for interactive chat, defination of a word using urban dictionary API. It provides several slash commands for various functionalities.

## Features
- **/user**: Get information about a user.
- **/ban**: Ban a member from the Discord server.
- **ChatGPT Integration**: Engage in interactive chats using ChatGPT.
- **Urban Dictonary  Integration**: Engage in interactive chats using ChatGPT.


## Slash Commands
- **/user**: Get information about a user.
- **/ping**: Respond with "pong" to check bot responsiveness.
- **/ban**: Ban a member from the Discord server.
- **/urban**: Search for the definition of a word. Stable Diffusion.
- **/chatgpt**: Ask anything to chatgpt.


## Getting Started


### Steps

1. **Clone the repository**:
    ```sh
    git clone https://github.com/golamrabbi-git/Discord-BOT.git
    cd Discord-bot
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Create a `.env` file**:
    ```sh
    touch .env
    ```

4. **Add your environment variables to the `.env` file**:
    ```
    DISCORD_TOKEN=your_discord_bot_token
    CHATGPT_TOKEN=your_chatgpt_token
    
    ```

## Configuration

1. **Setup your Discord bot**:
    - Go to the [Discord Developer Portal](https://discord.com/developers/applications) and create a new application.
    - Create a bot user and copy the token.
    - Invite the bot to your server with the appropriate permissions.

2. **Configure bot settings**:
    - Edit the configuration file `config.json` to customize your bot settings (if applicable).

## Usage

### Running the Bot

To start the bot, use the following command:

```sh
node index.js