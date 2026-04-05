"""
Content Service — Module 2: Content Generation Hub.
All AI generation logic lives here; routes stay thin.
"""
import json
from app.core.llm import call_llm
from app.core.prompts import (
    CONTENT_GENERATION_SYSTEM,
    content_generation_prompt,
)
from app.schemas.content import (
    ContentGenerationResponse,
    ContentRefinementResponse,
)


def generate_content_suite(
    brand_name: str,
    industry: str,
    audience: str,
    tones: list[str],
    keywords_include: list[str],
    keywords_avoid: list[str],
    campaign_goal: str,
    platforms: list[str],
    topic: str,
) -> ContentGenerationResponse:
    """
    Call Claude to generate the full content suite for a topic.
    Returns a validated Pydantic model.
    """
    user_prompt = content_generation_prompt(
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

    raw = call_llm(
        system_prompt=CONTENT_GENERATION_SYSTEM,
        user_prompt=user_prompt,
        max_tokens=6000,
    )

    # Inject metadata then validate
    raw["topic"] = topic
    raw["brand_name"] = brand_name

    return ContentGenerationResponse(**raw)


def refine_content(
    original_copy: str,
    refinement_instruction: str,
    brand_name: str,
    tones: list[str],
    platform: str,
) -> ContentRefinementResponse:
    """
    Refine a single piece of content based on a natural-language instruction.
    E.g. "make this shorter", "add more urgency", "make it funnier"
    """
    system = (
        "You are a marketing copywriter. Refine the given piece of content "
        "according to the user's instruction while keeping the brand tone intact. "
        "Return ONLY JSON with keys: refined_copy, character_count, changes_made."
    )

    user = f"""
Brand: {brand_name}
Brand Tones: {", ".join(tones)}
Platform: {platform}
Original Copy:
{original_copy}

Refinement Instruction: {refinement_instruction}

Return ONLY JSON:
{{
  "refined_copy": "...",
  "character_count": 0,
  "changes_made": "brief description of what changed"
}}
"""

    raw = call_llm(system_prompt=system, user_prompt=user, max_tokens=1000)
    return ContentRefinementResponse(**raw)
