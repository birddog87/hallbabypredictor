import { NextResponse, NextRequest } from 'next/server';
import { kv } from '@vercel/kv'; // Import Vercel KV
import { v4 as uuidv4 } from 'uuid'; // Import uuid

// Define a type for the prediction data
interface BirthDatePredictionData {
  id: string;
  date: string; // Store date as ISO string
  predictor: string;
  createdAt: string;
}

const KV_KEY = 'birthDatePredictions'; // Unique key for this type

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

    // Use KV instead of Prisma
    await kv.lpush(KV_KEY, JSON.stringify(newPrediction));
    // Optional: Trim list
    // await kv.ltrim(KV_KEY, 0, 499);

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
    // Use KV instead of Prisma
    const predictionStrings = await kv.lrange(KV_KEY, 0, -1);
    const predictions: BirthDatePredictionData[] = predictionStrings.map((str) => JSON.parse(str as string));

    return NextResponse.json(predictions);
  } catch (error) {
    console.error('Error fetching birth date predictions:', error);
    return NextResponse.json(
      { error: 'Error fetching birth date predictions' },
      { status: 500 }
    );
  }
}