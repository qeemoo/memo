import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/src/utils/mongodb';
import DayDisplayState from '@/src/models/DayDisplayState';

export async function GET() {
  await dbConnect();
  try {
    const states = await DayDisplayState.find({});
    const collapsedStates: Record<string, boolean> = {};
    states.forEach(state => {
      collapsedStates[state.date] = state.isCollapsed;
    });
    return NextResponse.json(collapsedStates, { status: 200 });
  } catch (error) {
    console.error('Error fetching display states:', error);
    return NextResponse.json({ message: 'Error fetching display states' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const { date, isCollapsed } = await req.json();

    if (!date || typeof isCollapsed === 'undefined') {
      return NextResponse.json({ message: 'Date and isCollapsed are required' }, { status: 400 });
    }

    const updatedState = await DayDisplayState.findOneAndUpdate(
      { date },
      { isCollapsed },
      { upsert: true, new: true }
    );

    return NextResponse.json(updatedState, { status: 200 });
  } catch (error) {
    console.error('Error updating display state:', error);
    return NextResponse.json({ message: 'Error updating display state' }, { status: 500 });
  }
}
