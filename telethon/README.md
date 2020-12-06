# Captain Hooks - Telegram

## Setup

On a Debian / Ubuntu machine:

```
$ sudo apt update
$ sudo apt install build-essential python3 python3-dev python3-pip python-virtualenv python3-virtualenv
$ git clone https://github.com/dank-inc/captain-hooks.git
$ cd captain-hooks/telegram/
$ virtualenv -p python3 env
$ source env/bin/activate
(env) $ pip install -r requirements.txt
```

Edit `settings.py.example`, save it as `settings.py`.

## Running

Ensure the virtual environment is active:

```
$ source env/bin/activate
```

Run the bot:

```
(env) $ python bot.py
```

Enter the code sent to your phone number in `settings.py`.
