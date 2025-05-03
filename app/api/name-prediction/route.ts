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
    const predictionStrings = await kv.lrange(KV_KEY, 0, -1);
    const predictions: NamePredictionData[] = []; // Initialize empty array

    // Iterate and parse safely
    predictionStrings.forEach((str) => {
      try {
        // Attempt to parse each string, ensure it's a string first
        if (typeof str === 'string') { 
           const prediction = JSON.parse(str);
           // Optional: Add validation here to ensure prediction matches NamePredictionData structure
           predictions.push(prediction);
        } else {
           // Log if item retrieved is not even a string
           console.warn(`Skipping non-string item from KV key "${KV_KEY}":`, str);
        }
      } catch (parseError) {
        // Log the specific string that failed to parse and skip it
        console.error(`Failed to parse item from KV key "${KV_KEY}". Item:`, str, 'Error:', parseError);
      }
    });

    return NextResponse.json(predictions);
  } catch (error) {
    // Catch errors from kv.lrange itself or other unexpected issues
    console.error('Error fetching name predictions:', error);
    return NextResponse.json(
      { error: 'Error fetching name predictions' },
      { status: 500 }
    );
  }
}