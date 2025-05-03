import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { date, predictor } = await request.json();
    
    const prediction = await prisma.birthDatePrediction.create({
      data: {
        date: new Date(date),
        predictor,
      },
    });
    
    return NextResponse.json(prediction, { status: 201 });
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
    const predictions = await prisma.birthDatePrediction.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return NextResponse.json(predictions);
  } catch (error) {
    console.error('Error fetching birth date predictions:', error);
    return NextResponse.json(
      { error: 'Error fetching birth date predictions' },
      { status: 500 }
    );
  }
}