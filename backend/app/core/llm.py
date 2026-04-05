"""
Groq API client wrapper.
All AI calls in this project go through this module.
We use Llama 3 70B for the highest quality logical reasoning and strict JSON generation.
"""
import json
from groq import Groq
from app.core.config import settings

_client = Groq(api_key=settings.groq_api_key)

MODEL = "llama3-70b-8192"

def call_llm(system_prompt: str, user_prompt: str, max_tokens: int = 4000) -> dict:
    """
    Call the Groq API and return parsed JSON from the response.
    Raises ValueError if the response cannot be parsed as JSON.
    """
    completion = _client.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": system_prompt + "\nIMPORTANT: You must return ONLY raw JSON matching the schema requested. No prose, no markdown formatting blocks."},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.7,
        max_tokens=max_tokens,
        response_format={"type": "json_object"},
    )
    
    raw = completion.choices[0].message.content.strip()

    # Strip markdown fences if model wraps output despite instructions
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
        raw = raw.strip()

    try:
        return json.loads(raw)
    except json.JSONDecodeError as e:
        raise ValueError(f"Failed to parse JSON from LLM: {str(e)}\nRaw output: {raw}")
