import OpenAI from 'openai';
import { MedicineData } from '../data/mockMedicines';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, use a backend API
});

export const getMedicineInfo = async (medicineName: string): Promise<MedicineData | null> => {
  try {
    const prompt = `
You are a medical information expert. Provide comprehensive information about the medicine "${medicineName}".

Return the information in the following JSON format exactly:
{
  "name": "Medicine Name",
  "medicalTreats": [
    "List of medical conditions in professional medical terminology",
    "Include 3-5 specific medical conditions or uses"
  ],
  "simpleTreats": [
    "Same conditions explained in simple, everyday language",
    "Use terms a non-medical person would understand"
  ],
  "sideEffects": [
    "List of common side effects",
    "Include 4-6 most frequently reported side effects"
  ],
  "safetyWarnings": {
    "diabetics": "safe|caution|avoid",
    "pregnancy": "safe|caution|avoid", 
    "kidneyDisease": "safe|caution|avoid",
    "liverDisease": "safe|caution|avoid"
  }
}

Important guidelines:
- If the medicine is not found or doesn't exist, return null
- Use only "safe", "caution", or "avoid" for safety warnings
- Ensure medicalTreats and simpleTreats arrays have the same number of items and correspond to each other
- Be accurate and based on established medical knowledge
- Focus on the most common and well-documented uses and effects

Medicine to analyze: ${medicineName}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a medical information assistant that provides accurate, well-structured information about medications. Always respond with valid JSON format."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 1500
    });

    const response = completion.choices[0]?.message?.content;
    
    if (!response) {
      throw new Error('No response from OpenAI');
    }

    // Clean the response to extract JSON
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid JSON response from OpenAI');
    }

    const medicineData = JSON.parse(jsonMatch[0]) as MedicineData;
    
    // Validate the response structure
    if (!medicineData.name || !medicineData.medicalTreats || !medicineData.simpleTreats || 
        !medicineData.sideEffects || !medicineData.safetyWarnings) {
      throw new Error('Incomplete medicine data received');
    }

    return medicineData;

  } catch (error) {
    console.error('Error fetching medicine info:', error);
    
    // Return null if medicine not found or API error
    if (error instanceof Error && error.message.includes('not found')) {
      return null;
    }
    
    throw error;
  }
};