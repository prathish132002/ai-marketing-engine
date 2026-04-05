"""
All Claude prompt templates for the AI Marketing Engine.
Each prompt injects: brand name, tones, keywords to include/avoid, platform, topic.
"""

# ── Module 2: Content Generation Hub ──────────────────────────────────────────

CONTENT_GENERATION_SYSTEM = """
You are an expert marketing copywriter and strategist. Your job is to create
high-quality, platform-native marketing content that sounds genuinely human,
not AI-generated. Every piece must reflect the brand's tone and values.

CRITICAL RULES:
- Respect the brand tone(s) listed — they define the voice, not just the mood
- Weave in "keywords_include" naturally — never awkwardly stuff them
- Never use "keywords_avoid" under any circumstances
- Format ALL output as valid JSON matching the schema provided
- Creative variance between variants is mandatory — do not repeat ideas
- Platform-native means: LinkedIn is professional storytelling, Twitter is punchy,
  Instagram is visual/emotional, email is personal, blog is authoritative
"""

def content_generation_prompt(
    brand_name: str,
    industry: str,
    audience: str,
    tones: list[str],
    keywords_include: list[str],
    keywords_avoid: list[str],
    campaign_goal: str,
    platforms: list[str],
    topic: str,
) -> str:
    tones_str = ", ".join(tones)
    include_str = ", ".join(keywords_include) if keywords_include else "none specified"
    avoid_str = ", ".join(keywords_avoid) if keywords_avoid else "none specified"
    platforms_str = ", ".join(platforms)

    return f"""
Brand: {brand_name}
Industry: {industry}
Target Audience: {audience}
Brand Tones: {tones_str}
Keywords to Include: {include_str}
Keywords to Avoid: {avoid_str}
Campaign Goal: {campaign_goal}
Active Platforms: {platforms_str}
Content Topic: {topic}

Generate a full content suite for the topic above. Return ONLY valid JSON with
this exact structure (no markdown fences, no extra keys):

{{
  "linkedin": {{
    "variants": [
      {{"id": "li_1", "copy": "...", "hook": "...", "cta": "...", "character_count": 0}},
      {{"id": "li_2", "copy": "...", "hook": "...", "cta": "...", "character_count": 0}},
      {{"id": "li_3", "copy": "...", "hook": "...", "cta": "...", "character_count": 0}}
    ]
  }},
  "instagram": {{
    "caption": "...",
    "hashtags": ["...", "..."],
    "character_count": 0
  }},
  "twitter": {{
    "posts": [
      {{"id": "tw_1", "copy": "...", "character_count": 0}},
      {{"id": "tw_2", "copy": "...", "character_count": 0}},
      {{"id": "tw_3", "copy": "...", "character_count": 0}},
      {{"id": "tw_4", "copy": "...", "character_count": 0}},
      {{"id": "tw_5", "copy": "...", "character_count": 0}}
    ]
  }},
  "video_scripts": {{
    "thirty_sec": {{
      "hook": "...",
      "body": "...",
      "cta": "...",
      "full_script": "...",
      "word_count": 0
    }},
    "sixty_sec": {{
      "hook": "...",
      "body": "...",
      "cta": "...",
      "full_script": "...",
      "word_count": 0
    }}
  }},
  "email_newsletter": {{
    "subject_line": "...",
    "preview_text": "...",
    "body": "...",
    "cta_button_text": "..."
  }},
  "blog_outline": {{
    "title": "...",
    "meta_description": "...",
    "sections": [
      {{"heading": "...", "key_points": ["...", "..."]}},
      {{"heading": "...", "key_points": ["...", "..."]}},
      {{"heading": "...", "key_points": ["...", "..."]}},
      {{"heading": "...", "key_points": ["...", "..."]}},
      {{"heading": "...", "key_points": ["...", "..."]}}
    ],
    "estimated_word_count": 0
  }},
  "google_ad": {{
    "headline_1": "...",
    "headline_2": "...",
    "headline_3": "...",
    "description_1": "...",
    "description_2": "..."
  }},
  "seo_meta": {{
    "title": "...",
    "meta_description": "...",
    "focus_keyword": "...",
    "secondary_keywords": ["...", "...", "..."],
    "og_title": "...",
    "og_description": "..."
  }}
}}

Fill every "character_count" and "word_count" field with the actual count.
Make each piece genuinely compelling — this is real marketing copy for a real brand.
"""


# ── Module 3: Content Repurposing ─────────────────────────────────────────────

