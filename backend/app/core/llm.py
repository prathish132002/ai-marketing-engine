"""
xAI (Grok) API client wrapper.
Uses the OpenAI-compatible SDK to talk to xAI's models.
"""
import json
import openai
from app.core.config import settings

_client = openai.OpenAI(
    api_key=settings.xai_api_key,
    base_url="https://api.x.ai/v1",
)

MODEL = "grok-2-1212" # Or grok-beta

def call_llm(system_prompt: str, user_prompt: str, max_tokens: int = 4000) -> dict:
    """
    Call the xAI API and return parsed JSON from the response.
    """
    completion = _client.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": system_prompt + "\nIMPORTANT: You must return ONLY raw JSON matching the schema requested."},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.7,
        max_tokens=max_tokens,
        response_format={"type": "json_object"},
    )
    
    raw = completion.choices[0].message.content.strip()

    # Strip markdown fences
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
        raw = raw.strip()

    try:
        return json.loads(raw)
    except json.JSONDecodeError as e:
        raise ValueError(f"Failed to parse JSON from xAI: {str(e)}\nRaw output: {raw}")
