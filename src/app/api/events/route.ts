import { NextResponse } from 'next/server';

import Event from '@/models/Event';

import dbConnect from '@/utils/mongodb';

export async function GET() {
  await dbConnect();
  try {
    const events = await Event.find({});
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ message: 'Failed to fetch events', error: error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    const newEvent = await Event.create(body);
    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ message: 'Failed to create event', error: error }, { status: 500 });
  }
}
