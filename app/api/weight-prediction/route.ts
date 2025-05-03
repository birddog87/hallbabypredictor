import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { weight, predictor } = await request.json();
    
    const prediction = await prisma.weightPrediction.create({
      data: {
        weight,
        predictor,
      },
    });
    
    return NextResponse.json(prediction, { status: 201 });
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
    const predictions = await prisma.weightPrediction.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return NextResponse.json(predictions);
  } catch (error) {
    console.error('Error fetching weight predictions:', error);
    return NextResponse.json(
      { error: 'Error fetching weight predictions' },
      { status: 500 }
    );
  }
}