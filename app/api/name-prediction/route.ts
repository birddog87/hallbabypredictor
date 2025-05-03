import { NextResponse, NextRequest } from 'next/server';
import { kv } from '@vercel/kv'; // Import Vercel KV
import { v4 as uuidv4 } from 'uuid'; // Import uuid

// Define a type for the prediction data
interface NamePredictionData {
  id: string;
  name: string;
  gender: 'Boy' | 'Girl' | 'Unknown'; // Assuming these are the possible values
  predictor: string;
  createdAt: string;
}

const KV_KEY = 'namePredictions'; // Unique key for this type

export async function POST(request: NextRequest) {
  try {
    const { name, gender, predictor } = await request.json();

    // Basic validation
    const validGenders = ['Boy', 'Girl', 'Unknown'];
    if (
      typeof name !== 'string' || name.trim() === '' ||
      typeof gender !== 'string' || !validGenders.includes(gender) ||
      typeof predictor !== 'string' || predictor.trim() === ''
    ) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const newPrediction: NamePredictionData = {
      id: uuidv4(),
      name: name.trim(),
      gender: gender as 'Boy' | 'Girl' | 'Unknown', // Type assertion after validation
      predictor: predictor.trim(),
      createdAt: new Date().toISOString(),
    };

    // Use KV instead of Prisma
    await kv.lpush(KV_KEY, JSON.stringify(newPrediction));
    // Optional: Trim list
    // await kv.ltrim(KV_KEY, 0, 499);

    return NextResponse.json(newPrediction, { status: 201 });
  } catch (error) {
    console.error('Error creating name prediction:', error);
    return NextResponse.json(
      { error: 'Error creating name prediction' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // kv.lrange likely returns objects directly
    const predictions = await kv.lrange(KV_KEY, 0, -1);

    // Optional: Add validation if needed to ensure items match NamePredictionData
    const validatedPredictions = predictions.filter(p => 
        typeof p === 'object' && p !== null && 'id' in p && 'name' in p && 'gender' in p && 'predictor' in p && 'createdAt' in p
    );

    // Log if any items were filtered out due to invalid structure
    if (validatedPredictions.length !== predictions.length) {
        console.warn(`Filtered out ${predictions.length - validatedPredictions.length} invalid items from KV key "${KV_KEY}"`);
    }

    return NextResponse.json(validatedPredictions);
  } catch (error) {
    console.error('Error fetching name predictions:', error);
    return NextResponse.json(
      { error: 'Error fetching name predictions' },
      { status: 500 }
    );
  }
}