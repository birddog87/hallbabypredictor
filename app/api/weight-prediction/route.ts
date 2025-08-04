import { NextResponse, NextRequest } from 'next/server';
import { Redis } from '@upstash/redis'; // Import Upstash Redis
import { v4 as uuidv4 } from 'uuid'; // Import uuid to generate unique IDs

// Define a type for the prediction data for better type safety
interface WeightPredictionData {
  id: string;
  weight: number;
  predictor: string;
  createdAt: string; // Store timestamp as ISO string
}

const KV_KEY = 'weightPredictions'; // Define a key for the KV store list

// Initialize Redis client
const redis = Redis.fromEnv();

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

    // Add the new prediction to the beginning of the list in Redis
    await redis.lpush(KV_KEY, JSON.stringify(newPrediction));

    // Optional: Trim the list if it gets too long (e.g., keep last 500)
    // await redis.ltrim(KV_KEY, 0, 499);

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
    // Get data from Redis
    const predictions = await redis.lrange(KV_KEY, 0, -1);

    // Optional: Add validation if needed to ensure items match WeightPredictionData
    const validatedPredictions = predictions.filter(p => 
        typeof p === 'object' && p !== null && 'id' in p && 'weight' in p && 'predictor' in p && 'createdAt' in p
    );

    // Log if any items were filtered out due to invalid structure
    if (validatedPredictions.length !== predictions.length) {
        console.warn(`Filtered out ${predictions.length - validatedPredictions.length} invalid items from KV key "${KV_KEY}"`);
    }

    return NextResponse.json(validatedPredictions);
  } catch (error) {
    console.error('Error fetching weight predictions:', error);
    return NextResponse.json(
      { error: 'Error fetching weight predictions' },
      { status: 500 }
    );
  }
}