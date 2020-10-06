import asyncio
import settings

SANDBOX = -1001258001846

from telethon.sync import TelegramClient, events, utils
SESSION = 'captainhooks'
API_ID = '929249'
API_HASH = '00c171d347a5140ddf2212157ab2a37a'

client = TelegramClient(SESSION, API_ID, API_HASH, sequential_updates=True)
client.start(settings.PHONE_NUMBER)

client.send_message(SANDBOX, 'loaded!')

@client.on(events.NewMessage(incoming=True))
async def incoming_message(event):
    print(event.message.text)

print('Listening...')

asyncio.get_event_loop().run_forever()

