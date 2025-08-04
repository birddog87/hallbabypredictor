import { NextResponse, NextRequest } from 'next/server';
import { Redis } from '@upstash/redis'; // Import Upstash Redis
import { v4 as uuidv4 } from 'uuid'; // Import uuid

// Define a type for the prediction data
interface BirthDatePredictionData {
  id: string;
  date: string; // Store date as ISO string
  predictor: string;
  createdAt: string;
}

const KV_KEY = 'birthDatePredictions'; // Unique key for this type

// Initialize Redis client
const redis = Redis.fromEnv();

export async function POST(request: NextRequest) {
  try {
    const { date, predictor } = await request.json();

    // Basic validation
    if (typeof date !== 'string' || !Date.parse(date) || typeof predictor !== 'string' || predictor.trim() === '') {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const newPrediction: BirthDatePredictionData = {
      id: uuidv4(),
      date: new Date(date).toISOString(), // Store as ISO string
      predictor: predictor.trim(),
      createdAt: new Date().toISOString(),
    };

    // Use Upstash Redis
    await redis.lpush(KV_KEY, JSON.stringify(newPrediction));
    // Optional: Trim list
    // await redis.ltrim(KV_KEY, 0, 499);

    return NextResponse.json(newPrediction, { status: 201 });
  } catch (error) {
    console.error('Error creating birth date prediction:', error);
    return NextResponse.json(
      { error: 'Error creating birth date prediction' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Get data from Redis
    const predictions = await redis.lrange(KV_KEY, 0, -1);

    // Optional: Add validation if needed to ensure items match BirthDatePredictionData
    const validatedPredictions = predictions.filter(p => 
        typeof p === 'object' && p !== null && 'id' in p && 'date' in p && 'predictor' in p && 'createdAt' in p
    );

    // Log if any items were filtered out due to invalid structure
    if (validatedPredictions.length !== predictions.length) {
        console.warn(`Filtered out ${predictions.length - validatedPredictions.length} invalid items from KV key "${KV_KEY}"`);
    }

    return NextResponse.json(validatedPredictions);
  } catch (error) {
    console.error('Error fetching birth date predictions:', error);
    return NextResponse.json(
      { error: 'Error fetching birth date predictions' },
      { status: 500 }
    );
  }
}