REPURPOSE_EXTRACTION_PROMPT = """
You are given a long-form content transcript (blog post, podcast, or webinar).
Extract the core insights and then generate all marketing formats.
Identify: main thesis, top 5 key insights, memorable quotes, call-to-action ideas.
Then produce the same JSON structure as the content generation output.
"""


# ── Module 4: Ad Copy & A/B Testing ──────────────────────────────────────────

AD_COPY_SYSTEM = """
You are a performance marketing expert specializing in ad copy that converts.
Generate variants that are genuinely different in psychological approach.
"""

def ad_copy_prompt(brand_name: str, tones: list[str], keywords_include: list[str],
                   keywords_avoid: list[str], platform: str, product: str, offer: str) -> str:
    return f"""
Brand: {brand_name}
Platform: {platform}
Product/Service: {product}
Offer/Hook: {offer}
Brand Tones: {", ".join(tones)}
Include Keywords: {", ".join(keywords_include)}
Avoid Keywords: {", ".join(keywords_avoid)}

Generate 5 ad copy variants. Each must use a DIFFERENT psychological approach.
Return ONLY JSON:
{{
  "variants": [
    {{"id": "v1", "tone_label": "Emotional", "headline": "...", "body": "...", "cta": "...", "status": "Testing"}},
    {{"id": "v2", "tone_label": "Logical", "headline": "...", "body": "...", "cta": "...", "status": "Testing"}},
    {{"id": "v3", "tone_label": "Urgency", "headline": "...", "body": "...", "cta": "...", "status": "Testing"}},
    {{"id": "v4", "tone_label": "Social Proof", "headline": "...", "body": "...", "cta": "...", "status": "Testing"}},
    {{"id": "v5", "tone_label": "Curiosity", "headline": "...", "body": "...", "cta": "...", "status": "Testing"}}
  ]
}}
"""


# ── Module 5: Sentiment Analysis ──────────────────────────────────────────────

SENTIMENT_ANALYSIS_PROMPT = """
You are a consumer insights analyst. Analyze the customer reviews provided and
return a structured sentiment report in JSON.
"""

def sentiment_prompt(reviews_text: str, brand_name: str) -> str:
    return f"""
Brand: {brand_name}
Customer Reviews:
{reviews_text}

Analyze all reviews and return ONLY JSON:
{{
  "overall_score": 0.0,
  "positive_pct": 0,
  "neutral_pct": 0,
  "negative_pct": 0,
  "top_themes": [
    {{"theme": "...", "sentiment": "positive|neutral|negative", "frequency": 0, "example_quote": "..."}}
  ],
  "voice_of_customer_summary": "...",
  "top_words": [{{"word": "...", "count": 0}}],
  "recommendations": ["...", "...", "..."]
}}
"""


# ── Module 6: Calendar Suggestions ───────────────────────────────────────────

def calendar_suggestion_prompt(brand_name: str, platforms: list[str],
                                campaign_goal: str, month: str) -> str:
    return f"""
Brand: {brand_name}
Platforms: {", ".join(platforms)}
Campaign Goal: {campaign_goal}
Month: {month}

Suggest a content calendar for the month. Return ONLY JSON:
{{
  "suggestions": [
    {{"day": 1, "platform": "...", "content_type": "...", "topic": "...", "best_time": "..."}}
  ]
}}
Provide 20-25 suggestions spread across the month and platforms.
"""


# ── Bonus: Tone Consistency Scorer ───────────────────────────────────────────

def tone_scorer_prompt(content: str, brand_tones: list[str], brand_name: str) -> str:
    return f"""
Brand: {brand_name}
Desired Tones: {", ".join(brand_tones)}
Content to Evaluate:
{content}

Score how well this content matches the desired brand tones. Return ONLY JSON:
{{
  "overall_score": 0,
  "tone_breakdown": [
    {{"tone": "...", "score": 0, "feedback": "..."}}
  ],
  "strengths": ["...", "..."],
  "improvements": ["...", "..."],
  "rewrite_suggestion": "..."
}}
Scores are 0-100. Be specific and actionable in feedback.
"""


# ── Bonus: Competitor Analysis ────────────────────────────────────────────────

def competitor_analysis_prompt(competitor_post: str, brand_name: str,
                                brand_tones: list[str], audience: str) -> str:
    return f"""
Brand: {brand_name}
Our Audience: {audience}
Our Tones: {", ".join(brand_tones)}
Competitor Post:
{competitor_post}

Analyze this competitor content and suggest a counter-strategy. Return ONLY JSON:
{{
  "competitor_strengths": ["...", "..."],
  "competitor_weaknesses": ["...", "..."],
  "positioning_gap": "...",
  "counter_strategy": "...",
  "suggested_post": "...",
  "angle": "..."
}}
"""
