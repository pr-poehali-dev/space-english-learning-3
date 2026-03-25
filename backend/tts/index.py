"""
TTS — озвучка английских фраз и слов через Google TTS.
Принимает текст, возвращает аудио в base64 (MP3).
"""
import base64
import os
import json
import urllib.request
import urllib.parse


def handler(event: dict, context) -> dict:
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    try:
        body = json.loads(event.get("body") or "{}")
        text = body.get("text", "").strip()
        lang = body.get("lang", "en")

        if not text:
            return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "text is required"})}

        if len(text) > 500:
            return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "text too long (max 500)"})}

        audio_b64 = fetch_gtts(text, lang)

        return {
            "statusCode": 200,
            "headers": {**cors, "Content-Type": "application/json"},
            "body": json.dumps({"audio": audio_b64, "text": text, "lang": lang}),
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "headers": cors,
            "body": json.dumps({"error": str(e)}),
        }


def fetch_gtts(text: str, lang: str = "en") -> str:
    encoded = urllib.parse.quote(text)
    url = (
        f"https://translate.google.com/translate_tts"
        f"?ie=UTF-8&q={encoded}&tl={lang}&client=tw-ob"
    )
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0",
            "Referer": "https://translate.google.com/",
        },
    )
    with urllib.request.urlopen(req, timeout=10) as resp:
        data = resp.read()
    return base64.b64encode(data).decode("utf-8")
