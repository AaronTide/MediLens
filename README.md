MediLens
MediLens is a web app that helps users instantly understand any medicine and verify if it might be fake.

With just a scan or a typed-in name, MediLens provides:

✅ What the medicine treats (in both medical terms and simple everyday language)
⚠️ Common side effects
🚫 Safety warnings (e.g., if unsafe for diabetics, pregnant women,)
🔍 An Authenticity Checker to flag suspicious or counterfeit drugs
It's like giving every family their own trusted pharmacist - in their pocket.

🛠️ How we built it
Frontend: React + Tailwind CSS
AI integration: OpenAI GPT-4 API trained on medical data generates trusted medical summaries
Backend: Used SupaBase to handle Edge Functions
Fake Medicine Detection: Built a basic pattern-based checker to flag common counterfeit risks
Accessibility: Explanations in simple everyday terms for those who dont understand complex medical terms.
Data Structure: Follows a structured JSON schema to ensure clean UI rendering
We focused on shipping something real, fast, and functional — without compromising empathy.
