import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/src/utils/mongodb';
import Memo from '@/src/models/Memo';

export async function GET() {
  await dbConnect();
  try {
    const memo = await Memo.findOne().sort({ createdAt: -1 });
    return NextResponse.json(memo, { status: 200 });
  } catch (error) {
    console.error('Error fetching memo:', error);
    return NextResponse.json({ message: 'Error fetching memo' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const { content } = await req.json();
    console.log('Received content for memo save:', content);

    if (typeof content === 'undefined') {
      console.error('Content is undefined in POST request');
      return NextResponse.json({ message: 'Content is required' }, { status: 400 });
    }

    // Find existing memo or create a new one
    const existingMemo = await Memo.findOne();
    console.log('Existing memo found:', existingMemo);
    let updatedMemo;

    if (existingMemo) {
      existingMemo.content = content;
      updatedMemo = await existingMemo.save();
      console.log('Memo updated:', updatedMemo);
    } else {
      updatedMemo = await Memo.create({ content });
      console.log('New memo created:', updatedMemo);
    }

    return NextResponse.json(updatedMemo, { status: 200 });
  } catch (error) {
    console.error('Error saving memo:', error);
    return NextResponse.json({ message: 'Error saving memo' }, { status: 500 });
  }
}
