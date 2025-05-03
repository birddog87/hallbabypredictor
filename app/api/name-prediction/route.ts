import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { name, gender, predictor } = await request.json();
    
    const prediction = await prisma.namePrediction.create({
      data: {
        name,
        gender,
        predictor,
      },
    });
    
    return NextResponse.json(prediction, { status: 201 });
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
    const predictions = await prisma.namePrediction.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return NextResponse.json(predictions);
  } catch (error) {
    console.error('Error fetching name predictions:', error);
    return NextResponse.json(
      { error: 'Error fetching name predictions' },
      { status: 500 }
    );
  }
}