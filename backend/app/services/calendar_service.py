"""
Calendar Service — Module 6.
Generates a monthly content schedule based on brand, platforms and goals.
"""
from app.core.llm import call_llm
from app.core.prompts import calendar_suggestion_prompt
from app.schemas.calendar import CalendarResponse

def generate_calendar(
    brand_name: str,
    platforms: list[str],
    campaign_goal: str,
    month: str
) -> CalendarResponse:
    
    user_prompt = calendar_suggestion_prompt(
        brand_name=brand_name,
        platforms=platforms,
        campaign_goal=campaign_goal,
        month=month
    )

    system_prompt = (
        "You are an expert marketing strategist and content planner. "
        "Create a highly structured content calendar optimizing for the highest "
        "engagement times and varying content types across the specified platforms."
    )

    raw = call_llm(
        system_prompt=system_prompt,
        user_prompt=user_prompt,
        max_tokens=2500,
    )

    return CalendarResponse(**raw)
