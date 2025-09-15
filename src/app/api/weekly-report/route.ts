import { NextRequest, NextResponse } from 'next/server';

import WeeklyReport from '@/models/WeeklyReport';

import dbConnect from '@/utils/mongodb';

const getWeekId = (date: Date): string => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
};

export async function GET() {
  await dbConnect();
  try {
    const weekId = getWeekId(new Date());
    const reports = await WeeklyReport.find({ weekId });
    return NextResponse.json(reports);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch weekly reports' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const { text, dayOfWeek } = await request.json();
    const weekId = getWeekId(new Date());

    const report = await WeeklyReport.findOneAndUpdate(
      { weekId, dayOfWeek },
      { text },
      { new: true, upsert: true },
    );

    return NextResponse.json(report);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save weekly report' }, { status: 500 });
  }
}
