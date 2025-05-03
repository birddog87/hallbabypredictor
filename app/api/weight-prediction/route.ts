import { NextResponse, NextRequest } from 'next/server';
import { kv } from '@vercel/kv'; // Import Vercel KV
import { v4 as uuidv4 } from 'uuid'; // Import uuid to generate unique IDs

// Define a type for the prediction data for better type safety
interface WeightPredictionData {
  id: string;
  weight: number;
  predictor: string;
  createdAt: string; // Store timestamp as ISO string
}

const KV_KEY = 'weightPredictions'; // Define a key for the KV store list

export async function POST(request: NextRequest) {
  try {
    const { weight, predictor } = await request.json();

    // Basic validation
    if (typeof weight !== 'number' || typeof predictor !== 'string' || predictor.trim() === '') {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const newPrediction: WeightPredictionData = {
      id: uuidv4(), // Generate a unique ID
      weight: weight,
      predictor: predictor.trim(),
      createdAt: new Date().toISOString(), // Store creation time
    };

    // Add the new prediction to the beginning of the list in KV
    await kv.lpush(KV_KEY, JSON.stringify(newPrediction));

    // Optional: Trim the list if it gets too long (e.g., keep last 500)
    // await kv.ltrim(KV_KEY, 0, 499);

    return NextResponse.json(newPrediction, { status: 201 });
  } catch (error) {
    console.error('Error creating weight prediction:', error);
    return NextResponse.json(
      { error: 'Error creating weight prediction' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const predictionStrings = await kv.lrange(KV_KEY, 0, -1);
    const predictions: WeightPredictionData[] = []; // Initialize empty array

    // Iterate and parse safely
    predictionStrings.forEach((str) => {
      try {
        if (typeof str === 'string') {
          const prediction = JSON.parse(str);
          // Optional: Add validation here
          predictions.push(prediction);
        } else {
          console.warn(`Skipping non-string item from KV key "${KV_KEY}":`, str);
        }
      } catch (parseError) {
        console.error(`Failed to parse item from KV key "${KV_KEY}". Item:`, str, 'Error:', parseError);
      }
    });

    return NextResponse.json(predictions);
  } catch (error) {
    // Catch errors from kv.lrange itself or other unexpected issues
    console.error('Error fetching weight predictions:', error);
    return NextResponse.json(
      { error: 'Error fetching weight predictions' },
      { status: 500 }
    );
  }
}