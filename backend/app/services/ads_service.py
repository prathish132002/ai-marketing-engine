"""
Ad Copy Service — Module 4.
Generates multivariant ad copy for A/B testing.
"""
from app.core.claude import call_claude
from app.core.prompts import AD_COPY_SYSTEM, ad_copy_prompt
from app.schemas.ads import AdCopyResponse

def generate_ad_variants(
    brand_name: str,
    tones: list[str],
    keywords_include: list[str],
    keywords_avoid: list[str],
    platform: str,
    product: str,
    offer: str
) -> AdCopyResponse:
    
    user_prompt = ad_copy_prompt(
        brand_name=brand_name,
        tones=tones,
        keywords_include=keywords_include,
        keywords_avoid=keywords_avoid,
        platform=platform,
        product=product,
        offer=offer
    )

    raw = call_claude(
        system_prompt=AD_COPY_SYSTEM,
        user_prompt=user_prompt,
        max_tokens=2000,
    )

    return AdCopyResponse(**raw)
