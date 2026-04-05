"""
Claude API client wrapper.
All Claude API calls in this project go through this module.
"""
import json
import anthropic
from app.core.config import settings

_client = anthropic.Anthropic(api_key=settings.anthropic_api_key)

MODEL = "claude-sonnet-4-20250514"


def call_claude(system_prompt: str, user_prompt: str, max_tokens: int = 4096) -> dict:
    """
    Call the Claude API and return parsed JSON from the response.
    Raises ValueError if the response cannot be parsed as JSON.
    """
    message = _client.messages.create(
        model=MODEL,
        max_tokens=max_tokens,
        system=system_prompt,
        messages=[{"role": "user", "content": user_prompt}],
    )
    raw = message.content[0].text.strip()

    # Strip markdown fences if model wraps output
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
        raw = raw.strip()

    try:
        return json.loads(raw)
    except json.JSONDecodeError as e:
        raise ValueError(f"Claude returned invalid JSON: {e}\nRaw: {raw[:500]}")
