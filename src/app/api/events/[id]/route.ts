// src/app/api/events/[id]/route.ts (재확인용)
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
): Promise<NextResponse> {
  await dbConnect();
  const { id } = context.params;
  try {
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Event deleted successfully", deletedEvent },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { message: "Failed to delete event", error: error },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: { id: string } }
): Promise<NextResponse> {
  await dbConnect();
  const { id } = context.params;
  const { isCompleted } = await request.json();
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { isCompleted },
      { new: true }
    );
    if (!updatedEvent) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Event updated successfully", updatedEvent },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      { message: "Failed to update event", error: error },
      { status: 500 }
    );
  }
}
