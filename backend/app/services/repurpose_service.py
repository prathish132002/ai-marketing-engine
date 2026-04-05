"""
Repurpose Service — Module 3.
Reads transcript, extracted insights, generates formats.
"""
from app.core.llm import call_llm
from app.core.prompts import (
    REPURPOSE_EXTRACTION_PROMPT,
    content_generation_prompt,
)
from app.schemas.repurpose import RepurposeResponse

def process_transcript(
    transcript: str,
    brand_name: str,
    industry: str,
    audience: str,
    tones: list[str],
    keywords_include: list[str],
    keywords_avoid: list[str],
    campaign_goal: str,
    platforms: list[str],
    topic: str = "Repurposed Content",
) -> RepurposeResponse:
    
    # Use the base content generation prompt with the transcript prepended
    base_user_prompt = content_generation_prompt(
        brand_name=brand_name,
        industry=industry,
        audience=audience,
        tones=tones,
        keywords_include=keywords_include,
        keywords_avoid=keywords_avoid,
        campaign_goal=campaign_goal,
        platforms=platforms,
        topic=topic,
    )
    
    user_prompt = f"""
Here is the transcript to process:
{transcript}

---
{base_user_prompt}

IMPORTANT OVERRIDE FOR RESPONSE FORMAT:
Since this is a repurpose request, you must wrap the entire output in a root JSON object with two keys:
1. "extraction": containing:
    - "main_thesis" (string)
    - "key_insights" (list of strings)
    - "memorable_quotes" (list of strings)
    - "call_to_action_ideas" (list of strings)
2. "generated_content": containing the exact JSON structure defined above.
"""

    raw = call_llm(
        system_prompt=REPURPOSE_EXTRACTION_PROMPT,
        user_prompt=user_prompt,
        max_tokens=6000,
    )

    # Re-inject metadata into generated content to satisfy validation
    if "generated_content" in raw:
        raw["generated_content"]["topic"] = topic
        raw["generated_content"]["brand_name"] = brand_name

    return RepurposeResponse(**raw)
