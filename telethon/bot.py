import asyncio
import settings

SANDBOX = -1001258001846

from telethon.sync import TelegramClient, events, utils
SESSION = 'captainhooks'
API_ID = '929249'
API_HASH = '00c171d347a5140ddf2212157ab2a37a'

client = TelegramClient(SESSION, API_ID, API_HASH, sequential_updates=True)
client.start(settings.PHONE_NUMBER)

# client.send_message(SANDBOX, 'captain hooks is here!')

def escape_html(text):
    return text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

@client.on(events.NewMessage(incoming=True))
async def incoming_message(event):
    print(event.message.text)
    
    text = event.raw_text
    sender = event.sender_id
    chained_cmd = event.message

    # skip if message was forwarded
    if event.message.fwd_from:
        return None

    again = True
    while again:
        again = False

        data = ''
        reply = ''
        reply_file = None
        raw_reply = ''
        original_text = text
        silent = False

        if text.startswith('! '):
            text = text[2:]
        elif text.startswith('!'):
            text = text[1:]
        else:
            continue

        if ' ' in text:
            command = text.split(' ', 1)[0]
            data = text.split(' ', 1)[1]
        else:
            command = text

        command = command.lower()

        # command processing
        if command == 'ping':
            reply = '> pong'

        if reply or reply_file or raw_reply:
            reply = raw_reply or escape_html(reply)

            if reply == 'null':
                return

            LAST_CMD_MSG = await chained_cmd.reply(reply, file=reply_file, link_preview=False, parse_mode='html')

            chained_cmd = LAST_CMD_MSG
            text = reply
            again = bool(reply)


print('Listening...')

asyncio.get_event_loop().run_forever()

